import React, { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import AppShell from './components/AppShell';
import LockScreen from './pages/LockScreen';
import HeroPage from './pages/HeroPage';

// Lazy-loaded pages
const TimelineOverview = React.lazy(() => import('./pages/TimelineOverview'));
const MonthPage = React.lazy(() => import('./pages/MonthPage'));
const MemoriesGallery = React.lazy(() => import('./pages/MemoriesGallery'));
const HerJourney = React.lazy(() => import('./pages/HerJourney'));
const LoveLetterPage = React.lazy(() => import('./pages/LoveLetterPage'));
const WhyILoveYou = React.lazy(() => import('./pages/WhyILoveYou'));
const CoupleQuiz = React.lazy(() => import('./pages/CoupleQuiz'));
const CountdownPage = React.lazy(() => import('./pages/CountdownPage'));
const FinalPage = React.lazy(() => import('./pages/FinalPage'));

type Page =
  | 'lock'
  | 'hero'
  | 'timeline'
  | 'month'
  | 'memories'
  | 'journey'
  | 'letter'
  | 'whyiloveyou'
  | 'quiz'
  | 'countdown'
  | 'final';

const SuspenseFallback = () => (
  <div
    style={{
      minHeight: '100vh',
      backgroundColor: '#fce4ec',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <span
      style={{
        fontSize: '3rem',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}
    >
      ❤️
    </span>
    <style>{`
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.3); opacity: 0.7; }
      }
    `}</style>
  </div>
);

// Heart transition overlay hearts config
const TRANSITION_HEARTS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 5 + 2) % 100}%`,
  size: `${1.2 + (i % 5) * 0.6}rem`,
  delay: `${(i % 8) * 0.07}s`,
  duration: `${0.9 + (i % 4) * 0.15}s`,
  color: ['#f9a8d4', '#f472b6', '#e879f9', '#c084fc', '#fb7185', '#fda4af'][i % 6],
  startX: `${(i * 13 + 10) % 80 - 40}px`,
}));

interface HeartTransitionOverlayProps {
  active: boolean;
}

const HeartTransitionOverlay: React.FC<HeartTransitionOverlayProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      className="heart-transition-overlay"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {TRANSITION_HEARTS.map((h) => (
        <span
          key={h.id}
          className="transition-heart"
          style={{
            position: 'absolute',
            left: h.left,
            bottom: '10%',
            fontSize: h.size,
            color: h.color,
            animationDelay: h.delay,
            animationDuration: h.duration,
            '--start-x': h.startX,
          } as React.CSSProperties}
        >
          ♥
        </span>
      ))}
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('lock');
  const [currentMonth, setCurrentMonth] = useState<string>('March');
  const [transitionActive, setTransitionActive] = useState(false);
  const pendingPageRef = useRef<Page | null>(null);
  const pendingMonthRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const navigateTo = useCallback((page: Page) => {
    // Don't animate on lock screen unlock (first navigation)
    if (currentPage === 'lock') {
      setCurrentPage(page);
      return;
    }
    pendingPageRef.current = page;
    setTransitionActive(true);
    timerRef.current = setTimeout(() => {
      if (pendingPageRef.current !== null) {
        setCurrentPage(pendingPageRef.current);
        pendingPageRef.current = null;
      }
      setTransitionActive(false);
    }, 950);
  }, [currentPage]);

  const navigateToMonth = useCallback((month: string) => {
    pendingMonthRef.current = month;
    pendingPageRef.current = 'month';
    setTransitionActive(true);
    timerRef.current = setTimeout(() => {
      if (pendingMonthRef.current !== null) {
        setCurrentMonth(pendingMonthRef.current);
        pendingMonthRef.current = null;
      }
      if (pendingPageRef.current !== null) {
        setCurrentPage(pendingPageRef.current);
        pendingPageRef.current = null;
      }
      setTransitionActive(false);
    }, 950);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'lock':
        return <LockScreen onUnlock={() => navigateTo('hero')} />;
      case 'hero':
        return <HeroPage onNext={() => navigateTo('timeline')} />;
      case 'timeline':
        return (
          <Suspense fallback={<SuspenseFallback />}>
            <TimelineOverview
              onSelectMonth={navigateToMonth}
              onNext={() => navigateTo('memories')}
            />
          </Suspense>
        );
      case 'month':
        return (
          <Suspense fallback={<SuspenseFallback />}>
            <MonthPage
              month={currentMonth}
              onBack={() => navigateTo('timeline')}
              onNext={() => navigateTo('timeline')}
            />
          </Suspense>
        );
      case 'memories':
        return (
          <Suspense fallback={<SuspenseFallback />}>
            <MemoriesGallery onNext={() => navigateTo('journey')} />
          </Suspense>
        );
      case 'journey':
        return (
          <Suspense fallback={<SuspenseFallback />}>
            <HerJourney onNext={() => navigateTo('letter')} />
          </Suspense>
        );
      case 'letter':
        return (
          <Suspense fallback={<SuspenseFallback />}>
            <LoveLetterPage onNext={() => navigateTo('whyiloveyou')} />
          </Suspense>
        );
      case 'whyiloveyou':
        return (
          <Suspense fallback={<SuspenseFallback />}>
            <WhyILoveYou onNext={() => navigateTo('quiz')} />
          </Suspense>
        );
      case 'quiz':
        return (
          <Suspense fallback={<SuspenseFallback />}>
            <CoupleQuiz onNext={() => navigateTo('countdown')} />
          </Suspense>
        );
      case 'countdown':
        return (
          <Suspense fallback={<SuspenseFallback />}>
            <CountdownPage onNext={() => navigateTo('final')} />
          </Suspense>
        );
      case 'final':
        return (
          <Suspense fallback={<SuspenseFallback />}>
            <FinalPage onRestart={() => navigateTo('lock')} />
          </Suspense>
        );
      default:
        return <LockScreen onUnlock={() => navigateTo('hero')} />;
    }
  };

  return (
    <ErrorBoundary>
      <AppShell>
        <div style={{ position: 'relative' }}>
          {renderPage()}
          <HeartTransitionOverlay active={transitionActive} />
        </div>
      </AppShell>
    </ErrorBoundary>
  );
}
