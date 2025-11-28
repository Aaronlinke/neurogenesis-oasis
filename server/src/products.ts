// Stripe Product and Price Configuration
// These are the subscription tiers for the Advanced Intelligence System

export const SUBSCRIPTION_TIERS = {
  STARTER: {
    name: 'Starter',
    description: 'Perfect for small teams and startups',
    priceMonthly: 29,
    priceYearly: 290,
    features: [
      'Up to 5 users',
      'Real-time monitoring',
      'Basic analytics',
      'Email support',
      '7-day log retention',
      'API access (1,000 requests/day)',
    ],
    limits: {
      users: 5,
      apiRequestsPerDay: 1000,
      logRetentionDays: 7,
      reportFrequency: 'weekly',
    },
  },
  PRO: {
    name: 'Professional',
    description: 'For growing teams and enterprises',
    priceMonthly: 99,
    priceYearly: 990,
    features: [
      'Up to 50 users',
      'Real-time monitoring',
      'Advanced analytics',
      'Priority support',
      '30-day log retention',
      'API access (50,000 requests/day)',
      'Custom dashboards',
      'Automated reports',
      'Webhooks',
    ],
    limits: {
      users: 50,
      apiRequestsPerDay: 50000,
      logRetentionDays: 30,
      reportFrequency: 'daily',
    },
  },
  ENTERPRISE: {
    name: 'Enterprise',
    description: 'For large-scale operations',
    priceMonthly: 499,
    priceYearly: 4990,
    features: [
      'Unlimited users',
      'Real-time monitoring',
      'Advanced analytics',
      '24/7 dedicated support',
      '90-day log retention',
      'Unlimited API access',
      'Custom dashboards',
      'Automated reports',
      'Webhooks',
      'White-label options',
      'Custom integrations',
      'SLA guarantee (99.9%)',
    ],
    limits: {
      users: Infinity,
      apiRequestsPerDay: Infinity,
      logRetentionDays: 90,
      reportFrequency: 'real-time',
    },
  },
};

export const API_PRICING = {
  perMillionRequests: 10, // $10 per million API requests
  minimumMonthlyCharge: 0,
};

export const AFFILIATE_COMMISSION = {
  percentage: 20, // 20% commission on referred subscriptions
  payoutMinimum: 50, // Minimum $50 before payout
  payoutFrequency: 'monthly',
};

export const DATA_MONETIZATION = {
  anonymousInsightsPrice: 99, // $99 per month for anonymous aggregated insights
  customReportPrice: 499, // $499 for custom data reports
};

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;
