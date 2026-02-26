import React, { Suspense, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('lock');
  const [currentMonth, setCurrentMonth] = useState<string>('March');

  const navigateTo = (page: Page) => setCurrentPage(page);

  const navigateToMonth = (month: string) => {
    setCurrentMonth(month);
    setCurrentPage('month');
  };

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
      {renderPage()}
    </ErrorBoundary>
  );
}
