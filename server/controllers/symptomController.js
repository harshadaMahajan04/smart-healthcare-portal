const SymptomHistory = require('../models/SymptomHistory')

// ─────────────────────────────────────────────
//  RECOMMENDATION ENGINE
//  Maps symptom combinations → conditions
// ─────────────────────────────────────────────

const recommendationRules = [
  {
    condition: 'Influenza (Flu)',
    keywords: ['fever', 'chills', 'body ache', 'fatigue', 'headache', 'sore throat'],
    minMatch: 3,
    severity: 'moderate',
    advice:
      'You may have the flu. Rest at home, drink plenty of fluids, and monitor your temperature. Symptoms usually resolve within 7–10 days.',
    medications: ['Paracetamol (for fever)', 'Ibuprofen (for body ache)', 'ORS (for hydration)'],
    seeDoctor: false,
  },
  {
    condition: 'Common Cold',
    keywords: ['runny nose', 'sneezing', 'sore throat', 'cough', 'mild fever', 'congestion'],
    minMatch: 2,
    severity: 'low',
    advice:
      'You likely have a common cold. Stay warm, rest well, and stay hydrated. Symptoms typically last 5–7 days.',
    medications: ['Antihistamines', 'Decongestants', 'Vitamin C supplements'],
    seeDoctor: false,
  },
  {
    condition: 'COVID-19 (Possible)',
    keywords: ['fever', 'dry cough', 'loss of taste', 'loss of smell', 'fatigue', 'shortness of breath'],
    minMatch: 3,
    severity: 'high',
    advice:
      'Your symptoms may indicate COVID-19. Isolate yourself immediately, get tested, and contact your local health authority. Monitor oxygen levels.',
    medications: ['Paracetamol (for fever)', 'Consult doctor before any medication'],
    seeDoctor: true,
  },
  {
    condition: 'Migraine',
    keywords: ['severe headache', 'nausea', 'vomiting', 'sensitivity to light', 'sensitivity to sound', 'dizziness'],
    minMatch: 2,
    severity: 'moderate',
    advice:
      'You may be experiencing a migraine. Rest in a quiet, dark room. Avoid screens and bright lights. Stay hydrated.',
    medications: ['Ibuprofen', 'Sumatriptan (prescription)', 'Anti-nausea medication'],
    seeDoctor: false,
  },
  {
    condition: 'Gastroenteritis (Stomach Flu)',
    keywords: ['nausea', 'vomiting', 'diarrhea', 'stomach pain', 'cramps', 'fever'],
    minMatch: 2,
    severity: 'moderate',
    advice:
      'You may have a stomach infection. Avoid solid foods initially, sip clear fluids or ORS frequently, and rest. See a doctor if vomiting persists beyond 48 hours.',
    medications: ['ORS (Oral Rehydration Salts)', 'Antacids', 'Probiotics'],
    seeDoctor: false,
  },
  {
    condition: 'Hypertension Symptoms',
    keywords: ['severe headache', 'blurred vision', 'chest pain', 'shortness of breath', 'nosebleed'],
    minMatch: 2,
    severity: 'high',
    advice:
      'Your symptoms may be related to high blood pressure. Sit down and rest. Avoid caffeine and stress. Seek immediate medical attention if chest pain worsens.',
    medications: ['Consult a doctor immediately — do not self-medicate'],
    seeDoctor: true,
  },
  {
    condition: 'Allergic Reaction',
    keywords: ['sneezing', 'runny nose', 'itchy eyes', 'skin rash', 'hives', 'congestion'],
    minMatch: 2,
    severity: 'low',
    advice:
      'You may be experiencing an allergic reaction. Identify and avoid the allergen. Antihistamines can help relieve symptoms. Seek emergency help if you experience swelling of the throat.',
    medications: ['Antihistamines (Cetirizine or Loratadine)', 'Nasal spray'],
    seeDoctor: false,
  },
  {
    condition: 'Anxiety or Panic Attack',
    keywords: ['palpitations', 'shortness of breath', 'chest tightness', 'dizziness', 'sweating', 'trembling'],
    minMatch: 3,
    severity: 'moderate',
    advice:
      'Your symptoms may indicate anxiety or a panic attack. Practice slow, deep breathing. Sit in a safe, calm environment. Talk to someone you trust. Consider speaking to a mental health professional.',
    medications: ['No self-medication recommended', 'Consult a doctor or therapist'],
    seeDoctor: true,
  },
  {
    condition: 'Dehydration',
    keywords: ['dry mouth', 'fatigue', 'dizziness', 'dark urine', 'headache', 'muscle cramps'],
    minMatch: 2,
    severity: 'low',
    advice:
      'You may be dehydrated. Drink water or ORS immediately. Avoid caffeine and alcohol. In hot weather, stay in cool areas and replenish electrolytes.',
    medications: ['ORS (Oral Rehydration Salts)', 'Electrolyte drinks'],
    seeDoctor: false,
  },
  {
    condition: 'General Health Advisory',
    keywords: [],
    minMatch: 0,
    severity: 'low',
    advice:
      'Based on your symptoms, no specific condition was identified. Monitor how you feel over the next 24 hours. Stay hydrated, rest well, and eat a balanced meal. If symptoms worsen, consult a doctor.',
    medications: ['General multivitamins', 'Stay hydrated'],
    seeDoctor: false,
  },
]

