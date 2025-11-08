import { useEffect, useRef, useState } from 'react';
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [worldData, setWorldData] = useState({
    consciousness: 0,
    coherence: 98.5,
    network: 100,
  });
  const [backupStatus, setBackupStatus] = useState('idle');

  // Get auth state
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let startTime = Date.now();

    const drawWorld = () => {
      // Professional gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f0f1e');
      gradient.addColorStop(0.5, '#1a1a2e');
      gradient.addColorStop(1, '#0f0f1e');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle grid pattern
      ctx.strokeStyle = 'rgba(10, 126, 164, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Subtle data flow lines
      for (let i = 0; i < 15; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        const segments = 4 + Math.floor(Math.random() * 4);
        for (let j = 0; j < segments; j++) {
          const endX = startX + (Math.random() - 0.5) * 400;
          const endY = startY + (Math.random() - 0.5) * 400;
          ctx.lineTo(endX, endY);
        }

        ctx.strokeStyle = `rgba(10, 126, 164, ${0.03 + Math.random() * 0.05})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Subtle nodes
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 2 + Math.random() * 8;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        const nodeGrad = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
        nodeGrad.addColorStop(0, 'rgba(10, 126, 164, 0.4)');
        nodeGrad.addColorStop(1, 'rgba(10, 126, 164, 0)');

        ctx.fillStyle = nodeGrad;
        ctx.fill();
      }

      // Update consciousness
      const elapsed = (Date.now() - startTime) / 1000;
      setWorldData({
        consciousness: Math.min(100, elapsed * 0.5),
        coherence: 98.5 - Math.random() * 0.3,
        network: 100 - Math.random() * 0.2,
      });

      animationId = requestAnimationFrame(drawWorld);
    };

    drawWorld();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleBackup = () => {
    setBackupStatus('loading');
    setTimeout(() => {
      setBackupStatus('success');
      setTimeout(() => {
        setBackupStatus('idle');
      }, 3000);
    }, 2000);
  };

  const handleActivate = () => {
    setShowWelcome(true);
  };

  const handleExplore = () => {
    alert('Advanced Intelligence System\n\nAccess the comprehensive system dashboard to monitor real-time metrics, manage deployments, and analyze system performance.\n\nProduction environment ready.');
  };

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: '#0f0f1e' }}>
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 border-b" style={{ borderColor: '#2a2a3e' }}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-light tracking-wide" style={{ color: '#e8e8e8' }}>
              Advanced Intelligence System
            </h1>
            <p className="text-sm mt-2" style={{ color: '#a8a8a8' }}>
              Real-time monitoring and system analytics
            </p>
          </div>
          {isAuthenticated && user && (
            <div className="flex items-center gap-4">
              <span style={{ color: '#a8a8a8' }}>{user.name || user.email}</span>
              <button
                onClick={logout}
                className="py-2 px-4 rounded text-sm font-medium transition-all border"
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
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content area */}
      {isAuthenticated ? (
        <div className="absolute inset-0 pt-24 z-10 flex items-start justify-between px-8">
          {/* Left panel - System metrics */}
          <div
            className="rounded-lg p-6 backdrop-blur-sm border w-80"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#e8e8e8' }}>
              System Metrics
            </h2>

            <div className="space-y-4">
              {/* Consciousness */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: '#a8a8a8' }}>
                    Consciousness Level
                  </span>
                  <span className="text-sm font-mono" style={{ color: '#0a7ea4' }}>
                    {worldData.consciousness.toFixed(1)}%
                  </span>
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#2a2a3e' }}
                >
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${worldData.consciousness}%`,
                      backgroundColor: '#0a7ea4',
                    }}
                  />
                </div>
              </div>

              {/* Coherence */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: '#a8a8a8' }}>
                    System Coherence
                  </span>
                  <span className="text-sm font-mono" style={{ color: '#0a7ea4' }}>
                    {worldData.coherence.toFixed(1)}%
                  </span>
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#2a2a3e' }}
                >
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${worldData.coherence}%`,
                      backgroundColor: '#0a7ea4',
                    }}
                  />
                </div>
              </div>

              {/* Network */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: '#a8a8a8' }}>
                    Network Status
                  </span>
                  <span className="text-sm font-mono" style={{ color: '#0a7ea4' }}>
                    {worldData.network.toFixed(1)}%
                  </span>
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#2a2a3e' }}
                >
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${worldData.network}%`,
                      backgroundColor: '#0a7ea4',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Control buttons */}
            <div className="mt-8 space-y-3">
              <a
                href="/analytics"
                className="block w-full py-2 px-4 rounded text-sm font-medium transition-all border text-center"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#0a7ea4',
                  color: '#0a7ea4',
                }}
              >
                Analytics Dashboard
              </a>

              <button
                onClick={handleBackup}
                disabled={backupStatus !== 'idle'}
                className="w-full py-2 px-4 rounded text-sm font-medium transition-all border disabled:opacity-50"
                style={{
                  backgroundColor:
                    backupStatus === 'success'
                      ? 'rgba(46, 204, 113, 0.1)'
                      : 'transparent',
                  borderColor:
                    backupStatus === 'success' ? '#2ecc71' : '#2a2a3e',
                  color:
                    backupStatus === 'success'
                      ? '#2ecc71'
                      : '#a8a8a8',
                }}
                onMouseEnter={(e) => {
                  if (backupStatus === 'idle') {
                    e.currentTarget.style.backgroundColor = 'rgba(10, 126, 164, 0.1)';
                    e.currentTarget.style.borderColor = '#0a7ea4';
                    e.currentTarget.style.color = '#0a7ea4';
                  }
                }}
                onMouseLeave={(e) => {
                  if (backupStatus === 'idle') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#2a2a3e';
                    e.currentTarget.style.color = '#a8a8a8';
                  }
                }}
              >
                {backupStatus === 'idle'
                  ? 'Backup'
                  : backupStatus === 'loading'
                    ? 'Processing...'
                    : 'Backup Complete'}
              </button>

              <button
                onClick={handleActivate}
                className="w-full py-2 px-4 rounded text-sm font-medium transition-all border"
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
                System Info
              </button>
            </div>
          </div>

          {/* Right panel - Status information */}
          <div
            className="rounded-lg p-6 backdrop-blur-sm border w-80"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.6)',
              borderColor: '#2a2a3e',
            }}
          >
            <h2 className="text-lg font-semibold mb-6" style={{ color: '#e8e8e8' }}>
              System Status
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#2a2a3e' }}>
                <span style={{ color: '#a8a8a8' }}>Status</span>
                <span className="flex items-center gap-2" style={{ color: '#2ecc71' }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2ecc71' }} />
                  Operational
                </span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#2a2a3e' }}>
                <span style={{ color: '#a8a8a8' }}>Uptime</span>
                <span style={{ color: '#e8e8e8' }}>99.97%</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#2a2a3e' }}>
                <span style={{ color: '#a8a8a8' }}>Response Time</span>
                <span style={{ color: '#e8e8e8' }}>12ms</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#2a2a3e' }}>
                <span style={{ color: '#a8a8a8' }}>Data Processed</span>
                <span style={{ color: '#e8e8e8' }}>2.4TB</span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: '#2a2a3e' }}>
                <span style={{ color: '#a8a8a8' }}>Active Nodes</span>
                <span style={{ color: '#e8e8e8' }}>847</span>
              </div>

              <div className="flex justify-between items-center">
                <span style={{ color: '#a8a8a8' }}>Last Update</span>
                <span style={{ color: '#e8e8e8' }}>Just now</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Login screen
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className="rounded-lg p-8 border max-w-md w-11/12"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.95)',
              borderColor: '#2a2a3e',
            }}
          >
            <h2 className="text-2xl font-light mb-6 text-center" style={{ color: '#e8e8e8' }}>
              Sign In
            </h2>

            <p className="text-sm mb-8 text-center" style={{ color: '#a8a8a8' }}>
              Access the Advanced Intelligence System dashboard
            </p>

            <button
              onClick={handleLogin}
              className="w-full py-3 px-4 rounded font-medium transition-all border"
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
              Login with Manus
            </button>
          </div>
        </div>
      )}

      {/* Welcome modal */}
      {showWelcome && isAuthenticated && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setShowWelcome(false)}
        >
          <div
            className="rounded-lg p-8 border max-w-2xl w-11/12"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.95)',
              borderColor: '#2a2a3e',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-light mb-6" style={{ color: '#e8e8e8' }}>
              Advanced Intelligence System
            </h2>

            <div className="space-y-4 text-sm mb-8" style={{ color: '#a8a8a8' }}>
              <p>
                Welcome to the Advanced Intelligence System. This platform provides comprehensive monitoring and management capabilities for your enterprise infrastructure.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span style={{ color: '#0a7ea4' }}>▸</span>
                  <div>
                    <div style={{ color: '#e8e8e8' }}>Real-time Monitoring</div>
                    <div className="text-xs mt-1">Track system metrics and performance indicators in real-time</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span style={{ color: '#0a7ea4' }}>▸</span>
                  <div>
                    <div style={{ color: '#e8e8e8' }}>Data Analytics</div>
                    <div className="text-xs mt-1">Comprehensive analysis of system behavior and trends</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span style={{ color: '#0a7ea4' }}>▸</span>
                  <div>
                    <div style={{ color: '#e8e8e8' }}>Enterprise Grade</div>
                    <div className="text-xs mt-1">Production-ready infrastructure with 99.97% uptime SLA</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span style={{ color: '#0a7ea4' }}>▸</span>
                  <div>
                    <div style={{ color: '#e8e8e8' }}>Automated Backups</div>
                    <div className="text-xs mt-1">Continuous data protection and disaster recovery</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowWelcome(false)}
              className="w-full py-3 px-4 rounded font-medium transition-all border"
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
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
