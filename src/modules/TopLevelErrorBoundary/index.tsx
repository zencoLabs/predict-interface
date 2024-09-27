import React from "react";

interface State {
  hasError: boolean;
  error: string | null;
  errorInfo: string | null;
}

class TopLevelErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidCatch(_error: unknown, errorInfo: any) {
    try {
      const error =
        String(_error) === "[object Object]"
          ? JSON.stringify(_error)
          : String(_error);
      this.setState({
        error: error,
        errorInfo: String(errorInfo?.componentStack),
      });
    } catch (error) {
      console.log("error", error);
      this.setState({
        error: String(_error),
        errorInfo: String(errorInfo?.componentStack),
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-gray-100 h-full break-all px-30px">
          <h1 className="text-center text-(28px, red-normal) font-semibold m-0 py-30px">
            Unfortunately, some unexpected errors occurred!
          </h1>

          {this.state.error && (
            <>
              {this.state.error && (
                <p className="mb-12px">{this.state.error}</p>
              )}
              {this.state.errorInfo && (
                <pre className="lt-web:hidden">{this.state.errorInfo}</pre>
              )}
            </>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default TopLevelErrorBoundary;
