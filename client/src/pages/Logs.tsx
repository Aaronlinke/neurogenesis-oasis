import { useState } from 'react';

export default function Logs() {
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    { id: 1, timestamp: '2025-11-08 08:55:23', level: 'info', service: 'API Gateway', message: 'Request processed successfully', duration: '12ms' },
    { id: 2, timestamp: '2025-11-08 08:55:18', level: 'info', service: 'Database', message: 'Query executed', duration: '8ms' },
    { id: 3, timestamp: '2025-11-08 08:55:12', level: 'warning', service: 'Cache', message: 'Cache hit ratio below threshold', duration: '-' },
    { id: 4, timestamp: '2025-11-08 08:55:05', level: 'info', service: 'Auth Service', message: 'User authentication successful', duration: '5ms' },
    { id: 5, timestamp: '2025-11-08 08:54:58', level: 'error', service: 'Email Service', message: 'Failed to send notification email', duration: '-' },
    { id: 6, timestamp: '2025-11-08 08:54:51', level: 'info', service: 'Storage', message: 'File uploaded successfully', duration: '145ms' },
    { id: 7, timestamp: '2025-11-08 08:54:44', level: 'info', service: 'API Gateway', message: 'Request queued', duration: '2ms' },
    { id: 8, timestamp: '2025-11-08 08:54:37', level: 'warning', service: 'Memory', message: 'Memory usage above 70%', duration: '-' },
    { id: 9, timestamp: '2025-11-08 08:54:30', level: 'info', service: 'Database', message: 'Connection pool refreshed', duration: '23ms' },
    { id: 10, timestamp: '2025-11-08 08:54:23', level: 'info', service: 'Scheduler', message: 'Cron job executed', duration: '1250ms' },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return '#d32f2f';
      case 'warning':
        return '#ff9800';
      case 'info':
        return '#0a7ea4';
      default:
        return '#a8a8a8';
    }
  };

  const getLevelBgColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'rgba(211, 47, 47, 0.1)';
      case 'warning':
        return 'rgba(255, 152, 0, 0.1)';
      case 'info':
        return 'rgba(10, 126, 164, 0.1)';
      default:
        return 'rgba(168, 168, 168, 0.1)';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light" style={{ color: '#e8e8e8' }}>
            System Logs
          </h1>
          <p className="text-sm mt-2" style={{ color: '#a8a8a8' }}>
            Real-time system activity and audit trail
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3 flex-wrap">
            {['all', 'info', 'warning', 'error'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className="px-4 py-2 rounded text-sm font-medium transition-all border capitalize"
                style={{
                  backgroundColor: filterLevel === level ? getLevelBgColor(level) : 'transparent',
                  borderColor: filterLevel === level ? getLevelColor(level) : '#2a2a3e',
                  color: filterLevel === level ? getLevelColor(level) : '#a8a8a8',
                }}
                onMouseEnter={(e) => {
                  if (filterLevel !== level) {
                    e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filterLevel !== level) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded border"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
              color: '#e8e8e8',
            }}
          />
        </div>

        {/* Logs Table */}
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
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Level
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Service
                  </th>
                  <th className="px-6 py-4 text-left font-semibold" style={{ color: '#a8a8a8' }}>
                    Message
                  </th>
                  <th className="px-6 py-4 text-right font-semibold" style={{ color: '#a8a8a8' }}>
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr
                    key={log.id}
                    style={{
                      borderBottom: index < filteredLogs.length - 1 ? '1px solid #2a2a3e' : 'none',
                      backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                    }}
                  >
                    <td className="px-6 py-4" style={{ color: '#a8a8a8' }}>
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: getLevelBgColor(log.level),
                          color: getLevelColor(log.level),
                        }}
                      >
                        {log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4" style={{ color: '#0a7ea4' }}>
                      {log.service}
                    </td>
                    <td className="px-6 py-4" style={{ color: '#e8e8e8' }}>
                      {log.message}
                    </td>
                    <td className="px-6 py-4 text-right" style={{ color: '#a8a8a8' }}>
                      {log.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Log Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          {[
            { label: 'Total Logs', value: logs.length, color: '#0a7ea4' },
            { label: 'Info', value: logs.filter(l => l.level === 'info').length, color: '#0a7ea4' },
            { label: 'Warnings', value: logs.filter(l => l.level === 'warning').length, color: '#ff9800' },
            { label: 'Errors', value: logs.filter(l => l.level === 'error').length, color: '#d32f2f' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: 'rgba(26, 26, 46, 0.6)',
                borderColor: '#2a2a3e',
              }}
            >
              <div className="text-sm" style={{ color: '#a8a8a8' }}>
                {stat.label}
              </div>
              <div className="text-3xl font-light mt-3" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
