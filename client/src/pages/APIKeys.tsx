import { useState, useEffect } from 'react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  created: string;
  lastUsed: string | null;
  requestsThisMonth: number;
  status: 'active' | 'revoked';
}

export default function APIKeys() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_51234567890abcdefghijklmnop',
      maskedKey: 'sk_live_****...mnop',
      created: '2025-10-15',
      lastUsed: '2025-11-08 09:23:45',
      requestsThisMonth: 145230,
      status: 'active',
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'sk_test_51234567890abcdefghijklmnop',
      maskedKey: 'sk_test_****...mnop',
      created: '2025-10-01',
      lastUsed: '2025-11-07 14:12:30',
      requestsThisMonth: 8450,
      status: 'active',
    },
  ]);

  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [usageData, setUsageData] = useState({
    totalRequests: 153680,
    totalCost: 15.37,
    requestsRemaining: 1846320,
  });

  const handleCreateKey = () => {
    if (newKeyName.trim()) {
      const newKey: APIKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        maskedKey: `sk_live_****...${Math.random().toString(36).substring(2, 6)}`,
        created: new Date().toISOString().split('T')[0],
        lastUsed: null,
        requestsThisMonth: 0,
        status: 'active',
      };
      setApiKeys([...apiKeys, newKey]);
      setNewKeyName('');
      setShowNewKeyForm(false);
    }
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, status: 'revoked' } : key
    ));
  };

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-light mb-2" style={{ color: '#e8e8e8' }}>
              API Keys
            </h1>
            <p className="text-sm" style={{ color: '#a8a8a8' }}>
              Manage your API keys and monitor usage
            </p>
          </div>
          <button
            onClick={() => setShowNewKeyForm(!showNewKeyForm)}
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
            Create New Key
          </button>
        </div>

        {/* Create New Key Form */}
        {showNewKeyForm && (
          <div
            className="rounded-lg p-6 border mb-8"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#e8e8e8' }}>
              Create New API Key
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Key name (e.g., Production, Development)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 px-4 py-2 rounded border"
                style={{
                  backgroundColor: 'rgba(26, 26, 46, 0.6)',
                  borderColor: '#2a2a3e',
                  color: '#e8e8e8',
                }}
              />
              <button
                onClick={handleCreateKey}
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
                Create
              </button>
              <button
                onClick={() => setShowNewKeyForm(false)}
                className="px-6 py-2 rounded font-medium transition-all border"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#2a2a3e',
                  color: '#a8a8a8',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <div className="text-sm" style={{ color: '#a8a8a8' }}>
              Total Requests (This Month)
            </div>
            <div className="text-3xl font-light mt-3" style={{ color: '#0a7ea4' }}>
              {usageData.totalRequests.toLocaleString()}
            </div>
            <div className="text-xs mt-2" style={{ color: '#a8a8a8' }}>
              Cost: ${usageData.totalCost.toFixed(2)}
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
              Requests Remaining
            </div>
            <div className="text-3xl font-light mt-3" style={{ color: '#2ecc71' }}>
              {usageData.requestsRemaining.toLocaleString()}
            </div>
            <div className="text-xs mt-2" style={{ color: '#a8a8a8' }}>
              At current rate: ~12 days
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
              Active Keys
            </div>
            <div className="text-3xl font-light mt-3" style={{ color: '#0a7ea4' }}>
              {apiKeys.filter(k => k.status === 'active').length}
            </div>
            <div className="text-xs mt-2" style={{ color: '#a8a8a8' }}>
              Total: {apiKeys.length}
            </div>
          </div>
        </div>

        {/* API Keys List */}
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
                    Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Key
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Created
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Last Used
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Requests
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((apiKey, i) => (
                  <tr key={apiKey.id} style={{ borderBottom: '1px solid #2a2a3e' }}>
                    <td className="px-6 py-4" style={{ color: '#e8e8e8' }}>
                      {apiKey.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code
                          className="text-xs font-mono px-2 py-1 rounded"
                          style={{
                            backgroundColor: 'rgba(10, 126, 164, 0.1)',
                            color: '#0a7ea4',
                          }}
                        >
                          {apiKey.maskedKey}
                        </code>
                        <button
                          onClick={() => handleCopyKey(apiKey.key, apiKey.id)}
                          className="text-xs px-2 py-1 rounded transition-all"
                          style={{
                            backgroundColor: copiedId === apiKey.id ? 'rgba(46, 204, 113, 0.1)' : 'transparent',
                            color: copiedId === apiKey.id ? '#2ecc71' : '#0a7ea4',
                          }}
                        >
                          {copiedId === apiKey.id ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#a8a8a8' }}>
                      {apiKey.created}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#a8a8a8' }}>
                      {apiKey.lastUsed || 'Never'}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: '#0a7ea4' }}>
                      {apiKey.requestsThisMonth.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: apiKey.status === 'active' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                          color: apiKey.status === 'active' ? '#2ecc71' : '#d32f2f',
                        }}
                      >
                        {apiKey.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {apiKey.status === 'active' && (
                        <button
                          onClick={() => handleRevokeKey(apiKey.id)}
                          className="text-xs px-3 py-1 rounded transition-all border"
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
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* API Documentation */}
        <div
          className="rounded-lg p-8 border mt-8"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#e8e8e8' }}>
            API Documentation
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#0a7ea4' }}>
                Base URL
              </h3>
              <code
                className="block px-4 py-2 rounded bg-opacity-50"
                style={{
                  backgroundColor: 'rgba(10, 126, 164, 0.1)',
                  color: '#0a7ea4',
                }}
              >
                https://api.neurogenesis-oasis.com/v1
              </code>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#0a7ea4' }}>
                Authentication
              </h3>
              <p style={{ color: '#a8a8a8' }} className="mb-2">
                Include your API key in the Authorization header:
              </p>
              <code
                className="block px-4 py-2 rounded"
                style={{
                  backgroundColor: 'rgba(10, 126, 164, 0.1)',
                  color: '#0a7ea4',
                }}
              >
                Authorization: Bearer your_api_key_here
              </code>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: '#0a7ea4' }}>
                Example Request
              </h3>
              <code
                className="block px-4 py-2 rounded text-xs"
                style={{
                  backgroundColor: 'rgba(10, 126, 164, 0.1)',
                  color: '#0a7ea4',
                }}
              >
                {`curl -H "Authorization: Bearer sk_live_..." \\
  https://api.neurogenesis-oasis.com/v1/analytics`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
