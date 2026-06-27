// import { createContext, useState, useContext } from 'react'

// const AuthContext = createContext()

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null)

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.jsx>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext)
// }
import { createContext, useState, useContext, useEffect } from 'react'

// 1. Create the context
const AuthContext = createContext()

// 2. Provider wraps the whole app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // On app load, check if a token already exists in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('healthToken')
    const savedUser = localStorage.getItem('healthUser')

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Called after successful login or register
  const login = (userData, jwtToken) => {
    setUser(userData)
    setToken(jwtToken)
    localStorage.setItem('healthToken', jwtToken)
    localStorage.setItem('healthUser', JSON.stringify(userData))
  }

  // Called on logout
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('healthToken')
    localStorage.removeItem('healthUser')
  }

  const value = { user, token, login, logout, loading }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. Custom hook — use this in any component to access auth state
export function useAuth() {
  return useContext(AuthContext)
}