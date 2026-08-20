import { useState } from 'react';
import { SUBSCRIPTION_TIERS } from '@shared/products';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleCheckout = async (tier: string) => {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, billingCycle }),
      });

      const data = await response.json();
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const tiers = [
    {
      id: 'STARTER',
      name: 'Starter',
      description: 'Perfect for small teams',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Up to 5 users',
        'Real-time monitoring',
        'Basic analytics',
        'Email support',
        '7-day log retention',
        'API access (1K req/day)',
      ],
    },
    {
      id: 'PRO',
      name: 'Professional',
      description: 'For growing teams',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Up to 50 users',
        'Real-time monitoring',
        'Advanced analytics',
        'Priority support',
        '30-day log retention',
        'API access (50K req/day)',
        'Custom dashboards',
        'Automated reports',
      ],
      highlighted: true,
    },
    {
      id: 'ENTERPRISE',
      name: 'Enterprise',
      description: 'For large-scale operations',
      monthlyPrice: 499,
      yearlyPrice: 4990,
      features: [
        'Unlimited users',
        'Real-time monitoring',
        'Advanced analytics',
        '24/7 support',
        '90-day log retention',
        'Unlimited API access',
        'Custom dashboards',
        'White-label options',
        'SLA guarantee (99.9%)',
      ],
    },
  ];

  const savings = billingCycle === 'yearly' ? 17 : 0; // ~17% savings

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4" style={{ color: '#e8e8e8' }}>
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg mb-8" style={{ color: '#a8a8a8' }}>
            Choose the perfect plan for your organization
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className="px-6 py-2 rounded font-medium transition-all border"
              style={{
                backgroundColor: billingCycle === 'monthly' ? 'rgba(10, 126, 164, 0.1)' : 'transparent',
                borderColor: billingCycle === 'monthly' ? '#0a7ea4' : '#2a2a3e',
                color: billingCycle === 'monthly' ? '#0a7ea4' : '#a8a8a8',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className="px-6 py-2 rounded font-medium transition-all border relative"
              style={{
                backgroundColor: billingCycle === 'yearly' ? 'rgba(10, 126, 164, 0.1)' : 'transparent',
                borderColor: billingCycle === 'yearly' ? '#0a7ea4' : '#2a2a3e',
                color: billingCycle === 'yearly' ? '#0a7ea4' : '#a8a8a8',
              }}
            >
              Yearly
              {billingCycle === 'yearly' && (
                <span
                  className="absolute -top-2 -right-2 px-2 py-1 rounded text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    color: '#2ecc71',
                  }}
                >
                  Save {savings}%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => {
            const price = billingCycle === 'yearly' ? tier.yearlyPrice : tier.monthlyPrice;
            const isSelected = selectedTier === tier.id;

            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(isSelected ? null : tier.id)}
                className="rounded-lg p-8 border transition-all cursor-pointer"
                style={{
                  backgroundColor: tier.highlighted
                    ? 'rgba(10, 126, 164, 0.08)'
                    : isSelected
                    ? 'rgba(10, 126, 164, 0.05)'
                    : 'rgba(26, 26, 46, 0.6)',
                  borderColor: tier.highlighted || isSelected ? '#0a7ea4' : '#2a2a3e',
                  borderWidth: tier.highlighted ? '2px' : '1px',
                }}
              >
                {tier.highlighted && (
                  <div
                    className="mb-4 px-3 py-1 rounded text-xs font-semibold w-fit"
                    style={{
                      backgroundColor: 'rgba(10, 126, 164, 0.2)',
                      color: '#0a7ea4',
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-semibold mb-2" style={{ color: '#e8e8e8' }}>
                  {tier.name}
                </h3>
                <p className="text-sm mb-6" style={{ color: '#a8a8a8' }}>
                  {tier.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-light" style={{ color: '#0a7ea4' }}>
                      ${price}
                    </span>
                    <span style={{ color: '#a8a8a8' }}>
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-xs mt-2" style={{ color: '#2ecc71' }}>
                      ${(price / 12).toFixed(2)}/month billed annually
                    </p>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckout(tier.id);
                  }}
                  className="w-full py-3 px-4 rounded font-medium transition-all border mb-8"
                  style={{
                    backgroundColor: tier.highlighted ? 'rgba(10, 126, 164, 0.1)' : 'transparent',
                    borderColor: '#0a7ea4',
                    color: '#0a7ea4',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = tier.highlighted ? 'rgba(10, 126, 164, 0.1)' : 'transparent';
                  }}
                >
                  Get Started
                </button>

                <div className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          backgroundColor: 'rgba(46, 204, 113, 0.1)',
                          color: '#2ecc71',
                        }}
                      >
                        ✓
                      </div>
                      <span className="text-sm" style={{ color: '#a8a8a8' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-light mb-8 text-center" style={{ color: '#e8e8e8' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express) processed securely through Stripe.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Contact our sales team for a custom trial period. We offer 14-day free trials for qualified businesses.',
              },
              {
                q: 'What happens if I cancel?',
                a: 'Your subscription will remain active until the end of your billing period. You can reactivate anytime.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-lg p-6 border"
                style={{
                  backgroundColor: 'rgba(26, 26, 46, 0.6)',
                  borderColor: '#2a2a3e',
                }}
              >
                <h3 className="font-semibold mb-2" style={{ color: '#e8e8e8' }}>
                  {faq.q}
                </h3>
                <p style={{ color: '#a8a8a8' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
