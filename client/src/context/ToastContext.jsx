import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container — fixed to bottom-right */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const TOAST_STYLES = {
  success: 'bg-green-600 text-white',
  error:   'bg-red-600 text-white',
  info:    'bg-blue-600 text-white',
  warning: 'bg-yellow-500 text-white',
}

const TOAST_ICONS = {
  success: '✅',
  error:   '❌',
  info:    'ℹ️',
  warning: '⚠️',
}

function ToastItem({ toast, onClose }) {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
        animate-fade-in ${TOAST_STYLES[toast.type] || TOAST_STYLES.info}`}
    >
      <span className="text-base shrink-0">{TOAST_ICONS[toast.type]}</span>
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        onClick={onClose}
        className="text-white/70 hover:text-white transition-colors shrink-0 mt-0.5"
      >
        ✕
      </button>
    </div>
  )
}

export function useToast() {
  return useContext(ToastContext)
}