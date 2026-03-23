# roby_keybinds

In-game Keybind Manager panel for FiveM servers.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion

<img width="996" height="659" alt="image" src="https://github.com/user-attachments/assets/acbf10a2-84f0-421c-84af-f1bd15503cc0" />


---

## Installation

1. Copy `roby_keybinds` into your server's `resources/` directory.
2. Add to `server.cfg`:
   ```
   ensure roby_keybinds
   ```
3. Build the UI:
   ```bash
   cd roby_keybinds/web
   npm install
   npm run build
   ```

---

## Configuration (`config.lua`)

```lua
Roby.Debug         = false
Roby.ToggleKey     = 'F1'
Roby.ToggleCommand = 'keybindmanager'
```

---

## Exports API

### `registerKeybind(data)` → `number | false`

```lua
-- fxmanifest.lua
dependency 'roby_keybinds'
```

```lua
-- client/main.lua
AddEventHandler('onClientResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end

    exports['roby_keybinds']:registerKeybind({
        label       = 'Start Engine',
        key         = 'G',
        group       = 'Vehicles',
        description = 'Toggle vehicle engine on / off',
    })
end)
```

### `getKeybinds()` → `table`

Returns a deep copy of all registered keybinds (includes `currentKey` if player rebound it).

### `removeKeybind(id)` → `boolean`

Removes a keybind by id. Returns `false` if not found.

---

## Events

### `roby_keybinds:keyChanged` (client)

Fired when a player rebinds a key from the panel.

```lua
AddEventHandler('roby_keybinds:keyChanged', function(id, newKey)
    -- id: number, newKey: string (e.g. 'G', 'LSHIFT')
end)
```

---

## File Structure

```
roby_keybinds/
├── fxmanifest.lua
├── config.lua
├── NUI_PROTOCOL.md
├── locales/en.json
├── shared/main.lua
├── client/main.lua, nui.lua
├── server/main.lua
└── web/
    ├── src/
    │   ├── types/protocol.ts
    │   ├── hooks/useNuiEvent.ts
    │   ├── utils/fetchNui.ts, keyMap.ts, mock.ts
    │   ├── ui/KeybindPanel.tsx, KeybindGroup.tsx, KeybindRow.tsx, SearchBar.tsx
    │   ├── App.tsx, main.tsx, index.css
    ├── vite.config.ts, tsconfig.json
    └── dist/  ← build output
```
