import { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-dusty-grape-950 text-dusty-grape-100 p-6">
                    <h1 className="text-3xl font-bold text-red-400">Something went wrong</h1>
                    <p className="text-dusty-grape-300 text-center max-w-md">
                        An unexpected error occurred. Please refresh the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 rounded-lg bg-dusty-grape-700 hover:bg-dusty-grape-600 transition-colors font-semibold"
                    >
                        Refresh page
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}
