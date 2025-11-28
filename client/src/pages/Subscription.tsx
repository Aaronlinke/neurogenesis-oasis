import { useState, useEffect } from 'react';

interface SubscriptionData {
  user: {
    id: number;
    email: string;
    name: string;
  };
  subscription: {
    id: string;
    status: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
  } | null;
}

export default function Subscription() {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelConfirm, setCancelConfirm] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
    fetchPaymentHistory();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch('/api/stripe/subscription-status');
      const data = await response.json();
      setSubscriptionData(data);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch('/api/stripe/payment-history');
      const data = await response.json();
      setPaymentHistory(data.invoices || []);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
      });
      const data = await response.json();
      setCancelConfirm(false);
      fetchSubscriptionData();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f1e' }}>
        <div style={{ color: '#a8a8a8' }}>Loading subscription details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-4xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-light mb-8" style={{ color: '#e8e8e8' }}>
          Subscription Management
        </h1>

        {/* Current Subscription */}
        {subscriptionData?.subscription ? (
          <div
            className="rounded-lg p-8 border mb-8"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <h2 className="text-xl font-semibold mb-6" style={{ color: '#e8e8e8' }}>
              Active Subscription
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div>
                <div className="text-sm" style={{ color: '#a8a8a8' }}>
                  Status
                </div>
                <div className="text-lg font-semibold mt-2" style={{ color: '#2ecc71' }}>
                  {subscriptionData.subscription.status.toUpperCase()}
                </div>
              </div>

              <div>
                <div className="text-sm" style={{ color: '#a8a8a8' }}>
                  Subscription ID
                </div>
                <div className="text-sm font-mono mt-2" style={{ color: '#0a7ea4' }}>
                  {subscriptionData.subscription.id.slice(0, 20)}...
                </div>
              </div>

              <div>
                <div className="text-sm" style={{ color: '#a8a8a8' }}>
                  Current Period Start
                </div>
                <div className="text-sm mt-2" style={{ color: '#e8e8e8' }}>
                  {new Date(subscriptionData.subscription.currentPeriodStart).toLocaleDateString()}
                </div>
              </div>

              <div>
                <div className="text-sm" style={{ color: '#a8a8a8' }}>
                  Renews On
                </div>
                <div className="text-sm mt-2" style={{ color: '#e8e8e8' }}>
                  {new Date(subscriptionData.subscription.currentPeriodEnd).toLocaleDateString()}
                </div>
              </div>
            </div>

            {subscriptionData.subscription.cancelAtPeriodEnd && (
              <div
                className="rounded-lg p-4 border mb-6"
                style={{
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                }}
              >
                Your subscription will be cancelled at the end of the current billing period.
              </div>
            )}

            <div className="flex gap-3">
              <a
                href="/pricing"
                className="px-6 py-2 rounded font-medium transition-all border"
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
                Upgrade Plan
              </a>

              {!subscriptionData.subscription.cancelAtPeriodEnd && (
                <button
                  onClick={() => setCancelConfirm(true)}
                  className="px-6 py-2 rounded font-medium transition-all border"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(211, 47, 47, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Cancel Subscription
                </button>
              )}
            </div>
          </div>
        ) : (
          <div
            className="rounded-lg p-8 border mb-8 text-center"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <p style={{ color: '#a8a8a8' }} className="mb-4">
              You don't have an active subscription yet.
            </p>
            <a
              href="/pricing"
              className="inline-block px-6 py-2 rounded font-medium transition-all border"
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
              View Plans
            </a>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {cancelConfirm && (
          <div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 50 }}
          >
            <div
              className="rounded-lg p-8 max-w-md w-full border"
              style={{
                backgroundColor: '#1a1a2e',
                borderColor: '#2a2a3e',
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#e8e8e8' }}>
                Cancel Subscription?
              </h3>
              <p className="mb-6" style={{ color: '#a8a8a8' }}>
                Your subscription will be cancelled at the end of the current billing period. You can reactivate anytime.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancelSubscription}
                  className="flex-1 py-2 px-4 rounded font-medium transition-all border"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(211, 47, 47, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Confirm Cancel
                </button>
                <button
                  onClick={() => setCancelConfirm(false)}
                  className="flex-1 py-2 px-4 rounded font-medium transition-all border"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: '#2a2a3e',
                    color: '#a8a8a8',
                  }}
                >
                  Keep Subscription
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment History */}
        <div
          className="rounded-lg p-8 border"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: '#e8e8e8' }}>
            Payment History
          </h2>

          {paymentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #2a2a3e' }}>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                      Date
                    </th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((invoice, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #2a2a3e' }}>
                      <td className="px-4 py-3" style={{ color: '#e8e8e8' }}>
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3" style={{ color: '#0a7ea4' }}>
                        ${(invoice.amount / 100).toFixed(2)} {invoice.currency}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-3 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: invoice.status === 'paid' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(168, 168, 168, 0.1)',
                            color: invoice.status === 'paid' ? '#2ecc71' : '#a8a8a8',
                          }}
                        >
                          {invoice.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {invoice.pdfUrl && (
                          <a
                            href={invoice.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                            style={{ color: '#0a7ea4' }}
                          >
                            Download
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#a8a8a8' }}>No payment history yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
