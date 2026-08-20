import { describe, expect, it } from "vitest";
import { API_PRICING, AFFILIATE_COMMISSION, SUBSCRIPTION_TIERS } from "./products";

describe("subscription products", () => {
  it("defines all sellable tiers with monthly and annual prices", () => {
    const tiers = Object.values(SUBSCRIPTION_TIERS);

    expect(tiers).toHaveLength(3);
    expect(tiers.every(tier => tier.priceMonthly > 0 && tier.priceYearly > 0)).toBe(true);
    expect(SUBSCRIPTION_TIERS.PRO.priceMonthly).toBe(99);
    expect(SUBSCRIPTION_TIERS.ENTERPRISE.limits.users).toBe(Infinity);
  });

  it("keeps annual pricing below twelve monthly payments", () => {
    for (const tier of Object.values(SUBSCRIPTION_TIERS)) {
      expect(tier.priceYearly).toBeLessThan(tier.priceMonthly * 12);
    }
  });
});

describe("usage and affiliate pricing", () => {
  it("uses transparent API metering defaults", () => {
    expect(API_PRICING.perMillionRequests).toBe(10);
    expect(API_PRICING.minimumMonthlyCharge).toBe(0);
  });

  it("keeps the affiliate commission within a valid percentage range", () => {
    expect(AFFILIATE_COMMISSION.percentage).toBeGreaterThan(0);
    expect(AFFILIATE_COMMISSION.percentage).toBeLessThanOrEqual(100);
    expect(AFFILIATE_COMMISSION.payoutMinimum).toBeGreaterThan(0);
    expect(AFFILIATE_COMMISSION.payoutFrequency).toBe("monthly");
  });
});
