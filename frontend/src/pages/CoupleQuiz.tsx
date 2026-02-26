import React, { useState, useEffect } from 'react';

interface CoupleQuizProps {
  onNext: () => void;
}

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  funFact: string;
}

const questions: Question[] = [
  {
    question: 'What date did we officially become a couple?',
    options: ['March 3, 2025', 'March 10, 2025', 'March 17, 2025', 'March 24, 2025'],
    correctIndex: 1,
    funFact: 'March 10, 2025 — the day that changed everything! 💕',
  },
  {
    question: 'What is my favorite thing about you?',
    options: ['Your smile', 'Your laugh', 'Your kindness', 'All of the above'],
    correctIndex: 3,
    funFact: 'Everything about you is my favorite thing! ❤️',
  },
  {
    question: "How do I feel when I'm with you?",
    options: ['Happy', 'Safe', 'Complete', 'All of the above'],
    correctIndex: 3,
    funFact: 'You make me feel everything good at once! 🌟',
  },
  {
    question: "What's our love story best described as?",
    options: ['A fairytale', 'An adventure', 'A beautiful surprise', 'All of the above'],
    correctIndex: 3,
    funFact: 'Our love is all of these things and more! 💫',
  },
  {
    question: 'How long will I love you?',
    options: ['A year', 'A decade', 'A lifetime', 'Forever and beyond'],
    correctIndex: 3,
    funFact: "Forever and beyond — that's my promise to you! 💍",
  },
];

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const QuizHeartBurst: React.FC<{ active: boolean }> = ({ active }) => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    if (active) {
      setParticles(
        Array.from({ length: 5 }, (_, i) => ({
          id: i,
          x: 30 + Math.random() * 40,
          y: 20 + Math.random() * 40,
          size: 0.8 + Math.random() * 0.8,
          delay: i * 0.1,
        }))
      );
    } else {
      setParticles([]);
    }
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes heartBurst {
          0% { transform: scale(0) translateY(0); opacity: 1; }
          60% { transform: scale(1.2) translateY(-20px); opacity: 0.8; }
          100% { transform: scale(0.8) translateY(-40px); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}rem`,
            animation: `heartBurst 1s ease forwards`,
            animationDelay: `${p.delay}s`,
            pointerEvents: 'none',
            zIndex: 10,
            filter: 'drop-shadow(0 0 4px rgba(233,30,140,0.6))',
          }}
        >
          🤍
        </div>
      ))}
    </>
  );
};

const CoupleQuiz: React.FC<CoupleQuizProps> = ({ onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [burstActive, setBurstActive] = useState(false);

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    setBurstActive(true);
    setTimeout(() => setBurstActive(false), 1200);
    if (index === questions[currentQuestion].correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const q = questions[currentQuestion];
  const progress = ((currentQuestion + (answered ? 1 : 0)) / questions.length) * 100;

  if (showResult) {
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
          @keyframes resultHeartFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.1); }
          }
          @keyframes bgHeartDrift {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 0.4; }
            90% { opacity: 0.15; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
        `}</style>
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
        <div
          style={{
            maxWidth: '500px',
            width: '100%',
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: '1.5rem',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 0 40px rgba(233,30,140,0.25), 0 20px 60px rgba(136,14,79,0.15)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: '4rem',
              marginBottom: '1rem',
              display: 'inline-block',
              animation: 'resultHeartFloat 2.5s ease-in-out infinite',
              filter: 'drop-shadow(0 0 12px rgba(233,30,140,0.5))',
            }}
          >
            {score === questions.length ? '🏆' : score >= 3 ? '💕' : '💝'}
          </div>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#6b1a4a',
              marginBottom: '0.5rem',
            }}
          >
            {score}/{questions.length}
          </h2>
          <p
            style={{
              color: '#9c3a6a',
              fontStyle: 'italic',
              marginBottom: '2rem',
              fontFamily: 'Georgia, "Times New Roman", serif',
              lineHeight: 1.7,
            }}
          >
            {score === questions.length
              ? 'Perfect score! You know our love story by heart! 💕'
              : score >= 3
              ? 'You know us so well! Our love is real and beautiful! ❤️'
              : "Every answer was filled with love — that's what matters! 💝"}
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
              boxShadow: '0 6px 30px rgba(233,30,140,0.45)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; }}
          >
            Next Chapter ✨
          </button>
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes quizHeartFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.1); }
        }
        @keyframes bgHeartDrift {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        .quiz-option-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(233,30,140,0.12), rgba(156,39,176,0.12)) !important;
          border-color: rgba(233,30,140,0.4) !important;
          box-shadow: 0 0 20px rgba(233,30,140,0.2) !important;
          transform: translateX(4px) !important;
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

      <div style={{ maxWidth: '600px', width: '100%', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              fontSize: '2rem',
              marginBottom: '0.5rem',
              display: 'inline-block',
              animation: 'quizHeartFloat 2.5s ease-in-out infinite',
              filter: 'drop-shadow(0 0 8px rgba(233,30,140,0.5))',
            }}
          >
            💑
          </div>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#6b1a4a',
              textShadow: '0 2px 15px rgba(136,14,79,0.15)',
            }}
          >
            Our Love Quiz
          </h1>
        </div>

        {/* Progress bar */}
        <div
          style={{
            background: 'rgba(255,255,255,0.4)',
            borderRadius: '1rem',
            height: '0.5rem',
            marginBottom: '2rem',
            overflow: 'hidden',
            boxShadow: 'inset 0 1px 3px rgba(136,14,79,0.1)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #e91e8c, #9c27b0)',
              borderRadius: '1rem',
              transition: 'width 0.5s ease',
              boxShadow: '0 0 10px rgba(233,30,140,0.4)',
            }}
          />
        </div>

        {/* Question card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 0 40px rgba(233,30,140,0.2), 0 20px 60px rgba(136,14,79,0.15)',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {/* Heart burst particles */}
          <QuizHeartBurst active={burstActive} />

          <p
            style={{
              fontSize: '0.85rem',
              color: '#9c3a6a',
              marginBottom: '0.75rem',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic',
            }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#6b1a4a',
              marginBottom: '1.5rem',
              lineHeight: 1.4,
            }}
          >
            {q.question}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {q.options.map((option, index) => {
              let bg = 'rgba(255,255,255,0.7)';
              let border = '1px solid rgba(136,14,79,0.15)';
              let color = '#6b1a4a';
              let boxShadow = 'none';

              if (answered) {
                if (index === q.correctIndex) {
                  bg = 'rgba(76,175,80,0.15)';
                  border = '2px solid rgba(76,175,80,0.5)';
                  color = '#2e7d32';
                  boxShadow = '0 0 15px rgba(76,175,80,0.2)';
                } else if (index === selectedAnswer && index !== q.correctIndex) {
                  bg = 'rgba(244,67,54,0.12)';
                  border = '2px solid rgba(244,67,54,0.35)';
                  color = '#c62828';
                }
              }

              return (
                <button
                  key={index}
                  className="quiz-option-btn"
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  style={{
                    padding: '0.875rem 1.25rem',
                    background: bg,
                    border,
                    borderRadius: '0.875rem',
                    color,
                    fontSize: '0.95rem',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    cursor: answered ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease',
                    boxShadow,
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(233,30,140,0.08), rgba(156,39,176,0.08))',
                borderRadius: '0.875rem',
                border: '1px solid rgba(233,30,140,0.2)',
                boxShadow: '0 0 20px rgba(233,30,140,0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>🤍</span>
                <p
                  style={{
                    color: '#6b1a4a',
                    fontStyle: 'italic',
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                  }}
                >
                  {q.funFact}
                </p>
              </div>
              <button
                onClick={handleNext}
                style={{
                  padding: '0.625rem 1.5rem',
                  background: 'linear-gradient(135deg, #e91e8c, #9c27b0)',
                  border: 'none',
                  borderRadius: '2rem',
                  color: '#fff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  boxShadow: '0 4px 15px rgba(233,30,140,0.35)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results ✨'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoupleQuiz;
