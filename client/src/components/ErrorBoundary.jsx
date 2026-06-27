import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
          <div className="text-6xl mb-4">💔</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-500 text-sm mb-6 max-w-md">
            An unexpected error occurred in the application. Your data is safe.
            Try refreshing or going back to the home page.
          </p>
          {/* Show error detail only in development */}
          {import.meta.env.DEV && this.state.error && (
            <pre className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-4 mb-6 max-w-lg w-full text-left overflow-auto">
              {this.state.error.toString()}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Home Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary