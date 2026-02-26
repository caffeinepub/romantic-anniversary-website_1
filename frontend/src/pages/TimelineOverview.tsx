import React, { useState, useEffect, useRef } from 'react';

interface TimelineOverviewProps {
  onSelectMonth?: (month: string) => void;
  onNext: () => void;
}

interface MonthEntry {
  id: string;
  emoji: string;
  title: string;
  image: string;
  text: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE SLOT MAP — place your photos at these paths:
//   timeline-march.jpg       → March – The Beginning
//   timeline-april.jpg       → April – Our Secret Little Love
//   timeline-may.jpg         → May – The Break
//   timeline-june.jpg        → June – Silence
//   timeline-july.jpg        → July – Missing You
//   timeline-august.jpg      → August – I Still Cared
//   timeline-september.jpg   → September – Complete Distance
//   timeline-october.jpg     → October – The Comeback
//   timeline-november.jpg    → November – Our First Date
//   timeline-december.jpg    → December – Distance Begins
//   timeline-january.jpg     → January – Still Choosing You
//   timeline-february.jpg    → February – Growing Stronger
//   timeline-march10.jpg     → March 10 – One Year of Us
// ─────────────────────────────────────────────────────────────────────────────
const timelineEntries: MonthEntry[] = [
  {
    id: 'march',
    emoji: '🌸',
    title: 'March – The Beginning',
    image: '/assets/photos/timeline-march.jpg',
    text: `After so many struggles and waiting,
on March 10, you said yes.

That one word made everything worth it.
All the overthinking, all the fear, all the patience —
it suddenly made sense.

That day, we became us.

The day my world changed in the simplest way.`,
  },
  {
    id: 'april',
    emoji: '🌼',
    title: 'April – Our Secret Little Love',
    image: '/assets/photos/timeline-april.jpg',
    text: `We hung out with Om and Vighnesh
like everything was normal.

But we knew.

Holding your hand while walking,
and leaving it quickly when someone looked.
Acting calm outside,
while my heart was racing inside.

It felt exciting.
It felt special.

We had our own little world, and no one knew.`,
  },
  {
    id: 'may',
    emoji: '🌧',
    title: 'May – The Break',
    image: '/assets/photos/timeline-may.jpg',
    text: `Overthinking slowly came between us.
You asked to just be friends.

I didn't know how to love you less.
So instead of pretending,
I stepped away.

It hurt more than I showed.

Loving you and losing you at the same time was painful.`,
  },
  {
    id: 'june',
    emoji: '🌫',
    title: 'June – Silence',
    image: '/assets/photos/timeline-june.jpg',
    text: `No calls.
No texts.
No late-night talks.

Just memories.

I learned how loud silence can be
when you really miss someone.

The quiet felt heavier than any fight.`,
  },
  {
    id: 'july',
    emoji: '🌧',
    title: 'July – Missing You',
    image: '/assets/photos/timeline-july.jpg',
    text: `Another month without you.

I tried to act normal,
but everything reminded me of us.
There were so many things I wanted to tell you —
but nowhere to send them.

Some people never leave your heart.`,
  },
  {
    id: 'august',
    emoji: '🎂',
    title: 'August – I Still Cared',
    image: '/assets/photos/timeline-august.jpg',
    text: `Your birthday came.
And no matter what happened between us,
I couldn't stay silent.

I wished you.
Because caring never stopped.

I even asked you to come back.
I still believed in us.
But you said no.

And after that,
we stopped talking again.

Hope is brave, even when it hurts.`,
  },
  {
    id: 'september',
    emoji: '🌑',
    title: 'September – Complete Distance',
    image: '/assets/photos/timeline-september.jpg',
    text: `No conversations.
No updates.

It felt different this time.
Heavier.

But somewhere inside,
I still hoped this wasn't the end.

Sometimes love hides, but it doesn't disappear.`,
  },
  {
    id: 'october',
    emoji: '🍂',
    title: 'October – The Comeback',
    image: '/assets/photos/timeline-october.jpg',
    text: `With my last bit of courage,
I texted you again.

I didn't want regret.
I just wanted one more chance.

And you came back.

It felt like breathing again.
Like getting back something I thought I lost forever.

Some love stories are meant to restart.`,
  },
  {
    id: 'november',
    emoji: '🎬',
    title: 'November – Our First Date',
    image: '/assets/photos/timeline-november.jpg',
    text: `Our first real date.
Movie, pizza, sizzler.

But the best part was you sitting so close to me.

Your hands inside my hoodie,
holding me like you didn't want to move away.
I couldn't even focus on the movie.
My heart was beating fast the whole time.

Having you that close made me feel nervous, happy, and wanted.
I didn't want that moment to end.

That day felt warm.
It felt right.

Our first date, and I'll never forget how close we felt.`,
  },
  {
    id: 'december',
    emoji: '❄',
    title: 'December – Distance Begins',
    image: '/assets/photos/timeline-december.jpg',
    text: `After all that closeness,
distance became real.

No random hugs.
No sitting next to each other.

Some days were hard.
I missed you more than I said.

But even miles apart,
I didn't stop choosing you.

Distance showed me how much you matter.`,
  },
  {
    id: 'january',
    emoji: '🌟',
    title: 'January – Still Choosing You',
    image: '/assets/photos/timeline-january.jpg',
    text: `New year.
Same love.

We had our ups and downs.
Overthinking sometimes.
Missing each other a lot.

But through everything,
I stayed.

Because loving you isn't something I question.

I choose you — even on hard days.`,
  },
  {
    id: 'february',
    emoji: '💞',
    title: 'February – Growing Stronger',
    image: '/assets/photos/timeline-february.jpg',
    text: `We learned patience.
We learned understanding.
We learned how to love without being physically close.

It wasn't always easy.
But we didn't give up.

We grew stronger, not weaker.`,
  },
  {
    id: 'march10',
    emoji: '🌸',
    title: 'March 10 – One Year of Us',
    image: '/assets/photos/timeline-march10.jpg',
    text: `One year since you said yes.

After struggles, breaks, silence, distance, and comebacks —
we are still here.

Not perfect.
Not easy.
But real.

And if I could go back to the beginning,
I would still choose you.

Every single time. 🤍`,
  },
];

const FloatingHeartDivider: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem 0',
      gap: '1rem',
      position: 'relative',
    }}
  >
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(233,30,140,0.3))' }} />
    <div
      style={{
        fontSize: '1.4rem',
        animation: 'floatHeartDivider 3s ease-in-out infinite',
        filter: 'drop-shadow(0 0 8px rgba(233,30,140,0.6))',
      }}
    >
      🤍
    </div>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(233,30,140,0.3))' }} />
    <style>{`
      @keyframes floatHeartDivider {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-6px) scale(1.15); }
      }
    `}</style>
  </div>
);

