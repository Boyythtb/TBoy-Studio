import { motion, AnimatePresence } from 'framer-motion'

export interface ToastProps {
  message: string | null
  type?: 'info' | 'error' | 'success'
  onClose?: () => void
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  if (!message) return null

  const borderCol =
    type === 'error'
      ? 'border-red-500/50 text-red-200 bg-red-950/90 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
      : type === 'success'
        ? 'border-green-500/50 text-green-200 bg-green-950/90 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
        : 'border-pink-500/50 text-pink-200 bg-slate-900/95 shadow-[0_0_20px_rgba(236,72,153,0.3)]'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.92 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl border backdrop-blur-md text-xs font-bold max-w-md w-[92%] sm:w-auto ${borderCol}`}
      >
        <span className="text-base">{type === 'error' ? '⚠️' : type === 'success' ? '✅' : '🔔'}</span>
        <span className="flex-1">{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded-lg hover:bg-white/10"
          >
            ✕
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
