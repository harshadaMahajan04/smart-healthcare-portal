// const express = require('express')
// const dotenv = require('dotenv')
// const cors = require('cors')
// const connectDB = require('./config/db')

// // Load environment variables from .env
// dotenv.config()

// // Connect to MongoDB
// connectDB()

// const app = express()

// // Middleware
// // app.use(cors({
// //   origin: 'http://localhost:5173', // React frontend URL
// //   credentials: true,
// // }))
// app.use(cors({
//   origin: ['http://localhost:5173', 'http://localhost:5174'],
//   credentials: true,
// }))
// app.use(express.json()) // parse incoming JSON requests

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'))
// app.use('/api/symptoms', require('./routes/symptomRoutes')) // ← NEW



// // Health check route
// app.get('/', (req, res) => {
//   res.json({ message: 'Smart Healthcare Portal API is running ✅' })
// })

// // Handle unknown routes
// app.use((req, res) => {
//   res.status(404).json({ message: `Route ${req.originalUrl} not found` })
// })

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).json({ message: 'Something went wrong on the server' })
// })

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`)
// })


const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()

// Allow requests from both local dev and production frontend
const allowedOrigins = [
  'http://localhost:5173','http://localhost:5174',
  process.env.CLIENT_URL, // set this in Render environment variables
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error(`CORS policy blocked: ${origin}`))
    },
    credentials: true,
  })
)

app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/symptoms', require('./routes/symptomRoutes'))

app.get('/', (req, res) => {
  res.json({ message: 'Smart Healthcare Portal API is running ✅' })
})

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong on the server' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})