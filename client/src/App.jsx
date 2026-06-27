import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import SymptomForm from './pages/SymptomForm'
import Result from './pages/Result'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Public — anyone */}
            <Route path="/" element={<Home />} />

            {/* Public-only — redirect to dashboard if already logged in */}
            <Route path="/login"    element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

            {/* Protected — must be logged in */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/symptoms"  element={<ProtectedRoute><SymptomForm /></ProtectedRoute>} />
            <Route path="/result"    element={<ProtectedRoute><Result /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App