import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">
          Smart Healthcare Portal
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Enter your symptoms and get intelligent health recommendations
          instantly. Track your health history over time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Login
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-2">🩺</div>
            <h3 className="font-semibold text-gray-800 mb-1">Symptom Analysis</h3>
            <p className="text-sm text-gray-500">Enter symptoms and get instant recommendations</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-semibold text-gray-800 mb-1">Health History</h3>
            <p className="text-sm text-gray-500">Track all your past symptom checks</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-1">Secure & Private</h3>
            <p className="text-sm text-gray-500">Your health data is encrypted and safe</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home