interface TimelineImageProps {
  src: string;
  alt: string;
  emoji: string;
}

const TimelineImage: React.FC<TimelineImageProps> = ({ src, alt, emoji }) => {
  const [errored, setErrored] = useState(false);

  return (
    <div style={{ position: 'relative', paddingTop: '62.5%' }}>
      {!errored ? (
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={() => setErrored(true)}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #f8bbd0, #e1bee7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
          }}
        >
          {emoji}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, rgba(107,26,74,0.25) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const TimelineOverview: React.FC<TimelineOverviewProps> = ({ onNext }) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.08 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f3e8ff 0%, #fce4ec 30%, #f8bbd0 60%, #e8d5f5 100%)',
        padding: '5rem 1.5rem 4rem',
      }}
    >
      <style>{`
        @keyframes particleDrift {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(20px) scale(0.8); opacity: 0; }
        }
        @keyframes timelineEntryIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulseTimeline {
          0%, 100% { box-shadow: 0 0 20px rgba(233,30,140,0.2), 0 8px 40px rgba(136,14,79,0.12); }
          50% { box-shadow: 0 0 40px rgba(233,30,140,0.4), 0 12px 50px rgba(136,14,79,0.2); }
        }
      `}</style>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: `${10 + i * 12}%`,
            bottom: '-5%',
            fontSize: '1rem',
            animation: `particleDrift ${10 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 1.5}s`,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0,
          }}
        >
          🤍
        </div>
      ))}

      <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              animation: 'floatHeartDivider 3s ease-in-out infinite',
              display: 'inline-block',
              filter: 'drop-shadow(0 0 12px rgba(233,30,140,0.5))',
            }}
          >
            🌸
          </div>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700,
              color: '#6b1a4a',
              marginBottom: '0.75rem',
              letterSpacing: '-0.01em',
              textShadow: '0 2px 20px rgba(136,14,79,0.15)',
            }}
          >
            Our Story
          </h1>
          <p
            style={{
              color: '#9c3a6a',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '0.03em',
            }}
          >
            March to March — one whole year of us
          </p>
        </div>

        {/* Timeline entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {timelineEntries.map((entry, index) => {
            const isVisible = visibleItems.has(index);
            const isLast = index === timelineEntries.length - 1;
            const isEven = index % 2 === 0;

            return (
              <React.Fragment key={entry.id}>
                <div
                  ref={(el) => { itemRefs.current[index] = el; }}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                    transition: `opacity 0.9s ease ${index * 0.05}s, transform 0.9s ease ${index * 0.05}s`,
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    gap: '2rem',
                    alignItems: 'flex-start',
                    marginBottom: '0',
                  }}
                >
                  {/* Image side */}
                  <div
                    style={{
                      flex: '0 0 45%',
                      borderRadius: '1.25rem',
                      overflow: 'hidden',
                      boxShadow: '0 8px 40px rgba(136,14,79,0.18)',
                      animation: isVisible ? 'glowPulseTimeline 4s ease-in-out infinite' : 'none',
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    <TimelineImage src={entry.image} alt={entry.title} emoji={entry.emoji} />
                  </div>

                  {/* Text side */}
                  <div
                    style={{
                      flex: 1,
                      padding: '1.5rem',
                      background: 'rgba(255,255,255,0.55)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.7)',
                      borderRadius: '1.25rem',
                      boxShadow: '0 4px 30px rgba(136,14,79,0.1)',
                    }}
                  >
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{entry.emoji}</div>
                    <h2
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                        fontWeight: 700,
                        color: '#6b1a4a',
                        marginBottom: '1rem',
                        lineHeight: 1.3,
                      }}
                    >
                      {entry.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        fontSize: '0.92rem',
                        color: '#7a2a55',
                        lineHeight: 1.9,
                        whiteSpace: 'pre-line',
                        fontStyle: 'italic',
                      }}
                    >
                      {entry.text}
                    </p>
                  </div>
                </div>

                {!isLast && <FloatingHeartDivider />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Next button */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <div
            style={{
              fontSize: '2rem',
              marginBottom: '1.5rem',
              animation: 'floatHeartDivider 2.5s ease-in-out infinite',
              display: 'inline-block',
              filter: 'drop-shadow(0 0 10px rgba(233,30,140,0.5))',
            }}
          >
            🌸
          </div>
          <br />
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
              letterSpacing: '0.02em',
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

export default TimelineOverview;
