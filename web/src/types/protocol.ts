export type NuiErrorCode =
  | 'UNKNOWN'
  | 'VALIDATION_ERROR'
  | 'NOT_ALLOWED'
  | 'NOT_FOUND'
  | 'COOLDOWN'
  | 'INSUFFICIENT_FUNDS'
  | 'INVENTORY_ERROR'
  | 'DB_ERROR'

export type NuiError = {
  code: NuiErrorCode
  message: string
  details?: unknown
}

export type NuiResponse<T = unknown> =
  | { ok: true; data?: T }
  | { ok: false; error: NuiError }

export type UiMessage<TPayload = unknown> = {
  resource: string
  type: string
  requestId?: string
  payload: TPayload
}

export interface Keybind {
  id: number
  label: string
  key: string
  currentKey?: string
  group: string
  description: string
  icon?: string
}

export type SetVisiblePayload = {
  visible: boolean
}

export type SetStatePayload = {
  keybinds: Keybind[]
}
