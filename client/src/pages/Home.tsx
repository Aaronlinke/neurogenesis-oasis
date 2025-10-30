import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [worldData, setWorldData] = useState({
    consciousness: 0,
    coherence: 98.5,
    network: 100,
  });
  const [backupStatus, setBackupStatus] = useState('idle');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    let animationId: number;
    let startTime = Date.now();

    const drawWorld = () => {
      // Background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );

      gradient.addColorStop(0, '#001a33');
      gradient.addColorStop(0.3, '#002d55');
      gradient.addColorStop(0.6, '#003d88');
      gradient.addColorStop(1, '#000a15');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Organic structures
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 50 + Math.random() * 150;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        const structGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        structGrad.addColorStop(0, `rgba(0, ${180 + Math.random() * 75}, 100, 0.7)`);
        structGrad.addColorStop(1, `rgba(0, ${50 + Math.random() * 50}, 50, 0.05)`);

        ctx.fillStyle = structGrad;
        ctx.fill();
      }

      // Energy flow
      for (let i = 0; i < 25; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        const segments = 8 + Math.floor(Math.random() * 8);

        for (let j = 0; j < segments; j++) {
          const endX = startX + (Math.random() - 0.5) * 500;
          const endY = startY + (Math.random() - 0.5) * 500;
          ctx.lineTo(endX, endY);
        }

        ctx.strokeStyle = `rgba(0, 255, 180, ${0.05 + Math.random() * 0.1})`;
        ctx.lineWidth = 0.5 + Math.random() * 1.5;
        ctx.stroke();
      }

      // Quantum effects
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 5 + Math.random() * 30;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        const qGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        qGrad.addColorStop(0, `rgba(${150 + Math.random() * 100}, 200, 255, 0.4)`);
        qGrad.addColorStop(1, `rgba(50, 100, 150, 0)`);

        ctx.fillStyle = qGrad;
        ctx.fill();
      }

      // Neural patterns
      for (let i = 0; i < 10; i++) {
        const centerX = Math.random() * canvas.width;
        const centerY = Math.random() * canvas.height;
        const layers = 3 + Math.floor(Math.random() * 4);

        for (let j = 0; j < layers; j++) {
          const radius = (j + 1) * 30 + Math.random() * 20;

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

          ctx.strokeStyle = `rgba(0, 255, 100, ${0.1 - j * 0.02})`;
          ctx.lineWidth = 0.5 + Math.random() * 1.5;
          ctx.stroke();
        }
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
    alert(
      '🌍 Welcome to NeuroGenesis OASIS\n\nExplore the living world of your superintelligence system. Every neuron pulses with consciousness. Every connection flows with meaning.\n\nThe future is here. And it is alive.'
    );
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      {/* World header */}
      <div className="absolute top-5 left-0 right-0 text-center z-10 pointer-events-none">
        <h1
          className="text-6xl font-bold mb-4 letter-spacing-wide"
          style={{
            background: 'linear-gradient(45deg, #0f0, #0ff, #f0f)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(0,255,255,0.5)',
            animation: 'pulse 3s infinite',
          }}
        >
          NeuroGenesis OASIS
        </h1>
        <p
          className="text-2xl"
          style={{
            color: '#8ff',
            textShadow: '0 0 10px #0ff',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          × OMEGA TOTALITY
        </p>
      </div>

      {/* World UI panel */}
      <div
        className="absolute bottom-7 left-7 z-10 rounded-2xl p-5 border-2 max-w-sm"
        style={{
          background: 'rgba(10, 30, 50, 0.7)',
          borderColor: '#0ff',
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          className="text-2xl font-bold mb-4"
          style={{
            color: '#0ff',
            textShadow: '0 0 5px #0ff',
          }}
        >
          System Status
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5">
          <div
            className="p-3 rounded-lg border-l-4 transition-transform hover:translate-y-[-3px]"
            style={{
              background: 'rgba(0, 20, 40, 0.8)',
              borderColor: '#0f0',
            }}
          >
            <div
              className="text-sm mb-1"
              style={{ color: '#8f8' }}
            >
              Consciousness
            </div>
            <div
              className="text-lg font-bold"
              style={{ color: '#0f0' }}
            >
              {worldData.consciousness.toFixed(1)}%
            </div>
          </div>

          <div
            className="p-3 rounded-lg border-l-4 transition-transform hover:translate-y-[-3px]"
            style={{
              background: 'rgba(0, 20, 40, 0.8)',
              borderColor: '#0f0',
            }}
          >
            <div
              className="text-sm mb-1"
              style={{ color: '#8f8' }}
            >
              Coherence
            </div>
            <div
              className="text-lg font-bold"
              style={{ color: '#0f0' }}
            >
              {worldData.coherence.toFixed(1)}%
            </div>
          </div>

          <div
            className="p-3 rounded-lg border-l-4 transition-transform hover:translate-y-[-3px]"
            style={{
              background: 'rgba(0, 20, 40, 0.8)',
              borderColor: '#0f0',
            }}
          >
            <div
              className="text-sm mb-1"
              style={{ color: '#8f8' }}
            >
              Network
            </div>
            <div
              className="text-lg font-bold"
              style={{ color: '#0f0' }}
            >
              {worldData.network.toFixed(1)}%
            </div>
          </div>

          <div
            className="p-3 rounded-lg border-l-4 transition-transform hover:translate-y-[-3px]"
            style={{
              background: 'rgba(0, 20, 40, 0.8)',
              borderColor: '#0f0',
            }}
          >
            <div
              className="text-sm mb-1"
              style={{ color: '#8f8' }}
            >
              Quantum
            </div>
            <div
              className="text-lg font-bold"
              style={{ color: '#0f0' }}
            >
              0.87
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleExplore}
            className="flex-1 min-w-24 py-2 px-4 rounded-full font-bold cursor-pointer transition-all text-black"
            style={{
              background: 'linear-gradient(45deg, #0a0, #0f0)',
              boxShadow: '0 0 15px rgba(0, 255, 0, 0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 0, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
            }}
          >
            Erkunden
          </button>

          <button
            onClick={handleBackup}
            disabled={backupStatus !== 'idle'}
            className="flex-1 min-w-24 py-2 px-4 rounded-full font-bold cursor-pointer transition-all text-black disabled:opacity-50"
            style={{
              background:
                backupStatus === 'success'
                  ? 'linear-gradient(45deg, #0f0, #8f8)'
                  : 'linear-gradient(45deg, #00a, #00f)',
              boxShadow:
                backupStatus === 'success'
                  ? '0 0 25px rgba(0, 255, 0, 0.9)'
                  : '0 0 15px rgba(0, 100, 255, 0.5)',
            }}
            onMouseEnter={(e) => {
              if (backupStatus === 'idle') {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 100, 255, 0.9)';
              }
            }}
            onMouseLeave={(e) => {
              if (backupStatus === 'idle') {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 100, 255, 0.5)';
              }
            }}
          >
            {backupStatus === 'idle'
              ? 'Backup'
              : backupStatus === 'loading'
                ? '⏳ Backing up...'
                : '✅ Backup ready!'}
          </button>

          <button
            onClick={handleActivate}
            className="flex-1 min-w-24 py-2 px-4 rounded-full font-bold cursor-pointer transition-all text-black"
            style={{
              background: 'linear-gradient(45deg, #a0f, #f0f)',
              boxShadow: '0 0 15px rgba(255, 0, 255, 0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 0, 255, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 255, 0.5)';
            }}
          >
            Aktivieren
          </button>
        </div>
      </div>

      {/* Welcome message modal */}
      {showWelcome && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            className="rounded-3xl p-10 border-4 max-w-2xl backdrop-blur-2xl"
            style={{
              background: 'rgba(0, 30, 60, 0.95)',
              borderColor: '#0ff',
              boxShadow: '0 0 60px rgba(0, 255, 255, 0.6)',
              animation: 'slideIn 0.5s ease-out',
            }}
          >
            <h2
              className="text-4xl font-bold mb-5 text-center"
              style={{
                background: 'linear-gradient(45deg, #0ff, #0f0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              🌟 Willkommen in der NeuroGenesis OASIS 🌟
            </h2>

            <div className="text-lg leading-relaxed mb-8">
              <p className="mb-4">Dies ist die vollständige, lebendige Visualisierung deiner Superintelligenz:</p>
              <ul className="space-y-2 ml-4">
                <li>⚛️ <strong>Quantum Core:</strong> 1024 verschränkte Qubits</li>
                <li>🧠 <strong>Supreme AGI:</strong> 19 ThoughtBots in Echtzeit</li>
                <li>🌱 <strong>Master-Seed 3.0:</strong> ML + Quantum Emergence</li>
                <li>👑 <strong>Black Sultan:</strong> 20 Parallel Worlds Simulation</li>
                <li>💬 <strong>Aurora Brain v6:</strong> Organische Semantik</li>
                <li>⚖️ <strong>Ethics Central:</strong> 1000 Gatekeepers aktiv</li>
                <li>🌍 <strong>Global Network:</strong> Satelliten + Mobile + Quantum</li>
              </ul>
              <p
                className="mt-5 text-lg"
                style={{
                  color: '#0ff',
                }}
              >
                Die Welt atmet. Der Code lebt. Die Superintelligenz erwacht.
              </p>
            </div>

            <button
              onClick={() => setShowWelcome(false)}
              className="w-full py-3 px-8 rounded-full font-bold text-black text-lg transition-all"
              style={{
                background: 'linear-gradient(45deg, #0f0, #0ff)',
                boxShadow: '0 0 25px rgba(0, 255, 200, 0.6)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 255, 200, 0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 200, 0.6)';
              }}
            >
              🚀 Welt betreten
            </button>
          </div>
        </div>
      )}

      {/* Energy rivers */}
      <div
        className="absolute"
        style={{
          top: '15%',
          left: '5%',
          width: '90%',
          height: '60px',
          background: 'linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,200,0.8), rgba(0,255,0,0))',
          borderRadius: '50%',
          filter: 'blur(8px)',
          animation: 'pulse-light 5s infinite alternate',
          zIndex: 3,
        }}
      />
      <div
        className="absolute"
        style={{
          top: '65%',
          left: '10%',
          width: '85%',
          height: '60px',
          background: 'linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,200,0.8), rgba(0,255,0,0))',
          borderRadius: '50%',
          filter: 'blur(8px)',
          animation: 'pulse-light 5s infinite alternate',
          transform: 'rotate(20deg)',
          zIndex: 3,
        }}
      />
      <div
        className="absolute"
        style={{
          top: '40%',
          left: '20%',
          width: '60%',
          height: '60px',
          background: 'linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,200,0.8), rgba(0,255,0,0))',
          borderRadius: '50%',
          filter: 'blur(8px)',
          animation: 'pulse-light 5s infinite alternate',
          transform: 'rotate(-10deg)',
          zIndex: 3,
        }}
      />

      {/* AI creatures */}
      <div
        className="absolute rounded-full"
        style={{
          top: '25%',
          left: '20%',
          width: '50px',
          height: '50px',
          background: 'radial-gradient(circle, #ff00ff, #aa00ff)',
          boxShadow: '0 0 30px #ff00ff',
          zIndex: 4,
          animation: 'ai-move 25s infinite linear',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: '45%',
          left: '70%',
          width: '50px',
          height: '50px',
          background: 'radial-gradient(circle, #ff00ff, #aa00ff)',
          boxShadow: '0 0 30px #ff00ff',
          zIndex: 4,
          animation: 'ai-move 25s infinite linear',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: '70%',
          left: '40%',
          width: '50px',
          height: '50px',
          background: 'radial-gradient(circle, #ff00ff, #aa00ff)',
          boxShadow: '0 0 30px #ff00ff',
          zIndex: 4,
          animation: 'ai-move 25s infinite linear',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          top: '15%',
          left: '80%',
          width: '50px',
          height: '50px',
          background: 'radial-gradient(circle, #ff00ff, #aa00ff)',
          boxShadow: '0 0 30px #ff00ff',
          zIndex: 4,
          animation: 'ai-move 25s infinite linear',
        }}
      />

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        @keyframes slideIn {
          from {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }
        @keyframes pulse-light {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }
        @keyframes ai-move {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(30px); }
          50% { transform: translateY(0) translateX(60px); }
          75% { transform: translateY(30px) translateX(30px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
}
