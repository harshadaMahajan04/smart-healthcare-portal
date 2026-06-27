// import { Link } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import useSymptomHistory from '../hooks/useSymptomHistory'
// import HistoryCard from '../components/HistoryCard'
// import LoadingSpinner from '../components/LoadingSpinner'
// import DashboardSkeleton from '../components/DashboardSkeleton'

// // Compute stats from the history array
// function computeStats(history) {
//   const total = history.length

//   const severityCounts = { low: 0, moderate: 0, high: 0 }
//   history.forEach((r) => {
//     const sev = r.recommendation?.severity
//     if (sev in severityCounts) severityCounts[sev]++
//   })

//   const mostRecent = history[0] || null

//   // Most common condition
//   const conditionFrequency = {}
//   history.forEach((r) => {
//     const cond = r.recommendation?.condition
//     if (cond) conditionFrequency[cond] = (conditionFrequency[cond] || 0) + 1
//   })
//   const topCondition =
//     Object.entries(conditionFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || null

//   return { total, severityCounts, mostRecent, topCondition }
// }

// function Dashboard() {
//   const { user } = useAuth()
//   const { history, loading, error, deleteRecord, refetch } = useSymptomHistory()

//   const stats = computeStats(history)

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-4">
//       <div className="max-w-4xl mx-auto space-y-6">

//         {/* ── Welcome header ── */}
//         <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shrink-0">
//               {user?.name?.charAt(0).toUpperCase()}
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-800">
//                 Welcome back, {user?.name}!
//               </h1>
//               <p className="text-gray-400 text-sm">{user?.email}</p>
//             </div>
//           </div>
//           <Link
//             to="/symptoms"
//             className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm shrink-0"
//           >
//             + Check Symptoms
//           </Link>
//         </div>

//         {/* ── Stats row ── */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           <StatCard
//             icon="📋"
//             label="Total checks"
//             value={stats.total}
//             sub="all time"
//           />
//           <StatCard
//             icon="✅"
//             label="Low severity"
//             value={stats.severityCounts.low}
//             sub="records"
//             color="text-green-600"
//           />
//           <StatCard
//             icon="⚠️"
//             label="Moderate"
//             value={stats.severityCounts.moderate}
//             sub="records"
//             color="text-yellow-600"
//           />
//           <StatCard
//             icon="🚨"
//             label="High severity"
//             value={stats.severityCounts.high}
//             sub="records"
//             color="text-red-600"
//           />
//         </div>

//         {/* ── Top condition banner ── */}
//         {stats.topCondition && (
//           <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
//             <span className="text-2xl">🩺</span>
//             <div>
//               <p className="text-sm font-semibold text-blue-800">
//                 Most frequent condition
//               </p>
//               <p className="text-blue-600 text-sm">{stats.topCondition}</p>
//             </div>
//           </div>
//         )}

//         {/* ── History section ── */}
//         <div>
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-bold text-gray-800">
//               Symptom History
//               {history.length > 0 && (
//                 <span className="ml-2 text-sm font-normal text-gray-400">
//                   ({history.length} record{history.length !== 1 ? 's' : ''})
//                 </span>
//               )}
//             </h2>
//             <button
//               onClick={refetch}
//               className="text-xs text-blue-500 hover:text-blue-700 underline"
//             >
//               ↻ Refresh
//             </button>
//           </div>

//           {/* Error state */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
//               ⚠️ {error}
//             </div>
//           )}

//           {/* Empty state */}
//           {!error && history.length === 0 && (
//             <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
//               <div className="text-5xl mb-4">🩺</div>
//               <h3 className="text-lg font-semibold text-gray-700 mb-2">
//                 No symptom checks yet
//               </h3>
//               <p className="text-gray-400 text-sm mb-6">
//                 Use the symptom checker to get your first health recommendation.
//                 All your records will appear here.
//               </p>
//               <Link
//                 to="/symptoms"
//                 className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
//               >
//                 Check Symptoms Now
//               </Link>
//             </div>
//           )}

//           {/* History cards */}
//           {history.length > 0 && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {history.map((record) => (
//                 <HistoryCard
//                   key={record._id}
//                   record={record}
//                   onDelete={deleteRecord}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ── Health tips footer ── */}
//         <div className="bg-white rounded-2xl shadow-sm p-6">
//           <h2 className="text-base font-bold text-gray-800 mb-4">
//             💡 General health tips
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <TipCard
//               icon="💧"
//               title="Stay hydrated"
//               tip="Drink 8–10 glasses of water daily. Dehydration worsens most common symptoms."
//             />
//             <TipCard
//               icon="😴"
//               title="Prioritize sleep"
//               tip="7–9 hours of quality sleep helps your immune system fight infections faster."
//             />
//             <TipCard
//               icon="🥦"
//               title="Eat balanced meals"
//               tip="Include fruits, vegetables, and proteins in every meal for faster recovery."
//             />
//           </div>
//         </div>

