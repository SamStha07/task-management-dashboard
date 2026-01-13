import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetKey: number;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      resetKey: Date.now(),
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      resetKey: Date.now(),
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className={cn(
            'flex min-h-screen items-center justify-center',
            this.props.className
          )}
        >
          <div className="w-full max-w-2xl p-6">
            <div className="text-center">
              <h1 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">
                Oops! Something went wrong
              </h1>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                We're sorry, but something unexpected happened. Please try
                refreshing the page or contact support if the problem persists.
              </p>

              {import.meta.env.MODE === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Error details (for developers)
                  </summary>
                  <div className="mt-4 overflow-auto rounded-md bg-gray-100 p-4 dark:bg-gray-800">
                    <p className="mb-2 font-mono text-sm text-red-600 dark:text-red-400">
                      {this.state.error.toString()}
                    </p>
                    {this.state.errorInfo && (
                      <pre className="text-xs whitespace-pre-wrap text-gray-600 dark:text-gray-400">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              <div className="flex justify-center gap-3">
                <Button onClick={this.handleReset}>Try Again</Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // key ensures full remount if Try Again is clicked
    return <div key={this.state.resetKey}>{this.props.children}</div>;
  }
}
