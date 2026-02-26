import React from 'react';
import FloatingHearts from './FloatingHearts';
import { useAppContext } from '../contexts/AppContext';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode, isMusicPlaying, toggleMusic } = useAppContext();

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <FloatingHearts />
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
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isDarkMode ? '#fce4ec' : '#880e4f',
          }}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={toggleMusic}
          aria-label="Toggle music"
          style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: isDarkMode ? '#fce4ec' : '#880e4f',
          }}
        >
          {isMusicPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default AppShell;
