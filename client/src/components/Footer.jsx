import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2 text-blue-600 font-bold">
            🏥 <span>HealthPortal</span>
          </div>

          <p className="text-xs text-gray-400 text-center">
            For informational purposes only. Not a substitute for professional medical advice.
          </p>

          <div className="flex gap-4 text-xs text-gray-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/symptoms" className="hover:text-blue-600 transition-colors">Symptoms</Link>
            <Link to="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          </div>
        </div>

        <div className="text-center text-xs text-gray-300 mt-4">
          © {new Date().getFullYear()} HealthPortal. Built with React, Node.js &amp; MongoDB.
        </div>
      </div>
    </footer>
  )
}

export default Footer