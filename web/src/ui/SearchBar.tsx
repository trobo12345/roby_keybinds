import { useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface Props {
  value: string
  onChange: (v: string) => void
  autoFocus?: boolean
}

export function SearchBar({ value, onChange, autoFocus }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus) {
      const t = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(t)
    }
  }, [autoFocus])

  return (
    <div className="relative flex items-center">
      <Search className="absolute left-3 w-3.5 h-3.5 pointer-events-none" style={{ color: 'rgba(255,255,255,0.22)' }} />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search by label, key or group…"
        autoComplete="off"
        spellCheck={false}
        className="w-full pl-9 pr-8 py-2 text-sm rounded-lg outline-none transition-all duration-150"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: 'rgba(255,255,255,0.80)',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.50)'
          e.currentTarget.style.background  = 'rgba(255,255,255,0.06)'
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
          e.currentTarget.style.background  = 'rgba(255,255,255,0.04)'
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 p-0.5 rounded transition-colors"
          style={{ color: 'rgba(255,255,255,0.28)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.60)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}
