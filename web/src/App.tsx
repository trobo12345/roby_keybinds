import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { KeybindPanel } from './ui/KeybindPanel'
import { useNuiEvent } from './hooks/useNuiEvent'
import { fetchNui } from './utils/fetchNui'
import { IS_NUI, MOCK_KEYBINDS } from './utils/mock'
import type { Keybind, SetVisiblePayload, SetStatePayload } from './types/protocol'

export default function App() {
  const [visible,  setVisible]  = useState(!IS_NUI)
  const [keybinds, setKeybinds] = useState<Keybind[]>(IS_NUI ? [] : MOCK_KEYBINDS)
  const [search,   setSearch]   = useState('')

  useNuiEvent<SetVisiblePayload>('ui:setVisible', ({ visible }) => {
    setVisible(visible)
    if (!visible) setSearch('')
  })

  useNuiEvent<SetStatePayload>('ui:setState', ({ keybinds }) => {
    setKeybinds(keybinds)
  })

  const close = useCallback(() => {
    setVisible(false)
    setSearch('')
    if (IS_NUI) fetchNui('close').catch(() => {})
  }, [])

  const handleRebind = useCallback((id: number, key: string) => {
    setKeybinds(prev => prev.map(kb => kb.id === id ? { ...kb, currentKey: key } : kb))
    if (IS_NUI) fetchNui('rebindKey', { id, key }).catch(() => {})
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  return (
    <AnimatePresence>
      {visible && (
        <KeybindPanel
          keybinds={keybinds}
          search={search}
          onSearchChange={setSearch}
          onClose={close}
          onRebind={handleRebind}
        />
      )}
    </AnimatePresence>
  )
}
