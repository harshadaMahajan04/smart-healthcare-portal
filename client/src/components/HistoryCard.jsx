import { useState } from 'react'

const SEVERITY_STYLES = {
  low: {
    badge: 'bg-green-100 text-green-700',
    icon: '✅',
    label: 'Low',
  },
  moderate: {
    badge: 'bg-yellow-100 text-yellow-700',
    icon: '⚠️',
    label: 'Moderate',
  },
  high: {
    badge: 'bg-red-100 text-red-700',
    icon: '🚨',
    label: 'High',
  },
}

function HistoryCard({ record, onDelete }) {
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const { _id, symptoms, recommendation, createdAt } = record
  const severity = SEVERITY_STYLES[recommendation?.severity] || SEVERITY_STYLES.low

  const handleDelete = async () => {
    if (!confirmDelete) {
      // First click — ask for confirmation
      setConfirmDelete(true)
      return
    }

    // Second click — actually delete
    setDeleting(true)
    await onDelete(_id)
    setDeleting(false)
  }

  const cancelDelete = () => setConfirmDelete(false)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">

      {/* Top row: condition + severity + date */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">
            {recommendation?.condition || 'Unknown Condition'}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${severity.badge}`}>
          {severity.icon} {severity.label}
        </span>
      </div>

      {/* Symptoms */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {symptoms.map((s) => (
          <span
            key={s}
            className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>

      {/* See doctor badge */}
      {recommendation?.seeDoctor && (
        <p className="text-xs text-red-500 font-medium mb-3">
          🏥 Doctor visit recommended
        </p>
      )}

      {/* Delete controls */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        {confirmDelete ? (
          <div className="flex items-center gap-2 w-full">
            <p className="text-xs text-red-600 font-medium flex-1">
              Are you sure?
            </p>
            <button
              onClick={cancelDelete}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded border border-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Yes, delete'}
            </button>
          </div>
        ) : (
          <button
            onClick={handleDelete}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors ml-auto"
          >
            🗑 Delete record
          </button>
        )}
      </div>
    </div>
  )
}

export default HistoryCard