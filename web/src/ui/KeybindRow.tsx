import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { codeToFivemKey } from '../utils/keyMap'
import type { Keybind } from '../types/protocol'

interface Props {
  keybind: Keybind
  index: number
  onRebind: (id: number, key: string) => void
}

export function KeybindRow({ keybind, index, onRebind }: Props) {
  const [capturing, setCapturing] = useState(false)

  useEffect(() => {
    if (!capturing) return

    const onKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()

      if (e.code === 'Escape') {
        setCapturing(false)
        return
      }

      const fivemKey = codeToFivemKey(e.code)
      if (fivemKey) {
        onRebind(keybind.id, fivemKey)
        setCapturing(false)
      }
    }

    window.addEventListener('keydown', onKeyDown, { capture: true })
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true })
  }, [capturing, keybind.id, onRebind])

  const displayKey = keybind.currentKey ?? keybind.key
  const isRebound  = keybind.currentKey != null && keybind.currentKey !== keybind.key

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.025, duration: 0.15 }}
      className="kb-row flex items-center gap-3 px-4 py-2.5 transition-colors duration-100"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-none truncate" style={{ color: 'rgba(255,255,255,0.82)' }}>
          {keybind.label}
        </p>
        {keybind.description && (
          <p className="text-xs mt-1 truncate" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {keybind.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        {isRebound && !capturing && (
          <span className="text-[10px] font-mono line-through" style={{ color: 'rgba(255,255,255,0.18)' }}>
            {keybind.key}
          </span>
        )}
        <button
          title={capturing ? 'Press any key — ESC to cancel' : 'Click to rebind'}
          onClick={() => setCapturing(true)}
          className="kb-key px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all duration-150 text-center"
          style={{
            minWidth: '3rem',
            letterSpacing: '0.04em',
            border: capturing
              ? '1px solid rgba(234,179,8,0.55)'
              : isRebound
                ? '1px solid rgba(168,85,247,0.45)'
                : '1px solid rgba(59,130,246,0.35)',
            color: capturing
              ? 'rgba(234,179,8,0.90)'
              : isRebound
                ? 'rgba(192,132,252,0.90)'
                : 'rgba(96,165,250,0.90)',
            background: capturing
              ? 'rgba(234,179,8,0.07)'
              : isRebound
                ? 'rgba(168,85,247,0.07)'
                : 'rgba(59,130,246,0.07)',
          }}
        >
          {capturing ? '···' : displayKey}
        </button>
      </div>
    </motion.div>
  )
}
