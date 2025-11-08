import { useEffect, useState } from 'react';

export default function Analytics() {
  const [metrics, setMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    networkLatency: 12,
    requestsPerSecond: 1250,
    errorRate: 0.02,
    uptime: 99.97,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpuUsage: Math.max(20, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(40, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        networkLatency: Math.max(5, Math.min(50, prev.networkLatency + (Math.random() - 0.5) * 3)),
        requestsPerSecond: Math.max(800, Math.min(2000, prev.requestsPerSecond + (Math.random() - 0.5) * 200)),
        errorRate: Math.max(0, Math.min(0.1, prev.errorRate + (Math.random() - 0.5) * 0.01)),
        uptime: 99.97,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ label, value, unit, color }: any) => (
    <div
      className="rounded-lg p-6 border"
      style={{
        backgroundColor: 'rgba(26, 26, 46, 0.6)',
        borderColor: '#2a2a3e',
      }}
    >
      <div className="text-sm" style={{ color: '#a8a8a8' }}>
        {label}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <div className="text-3xl font-light" style={{ color }}>
          {typeof value === 'number' ? value.toFixed(1) : value}
        </div>
        <div className="text-sm" style={{ color: '#a8a8a8' }}>
          {unit}
        </div>
      </div>
      <div className="mt-4 h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#2a2a3e' }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${Math.min(100, value)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light" style={{ color: '#e8e8e8' }}>
            Analytics Dashboard
          </h1>
          <p className="text-sm mt-2" style={{ color: '#a8a8a8' }}>
            Real-time system performance metrics and analytics
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            label="CPU Usage"
            value={metrics.cpuUsage}
            unit="%"
            color="#0a7ea4"
          />
          <MetricCard
            label="Memory Usage"
            value={metrics.memoryUsage}
            unit="%"
            color="#0a7ea4"
          />
          <MetricCard
            label="Network Latency"
            value={metrics.networkLatency}
            unit="ms"
            color="#0a7ea4"
          />
          <MetricCard
            label="Requests/Second"
            value={metrics.requestsPerSecond}
            unit="req/s"
            color="#2ecc71"
          />
          <MetricCard
            label="Error Rate"
            value={(metrics.errorRate * 100).toFixed(2)}
            unit="%"
            color={metrics.errorRate > 0.05 ? '#d32f2f' : '#2ecc71'}
          />
          <MetricCard
            label="System Uptime"
            value={metrics.uptime}
            unit="%"
            color="#2ecc71"
          />
        </div>

        {/* Performance Timeline */}
        <div
          className="rounded-lg p-6 border"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-lg font-semibold mb-6" style={{ color: '#e8e8e8' }}>
            Performance Timeline (Last 24 Hours)
          </h2>

          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-20 text-sm" style={{ color: '#a8a8a8' }}>
                  {`${i * 4}:00`}
                </div>
                <div className="flex-1 h-8 rounded" style={{ backgroundColor: '#2a2a3e' }}>
                  <div
                    className="h-full rounded transition-all duration-300"
                    style={{
                      width: `${30 + Math.random() * 60}%`,
                      backgroundColor: '#0a7ea4',
                    }}
                  />
                </div>
                <div className="w-16 text-right text-sm" style={{ color: '#a8a8a8' }}>
                  {(30 + Math.random() * 60).toFixed(0)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Endpoints */}
        <div
          className="rounded-lg p-6 border mt-8"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-lg font-semibold mb-6" style={{ color: '#e8e8e8' }}>
            Top API Endpoints
          </h2>

          <div className="space-y-3">
            {[
              { endpoint: '/api/metrics', requests: 45230, avgTime: 12 },
              { endpoint: '/api/users', requests: 32150, avgTime: 8 },
              { endpoint: '/api/analytics', requests: 28900, avgTime: 15 },
              { endpoint: '/api/logs', requests: 19800, avgTime: 22 },
              { endpoint: '/api/config', requests: 12450, avgTime: 5 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded" style={{ backgroundColor: '#1a1a2e' }}>
                <div>
                  <div style={{ color: '#e8e8e8' }}>{item.endpoint}</div>
                  <div className="text-xs mt-1" style={{ color: '#a8a8a8' }}>
                    {item.requests.toLocaleString()} requests
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ color: '#0a7ea4' }}>{item.avgTime}ms</div>
                  <div className="text-xs mt-1" style={{ color: '#a8a8a8' }}>
                    avg response
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
