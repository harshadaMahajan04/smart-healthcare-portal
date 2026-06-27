import { Link, useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="text-8xl font-bold text-blue-100 select-none mb-2">404</div>
      <div className="text-5xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h1>
      <p className="text-gray-500 text-sm mb-8 max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(-1)}
          className="border border-gray-300 text-gray-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          ← Go Back
        </button>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound