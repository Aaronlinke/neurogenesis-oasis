import { useState, useEffect } from 'react';

export default function Revenue() {
  const [revenueData] = useState({
    totalMRR: 15847.50,
    totalARR: 190170,
    monthlyGrowth: 12.5,
    activeSubscriptions: 47,
    apiRevenue: 2340.75,
    affiliateRevenue: 1250.45,
  });

  const [chartData] = useState([
    { month: 'Aug', subscriptions: 8500, api: 450, affiliate: 200 },
    { month: 'Sep', subscriptions: 9200, api: 620, affiliate: 350 },
    { month: 'Oct', subscriptions: 11500, api: 1200, affiliate: 650 },
    { month: 'Nov', subscriptions: 13847.50, api: 2340.75, affiliate: 1250.45 },
  ]);

  const [revenueBreakdown] = useState([
    { source: 'Subscriptions', amount: 13847.50, percentage: 87.3, color: '#0a7ea4' },
    { source: 'API Usage', amount: 1500.00, percentage: 9.5, color: '#2ecc71' },
    { source: 'Affiliate Commission', amount: 500.00, percentage: 3.2, color: '#ff9800' },
  ]);

  const [topPlans] = useState([
    { tier: 'Enterprise', count: 8, mrr: 3992, percentage: 25.2 },
    { tier: 'Professional', count: 23, mrr: 2277, percentage: 14.4 },
    { tier: 'Starter', count: 16, mrr: 464, percentage: 2.9 },
  ]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2" style={{ color: '#e8e8e8' }}>
            Revenue Dashboard
          </h1>
          <p className="text-sm" style={{ color: '#a8a8a8' }}>
            Track your autonomous income streams in real-time
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className="rounded-lg p-8 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <div className="text-sm" style={{ color: '#a8a8a8' }}>
              Monthly Recurring Revenue
            </div>
            <div className="text-4xl font-light mt-3" style={{ color: '#0a7ea4' }}>
              ${revenueData.totalMRR.toFixed(2)}
            </div>
            <div className="text-sm mt-2" style={{ color: '#2ecc71' }}>
              ↑ {revenueData.monthlyGrowth}% from last month
            </div>
          </div>

          <div
            className="rounded-lg p-8 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <div className="text-sm" style={{ color: '#a8a8a8' }}>
              Annual Recurring Revenue
            </div>
            <div className="text-4xl font-light mt-3" style={{ color: '#0a7ea4' }}>
              ${revenueData.totalARR.toFixed(0)}
            </div>
            <div className="text-sm mt-2" style={{ color: '#a8a8a8' }}>
              {revenueData.activeSubscriptions} active subscriptions
            </div>
          </div>

          <div
            className="rounded-lg p-8 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <div className="text-sm" style={{ color: '#a8a8a8' }}>
              Additional Revenue
            </div>
            <div className="text-2xl font-light mt-3" style={{ color: '#2ecc71' }}>
              ${(revenueData.apiRevenue + revenueData.affiliateRevenue).toFixed(2)}
            </div>
            <div className="text-xs mt-2 space-y-1" style={{ color: '#a8a8a8' }}>
              <div>API: ${revenueData.apiRevenue.toFixed(2)}</div>
              <div>Affiliate: ${revenueData.affiliateRevenue.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <div
            className="rounded-lg p-8 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#e8e8e8' }}>
              Revenue Breakdown
            </h2>

            <div className="space-y-4">
              {revenueBreakdown.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: '#e8e8e8' }}>{item.source}</span>
                    <span style={{ color: item.color }}>
                      ${item.amount.toFixed(2)} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#2a2a3e' }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Plans */}
          <div
            className="rounded-lg p-8 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#e8e8e8' }}>
              Top Subscription Plans
            </h2>

            <div className="space-y-4">
              {topPlans.map((plan, i) => (
                <div key={i} className="p-4 rounded" style={{ backgroundColor: 'rgba(10, 126, 164, 0.05)' }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div style={{ color: '#e8e8e8' }} className="font-semibold">
                        {plan.tier}
                      </div>
                      <div style={{ color: '#a8a8a8' }} className="text-sm">
                        {plan.count} customers
                      </div>
                    </div>
                    <div className="text-right">
                      <div style={{ color: '#0a7ea4' }} className="font-semibold">
                        ${plan.mrr.toFixed(0)}/mo
                      </div>
                      <div style={{ color: '#a8a8a8' }} className="text-sm">
                        {plan.percentage}% of MRR
                      </div>
                    </div>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#2a2a3e' }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${plan.percentage * 3}%`,
                        backgroundColor: '#0a7ea4',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div
          className="rounded-lg p-8 border"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-lg font-semibold mb-6" style={{ color: '#e8e8e8' }}>
            Revenue Trend (Last 4 Months)
          </h2>

          <div className="space-y-6">
            {chartData.map((data, i) => {
              const total = data.subscriptions + data.api + data.affiliate;
              const maxTotal = Math.max(...chartData.map(d => d.subscriptions + d.api + d.affiliate));

              return (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span style={{ color: '#e8e8e8' }}>{data.month}</span>
                    <span style={{ color: '#0a7ea4' }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-8 rounded flex overflow-hidden" style={{ backgroundColor: '#2a2a3e' }}>
                    <div
                      className="transition-all"
                      style={{
                        width: `${(data.subscriptions / maxTotal) * 100}%`,
                        backgroundColor: '#0a7ea4',
                      }}
                      title={`Subscriptions: $${data.subscriptions.toFixed(2)}`}
                    />
                    <div
                      className="transition-all"
                      style={{
                        width: `${(data.api / maxTotal) * 100}%`,
                        backgroundColor: '#2ecc71',
                      }}
                      title={`API: $${data.api.toFixed(2)}`}
                    />
                    <div
                      className="transition-all"
                      style={{
                        width: `${(data.affiliate / maxTotal) * 100}%`,
                        backgroundColor: '#ff9800',
                      }}
                      title={`Affiliate: $${data.affiliate.toFixed(2)}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#0a7ea4' }} />
              <span style={{ color: '#a8a8a8' }}>Subscriptions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#2ecc71' }} />
              <span style={{ color: '#a8a8a8' }}>API Usage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ff9800' }} />
              <span style={{ color: '#a8a8a8' }}>Affiliate</span>
            </div>
          </div>
        </div>

        {/* Projections */}
        <div
          className="rounded-lg p-8 border mt-8"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-lg font-semibold mb-6" style={{ color: '#e8e8e8' }}>
            Revenue Projections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { period: '3 Months', mrr: 18500, growth: '+16.8%' },
              { period: '6 Months', mrr: 22000, growth: '+38.9%' },
              { period: '12 Months', mrr: 28500, growth: '+80.0%' },
            ].map((proj, i) => (
              <div
                key={i}
                className="p-6 rounded border"
                style={{
                  backgroundColor: 'rgba(10, 126, 164, 0.05)',
                  borderColor: '#2a2a3e',
                }}
              >
                <div style={{ color: '#a8a8a8' }}>{proj.period}</div>
                <div className="text-2xl font-light mt-2" style={{ color: '#0a7ea4' }}>
                  ${proj.mrr.toFixed(0)}
                </div>
                <div className="text-sm mt-2" style={{ color: '#2ecc71' }}>
                  {proj.growth}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
