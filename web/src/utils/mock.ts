import type { Keybind } from '../types/protocol'

export const IS_NUI = !!(
  (window as unknown as { invokeNative?: unknown }).invokeNative
)

export const MOCK_KEYBINDS: Keybind[] = [
  { id: 1,  label: 'Start Engine',     key: 'G',       group: 'Vehicles',    description: 'Toggle vehicle engine on / off' },
  { id: 2,  label: 'Lock Vehicle',     key: 'L',       group: 'Vehicles',    description: 'Lock or unlock the vehicle' },
  { id: 3,  label: 'Exit Vehicle',     key: 'F',       group: 'Vehicles',    description: 'Get out of the vehicle' },
  { id: 4,  label: 'Hood',             key: 'H',       group: 'Vehicles',    description: 'Open / close the hood', currentKey: 'J' },
  { id: 5,  label: 'Siren',            key: 'Q',       group: 'Vehicles',    description: 'Toggle siren (emergency vehicles)' },
  { id: 6,  label: 'Emote Wheel',      key: 'X',       group: 'On Foot',     description: 'Open the animation selector' },
  { id: 7,  label: 'Handshake',        key: 'Z',       group: 'On Foot',     description: 'Play handshake animation' },
  { id: 8,  label: 'Sit Down',         key: 'U',       group: 'On Foot',     description: 'Sit down / stand up' },
  { id: 9,  label: 'Sprint',           key: 'LSHIFT',  group: 'On Foot',     description: 'Hold to sprint' },
  { id: 10, label: 'Keybind Manager',  key: 'F1',      group: 'General',     description: 'Open / close this panel' },
  { id: 11, label: 'Chat',             key: 'T',       group: 'General',     description: 'Open the chat' },
  { id: 12, label: 'Map',              key: 'TAB',     group: 'General',     description: 'Open the large map' },
  { id: 13, label: 'Interaction Menu', key: 'M',       group: 'Interaction', description: 'Context-sensitive actions' },
  { id: 14, label: 'Phone',            key: 'NUMPAD0', group: 'Interaction', description: 'Open the phone app' },
]
