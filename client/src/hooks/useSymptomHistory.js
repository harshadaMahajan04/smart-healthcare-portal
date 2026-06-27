import { useState, useEffect, useCallback } from 'react'
import API from '../api/axios'

function useSymptomHistory() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await API.get('/symptoms/history')
      setHistory(response.data.history || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load history.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const deleteRecord = async (id) => {
    try {
      await API.delete(`/symptoms/${id}`)
      // Remove from local state immediately — no need to re-fetch
      setHistory((prev) => prev.filter((r) => r._id !== id))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete record.')
    }
  }

  return { history, loading, error, deleteRecord, refetch: fetchHistory }
}

export default useSymptomHistory