import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Car, PersonStanding, Settings, Sword,
  Handshake, Shield, HeartPulse, Flame, Plane, Anchor, Tag,
} from 'lucide-react'
import { KeybindRow } from './KeybindRow'
import type { Keybind } from '../types/protocol'
import type { LucideIcon } from 'lucide-react'

const GROUP_ICONS: Record<string, LucideIcon> = {
  'Vehicles':    Car,
  'On Foot':     PersonStanding,
  'General':     Settings,
  'Weapons':     Sword,
  'Interaction': Handshake,
  'Police':      Shield,
  'EMS':         HeartPulse,
  'Fire Dept':   Flame,
  'Aircraft':    Plane,
  'Boats':       Anchor,
}

interface Props {
  name: string
  keybinds: Keybind[]
  defaultOpen?: boolean
  onRebind: (id: number, key: string) => void
}

export function KeybindGroup({ name, keybinds, defaultOpen = true, onRebind }: Props) {
  const [expanded, setExpanded] = useState(defaultOpen)
  const Icon = GROUP_ICONS[name] ?? Tag

  return (
    <div className="mx-2 mb-1.5 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors duration-100"
        style={{ background: 'rgba(255,255,255,0.028)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.045)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.028)')}
      >
        <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.38)' }} />
        <span className="text-[11px] font-semibold tracking-widest uppercase flex-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {name}
        </span>
        <span className="text-[11px] tabular-nums mr-1" style={{ color: 'rgba(255,255,255,0.20)' }}>
          {keybinds.length}
        </span>
        <motion.span
          animate={{ rotate: expanded ? 0 : -90 }}
          transition={{ duration: 0.18, ease: 'easeInOut' }}
          style={{ display: 'flex' }}
        >
          <ChevronDown className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.25)' }} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {keybinds.map((kb, i) => (
              <KeybindRow key={kb.id} keybind={kb} index={i} onRebind={onRebind} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
