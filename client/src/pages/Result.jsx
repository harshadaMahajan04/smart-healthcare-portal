import { useLocation, useNavigate, Link } from 'react-router-dom'

const SEVERITY_CONFIG = {
  low: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    icon: '✅',
    label: 'Low Severity',
  },
  moderate: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    icon: '⚠️',
    label: 'Moderate Severity',
  },
  high: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    icon: '🚨',
    label: 'High Severity — See a Doctor',
  },
}

function Result() {
  const location = useLocation()
  const navigate = useNavigate()

  // Safely handle both { record: response.data } and { record: response.data.record }
  const raw = location.state?.record
  const record = raw?.symptoms ? raw : raw?.record ?? null

  // No data guard — friendly fallback
  if (!record) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">No result found</h2>
        <p className="text-gray-500 mb-6 text-center">
          Please complete the symptom form to get a recommendation.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/symptoms')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Check Symptoms
          </button>
          <Link
            to="/dashboard"
            className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const { symptoms = [], recommendation = {}, createdAt } = record

  const {
    condition = record.predictedDisease || record.disease || 'Unknown Condition',
    severity = record.severity || 'low',
    advice = record.advice || record.recommendations || '',
    medications = record.medications || [],
    seeDoctor = record.seeDoctor ?? false,
    confidence,
  } = recommendation

  // Normalize medications — backend may send array or string
  const medicationList = Array.isArray(medications)
    ? medications
    : typeof medications === 'string' && medications.length > 0
    ? [medications]
    : []

  // Normalize advice — backend may send array or string
  const adviceText = Array.isArray(advice) ? advice.join(' ') : advice

  const severityKey = ['low', 'moderate', 'high'].includes(severity) ? severity : 'low'
  const sev = SEVERITY_CONFIG[severityKey]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{sev.icon}</div>
          <h1 className="text-2xl font-bold text-gray-800">Health Recommendation</h1>
          {createdAt && (
            <p className="text-gray-400 text-sm mt-1">
              Analyzed on {new Date(createdAt).toLocaleString()}
            </p>
          )}
        </div>

        {/* Condition card */}
        <div className={`${sev.bg} border ${sev.border} rounded-2xl p-6 mb-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="text-xl font-bold text-gray-800">{condition}</h2>
            <div className="flex items-center gap-2">
              {confidence !== undefined && (
                <span className="text-xs font-medium bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full">
                  {typeof confidence === 'number'
                    ? `${(confidence * 100).toFixed(0)}% match`
                    : confidence}
                </span>
              )}
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${sev.badge}`}>
                {sev.label}
              </span>
            </div>
          </div>
          {adviceText && (
            <p className="text-gray-700 leading-relaxed">{adviceText}</p>
          )}
        </div>

        {/* Symptoms reported */}
        {symptoms.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <h3 className="font-semibold text-gray-700 mb-3">
              📋 Symptoms you reported ({symptoms.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
                >
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Medications */}
        {medicationList.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <h3 className="font-semibold text-gray-700 mb-3">💊 Suggested medications</h3>
            <ul className="space-y-2">
              {medicationList.map((med, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-500 mt-0.5">•</span>
                  {med}
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-3 italic">
              ⚠️ This is not a prescription. Always consult a licensed doctor before
              taking any medication.
            </p>
          </div>
        )}

        {/* See a doctor banner — shown for high severity or when seeDoctor flag is set */}
        {(seeDoctor || severityKey === 'high') && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
            <span className="text-2xl">🏥</span>
            <div>
              <p className="font-semibold text-red-700">Please see a doctor</p>
              <p className="text-sm text-red-600 mt-1">
                Based on your symptoms, we strongly recommend consulting a medical
                professional as soon as possible. Do not rely solely on this result.
              </p>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6 text-xs text-gray-500 leading-relaxed">
          <strong>Disclaimer:</strong> This tool is for informational purposes only and
          does not constitute medical advice, diagnosis, or treatment. Always seek the
          advice of a qualified health provider regarding any medical condition.
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/symptoms')}
            className="flex-1 border border-blue-600 text-blue-600 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-center"
          >
            ← Check Again
          </button>
          <Link
            to="/dashboard"
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Go to Dashboard →
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Result