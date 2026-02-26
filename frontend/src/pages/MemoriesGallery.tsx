import React, { useState, useEffect } from 'react';

interface MemoriesGalleryProps {
  onNext: () => void;
}

interface GalleryItem {
  src: string;
  alt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE SLOT MAP — actual uploaded photo paths:
//   gallery-1 → WhatsApp Image 2026-02-18 at 11.05.06 PM.jpeg
//   gallery-2 → WhatsApp Image 2026-02-18 at 11.05.11 PM (1).jpeg
//   gallery-3 → WhatsApp Image 2026-02-18 at 11.05.05 PM (1).jpeg
//   gallery-4 → WhatsApp Image 2026-02-18 at 11.05.06 PM (1).jpeg
//   gallery-5 → WhatsApp Image 2026-02-26 at 8.42.49 PM.jpeg
// ─────────────────────────────────────────────────────────────────────────────
const galleryItems: GalleryItem[] = [
  { src: '/assets/WhatsApp Image 2026-02-18 at 11.05.06 PM.jpeg', alt: 'Our Memory 1' },
  { src: '/assets/WhatsApp Image 2026-02-18 at 11.05.11 PM (1).jpeg', alt: 'Our Memory 2' },
  { src: '/assets/WhatsApp Image 2026-02-18 at 11.05.05 PM (1).jpeg', alt: 'Our Memory 3' },
  { src: '/assets/WhatsApp Image 2026-02-18 at 11.05.06 PM (1).jpeg', alt: 'Our Memory 4' },
  { src: '/assets/WhatsApp Image 2026-02-26 at 8.42.49 PM.jpeg', alt: 'Our Memory 5' },
];

interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const BG_HEARTS: FloatingHeart[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: 5 + i * 8,
  delay: i * 1.2,
  duration: 8 + (i % 4) * 2,
  size: 0.8 + (i % 3) * 0.4,
}));

interface GalleryImageProps {
  src: string;
  alt: string;
  slotNumber: number;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ src, alt, slotNumber }) => {
  const [errored, setErrored] = useState(false);

  return (
    <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
      {!errored ? (
        <img
          className="gallery-img"
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <div style={{ fontSize: '2.5rem' }}>📸</div>
          <div
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '0.8rem',
              color: '#9c3a6a',
              fontStyle: 'italic',
              opacity: 0.7,
            }}
          >
            Memory {slotNumber}
          </div>
        </div>
      )}
      {/* Glow overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, rgba(107,26,74,0.2) 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Floating hearts overlay */}
      {[0, 1, 2].map((hi) => (
        <div
          key={hi}
          style={{
            position: 'absolute',
            left: `${20 + hi * 30}%`,
            top: `${15 + hi * 20}%`,
            fontSize: '1rem',
            animation: `cardHeartFloat ${2.5 + hi * 0.7}s ease-in-out infinite`,
            animationDelay: `${hi * 0.6}s`,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 0 4px rgba(233,30,140,0.6))',
          }}
        >
          🤍
        </div>
      ))}
    </div>
  );
};

const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({ onNext }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setTimeout(() => setLightboxVisible(true), 10);
  };

  const closeLightbox = () => {
    setLightboxVisible(false);
    setTimeout(() => setLightboxIndex(null), 350);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxVisible(false);
    setTimeout(() => {
      setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
      setLightboxVisible(true);
    }, 200);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxVisible(false);
    setTimeout(() => {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
      setLightboxVisible(true);
    }, 200);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3e8ff 0%, #fce4ec 40%, #f8bbd0 70%, #e8d5f5 100%)',
        padding: '5rem 1.5rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes bgHeartFloat {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-100vh) translateX(15px) scale(0.7); opacity: 0; }
        }
        @keyframes cardHeartFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-12px) scale(1.1); opacity: 1; }
        }
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(0.88); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes lightboxOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.88); }
        }
        .gallery-card:hover .gallery-img {
          transform: scale(1.07);
        }
        .gallery-card:hover {
          box-shadow: 0 0 30px rgba(233,30,140,0.35), 0 12px 40px rgba(136,14,79,0.2) !important;
        }
      `}</style>

      {/* Background floating hearts */}
      {BG_HEARTS.map((h) => (
        <div
          key={h.id}
          style={{
            position: 'fixed',
            left: `${h.left}%`,
            bottom: '-5%',
            fontSize: `${h.size}rem`,
            animation: `bgHeartFloat ${h.duration}s ease-in-out infinite`,
            animationDelay: `${h.delay}s`,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0,
          }}
        >
          🤍
        </div>
      ))}

      <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              display: 'inline-block',
              filter: 'drop-shadow(0 0 12px rgba(233,30,140,0.5))',
              animation: 'cardHeartFloat 3s ease-in-out infinite',
            }}
          >
            📸
          </div>
          <h1
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700,
              color: '#6b1a4a',
              marginBottom: '0.75rem',
              textShadow: '0 2px 20px rgba(136,14,79,0.15)',
            }}
          >
            Our Memories
          </h1>
          <p
            style={{
              color: '#9c3a6a',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              fontFamily: 'Georgia, "Times New Roman", serif',
              lineHeight: 1.7,
            }}
          >
            Captured moments.<br />Forever feelings.
          </p>
        </div>

        {/* Gallery grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="gallery-card"
              onClick={() => openLightbox(index)}
              style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.7)',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(136,14,79,0.1)',
                transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              }}
            >
              <GalleryImage src={item.src} alt={item.alt} slotNumber={index + 1} />
            </div>
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20,5,15,0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            transition: 'opacity 0.35s ease',
            opacity: lightboxVisible ? 1 : 0,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '640px',
              width: '100%',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 0 60px rgba(233,30,140,0.3)',
              animation: lightboxVisible ? 'lightboxIn 0.35s ease forwards' : 'lightboxOut 0.35s ease forwards',
            }}
          >
            <LightboxImage src={galleryItems[lightboxIndex].src} alt={galleryItems[lightboxIndex].alt} />
            <div
              style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0,0,0,0.3)',
              }}
            >
              <button
                onClick={prevImage}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: '2.75rem',
                  height: '2.75rem',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease',
                }}
              >
                ‹
              </button>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {galleryItems.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: i === lightboxIndex ? '#e91e8c' : 'rgba(255,255,255,0.4)',
                      transition: 'background 0.2s ease',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={nextImage}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: '2.75rem',
                  height: '2.75rem',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s ease',
                }}
              >
                ›
              </button>
            </div>
          </div>
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '2.75rem',
              height: '2.75rem',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

const LightboxImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        style={{
          width: '100%',
          height: '300px',
          background: 'linear-gradient(135deg, #f8bbd0, #e1bee7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
        }}
      >
        📸
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', display: 'block', maxHeight: '75vh', objectFit: 'contain' }}
      onError={() => setErrored(true)}
    />
  );
};

export default MemoriesGallery;
