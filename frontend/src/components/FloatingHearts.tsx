import React, { useMemo } from 'react';

interface HeartConfig {
  id: number;
  left: string;
  top: string;
  fontSize: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
  type: 'heart' | 'dot' | 'large-bg';
  color?: string;
}

const FloatingHearts: React.FC = () => {
  const particles = useMemo<HeartConfig[]>(() => {
    const items: HeartConfig[] = [];

    // 24 floating hearts in 3 size variants
    const heartSizes = ['0.8rem', '1.4rem', '2rem'];
    for (let i = 0; i < 24; i++) {
      items.push({
        id: i,
        left: `${(i * 4.1 + 1.5) % 100}%`,
        top: `${(i * 7.3 + 3) % 100}%`,
        fontSize: heartSizes[i % 3],
        animationDuration: `${7 + (i % 6) * 1.5}s`,
        animationDelay: `${(i % 8) * 0.7}s`,
        opacity: 0.10 + (i % 5) * 0.04,
        type: 'heart',
      });
    }

    // 3 very large faint background hearts for dreamy depth
    const bgHeartSizes = ['5rem', '6rem', '4.5rem'];
    const bgOpacities = [0.04, 0.05, 0.06];
    for (let i = 0; i < 3; i++) {
      items.push({
        id: 100 + i,
        left: `${[15, 55, 80][i]}%`,
        top: `${[20, 60, 35][i]}%`,
        fontSize: bgHeartSizes[i],
        animationDuration: `${18 + i * 5}s`,
        animationDelay: `${i * 3}s`,
        opacity: bgOpacities[i],
        type: 'large-bg',
      });
    }

    // 8 small glowing dot particles
    const dotColors = [
      'rgba(249,168,212,0.45)',
      'rgba(192,132,252,0.40)',
      'rgba(253,164,175,0.42)',
      'rgba(216,180,254,0.38)',
      'rgba(251,207,232,0.45)',
      'rgba(249,168,212,0.35)',
      'rgba(192,132,252,0.42)',
      'rgba(253,164,175,0.40)',
    ];
    for (let i = 0; i < 8; i++) {
      items.push({
        id: 200 + i,
        left: `${(i * 12.5 + 6) % 100}%`,
        top: `${(i * 9.7 + 10) % 100}%`,
        fontSize: `${4 + (i % 3)}px`,
        animationDuration: `${9 + (i % 4) * 2}s`,
        animationDelay: `${i * 0.9}s`,
        opacity: 1,
        type: 'dot',
        color: dotColors[i],
      });
    }

    return items;
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
          0%   { transform: translateY(0px) rotate(0deg) scale(1); }
          25%  { transform: translateY(-18px) rotate(4deg) scale(1.03); }
          50%  { transform: translateY(-28px) rotate(-3deg) scale(1.06); }
          75%  { transform: translateY(-14px) rotate(5deg) scale(1.02); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }

        @keyframes floatBgHeart {
          0%   { transform: translateY(0px) rotate(0deg) scale(1); }
          50%  { transform: translateY(-30px) rotate(8deg) scale(1.04); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }

        @keyframes floatDot {
          0%   { transform: translateY(0px) scale(1); opacity: 0.3; }
          30%  { opacity: 0.6; }
          60%  { transform: translateY(-40px) scale(1.2); opacity: 0.5; }
          100% { transform: translateY(-70px) scale(0.8); opacity: 0; }
        }

        @keyframes dotRise {
          0%   { transform: translateY(0px); opacity: 0; }
          10%  { opacity: 0.5; }
          80%  { opacity: 0.4; }
          100% { transform: translateY(-80px); opacity: 0; }
        }
      `}</style>

      {particles.map((p) => {
        if (p.type === 'dot') {
          return (
            <span
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left,
                top: p.top,
                width: p.fontSize,
                height: p.fontSize,
                borderRadius: '50%',
                background: p.color,
                boxShadow: `0 0 6px ${p.color}, 0 0 12px ${p.color}`,
                animation: `dotRise ${p.animationDuration} ease-in-out infinite`,
                animationDelay: p.animationDelay,
                willChange: 'transform, opacity',
              }}
            />
          );
        }

        if (p.type === 'large-bg') {
          return (
            <span
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left,
                top: p.top,
                fontSize: p.fontSize,
                opacity: p.opacity,
                animation: `floatBgHeart ${p.animationDuration} ease-in-out infinite`,
                animationDelay: p.animationDelay,
                userSelect: 'none',
                willChange: 'transform, opacity',
                filter: 'blur(1px)',
              }}
            >
              ♥
            </span>
          );
        }

        // Regular heart
        return (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              fontSize: p.fontSize,
              opacity: p.opacity,
              animation: `floatHeart ${p.animationDuration} ease-in-out infinite`,
              animationDelay: p.animationDelay,
              userSelect: 'none',
              willChange: 'transform, opacity',
            }}
          >
            ♥
          </span>
        );
      })}
    </div>
  );
};

export default FloatingHearts;
