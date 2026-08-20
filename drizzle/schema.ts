import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  subscriptionTier: mysqlEnum("subscriptionTier", ["FREE", "STARTER", "PRO", "ENTERPRISE"]).default("FREE").notNull(),
  subscriptionStatus: varchar("subscriptionStatus", { length: 64 }).default("inactive").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const apiKeys = mysqlTable("apiKeys", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  keyHash: varchar("keyHash", { length: 255 }).notNull(),
  maskedKey: varchar("maskedKey", { length: 64 }).notNull(),
  status: mysqlEnum("status", ["active", "revoked"]).default("active").notNull(),
  requestsCount: int("requestsCount").default(0).notNull(),
  lastUsedAt: timestamp("lastUsedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  referrerId: int("referrerId").notNull(),
  referredUserId: int("referredUserId").notNull(),
  status: mysqlEnum("status", ["pending", "active", "churned"]).default("active").notNull(),
  commissionEarned: decimal("commissionEarned", { precision: 10, scale: 2 }).default("0.00").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const revenueLogs = mysqlTable("revenueLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  source: mysqlEnum("source", ["subscription", "api_usage", "affiliate"]).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("USD").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ApiKey = typeof apiKeys.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
export type RevenueLog = typeof revenueLogs.$inferSelect;
