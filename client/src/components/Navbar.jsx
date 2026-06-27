import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  // Helper to highlight the active link
  const isActive = (path) =>
    location.pathname === path
      ? 'text-white font-semibold'
      : 'text-blue-100 hover:text-white transition-colors'

  return (
    <nav className="bg-blue-600 shadow-md relative z-40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-white text-lg font-bold tracking-tight flex items-center gap-2"
        >
          🏥 <span>HealthPortal</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-5 text-sm">
          <Link to="/" className={isActive('/')}>Home</Link>

          {user ? (
            <>
              <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
              <Link to="/symptoms" className={isActive('/symptoms')}>Check Symptoms</Link>
              <span className="text-blue-200 text-xs hidden lg:inline">
                Hi, {user.name} 👋
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={isActive('/login')}>Login</Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-white focus:outline-none p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            // X icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 pt-2 flex flex-col gap-3 text-sm">
          <Link to="/" onClick={closeMenu} className="text-blue-100 hover:text-white py-1">
            Home
          </Link>

          {user ? (
            <>
              <span className="text-blue-300 text-xs border-t border-blue-600 pt-2">
                Signed in as {user.name}
              </span>
              <Link to="/dashboard" onClick={closeMenu} className="text-blue-100 hover:text-white py-1">
                Dashboard
              </Link>
              <Link to="/symptoms" onClick={closeMenu} className="text-blue-100 hover:text-white py-1">
                Check Symptoms
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="text-blue-100 hover:text-white py-1">
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar