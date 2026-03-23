local isOpen             = false
local registeredKeybinds = {}
local keybindCount       = 0

Roby.SendUI = function(msgType, payload)
    SendNUIMessage({
        resource = GetCurrentResourceName(),
        type     = msgType,
        payload  = payload or {},
    })
end

Roby.RefreshUI = function()
    if not isOpen then return end
    Roby.SendUI('ui:setState', { keybinds = registeredKeybinds })
end

Roby.OpenPanel = function()
    isOpen = true
    SetNuiFocus(true, true)
    Roby.SendUI('ui:setVisible', { visible = true })
    Roby.SendUI('ui:setState',   { keybinds = registeredKeybinds })
end

Roby.ClosePanel = function()
    isOpen = false
    SetNuiFocus(false, false)
    Roby.SendUI('ui:setVisible', { visible = false })
end

Roby.TogglePanel = function()
    if isOpen then Roby.ClosePanel() else Roby.OpenPanel() end
end

Roby.GetKvpKey = function(id)
    return 'roby_keybinds_' .. tostring(id)
end

Roby.RegisterKeybind = function(data)
    if type(data) ~= 'table' then
        Roby.Dbg('registerKeybind: data must be a table')
        return false
    end
    if not data.label then
        Roby.Dbg('registerKeybind: missing field label')
        return false
    end
    if not data.key then
        Roby.Dbg('registerKeybind: missing field key')
        return false
    end
    if not data.group then
        Roby.Dbg('registerKeybind: missing field group')
        return false
    end

    keybindCount = keybindCount + 1

    local entry = {
        id          = keybindCount,
        label       = tostring(data.label),
        key         = tostring(data.key):upper(),
        group       = tostring(data.group),
        description = tostring(data.description or ''),
        icon        = data.icon or nil,
    }

    local stored = GetResourceKvpString(Roby.GetKvpKey(entry.id))
    entry.currentKey = stored or entry.key

    table.insert(registeredKeybinds, entry)
    Roby.Dbg('registered:', entry.label, '->', entry.key, '| group:', entry.group)
    Roby.RefreshUI()

    return entry.id
end

Roby.RebindKey = function(id, newKey)
    for _, kb in ipairs(registeredKeybinds) do
        if kb.id == id then
            kb.currentKey = newKey
            SetResourceKvp(Roby.GetKvpKey(id), newKey)
            TriggerEvent('roby_keybinds:keyChanged', id, newKey)
            Roby.Dbg('rebound id', id, '->', newKey)
            Roby.RefreshUI()
            return true
        end
    end
    return false
end

RegisterCommand(Roby.ToggleCommand, function()
    Roby.TogglePanel()
end, false)

RegisterKeyMapping(Roby.ToggleCommand, 'Open / close Keybind Manager', 'keyboard', Roby.ToggleKey)

exports('registerKeybind', Roby.RegisterKeybind)

exports('getKeybinds', function()
    local copy = {}
    for _, kb in ipairs(registeredKeybinds) do
        copy[#copy + 1] = {
            id          = kb.id,
            label       = kb.label,
            key         = kb.key,
            currentKey  = kb.currentKey,
            group       = kb.group,
            description = kb.description,
            icon        = kb.icon,
        }
    end
    return copy
end)

exports('removeKeybind', function(id)
    for i, kb in ipairs(registeredKeybinds) do
        if kb.id == id then
            table.remove(registeredKeybinds, i)
            Roby.RefreshUI()
            return true
        end
    end
    return false
end)

Citizen.CreateThread(function()
    for _, kb in ipairs(Roby.DefaultKeybinds or {}) do
        Roby.RegisterKeybind(kb)
    end
end)
