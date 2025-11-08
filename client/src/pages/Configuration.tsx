import { useState } from 'react';

export default function Configuration() {
  const [config, setConfig] = useState({
    apiTimeout: 30,
    maxConnections: 1000,
    cacheEnabled: true,
    logLevel: 'info',
    maintenanceMode: false,
    autoBackup: true,
    backupInterval: 24,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const ConfigSection = ({ title, children }: any) => (
    <div
      className="rounded-lg p-6 border mb-6"
      style={{
        backgroundColor: 'rgba(26, 26, 46, 0.6)',
        borderColor: '#2a2a3e',
      }}
    >
      <h2 className="text-lg font-semibold mb-6" style={{ color: '#e8e8e8' }}>
        {title}
      </h2>
      {children}
    </div>
  );

  const ConfigItem = ({ label, description, children }: any) => (
    <div className="mb-6 pb-6 border-b" style={{ borderColor: '#2a2a3e' }}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div style={{ color: '#e8e8e8' }}>{label}</div>
          <div className="text-sm mt-1" style={{ color: '#a8a8a8' }}>
            {description}
          </div>
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f1e' }}>
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light" style={{ color: '#e8e8e8' }}>
            System Configuration
          </h1>
          <p className="text-sm mt-2" style={{ color: '#a8a8a8' }}>
            Manage system settings and preferences
          </p>
        </div>

        {saved && (
          <div
            className="rounded-lg p-4 mb-6 border"
            style={{
              backgroundColor: 'rgba(46, 204, 113, 0.1)',
              borderColor: '#2ecc71',
              color: '#2ecc71',
            }}
          >
            Configuration saved successfully
          </div>
        )}

        {/* API Settings */}
        <ConfigSection title="API Settings">
          <ConfigItem
            label="API Timeout"
            description="Maximum time (in seconds) for API requests"
          >
            <input
              type="number"
              value={config.apiTimeout}
              onChange={(e) => setConfig({ ...config, apiTimeout: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded border"
              style={{
                backgroundColor: 'rgba(26, 26, 46, 0.6)',
                borderColor: '#2a2a3e',
                color: '#e8e8e8',
              }}
            />
          </ConfigItem>

          <ConfigItem
            label="Max Connections"
            description="Maximum number of concurrent connections"
          >
            <input
              type="number"
              value={config.maxConnections}
              onChange={(e) => setConfig({ ...config, maxConnections: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded border"
              style={{
                backgroundColor: 'rgba(26, 26, 46, 0.6)',
                borderColor: '#2a2a3e',
                color: '#e8e8e8',
              }}
            />
          </ConfigItem>

          <ConfigItem
            label="Log Level"
            description="Minimum log level to record"
          >
            <select
              value={config.logLevel}
              onChange={(e) => setConfig({ ...config, logLevel: e.target.value })}
              className="w-full px-4 py-2 rounded border"
              style={{
                backgroundColor: 'rgba(26, 26, 46, 0.6)',
                borderColor: '#2a2a3e',
                color: '#e8e8e8',
              }}
            >
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </ConfigItem>
        </ConfigSection>

        {/* Cache Settings */}
        <ConfigSection title="Cache Settings">
          <ConfigItem
            label="Enable Caching"
            description="Enable or disable system-wide caching"
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.cacheEnabled}
                onChange={(e) => setConfig({ ...config, cacheEnabled: e.target.checked })}
                className="w-5 h-5 rounded"
                style={{ accentColor: '#0a7ea4' }}
              />
              <span style={{ color: '#a8a8a8' }}>
                {config.cacheEnabled ? 'Caching is enabled' : 'Caching is disabled'}
              </span>
            </label>
          </ConfigItem>
        </ConfigSection>

        {/* Backup Settings */}
        <ConfigSection title="Backup Settings">
          <ConfigItem
            label="Auto Backup"
            description="Automatically backup system data"
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.autoBackup}
                onChange={(e) => setConfig({ ...config, autoBackup: e.target.checked })}
                className="w-5 h-5 rounded"
                style={{ accentColor: '#0a7ea4' }}
              />
              <span style={{ color: '#a8a8a8' }}>
                {config.autoBackup ? 'Auto backup is enabled' : 'Auto backup is disabled'}
              </span>
            </label>
          </ConfigItem>

          {config.autoBackup && (
            <ConfigItem
              label="Backup Interval"
              description="Backup frequency in hours"
            >
              <input
                type="number"
                value={config.backupInterval}
                onChange={(e) => setConfig({ ...config, backupInterval: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded border"
                style={{
                  backgroundColor: 'rgba(26, 26, 46, 0.6)',
                  borderColor: '#2a2a3e',
                  color: '#e8e8e8',
                }}
              />
            </ConfigItem>
          )}
        </ConfigSection>

        {/* System Status */}
        <ConfigSection title="System Status">
          <ConfigItem
            label="Maintenance Mode"
            description="Enable maintenance mode to restrict access"
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.maintenanceMode}
                onChange={(e) => setConfig({ ...config, maintenanceMode: e.target.checked })}
                className="w-5 h-5 rounded"
                style={{ accentColor: '#d32f2f' }}
              />
              <span style={{ color: config.maintenanceMode ? '#d32f2f' : '#a8a8a8' }}>
                {config.maintenanceMode ? 'Maintenance mode is ACTIVE' : 'Maintenance mode is inactive'}
              </span>
            </label>
          </ConfigItem>
        </ConfigSection>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded font-medium transition-all border"
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
            Save Configuration
          </button>

          <button
            className="px-6 py-3 rounded font-medium transition-all border"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#2a2a3e',
              color: '#a8a8a8',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
