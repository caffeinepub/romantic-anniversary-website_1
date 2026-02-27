import React from 'react';
import FloatingHearts from './FloatingHearts';
import { useAppContext } from '../contexts/AppContext';
import { Moon, Sun } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useAppContext();

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Ambient romantic glow overlay — fixed, non-interactive, behind everything */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Warm rose glow — bottom left */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 10% 90%, rgba(253,164,175,0.18) 0%, transparent 70%)',
          }}
        />
        {/* Soft lavender glow — top right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 55% 45% at 90% 10%, rgba(192,132,252,0.14) 0%, transparent 70%)',
          }}
        />
        {/* Warm blush center vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(249,168,212,0.08) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Floating hearts layer */}
      <FloatingHearts />

      {/* Fixed top-right controls */}
      <div
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 50,
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          style={{
            background: 'rgba(255,255,255,0.22)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isDarkMode ? '#fce4ec' : '#880e4f',
            transition: 'box-shadow 0.2s ease',
          }}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Page content — above all overlays */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default AppShell;
