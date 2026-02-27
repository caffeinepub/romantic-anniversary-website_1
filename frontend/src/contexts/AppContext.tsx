import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
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

  // Autoplay music on mount; retry on first user interaction if blocked
  useEffect(() => {
    const audio = getAudio();
    if (!audio) return;

    const tryPlay = () => {
      try {
        const promise = audio.play();
        if (promise !== undefined) {
          promise.catch(() => {
            // Autoplay blocked — wait for first user interaction
            const resume = () => {
              try {
                audio.play().catch(() => {});
              } catch {
                // fail silently
              }
              document.removeEventListener('click', resume);
              document.removeEventListener('keydown', resume);
              document.removeEventListener('touchstart', resume);
            };
            document.addEventListener('click', resume, { once: true });
            document.addEventListener('keydown', resume, { once: true });
            document.addEventListener('touchstart', resume, { once: true });
          });
        }
      } catch {
        // fail silently
      }
    };

    tryPlay();
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

  return (
    <AppContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default AppContext;
