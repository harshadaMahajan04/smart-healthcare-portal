const express = require('express')
const router = express.Router()
const {
  analyzeSymptoms,
  getSymptomHistory,
  deleteSymptomRecord,
} = require('../controllers/symptomController')
const { protect } = require('../middleware/authMiddleware')

// All routes are protected — user must be logged in
router.post('/analyze', protect, analyzeSymptoms)
router.get('/history', protect, getSymptomHistory)
router.delete('/:id', protect, deleteSymptomRecord)

module.exports = router