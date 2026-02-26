import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

const AppContext = createContext<AppContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  isMusicPlaying: false,
  toggleMusic: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const audio = new Audio('/assets/music.mp3');
      audio.loop = true;
      audio.volume = 0.3;
      audioRef.current = audio;
    } catch {
      // Audio unavailable — fail silently
    }
    return () => {
      if (audioRef.current) {
        try {
          audioRef.current.pause();
          audioRef.current = null;
        } catch {
          // ignore
        }
      }
    };
  }, []);

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    try {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          setIsMusicPlaying(false);
        });
        setIsMusicPlaying(true);
      }
    } catch {
      setIsMusicPlaying(false);
    }
  };

  return (
    <AppContext.Provider value={{ isDarkMode, toggleDarkMode, isMusicPlaying, toggleMusic }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default AppContext;
