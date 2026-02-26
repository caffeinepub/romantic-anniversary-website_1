import React, { useState } from 'react';

interface HerJourneyProps {
  onNext: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE SLOT MAP — actual uploaded photo paths:
//   Stage 1 — My Princess Is Born:
//     newborn-1 → WhatsApp Image 2026-02-18 at 11.04.50 PM (1).jpeg
//     newborn-2 → image-2.png
//     newborn-3 → WhatsApp Image 2026-02-18 at 11.04.49 PM.jpeg
//   Stage 2 — Growing Up (Teenage):
//     teenage-1 → WhatsApp Image 2026-02-18 at 11.05.09 PM.jpeg (toddler with pigtails)
//     teenage-2 → WhatsApp Image 2026-02-18 at 11.04.25 PM (1).jpeg (hugging elderly woman)
//     teenage-3 → image-3.png (blue dress, 16.11.2012)
//   Stage 3 — The Girl I Love:
//     now-1 → WhatsApp Image 2026-02-18 at 11.04.50 PM (2).jpeg (curly hair, floral top)
//     now-2 → WhatsApp Image 2026-02-18 at 11.04.51 PM (2).jpeg (red top, restaurant)
//     now-3 → WhatsApp Image 2026-02-18 at 11.04.55 PM (2).jpeg (black outfit, heritage wall)
// ─────────────────────────────────────────────────────────────────────────────

interface Stage {
  title: string;
  subtitle: string;
  images: string[];
  emoji: string;
  description: string;
}

const stages: Stage[] = [
  {
    title: 'My Princess Is Born',
    subtitle: 'The beginning of everything',
    images: [
      '/assets/WhatsApp Image 2026-02-18 at 11.04.50 PM (1).jpeg',
      '/assets/image-2.png',
      '/assets/WhatsApp Image 2026-02-18 at 11.04.49 PM.jpeg',
    ],
    emoji: '👶',
    description: `You once came into this world as a tiny little baby,
with the smallest hands and the purest heart.
You didn't know the world yet.
You didn't know love, heartbreak, dreams, or struggles.

But even then, you were growing into someone special.
Someone kind. Someone strong.
Someone who would one day change my life without even trying.

It's beautiful to think that the little baby in those pictures
would grow up to become the most important person in mine.`,
  },
  {
    title: 'Growing Up',
    subtitle: 'Finding yourself',
    images: [
      '/assets/WhatsApp Image 2026-02-18 at 11.05.09 PM.jpeg',
      '/assets/WhatsApp Image 2026-02-18 at 11.04.25 PM (1).jpeg',
      '/assets/image-3.png',
    ],
    emoji: '🌷',
    description: `In your teenage years,
you were learning, growing, and finding yourself.
You had your own dreams, your own fears, your own battles.

You were becoming stronger, wiser, more beautiful —
not just outside, but inside too.

Every phase shaped you into the girl you are today.
And I admire that version of you so much.
Because behind your smile,
there's a story of growth and strength.`,
  },
  {
    title: 'The Girl I Love',
    subtitle: 'The one who is mine',
    images: [
      '/assets/WhatsApp Image 2026-02-18 at 11.04.50 PM (2).jpeg',
      '/assets/WhatsApp Image 2026-02-18 at 11.04.51 PM (2).jpeg',
      '/assets/WhatsApp Image 2026-02-18 at 11.04.55 PM (2).jpeg',
    ],
    emoji: '💞',
    description: `And now… here you are.

Not just the little girl you once were.
Not just the teenager who was still figuring things out.
But the woman I fell in love with.

The one who makes me smile without trying.
The one who overthinks, cares deeply, loves honestly.
The one I choose every single day.

Out of all the versions of you,
this one — the one who is mine —
is my favorite. 🤍`,
  },
];

interface StageImageProps {
  src: string;
  alt: string;
  emoji: string;
}

const StageImage: React.FC<StageImageProps> = ({ src, alt, emoji }) => {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          borderRadius: '1rem',
        }}
      >
        <div style={{ fontSize: '3rem' }}>{emoji}</div>
        <div
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '0.85rem',
            color: '#9c3a6a',
            fontStyle: 'italic',
            opacity: 0.7,
          }}
        >
          {alt}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '1rem',
        display: 'block',
      }}
      onError={() => setErrored(true)}
    />
  );
};

const HerJourney: React.FC<HerJourneyProps> = ({ onNext }) => {
  const [activeStage, setActiveStage] = useState(0);

  const stage = stages[activeStage];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #fdf2f8 0%, #fce4ec 35%, #f3e8ff 70%, #e8d5f5 100%)',
        padding: '5rem 1.5rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes stageHeartFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(-14px) scale(1.15); opacity: 1; }
        }
        @keyframes stageFadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stage-tab:hover {
          background: rgba(233,30,140,0.12) !important;
        }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              display: 'inline-block',
              filter: 'drop-shadow(0 0 12px rgba(233,30,140,0.5))',
              animation: 'stageHeartFloat 3s ease-in-out infinite',
            }}
          >
            🌸
          </div>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: '#6b1a4a',
              marginBottom: '0.75rem',
              textShadow: '0 2px 20px rgba(136,14,79,0.15)',
            }}
          >
            Her Journey
          </h1>
          <p
            style={{
              color: '#9c3a6a',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            From the very beginning to right now.
          </p>
        </div>

        {/* Stage tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {stages.map((s, i) => (
            <button
              key={i}
              className="stage-tab"
              onClick={() => setActiveStage(i)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '2rem',
                border: activeStage === i ? '2px solid #e91e8c' : '2px solid rgba(233,30,140,0.25)',
                background: activeStage === i ? 'rgba(233,30,140,0.15)' : 'rgba(255,255,255,0.5)',
                color: activeStage === i ? '#c2185b' : '#9c3a6a',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '0.9rem',
                fontWeight: activeStage === i ? 700 : 400,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(8px)',
              }}
            >
              {s.emoji} {s.title}
            </button>
          ))}
        </div>

        {/* Stage content */}
        <div
          key={activeStage}
          style={{
            animation: 'stageFadeIn 0.45s ease forwards',
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: '1.75rem',
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(136,14,79,0.12)',
          }}
        >
          {/* Image grid — 3 photos side by side */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              padding: '1rem',
            }}
          >
            {stage.images.map((imgSrc, imgIdx) => (
              <div
                key={imgIdx}
                style={{
                  aspectRatio: '1 / 1',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(136,14,79,0.15)',
                  background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
                }}
              >
                <StageImage
                  src={imgSrc}
                  alt={`${stage.title} ${imgIdx + 1}`}
                  emoji={stage.emoji}
                />
              </div>
            ))}
          </div>

          {/* Text content */}
          <div style={{ padding: '1.75rem 2rem 2rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h2
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: '#6b1a4a',
                  marginBottom: '0.3rem',
                }}
              >
                {stage.emoji} {stage.title}
              </h2>
              <p
                style={{
                  color: '#b0527a',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                }}
              >
                {stage.subtitle}
              </p>
            </div>

            <div
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '0.97rem',
                color: '#7a2a50',
                lineHeight: 1.85,
                whiteSpace: 'pre-line',
                borderLeft: '3px solid rgba(233,30,140,0.3)',
                paddingLeft: '1.25rem',
              }}
            >
              {stage.description}
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.6rem',
            marginTop: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStage(i)}
              style={{
                width: i === activeStage ? '2rem' : '0.6rem',
                height: '0.6rem',
                borderRadius: '1rem',
                border: 'none',
                background: i === activeStage ? '#e91e8c' : 'rgba(233,30,140,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

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

export default HerJourney;
