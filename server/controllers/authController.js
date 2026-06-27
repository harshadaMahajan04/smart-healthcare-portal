const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Helper: generate a JWT token for a user
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  })
}

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Check all fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' })
    }

    // Create the user (password is hashed automatically via the model's pre-save hook)
    const user = await User.create({ name, email, password })

    // Generate JWT
    const token = generateToken(user._id)

    // Send back user info + token
    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Register error:', error.message)
    res.status(500).json({ message: 'Server error during registration' })
  }
}

// @route   POST /api/auth/login
// @desc    Login user and return token
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Compare password
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate JWT
    const token = generateToken(user._id)

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error.message)
    res.status(500).json({ message: 'Server error during login' })
  }
}

// @route   GET /api/auth/me
// @desc    Get logged-in user's profile
// @access  Private (requires token)
const getMe = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      },
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { registerUser, loginUser, getMe }