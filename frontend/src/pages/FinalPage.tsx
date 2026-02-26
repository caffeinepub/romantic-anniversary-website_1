import React, { useState, useEffect, useRef } from 'react';

interface FinalPageProps {
  onRestart: () => void;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

const COLORS = ['#e91e8c', '#9c27b0', '#f48fb1', '#ce93d8', '#f8bbd0', '#e1bee7', '#ff80ab', '#ea80fc'];

const FinalPage: React.FC<FinalPageProps> = ({ onRestart }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [visible, setVisible] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const confettiRef = useRef<Confetti[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const launchConfetti = () => {
    const pieces: Confetti[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 8,
      speedX: (Math.random() - 0.5) * 2,
      speedY: 1 + Math.random() * 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    }));
    confettiRef.current = pieces;
    setConfetti([...pieces]);

    const animate = () => {
      confettiRef.current = confettiRef.current
        .map((p) => ({
          ...p,
          y: p.y + p.speedY,
          x: p.x + p.speedX,
          rotation: p.rotation + p.rotationSpeed,
        }))
        .filter((p) => p.y < 110);

      setConfetti([...confettiRef.current]);

      if (confettiRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handleCelebrate = () => {
    launchConfetti();
    setShowPopup(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #e1bee7 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti layer */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 50,
        }}
        aria-hidden="true"
      >
        {confetti.map((piece) => (
          <div
            key={piece.id}
            style={{
              position: 'absolute',
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              background: piece.color,
              borderRadius: '2px',
              transform: `rotate(${piece.rotation}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        <div
          style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            animation: 'pulseHeart 2s ease-in-out infinite',
          }}
        >
          ❤️
        </div>
        <style>{`
          @keyframes pulseHeart {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
          }
        `}</style>

        <div
          style={{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: '1.5rem',
            padding: '3rem 2rem',
            boxShadow: '0 20px 60px rgba(136,14,79,0.15)',
            marginBottom: '2rem',
          }}
        >
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#880e4f',
              marginBottom: '1rem',
              lineHeight: 1.3,
            }}
          >
            nee en pokisham dii kishuu
          </h1>
          <p
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: '#ad1457',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            Thank you for being you. Thank you for choosing me. Thank you for every laugh, every hug, every moment. I love you more than all the words in the world could ever say.
          </p>

          <button
            onClick={handleCelebrate}
            style={{
              padding: '0.875rem 2.5rem',
              background: 'linear-gradient(135deg, #e91e8c, #9c27b0)',
              border: 'none',
              borderRadius: '3rem',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Georgia, "Times New Roman", serif',
              boxShadow: '0 4px 20px rgba(233,30,140,0.4)',
              transition: 'transform 0.2s ease',
              marginBottom: '1rem',
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; }}
          >
            🎉 Celebrate Our Love!
          </button>

          <div>
            <button
              onClick={onRestart}
              style={{
                padding: '0.625rem 1.5rem',
                background: 'transparent',
                border: '1px solid rgba(136,14,79,0.3)',
                borderRadius: '2rem',
                color: '#880e4f',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              ↩ Start Over
            </button>
          </div>
        </div>

        {/* Footer */}
        <p style={{ fontSize: '0.75rem', color: 'rgba(136,14,79,0.5)' }}>
          Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'unknown-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#e91e8c', textDecoration: 'none' }}
          >
            caffeine.ai
          </a>{' '}
          · © {new Date().getFullYear()}
        </p>
      </div>

      {/* Popup modal */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '420px',
              width: '100%',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '1.5rem',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(136,14,79,0.3)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎊</div>
            <h2
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#880e4f',
                marginBottom: '0.75rem',
              }}
            >
              I Love You So Much!
            </h2>
            <p
              style={{
                color: '#ad1457',
                fontStyle: 'italic',
                fontFamily: 'Georgia, "Times New Roman", serif',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}
            >
              Every day with you is a blessing. You are my sunshine, my laughter, my home. Here's to forever with you. 💕
            </p>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #e91e8c, #9c27b0)',
                border: 'none',
                borderRadius: '2rem',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Georgia, "Times New Roman", serif',
                boxShadow: '0 4px 15px rgba(233,30,140,0.3)',
              }}
            >
              💕 I Love You Too!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalPage;
