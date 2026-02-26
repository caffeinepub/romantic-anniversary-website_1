import React, { useState } from 'react';

interface MonthPageProps {
  month: string;
  onBack: () => void;
  onNext: () => void;
}

const monthImages: Record<string, string> = {
  March: '/assets/generated/timeline-placeholder-march.dim_800x500.png',
  April: '/assets/generated/timeline-placeholder-april.dim_800x500.png',
  May: '/assets/generated/timeline-placeholder-may.dim_800x500.png',
  June: '/assets/generated/timeline-placeholder-june.dim_800x500.png',
  July: '/assets/generated/timeline-placeholder-july.dim_800x500.png',
  August: '/assets/generated/timeline-placeholder-august.dim_800x500.png',
  September: '/assets/generated/timeline-placeholder-september.dim_800x500.png',
  October: '/assets/generated/timeline-placeholder-october.dim_800x500.png',
  November: '/assets/generated/timeline-placeholder-november.dim_800x500.png',
};

const monthEmojis: Record<string, string> = {
  March: '🌸', April: '🌷', May: '🌺', June: '☀️',
  July: '🌻', August: '🏖️', September: '🍂', October: '🎃', November: '🍁',
};

const MonthPage: React.FC<MonthPageProps> = ({ month, onBack, onNext }) => {
  const [memory, setMemory] = useState('');

  const imageSrc = monthImages[month] || '/assets/generated/timeline-month.dim_800x500.png';
  const emoji = monthEmojis[month] || '💕';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #e1bee7 100%)',
        padding: '2rem 1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: '700px', width: '100%' }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(136,14,79,0.2)',
            borderRadius: '2rem',
            padding: '0.5rem 1.25rem',
            color: '#880e4f',
            cursor: 'pointer',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          ← Back to Timeline
        </button>

        {/* Card */}
        <div
          style={{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(136,14,79,0.15)',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <img
              src={imageSrc}
              alt={`${month} memories`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                borderRadius: '0.5rem',
                padding: '0.25rem 0.75rem',
                color: '#fff',
                fontSize: '0.8rem',
                fontStyle: 'italic',
              }}
            >
              Hover to replace with your photo
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{emoji}</div>
            <h1
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#880e4f',
                marginBottom: '1.5rem',
              }}
            >
              {month} 2025
            </h1>

            <label
              style={{
                display: 'block',
                fontSize: '0.9rem',
                color: '#ad1457',
                marginBottom: '0.5rem',
                fontStyle: 'italic',
              }}
            >
              Write your memories from this month...
            </label>
            <textarea
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
              placeholder={`What happened in ${month}? What made you smile? What do you want to remember forever?`}
              rows={6}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(136,14,79,0.2)',
                borderRadius: '0.75rem',
                color: '#880e4f',
                fontSize: '0.95rem',
                fontFamily: 'Georgia, "Times New Roman", serif',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box',
                lineHeight: 1.6,
              }}
            />

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={onBack}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(136,14,79,0.3)',
                  borderRadius: '2rem',
                  color: '#880e4f',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '0.9rem',
                }}
              >
                ← Back to Timeline
              </button>
              <button
                onClick={onNext}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #e91e8c, #9c27b0)',
                  border: 'none',
                  borderRadius: '2rem',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(233,30,140,0.3)',
                }}
              >
                Next Month →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthPage;
