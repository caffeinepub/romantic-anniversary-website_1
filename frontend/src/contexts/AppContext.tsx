import React, { createContext, useContext, useState, useEffect } from 'react';

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

// Module-level Audio instance — created exactly once per browser session
let _audio: HTMLAudioElement | null = null;

function getAudio(): HTMLAudioElement | null {
  if (_audio) return _audio;
  try {
    const audio = new Audio('/assets/Kadhaippoma Oh My Kadavule 128 Kbps.mp3');
    audio.loop = true;
    audio.volume = 1.0;
    audio.preload = 'auto';
    _audio = audio;
    return _audio;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Attach error listener once on mount
  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    const handleError = () => {
      setIsMusicPlaying(false);
    };

    audio.addEventListener('error', handleError);
    return () => {
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Dark mode effect
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // fail silently
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const toggleMusic = () => {
    const audio = getAudio();
    if (!audio) return;

    if (isMusicPlaying) {
      try {
        audio.pause();
        setIsMusicPlaying(false);
      } catch {
        // fail silently
      }
    } else {
      try {
        const promise = audio.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              setIsMusicPlaying(true);
            })
            .catch(() => {
              setIsMusicPlaying(false);
            });
        } else {
          setIsMusicPlaying(true);
        }
      } catch {
        setIsMusicPlaying(false);
      }
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
