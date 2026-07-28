import { Link } from 'react-router-dom'
import { Base } from '../components/Base.jsx'

export function NotFound() {
    return (
        <Base>
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-dusty-grape-100">
                <h1 className="text-8xl font-bold text-dusty-grape-400">404</h1>
                <p className="text-2xl font-semibold">Page not found</p>
                <p className="text-dusty-grape-300">The page you're looking for doesn't exist.</p>
                <Link
                    to="/"
                    className="px-6 py-2 rounded-lg bg-dusty-grape-700 hover:bg-dusty-grape-600 transition-colors font-semibold"
                >
                    Go home
                </Link>
            </div>
        </Base>
    )
}
