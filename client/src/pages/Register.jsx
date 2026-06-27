// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// function Register() {
//   const navigate = useNavigate()
//   const { login } = useAuth()

//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   })

//   // UI state
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   // Update a single field
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//     setError('') // clear error when user types
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError('')

//     // --- Frontend validation ---
//     if (!formData.name.trim()) {
//       return setError('Name is required.')
//     }
//     if (!formData.email.includes('@')) {
//       return setError('Enter a valid email address.')
//     }
//     if (formData.password.length < 6) {
//       return setError('Password must be at least 6 characters.')
//     }
//     if (formData.password !== formData.confirmPassword) {
//       return setError('Passwords do not match.')
//     }

//     setLoading(true)

//     try {
//       // --- Phase 3: replace this block with a real API call ---
//       // const response = await API.post('/auth/register', {
//       //   name: formData.name,
//       //   email: formData.email,
//       //   password: formData.password,
//       // })
//       // const { user, token } = response.data
//       // login(user, token)

//       // SIMULATED response for Phase 2 testing
//       await new Promise((res) => setTimeout(res, 800))
//       const fakeUser = { name: formData.name, email: formData.email }
//       const fakeToken = 'simulated-jwt-token-123'
//       login(fakeUser, fakeToken)
//       // --- end simulation ---

//       navigate('/dashboard')
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
//       <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="text-4xl mb-2">🏥</div>
//           <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
//           <p className="text-gray-500 text-sm mt-1">Start tracking your health today</p>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">
//             ⚠️ {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="John Doe"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="john@example.com"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Min. 6 characters"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Re-enter your password"
//               className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               required
//             />
//           </div>

//           {/* Submit button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                 Creating account...
//               </span>
//             ) : (
//               'Create Account'
//             )}
//           </button>
//         </form>

//         {/* Footer link */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-600 font-medium hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Register

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim()) return setError('Name is required.')
    if (!formData.email.includes('@')) return setError('Enter a valid email address.')
    if (formData.password.length < 6) return setError('Password must be at least 6 characters.')
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.')

    setLoading(true)

    try {
      // ✅ Real API call to our backend
      const response = await API.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      const { user, token } = response.data
      login(user, token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏥</div>
          <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
          <p className="text-gray-500 text-sm mt-1">Start tracking your health today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register