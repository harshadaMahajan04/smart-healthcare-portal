import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

// All available symptoms organized by category
const SYMPTOM_CATEGORIES = [
  {
    category: 'Head & Neurological',
    icon: '🧠',
    symptoms: [
      'headache',
      'severe headache',
      'dizziness',
      'migraine',
      'sensitivity to light',
      'sensitivity to sound',
      'blurred vision',
    ],
  },
  {
    category: 'Respiratory',
    icon: '🫁',
    symptoms: [
      'cough',
      'dry cough',
      'shortness of breath',
      'congestion',
      'runny nose',
      'sneezing',
      'sore throat',
    ],
  },
  {
    category: 'Body & Muscles',
    icon: '💪',
    symptoms: [
      'fever',
      'mild fever',
      'chills',
      'body ache',
      'fatigue',
      'muscle cramps',
      'trembling',
      'sweating',
    ],
  },
  {
    category: 'Digestive',
    icon: '🫃',
    symptoms: [
      'nausea',
      'vomiting',
      'diarrhea',
      'stomach pain',
      'cramps',
      'loss of appetite',
    ],
  },
  {
    category: 'Skin & Eyes',
    icon: '👁️',
    symptoms: [
      'skin rash',
      'hives',
      'itchy eyes',
      'skin itching',
      'swelling',
    ],
  },
  {
    category: 'Heart & Circulation',
    icon: '❤️',
    symptoms: [
      'chest pain',
      'chest tightness',
      'palpitations',
      'nosebleed',
    ],
  },
  {
    category: 'General',
    icon: '🌡️',
    symptoms: [
      'loss of taste',
      'loss of smell',
      'dry mouth',
      'dark urine',
      'insomnia',
    ],
  },
]

function SymptomForm() {
  const navigate = useNavigate()
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    )
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (selectedSymptoms.length === 0) {
      return setError('Please select at least one symptom before submitting.')
    }
    if (selectedSymptoms.length < 2) {
      return setError('Please select at least 2 symptoms for a more accurate recommendation.')
    }

    setLoading(true)

    try {
      const response = await API.post('/symptoms/analyze', {
        symptoms: selectedSymptoms,
      })

      // Pass the result to the Result page via navigation state
      navigate('/result', { state: { record: response.data.record } })
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setSelectedSymptoms([])
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Symptom Checker</h1>
          <p className="text-gray-500 mt-2">
            Select all symptoms you are currently experiencing
          </p>
        </div>

        {/* Selected symptoms pill bar */}
        {selectedSymptoms.length > 0 && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">
                {selectedSymptoms.length} symptom{selectedSymptoms.length > 1 ? 's' : ''} selected
              </span>
              <button
                onClick={clearAll}
                className="text-xs text-blue-500 hover:text-blue-700 underline"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  {symptom} <span className="text-blue-200">×</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-6 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Symptom categories */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-8">
            {SYMPTOM_CATEGORIES.map((cat) => (
              <div key={cat.category} className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span>{cat.icon}</span> {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.symptoms.map((symptom) => {
                    const isSelected = selectedSymptoms.includes(symptom)
                    return (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => toggleSymptom(symptom)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}{symptom}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || selectedSymptoms.length === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Analyzing your symptoms...
              </span>
            ) : (
              `Analyze ${selectedSymptoms.length > 0 ? `(${selectedSymptoms.length}) ` : ''}Symptoms →`
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SymptomForm