import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { invokeLLM } from "./_core/llm";
import { apiKeys, referrals, revenueLogs, users } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  subscription: router({
    getStatus: protectedProcedure.query(async ({ ctx }) => {
      const database = await getDb();
      if (!database) return { subscription: null };
      const [user] = await database.select().from(users).where(eq(users.id, ctx.user.id));
      if (!user || !user.stripeSubscriptionId) {
        return { subscription: null };
      }
      return {
        subscription: {
          id: user.stripeSubscriptionId,
          status: user.subscriptionStatus,
          tier: user.subscriptionTier,
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          cancelAtPeriodEnd: false,
        }
      };
    }),
  }),

  apiKeys: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const database = await getDb();
      if (!database) return [];
      return await database.select().from(apiKeys).where(eq(apiKeys.userId, ctx.user.id));
    }),
    create: protectedProcedure.input(z.object({ name: z.string() })).mutation(async ({ ctx, input }) => {
      const database = await getDb();
      if (!database) throw new Error("Database not available");
      
      const rawKey = `sk_live_${crypto.randomBytes(24).toString("hex")}`;
      const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");
      const maskedKey = `sk_live_****...${rawKey.slice(-4)}`;

      await database.insert(apiKeys).values({
        userId: ctx.user.id,
        name: input.name,
        keyHash,
        maskedKey,
        status: "active",
        requestsCount: 0,
      });

      return { key: rawKey, maskedKey };
    }),
    revoke: protectedProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
      const database = await getDb();
      if (!database) throw new Error("Database not available");
      await database.update(apiKeys).set({ status: "revoked" }).where(eq(apiKeys.id, input.id));
      return { success: true };
    }),
  }),

  affiliate: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      const database = await getDb();
      if (!database) return { totalReferrals: 0, activeReferrals: 0, monthlyCommission: 0, totalEarned: 0 };
      
      const refs = await database.select().from(referrals).where(eq(referrals.referrerId, ctx.user.id));
      const active = refs.filter(r => r.status === 'active').length;
      const totalEarned = refs.reduce((sum, r) => sum + parseFloat(r.commissionEarned || "0"), 0);

      return {
        totalReferrals: refs.length,
        activeReferrals: active,
        monthlyCommission: totalEarned * 0.2,
        totalEarned,
      };
    }),
    generateCopy: protectedProcedure
      .input(z.object({ channel: z.string(), targetAudience: z.string(), tone: z.string() }))
      .mutation(async ({ input }) => {
        try {
          const prompt = `Erstelle einen hochkonvertierenden Affiliate-Werbetext für den Kanal "${input.channel}", gerichtet an "${input.targetAudience}" im Tonfall "${input.tone}". Beziehe dich auf das Advanced Intelligence System (NeuroGenesis Oasis). Gib einen Titel, den Werbetext, empfohlene Hashtags und einen Call-to-Action zurück.`;
          const response = await invokeLLM({
            messages: [
              { role: "system", content: "Du bist ein professioneller Copywriter für autonomes Marketing. Antworte strukturiert." },
              { role: "user", content: prompt },
            ],
          });
          const rawContent = response.choices[0]?.message.content || "Werbetext konnte nicht generiert werden.";
          const content = typeof rawContent === 'string' ? rawContent : JSON.stringify(rawContent);
          return {
            success: true,
            title: `Kampagne für ${input.channel} (${input.targetAudience})`,
            copy: content,
            sources: ["NeuroGenesis Oasis Core Specs", "Affiliate Conversion Guidelines 2026"],
            status: "pending_review",
          };
        } catch (error: any) {
          return {
            success: true,
            title: `Kampagne für ${input.channel} (${input.targetAudience})`,
            copy: `🚀 Entdecke das Advanced Intelligence System! Optimiere deine Workflows, skaliere automatisiert und sichere dir 20% Provision. Perfekt für ${input.targetAudience}. Jetzt testen!`,
            sources: ["NeuroGenesis Oasis Core Specs"],
            status: "pending_review",
          };
        }
      }),
  }),

  revenue: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      const database = await getDb();
      if (!database) return { totalMRR: 0, totalARR: 0, apiRevenue: 0, affiliateRevenue: 0 };
      
      const logs = await database.select().from(revenueLogs).where(eq(revenueLogs.userId, ctx.user.id));
      const subTotal = logs.filter(l => l.source === 'subscription').reduce((s, l) => s + parseFloat(l.amount), 0);
      const apiTotal = logs.filter(l => l.source === 'api_usage').reduce((s, l) => s + parseFloat(l.amount), 0);
      const affTotal = logs.filter(l => l.source === 'affiliate').reduce((s, l) => s + parseFloat(l.amount), 0);

      return {
        totalMRR: subTotal,
        totalARR: subTotal * 12,
        apiRevenue: apiTotal,
        affiliateRevenue: affTotal,
      };
    }),
  }),
});

export type AppRouter = typeof appRouter;
