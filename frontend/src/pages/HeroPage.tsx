import React, { useEffect, useState } from 'react';

interface HeroPageProps {
  onNext: () => void;
}

const HeroPage: React.FC<HeroPageProps> = ({ onNext }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 30%, #e1bee7 70%, #fce4ec 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
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
        {/* Pulsing heart */}
        <div
          style={{
            fontSize: '3.5rem',
            marginBottom: '1.5rem',
            animation: 'pulseHeart 2s ease-in-out infinite',
          }}
        >
          ❤️
        </div>
        <style>{`
          @keyframes pulseHeart {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
        `}</style>

        {/* Glass card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: '1.5rem',
            padding: '3rem 2.5rem',
            boxShadow: '0 20px 60px rgba(136,14,79,0.15)',
          }}
        >
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: 700,
              color: '#880e4f',
              marginBottom: '1rem',
              lineHeight: 1.3,
            }}
          >
            10.03.2025… The day you became my everything.
          </h1>
          <p
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#ad1457',
              marginBottom: '2.5rem',
              opacity: visible ? 1 : 0,
              transition: 'opacity 1s ease 0.5s',
            }}
          >
            Still falling for you. Every single day.
          </p>

          <button
            onClick={onNext}
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
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px) scale(1.02)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(233,30,140,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0) scale(1)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(233,30,140,0.4)';
            }}
          >
            See What You Did to Me ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
