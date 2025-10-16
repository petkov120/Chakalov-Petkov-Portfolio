import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Animation Error Boundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[200px] p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-center max-w-md">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Something went wrong with the animation
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Don't worry, the content is still here. The animation just needs a refresh.
        </p>
        <button
          onClick={resetError}
          className="bg-[#ac83f3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#9c6fec] transition-colors focus:ring-2 focus:ring-[#ac83f3] focus:ring-offset-2 focus:outline-none"
        >
          Try Again
        </button>
        {error && (
          <details className="mt-4 text-left">
            <summary className="text-xs text-gray-500 cursor-pointer">
              Technical details
            </summary>
            <pre className="mt-2 text-xs text-gray-400 bg-gray-900 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}