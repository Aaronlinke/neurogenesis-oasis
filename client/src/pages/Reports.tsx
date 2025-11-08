import { useState } from 'react';

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    {
      id: 'daily',
      title: 'Daily Performance Report',
      date: 'Nov 08, 2025',
      status: 'Generated',
      metrics: {
        avgCPU: 48.5,
        avgMemory: 61.2,
        totalRequests: 2145000,
        avgResponseTime: 14.3,
        errorCount: 42,
      },
    },
    {
      id: 'weekly',
      title: 'Weekly System Analysis',
      date: 'Week of Nov 01-07, 2025',
      status: 'Generated',
      metrics: {
        avgCPU: 52.1,
        avgMemory: 64.8,
        totalRequests: 15230000,
        avgResponseTime: 15.1,
        errorCount: 287,
      },
    },
    {
      id: 'monthly',
      title: 'Monthly Capacity Report',
      date: 'October 2025',
      status: 'Generated',
      metrics: {
        avgCPU: 51.3,
        avgMemory: 63.5,
        totalRequests: 65480000,
        avgResponseTime: 14.8,
        errorCount: 1203,
      },
    },
    {
      id: 'security',
      title: 'Security Audit Report',
      date: 'Nov 08, 2025',
      status: 'Generated',
      metrics: {
        vulnerabilities: 0,
        securityEvents: 12,
        failedLogins: 23,
        successfulLogins: 1847,
        dataBreaches: 0,
      },
    },
  ];

  const ReportCard = ({ report }: any) => (
    <div
      className="rounded-lg p-6 border cursor-pointer transition-all hover:border-opacity-100"
      style={{
        backgroundColor: selectedReport === report.id ? 'rgba(10, 126, 164, 0.1)' : 'rgba(26, 26, 46, 0.6)',
        borderColor: selectedReport === report.id ? '#0a7ea4' : '#2a2a3e',
      }}
      onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold" style={{ color: '#e8e8e8' }}>
            {report.title}
          </h3>
          <p className="text-sm mt-1" style={{ color: '#a8a8a8' }}>
            {report.date}
          </p>
        </div>
        <div
          className="px-3 py-1 rounded text-xs font-medium"
          style={{
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            color: '#2ecc71',
          }}
        >
          {report.status}
        </div>
      </div>

      {selectedReport === report.id && (
        <div className="mt-6 pt-6 border-t" style={{ borderColor: '#2a2a3e' }}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(report.metrics).map(([key, value]: any) => (
              <div key={key}>
                <div className="text-xs" style={{ color: '#a8a8a8' }}>
                  {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </div>
                <div className="text-lg font-semibold mt-1" style={{ color: '#0a7ea4' }}>
                  {typeof value === 'number' ? (value > 1000 ? (value / 1000).toFixed(1) + 'K' : value.toFixed(1)) : value}
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-6 w-full py-2 px-4 rounded text-sm font-medium transition-all border"
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
            Download Report
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light" style={{ color: '#e8e8e8' }}>
            System Reports
          </h1>
          <p className="text-sm mt-2" style={{ color: '#a8a8a8' }}>
            Comprehensive system analysis and performance reports
          </p>
        </div>

        {/* Report Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {['Daily', 'Weekly', 'Monthly', 'Custom'].map((period) => (
            <button
              key={period}
              className="px-4 py-2 rounded text-sm font-medium transition-all border"
              style={{
                backgroundColor: period === 'Daily' ? 'rgba(10, 126, 164, 0.1)' : 'transparent',
                borderColor: period === 'Daily' ? '#0a7ea4' : '#2a2a3e',
                color: period === 'Daily' ? '#0a7ea4' : '#a8a8a8',
              }}
              onMouseEnter={(e) => {
                if (period !== 'Daily') {
                  e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (period !== 'Daily') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>

        {/* Export Section */}
        <div
          className="rounded-lg p-6 border mt-8"
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.6)',
            borderColor: '#2a2a3e',
          }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#e8e8e8' }}>
            Export Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['PDF', 'CSV', 'JSON'].map((format) => (
              <button
                key={format}
                className="py-3 px-4 rounded text-sm font-medium transition-all border"
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
                Export as {format}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
