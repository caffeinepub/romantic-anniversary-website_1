import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#fce4ec',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
          <p style={{ fontSize: '1.25rem', color: '#880e4f', textAlign: 'center', padding: '0 1rem' }}>
            Something went wrong. Please refresh.
          </p>
          {this.state.error && (
            <p style={{ fontSize: '0.75rem', color: '#ad1457', marginTop: '0.5rem', opacity: 0.7 }}>
              {this.state.error.message}
            </p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
