import React, { useMemo } from 'react';

interface HeartConfig {
  id: number;
  left: string;
  top: string;
  fontSize: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

const FloatingHearts: React.FC = () => {
  const hearts = useMemo<HeartConfig[]>(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${(i * 7 + 3) % 100}%`,
      top: `${(i * 11 + 5) % 100}%`,
      fontSize: `${0.8 + (i % 4) * 0.4}rem`,
      animationDuration: `${6 + (i % 5) * 2}s`,
      animationDelay: `${(i % 7) * 0.8}s`,
      opacity: 0.08 + (i % 5) * 0.04,
    }));
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes floatHeart {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(-10px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
      {hearts.map((heart) => (
        <span
          key={heart.id}
          style={{
            position: 'absolute',
            left: heart.left,
            top: heart.top,
            fontSize: heart.fontSize,
            opacity: heart.opacity,
            animation: `floatHeart ${heart.animationDuration} ease-in-out infinite`,
            animationDelay: heart.animationDelay,
            userSelect: 'none',
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
