import React, { useState, useEffect } from 'react';

interface CountdownPageProps {
  onNext: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const target = new Date('2027-03-10T00:00:00');
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

interface FlipUnitProps {
  value: number;
  label: string;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ value, label }) => {
  const display = String(value).padStart(2, '0');

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.7)',
          borderRadius: '1.25rem',
          padding: '1.5rem 1.5rem',
          minWidth: '90px',
          boxShadow: '0 0 30px rgba(233,30,140,0.25), 0 8px 30px rgba(136,14,79,0.15)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 700,
            color: '#6b1a4a',
            display: 'block',
            lineHeight: 1,
            textShadow: '0 0 20px rgba(233,30,140,0.3)',
          }}
        >
          {display}
        </span>
      </div>
      <p
        style={{
          marginTop: '0.6rem',
          fontSize: '0.8rem',
          color: '#9c3a6a',
          fontStyle: 'italic',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {label}
      </p>
    </div>
  );
};

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

const BG_HEARTS: FloatingHeart[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: 5 + i * 9,
  delay: i * 1.3,
  duration: 8 + (i % 4) * 2,
}));

const CountdownPage: React.FC<CountdownPageProps> = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isPast = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3e8ff 0%, #fce4ec 40%, #f8bbd0 70%, #e8d5f5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes countdownHeartFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-100vh) translateX(10px); opacity: 0; }
        }
        @keyframes heartbeatPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(233,30,140,0.4)); }
          14% { transform: scale(1.25); filter: drop-shadow(0 0 20px rgba(233,30,140,0.8)); }
          28% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(233,30,140,0.4)); }
          42% { transform: scale(1.18); filter: drop-shadow(0 0 16px rgba(233,30,140,0.7)); }
          70% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(233,30,140,0.4)); }
        }
        @keyframes glassGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(233,30,140,0.15), 0 20px 60px rgba(136,14,79,0.12); }
          50% { box-shadow: 0 0 60px rgba(233,30,140,0.3), 0 25px 70px rgba(136,14,79,0.2); }
        }
      `}</style>

      {/* Floating background hearts */}
      {BG_HEARTS.map((h) => (
        <div
          key={h.id}
          style={{
            position: 'fixed',
            left: `${h.left}%`,
            bottom: '-5%',
            fontSize: '1rem',
            animation: `countdownHeartFloat ${h.duration}s ease-in-out infinite`,
            animationDelay: `${h.delay}s`,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0,
          }}
        >
          🤍
        </div>
      ))}

      <div
        style={{
          maxWidth: '700px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Heartbeat pulse decoration */}
        <div
          style={{
            fontSize: '3.5rem',
            marginBottom: '1.5rem',
            display: 'inline-block',
            animation: 'heartbeatPulse 1.6s ease-in-out infinite',
          }}
        >
          💗
        </div>

        <h1
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#6b1a4a',
            marginBottom: '0.5rem',
            textShadow: '0 2px 20px rgba(136,14,79,0.15)',
          }}
        >
          {isPast ? 'Happy Anniversary! 🎉' : 'Counting Down to Our Anniversary'}
        </h1>
        <p
          style={{
            color: '#9c3a6a',
            fontStyle: 'italic',
            marginBottom: '3rem',
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '1rem',
          }}
        >
          {isPast ? 'Two whole years of us! 💕' : 'March 10, 2027 — Two years of us 💕'}
        </p>

        {/* Glassmorphism countdown container */}
        {!isPast && (
          <div
            style={{
              background: 'rgba(255,255,255,0.45)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.7)',
              borderRadius: '2rem',
              padding: '2.5rem 2rem',
              marginBottom: '3rem',
              animation: 'glassGlow 4s ease-in-out infinite',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
              }}
            >
              <FlipUnit value={timeLeft.days} label="Days" />
              <FlipUnit value={timeLeft.hours} label="Hours" />
              <FlipUnit value={timeLeft.minutes} label="Minutes" />
              <FlipUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        )}

        {isPast && (
          <div
            style={{
              fontSize: '5rem',
              marginBottom: '3rem',
              display: 'inline-block',
              animation: 'heartbeatPulse 1s ease-in-out infinite',
            }}
          >
            🎊
          </div>
        )}

        <button
          onClick={onNext}
          style={{
            padding: '1rem 3rem',
            background: 'linear-gradient(135deg, #e91e8c, #9c27b0)',
            border: 'none',
            borderRadius: '3rem',
            color: '#fff',
            fontSize: '1.05rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Georgia, "Times New Roman", serif',
            boxShadow: '0 6px 30px rgba(233,30,140,0.45)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-3px)';
            (e.target as HTMLButtonElement).style.boxShadow = '0 10px 40px rgba(233,30,140,0.55)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.target as HTMLButtonElement).style.boxShadow = '0 6px 30px rgba(233,30,140,0.45)';
          }}
        >
          Next Chapter ✨
        </button>
      </div>
    </div>
  );
};

export default CountdownPage;
