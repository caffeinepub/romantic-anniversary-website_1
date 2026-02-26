import React, { useState, useEffect, useRef } from 'react';

interface WhyILoveYouProps {
  onNext: () => void;
}

const reasons = [
  'Your laugh that fills the whole room',
  'The way you scrunch your nose when you smile',
  'How you always know what to say',
  'Your kindness to everyone around you',
  'The way you make ordinary moments magical',
  'Your strength when things get hard',
  'How you love with your whole heart',
  'The way you look at me like I matter',
  'Your curiosity about everything',
  'How you make me want to be better',
];

interface FloatingGlowHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const generateHearts = (count: number): FloatingGlowHeart[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.floor(Math.random() * 90) + 5,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 5,
    size: 1 + Math.random() * 1.5,
  }));

type Phase = 'card' | 'cinematic';

const WhyILoveYou: React.FC<WhyILoveYouProps> = ({ onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>('card');
  const [cinematicStep, setCinematicStep] = useState(0);
  const [infiniteHearts, setInfiniteHearts] = useState<FloatingGlowHeart[]>([]);
  const heartsIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (heartsIntervalRef.current) clearInterval(heartsIntervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < reasons.length - 1) {
      setCardVisible(false);
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setCardVisible(true);
      }, 350);
    } else {
      // After 10th reason — start cinematic sequence
      setCardVisible(false);
      setTimeout(() => {
        setPhase('cinematic');
        setInfiniteHearts(generateHearts(20));
        // Spawn more hearts periodically
        heartsIntervalRef.current = setInterval(() => {
          setInfiniteHearts((prev) => [
            ...prev.slice(-40),
            ...generateHearts(5).map((h) => ({ ...h, id: Date.now() + h.id })),
          ]);
        }, 2000);
        // Step 1: show ∞ immediately
        setCinematicStep(1);
        // Step 2: show first text after 1s
        setTimeout(() => setCinematicStep(2), 1000);
        // Step 3: show second text after 3s
        setTimeout(() => setCinematicStep(3), 3000);
      }, 1500);
    }
  };

  if (phase === 'cinematic') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f3e8ff 0%, #fce4ec 40%, #f8bbd0 70%, #e8d5f5 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <style>{`
          @keyframes glowHeartRise {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-110vh) scale(0.7); opacity: 0; }
          }
          @keyframes infinityGlowAnim {
            0%, 100% { text-shadow: 0 0 30px rgba(233,30,140,0.6), 0 0 60px rgba(156,39,176,0.4); opacity: 0.85; }
            50% { text-shadow: 0 0 60px rgba(233,30,140,1), 0 0 100px rgba(156,39,176,0.8), 0 0 140px rgba(233,30,140,0.5); opacity: 1; }
          }
          @keyframes cinematicFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Infinite floating hearts */}
        {infiniteHearts.map((h) => (
          <div
            key={h.id}
            style={{
              position: 'fixed',
              left: `${h.left}%`,
              bottom: '-5%',
              fontSize: `${h.size}rem`,
              animation: `glowHeartRise ${h.duration}s ease-in-out forwards`,
              animationDelay: `${h.delay}s`,
              pointerEvents: 'none',
              zIndex: 0,
              filter: 'drop-shadow(0 0 8px rgba(233,30,140,0.7))',
              opacity: 0,
            }}
          >
            🤍
          </div>
        ))}

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Infinity symbol */}
          {cinematicStep >= 1 && (
            <div
              style={{
                fontSize: 'clamp(6rem, 20vw, 12rem)',
                color: '#e91e8c',
                animation: 'infinityGlowAnim 2.5s ease-in-out infinite, cinematicFadeIn 1s ease forwards',
                lineHeight: 1,
                marginBottom: '2rem',
                fontFamily: 'Georgia, "Times New Roman", serif',
              }}
            >
              ∞
            </div>
          )}

          {/* First text */}
          {cinematicStep >= 2 && (
            <p
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: '#6b1a4a',
                fontStyle: 'italic',
                animation: 'cinematicFadeIn 1s ease forwards',
                marginBottom: '1.5rem',
                textShadow: '0 2px 15px rgba(136,14,79,0.2)',
              }}
            >
              Do I even need a reason to love you?
            </p>
          )}

          {/* Second text */}
          {cinematicStep >= 3 && (
            <p
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                color: '#e91e8c',
                fontStyle: 'italic',
                fontWeight: 700,
                animation: 'cinematicFadeIn 1s ease forwards',
                textShadow: '0 0 20px rgba(233,30,140,0.4)',
              }}
            >
              I just do.
            </p>
          )}

          {cinematicStep >= 3 && (
            <div style={{ marginTop: '3rem' }}>
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
                  animation: 'cinematicFadeIn 1s ease 0.5s both',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                Next Chapter ✨
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3e8ff 0%, #fce4ec 40%, #f8bbd0 70%, #e8d5f5 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes cardHeartPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(233,30,140,0.4)); }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 20px rgba(233,30,140,0.8)); }
        }
        @keyframes reasonCardIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes bgHeartDrift {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>

      {/* Background hearts */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: `${8 + i * 11}%`,
            bottom: '-5%',
            fontSize: '1rem',
            animation: `bgHeartDrift ${9 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 1.4}s`,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0,
          }}
        >
          🤍
        </div>
      ))}

      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              display: 'inline-block',
              animation: 'cardHeartPulse 2.5s ease-in-out infinite',
            }}
          >
            💖
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
            Reasons Why I Love You
          </h1>
          <p
            style={{
              color: '#9c3a6a',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            1 → ∞
          </p>
        </div>

        {/* Heart-shaped card */}
        <div
          style={{
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
            marginBottom: '2.5rem',
          }}
        >
          {/* Heart shape container */}
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              width: '100%',
              maxWidth: '420px',
            }}
          >
            {/* Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255,240,248,0.95), rgba(240,220,255,0.95))',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(233,30,140,0.25)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                padding: '3.5rem 2.5rem 2.5rem',
                boxShadow: '0 0 40px rgba(233,30,140,0.25), 0 20px 60px rgba(136,14,79,0.18)',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'cardHeartPulse 4s ease-in-out infinite',
              }}
            >
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#e91e8c',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Reason #{currentIndex + 1}
              </div>
              <p
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  color: '#5a1535',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  textAlign: 'center',
                }}
              >
                {reasons[currentIndex]}
              </p>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
          }}
        >
          {reasons.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentIndex ? '1.5rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '1rem',
                background: i <= currentIndex
                  ? 'linear-gradient(135deg, #e91e8c, #9c27b0)'
                  : 'rgba(233,30,140,0.2)',
                transition: 'all 0.4s ease',
                boxShadow: i === currentIndex ? '0 0 8px rgba(233,30,140,0.5)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
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
          {currentIndex < reasons.length - 1 ? 'Next Reason →' : 'And more… ∞'}
        </button>
      </div>
    </div>
  );
};

export default WhyILoveYou;
