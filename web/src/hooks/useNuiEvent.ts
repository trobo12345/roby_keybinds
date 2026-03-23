import { useEffect, useRef } from 'react'
import type { UiMessage } from '../types/protocol'

type Handler<T> = (payload: T) => void

export function useNuiEvent<T = unknown>(type: string, handler: Handler<T>): void {
  const handlerRef = useRef<Handler<T>>(handler)
  useEffect(() => { handlerRef.current = handler }, [handler])

  useEffect(() => {
    const listener = (event: MessageEvent<UiMessage<T>>) => {
      if (event.data?.type === type) {
        handlerRef.current(event.data.payload)
      }
    }
    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [type])
}