// Core matching function
const getRecommendation = (userSymptoms) => {
  const normalizedSymptoms = userSymptoms.map((s) => s.toLowerCase().trim())

  let bestMatch = null
  let highestScore = 0

  for (const rule of recommendationRules) {
    if (rule.keywords.length === 0) continue // skip fallback rule

    const matchCount = rule.keywords.filter((keyword) =>
      normalizedSymptoms.some(
        (symptom) => symptom.includes(keyword) || keyword.includes(symptom)
      )
    ).length

    const score = matchCount / rule.keywords.length

    if (matchCount >= rule.minMatch && score > highestScore) {
      highestScore = score
      bestMatch = rule
    }
  }

  // Return best match or fallback
  return bestMatch || recommendationRules[recommendationRules.length - 1]
}

// ─────────────────────────────────────────────
//  ROUTE CONTROLLERS
// ─────────────────────────────────────────────

// @route   POST /api/symptoms/analyze
// @desc    Analyze symptoms and return + save recommendation
// @access  Private
const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ message: 'Please provide at least one symptom.' })
    }

    // Get recommendation from engine
    const rule = getRecommendation(symptoms)

    const recommendation = {
      condition: rule.condition,
      severity: rule.severity,
      advice: rule.advice,
      medications: rule.medications,
      seeDoctor: rule.seeDoctor,
    }

    // Save to MongoDB
    const record = await SymptomHistory.create({
      user: req.user._id,
      symptoms,
      recommendation,
    })

    res.status(201).json({
      message: 'Analysis complete',
      record,
    })
  } catch (error) {
    console.error('Symptom analysis error:', error.message)
    res.status(500).json({ message: 'Server error during analysis' })
  }
}

// @route   GET /api/symptoms/history
// @desc    Get all symptom records for the logged-in user
// @access  Private
const getSymptomHistory = async (req, res) => {
  try {
    const history = await SymptomHistory.find({ user: req.user._id })
      .sort({ createdAt: -1 }) // newest first
      .limit(20)

    res.status(200).json({ history })
  } catch (error) {
    console.error('History fetch error:', error.message)
    res.status(500).json({ message: 'Server error fetching history' })
  }
}

// @route   DELETE /api/symptoms/:id
// @desc    Delete a single symptom record
// @access  Private
const deleteSymptomRecord = async (req, res) => {
  try {
    const record = await SymptomHistory.findById(req.params.id)

    if (!record) {
      return res.status(404).json({ message: 'Record not found' })
    }

    // Make sure the record belongs to the logged-in user
    if (record.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this record' })
    }

    await record.deleteOne()
    res.status(200).json({ message: 'Record deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error.message)
    res.status(500).json({ message: 'Server error during deletion' })
  }
}

module.exports = { analyzeSymptoms, getSymptomHistory, deleteSymptomRecord }