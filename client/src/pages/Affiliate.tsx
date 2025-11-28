import { useState } from 'react';

interface Referral {
  id: string;
  email: string;
  name: string;
  status: 'pending' | 'active' | 'churned';
  signupDate: string;
  mrr: number;
  commission: number;
  tier: string;
}

export default function Affiliate() {
  const [referralCode] = useState('REF-USER-12345');
  const [referralLink] = useState('https://neurogenesis-oasis.com?ref=REF-USER-12345');
  const [copiedLink, setCopiedLink] = useState(false);

  const [referrals] = useState<Referral[]>([
    {
      id: '1',
      email: 'john@company.com',
      name: 'John Smith',
      status: 'active',
      signupDate: '2025-10-15',
      mrr: 99,
      commission: 19.80,
      tier: 'PRO',
    },
    {
      id: '2',
      email: 'jane@startup.io',
      name: 'Jane Doe',
      status: 'active',
      signupDate: '2025-10-22',
      mrr: 29,
      commission: 5.80,
      tier: 'STARTER',
    },
    {
      id: '3',
      email: 'bob@enterprise.com',
      name: 'Bob Johnson',
      status: 'active',
      signupDate: '2025-09-10',
      mrr: 499,
      commission: 99.80,
      tier: 'ENTERPRISE',
    },
  ]);

  const stats = {
    totalReferrals: referrals.length,
    activeReferrals: referrals.filter(r => r.status === 'active').length,
    monthlyCommission: referrals.reduce((sum, r) => sum + r.commission, 0),
    totalEarned: 1250.45,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2" style={{ color: '#e8e8e8' }}>
            Affiliate Program
          </h1>
          <p className="text-sm" style={{ color: '#a8a8a8' }}>
            Earn 20% commission on every referral you bring
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <div className="text-sm" style={{ color: '#a8a8a8' }}>
              Total Referrals
            </div>
            <div className="text-3xl font-light mt-3" style={{ color: '#0a7ea4' }}>
              {stats.totalReferrals}
            </div>
          </div>

          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <div className="text-sm" style={{ color: '#a8a8a8' }}>
              Active Referrals
            </div>
            <div className="text-3xl font-light mt-3" style={{ color: '#2ecc71' }}>
              {stats.activeReferrals}
            </div>
          </div>

          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <div className="text-sm" style={{ color: '#a8a8a8' }}>
              Monthly Commission
            </div>
            <div className="text-3xl font-light mt-3" style={{ color: '#0a7ea4' }}>
              ${stats.monthlyCommission.toFixed(2)}
            </div>
          </div>

          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <div className="text-sm" style={{ color: '#a8a8a8' }}>
              Total Earned
            </div>
            <div className="text-3xl font-light mt-3" style={{ color: '#2ecc71' }}>
              ${stats.totalEarned.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div
          className="rounded-lg p-8 border mb-8"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#e8e8e8' }}>
            Your Referral Link
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm" style={{ color: '#a8a8a8' }}>
                Referral Code
              </label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="flex-1 px-4 py-2 rounded border"
                  style={{
                    backgroundColor: 'rgba(26, 26, 46, 0.6)',
                    borderColor: '#2a2a3e',
                    color: '#0a7ea4',
                  }}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                  }}
                  className="px-4 py-2 rounded font-medium transition-all border"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#0a7ea4',
                    color: '#0a7ea4',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm" style={{ color: '#a8a8a8' }}>
                Full Referral Link
              </label>
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-2 rounded border text-sm"
                  style={{
                    backgroundColor: 'rgba(26, 26, 46, 0.6)',
                    borderColor: '#2a2a3e',
                    color: '#0a7ea4',
                  }}
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded font-medium transition-all border"
                  style={{
                    backgroundColor: copiedLink ? 'rgba(46, 204, 113, 0.1)' : 'transparent',
                    borderColor: copiedLink ? '#2ecc71' : '#0a7ea4',
                    color: copiedLink ? '#2ecc71' : '#0a7ea4',
                  }}
                  onMouseEnter={(e) => {
                    if (!copiedLink) {
                      e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!copiedLink) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {copiedLink ? '✓ Copied' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Commission Structure */}
        <div
          className="rounded-lg p-8 border mb-8"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#e8e8e8' }}>
            Commission Structure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tier: 'Starter', price: '$29/mo', commission: '$5.80/mo' },
              { tier: 'Professional', price: '$99/mo', commission: '$19.80/mo' },
              { tier: 'Enterprise', price: '$499/mo', commission: '$99.80/mo' },
            ].map((item) => (
              <div
                key={item.tier}
                className="p-4 rounded border"
                style={{
                  backgroundColor: 'rgba(10, 126, 164, 0.05)',
                  borderColor: '#2a2a3e',
                }}
              >
                <div style={{ color: '#e8e8e8' }} className="font-semibold">
                  {item.tier}
                </div>
                <div style={{ color: '#0a7ea4' }} className="text-sm mt-2">
                  {item.price}
                </div>
                <div style={{ color: '#2ecc71' }} className="text-sm font-semibold mt-2">
                  {item.commission}
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: '#a8a8a8' }} className="text-sm mt-4">
            You earn 20% of the monthly subscription price for each active referral.
          </p>
        </div>

        {/* Referrals Table */}
        <div
          className="rounded-lg border overflow-hidden"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2a3e' }}>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Referral
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Signup Date
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Plan
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    MRR
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Commission
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral, i) => (
                  <tr key={referral.id} style={{ borderBottom: '1px solid #2a2a3e' }}>
                    <td className="px-6 py-4">
                      <div style={{ color: '#e8e8e8' }}>{referral.name}</div>
                      <div className="text-xs mt-1" style={{ color: '#a8a8a8' }}>
                        {referral.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#a8a8a8' }}>
                      {referral.signupDate}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#0a7ea4' }}>
                      {referral.tier}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#e8e8e8' }}>
                      ${referral.mrr}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#2ecc71' }}>
                      ${referral.commission.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: referral.status === 'active' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(168, 168, 168, 0.1)',
                          color: referral.status === 'active' ? '#2ecc71' : '#a8a8a8',
                        }}
                      >
                        {referral.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Marketing Materials */}
        <div
          className="rounded-lg p-8 border mt-8"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#e8e8e8' }}>
            Marketing Materials
          </h2>

          <p style={{ color: '#a8a8a8' }} className="mb-4">
            Download these materials to promote your referral link:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Email Template', 'Social Media Graphics', 'Landing Page HTML'].map((item) => (
              <button
                key={item}
                className="p-4 rounded border transition-all text-left"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#0a7ea4',
                  color: '#0a7ea4',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div className="font-semibold">{item}</div>
                <div className="text-xs mt-1" style={{ color: '#a8a8a8' }}>
                  Download
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