//       </div>
//     </div>
//   )
// }

// // ── Small reusable sub-components ──

// function StatCard({ icon, label, value, sub, color = 'text-blue-600' }) {
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4 text-center">
//       <div className="text-2xl mb-1">{icon}</div>
//       <div className={`text-2xl font-bold ${color}`}>{value}</div>
//       <div className="text-xs font-medium text-gray-600 mt-0.5">{label}</div>
//       <div className="text-xs text-gray-400">{sub}</div>
//     </div>
//   )
// }

// function TipCard({ icon, title, tip }) {
//   return (
//     <div className="bg-gray-50 rounded-xl p-4">
//       <div className="text-2xl mb-2">{icon}</div>
//       <p className="text-sm font-semibold text-gray-700 mb-1">{title}</p>
//       <p className="text-xs text-gray-500 leading-relaxed">{tip}</p>
//     </div>
//   )
// }

// export default Dashboard


import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import useSymptomHistory from '../hooks/useSymptomHistory'
import HistoryCard from '../components/HistoryCard'
import DashboardSkeleton from '../components/DashboardSkeleton'

function computeStats(history) {
  const total = history.length
  const severityCounts = { low: 0, moderate: 0, high: 0 }
  history.forEach((r) => {
    const sev = r.recommendation?.severity
    if (sev in severityCounts) severityCounts[sev]++
  })
  const mostRecent = history[0] || null
  const conditionFrequency = {}
  history.forEach((r) => {
    const cond = r.recommendation?.condition
    if (cond) conditionFrequency[cond] = (conditionFrequency[cond] || 0) + 1
  })
  const topCondition =
    Object.entries(conditionFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || null
  return { total, severityCounts, mostRecent, topCondition }
}

function Dashboard() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const { history, loading, error, deleteRecord, refetch } = useSymptomHistory()
  const stats = computeStats(history)

  // Replace the plain loading spinner with skeleton
  if (loading) return <DashboardSkeleton />

  // Wrap deleteRecord to show a toast after deletion
  const handleDelete = async (id) => {
    await deleteRecord(id)
    addToast('Record deleted successfully.', 'success')
  }

  // Rest of the Dashboard JSX is exactly the same as Phase 5
  // Just replace `onDelete={deleteRecord}` with `onDelete={handleDelete}`
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
          <Link
            to="/symptoms"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm shrink-0"
          >
            + Check Symptoms
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon="📋" label="Total checks" value={stats.total} sub="all time" />
          <StatCard icon="✅" label="Low severity"  value={stats.severityCounts.low}      sub="records" color="text-green-600" />
          <StatCard icon="⚠️" label="Moderate"      value={stats.severityCounts.moderate} sub="records" color="text-yellow-600" />
          <StatCard icon="🚨" label="High severity" value={stats.severityCounts.high}     sub="records" color="text-red-600" />
        </div>

        {stats.topCondition && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">🩺</span>
            <div>
              <p className="text-sm font-semibold text-blue-800">Most frequent condition</p>
              <p className="text-blue-600 text-sm">{stats.topCondition}</p>
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Symptom History
              {history.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({history.length} record{history.length !== 1 ? 's' : ''})
                </span>
              )}
            </h2>
            <button
              onClick={refetch}
              className="text-xs text-blue-500 hover:text-blue-700 underline"
            >
              ↻ Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
              ⚠️ {error}
            </div>
          )}

          {!error && history.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <div className="text-5xl mb-4">🩺</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No symptom checks yet</h3>
              <p className="text-gray-400 text-sm mb-6">
                Use the symptom checker to get your first health recommendation.
              </p>
              <Link
                to="/symptoms"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                Check Symptoms Now
              </Link>
            </div>
          )}

          {history.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {history.map((record) => (
                <HistoryCard
                  key={record._id}
                  record={record}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">💡 General health tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <TipCard icon="💧" title="Stay hydrated"    tip="Drink 8–10 glasses of water daily. Dehydration worsens most common symptoms." />
            <TipCard icon="😴" title="Prioritize sleep" tip="7–9 hours of quality sleep helps your immune system fight infections faster." />
            <TipCard icon="🥦" title="Eat balanced"     tip="Include fruits, vegetables, and proteins in every meal for faster recovery." />
          </div>
        </div>

      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub, color = 'text-blue-600' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs font-medium text-gray-600 mt-0.5">{label}</div>
      <div className="text-xs text-gray-400">{sub}</div>
    </div>
  )
}

function TipCard({ icon, title, tip }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-sm font-semibold text-gray-700 mb-1">{title}</p>
      <p className="text-xs text-gray-500 leading-relaxed">{tip}</p>
    </div>
  )
}

export default Dashboard