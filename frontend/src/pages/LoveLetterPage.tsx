import React, { useState, useEffect } from 'react';

interface LoveLetterPageProps {
  onNext: () => void;
}

const LETTER_TEXT = `My love,

It's been one year since March 10 — the day you said yes.
I still remember how badly I wanted us to work.
When you said yes, I didn't just feel happy… I felt relieved. Like I finally had you.

This year wasn't perfect.
We had misunderstandings. We had distance.
There were months we didn't even talk.
There were moments I thought I lost you.

But no matter what happened,
one thing never changed —
I never stopped loving you.

Even in silence, I cared.
Even when we weren't together, I still chose you in my heart.
And when you came back into my life in October,
it felt like I could breathe again.

Our first date, sitting so close to you,
your hands inside my hoodie,
me pretending to watch the movie while my heart was racing —
I'll never forget that feeling.

Now we're doing long distance,
and it's not easy.
I miss you more than I say sometimes.
I miss your presence. Your touch. Your closeness.

But I want you to know something very clearly —
I choose you.

Not because it's always simple.
Not because everything is perfect.
But because it's you.

You, with your overthinking.
You, with your smile.
You, with your soft heart and stubborn moods.

After everything we've been through —
the break, the silence, the comeback —
we're still here.

And if I had to go back to the beginning,
I would still fight for you.
I would still wait for you.
I would still choose you.

Happy one year, my love.
Thank you for being mine. 🤍

Forever yours,
Sid`;

const LoveLetterPage: React.FC<LoveLetterPageProps> = ({ onNext }) => {
  const [visible, setVisible] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEnvelopeClick = () => {
    if (envelopeOpen) return;
    setFlapOpen(true);
    setTimeout(() => {
      setEnvelopeOpen(true);
      setTimeout(() => setLetterVisible(true), 200);
    }, 700);
  };

  const handleSeal = () => {
    setLetterVisible(false);
    setTimeout(() => {
      setEnvelopeOpen(false);
      setFlapOpen(false);
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3e8ff 0%, #fce4ec 40%, #f8bbd0 70%, #e8d5f5 100%)',
        padding: '5rem 1.5rem 4rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes letterHeartFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.12); }
        }
        @keyframes envelopeGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(233,30,140,0.2), 0 20px 60px rgba(136,14,79,0.15); }
          50% { box-shadow: 0 0 60px rgba(233,30,140,0.4), 0 25px 70px rgba(136,14,79,0.25); }
        }
        @keyframes flapOpen {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(-180deg); }
        }
        @keyframes letterSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bgHeartDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-100vh) translateX(12px); opacity: 0; }
        }
      `}</style>

      {/* Background hearts */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: `${6 + i * 12}%`,
            bottom: '-5%',
            fontSize: '1rem',
            animation: `bgHeartDrift ${10 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 1.3}s`,
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
          maxWidth: '680px',
          width: '100%',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              display: 'inline-block',
              animation: 'letterHeartFloat 2.5s ease-in-out infinite',
              filter: 'drop-shadow(0 0 12px rgba(233,30,140,0.6))',
            }}
          >
            💌
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
            A Letter From My Heart
          </h1>
          <p
            style={{
              color: '#9c3a6a',
              fontStyle: 'italic',
              fontSize: '1rem',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Written just for you
          </p>
        </div>

        {/* Envelope */}
        {!envelopeOpen && (
          <div
            onClick={handleEnvelopeClick}
            style={{
              cursor: flapOpen ? 'default' : 'pointer',
              marginBottom: '2rem',
              perspective: '1000px',
            }}
          >
            {/* Envelope body */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255,240,248,0.9), rgba(240,220,255,0.9))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: '1rem',
                padding: '0',
                boxShadow: '0 20px 60px rgba(136,14,79,0.2)',
                animation: 'envelopeGlow 3s ease-in-out infinite',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Envelope flap */}
              <div
                style={{
                  position: 'relative',
                  height: '0',
                  paddingTop: '30%',
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  animation: flapOpen ? 'flapOpen 0.7s ease forwards' : 'none',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(248,187,208,0.95), rgba(225,190,231,0.95))',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    borderBottom: '1px solid rgba(233,30,140,0.2)',
                  }}
                />
              </div>

              {/* Envelope content area */}
              <div
                style={{
                  padding: '2.5rem 2rem 2rem',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Wax seal decoration */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #e91e8c, #9c27b0)',
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    boxShadow: '0 4px 20px rgba(233,30,140,0.4)',
                    animation: 'letterHeartFloat 2s ease-in-out infinite',
                  }}
                >
                  🤍
                </div>

                <p
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#6b1a4a',
                    marginBottom: '0.5rem',
                    fontStyle: 'italic',
                  }}
                >
                  To My Kishuu
                </p>
                <p
                  style={{
                    color: '#9c3a6a',
                    fontSize: '0.85rem',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontStyle: 'italic',
                    marginBottom: '1.5rem',
                  }}
                >
                  with all my love
                </p>

                {!flapOpen && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'linear-gradient(135deg, #e91e8c, #9c27b0)',
                      color: '#fff',
                      padding: '0.6rem 1.5rem',
                      borderRadius: '2rem',
                      fontSize: '0.85rem',
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 600,
                      boxShadow: '0 4px 15px rgba(233,30,140,0.35)',
                    }}
                  >
                    💌 Tap to open
                  </div>
                )}
                {flapOpen && (
                  <div
                    style={{
                      color: '#9c3a6a',
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      fontFamily: 'Georgia, "Times New Roman", serif',
                    }}
                  >
                    Opening…
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Letter content */}
        {envelopeOpen && (
          <div
            style={{
              opacity: letterVisible ? 1 : 0,
              transform: letterVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                background: 'rgba(255,248,252,0.92)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: '1.25rem',
                padding: '2.5rem 2rem',
                boxShadow: '0 20px 60px rgba(136,14,79,0.18)',
                animation: 'envelopeGlow 4s ease-in-out infinite',
                position: 'relative',
              }}
            >
              {/* Decorative top */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    fontSize: '1.5rem',
                    animation: 'letterHeartFloat 2.5s ease-in-out infinite',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 0 8px rgba(233,30,140,0.5))',
                  }}
                >
                  🤍
                </div>
              </div>

              <p
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '1rem',
                  color: '#5a1535',
                  lineHeight: 2,
                  whiteSpace: 'pre-line',
                  fontStyle: 'italic',
                }}
              >
                {LETTER_TEXT}
              </p>

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button
                  onClick={handleSeal}
                  style={{
                    padding: '0.5rem 1.25rem',
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(233,30,140,0.25)',
                    borderRadius: '2rem',
                    color: '#880e4f',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '0.82rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  ← Seal the letter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Next button */}
        <div style={{ textAlign: 'center' }}>
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
    </div>
  );
};

export default LoveLetterPage;
