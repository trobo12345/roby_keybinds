import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Keyboard, X } from 'lucide-react'
import { SearchBar } from './SearchBar'
import { KeybindGroup } from './KeybindGroup'
import type { Keybind } from '../types/protocol'

interface Props {
  keybinds: Keybind[]
  search: string
  onSearchChange: (v: string) => void
  onClose: () => void
  onRebind: (id: number, key: string) => void
}

export function KeybindPanel({ keybinds, search, onSearchChange, onClose, onRebind }: Props) {
  const isSearching = search.trim().length > 0

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return keybinds
    return keybinds.filter(kb =>
      kb.label.toLowerCase().includes(q) ||
      kb.key.toLowerCase().includes(q) ||
      (kb.currentKey ?? '').toLowerCase().includes(q) ||
      kb.group.toLowerCase().includes(q) ||
      kb.description.toLowerCase().includes(q),
    )
  }, [keybinds, search])

  const groups = useMemo(() => {
    const map = new Map<string, Keybind[]>()
    filtered.forEach(kb => {
      const arr = map.get(kb.group) ?? []
      arr.push(kb)
      map.set(kb.group, arr)
    })
    return Array.from(map.entries()).map(([name, items]) => ({ name, items }))
  }, [filtered])

  return (
    <>
      <motion.div
        className="fixed inset-0"
        style={{ background: 'rgba(0,0,0,0.72)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed right-6 top-1/2 z-50 flex flex-col rounded-2xl overflow-hidden"
        style={{
          width: '480px',
          maxHeight: '85vh',
          background: 'rgba(8,10,18,0.98)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.80), 0 0 0 1px rgba(255,255,255,0.04)',
          translateY: '-50%',
        }}
        initial={{ x: 48, opacity: 0, scale: 0.97 }}
        animate={{ x: 0,  opacity: 1, scale: 1.00 }}
        exit={{   x: 48, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0"
          style={{ background: 'rgba(4,6,12,0.90)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}
          >
            <Keyboard className="w-3.5 h-3.5" style={{ color: '#60a5fa' }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.90)' }}>
              Keybind Manager
            </p>
            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              {keybinds.length} registered {keybinds.length === 1 ? 'binding' : 'bindings'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150 flex-shrink-0"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <SearchBar value={search} onChange={onSearchChange} autoFocus />
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 select-none">
              <Keyboard className="w-10 h-10 mb-3" style={{ color: 'rgba(255,255,255,0.10)' }} />
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.20)' }}>
                {isSearching ? `No results for "${search}"` : 'No keybinds registered'}
              </p>
            </div>
          ) : (
            groups.map(({ name, items }) => (
              <KeybindGroup key={name} name={name} keybinds={items} defaultOpen onRebind={onRebind} />
            ))
          )}
        </div>

        <div
          className="flex items-center gap-3 px-5 py-2.5 flex-shrink-0"
          style={{ background: 'rgba(4,6,12,0.70)', borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <kbd
            className="px-2 py-0.5 text-[10px] font-mono rounded"
            style={{ border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.04)' }}
          >
            ESC
          </kbd>
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.18)' }}>to close</span>
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.12)' }}>·</span>
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.18)' }}>click a key to rebind</span>
          <span className="ml-auto text-[10px]" style={{ color: 'rgba(255,255,255,0.10)' }}>roby_keybinds v1.0.0</span>
        </div>
      </motion.div>
    </>
  )
}
