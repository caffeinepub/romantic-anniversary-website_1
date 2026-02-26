import React, { useState, useRef } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = '10032025';

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setUnlocking(true);
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setError('Wrong password, try again 💔');
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(''), 2000);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/generated/lock-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px) brightness(0.6)',
          transform: 'scale(1.05)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(136,14,79,0.4) 0%, rgba(74,20,140,0.3) 100%)',
        }}
      />

      {/* Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '1.5rem',
          padding: '3rem 2.5rem',
          maxWidth: '420px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          opacity: unlocking ? 0 : 1,
          transform: unlocking ? 'scale(1.05)' : 'scale(1)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔒</div>
        <h1
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '0.5rem',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          Built From My Heart
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.95rem',
            marginBottom: '2rem',
            fontStyle: 'italic',
          }}
        >
          Enter the date that changed everything
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              animation: shake ? 'shake 0.5s ease' : 'none',
            }}
          >
            <style>{`
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-10px); }
                40% { transform: translateX(10px); }
                60% { transform: translateX(-8px); }
                80% { transform: translateX(8px); }
              }
            `}</style>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="DDMMYYYY"
              maxLength={8}
              style={{
                width: '100%',
                padding: '0.875rem 1.25rem',
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '0.75rem',
                color: '#fff',
                fontSize: '1.1rem',
                textAlign: 'center',
                letterSpacing: '0.3em',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              autoFocus
            />
          </div>

          {error && (
            <p
              style={{
                color: '#ffb3c1',
                fontSize: '0.85rem',
                marginTop: '0.5rem',
                marginBottom: '0',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              marginTop: '1.5rem',
              width: '100%',
              padding: '0.875rem',
              background: 'linear-gradient(135deg, #e91e8c, #9c27b0)',
              border: 'none',
              borderRadius: '0.75rem',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 20px rgba(233,30,140,0.4)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(233,30,140,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(233,30,140,0.4)';
            }}
          >
            Unlock ❤️
          </button>
        </form>
      </div>
    </div>
  );
};

export default LockScreen;
