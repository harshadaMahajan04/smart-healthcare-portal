import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

// Attach JWT token to every outgoing request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('healthToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle global response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    // 401 = token expired or invalid → force logout
    if (status === 401) {
      localStorage.removeItem('healthToken')
      localStorage.removeItem('healthUser')

      // Only redirect if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default API