RegisterNUICallback('close', function(_, cb)
    Roby.ClosePanel()
    cb({ ok = true })
end)

RegisterNUICallback('rebindKey', function(data, cb)
    local id     = tonumber(data.id)
    local newKey = tostring(data.key or ''):upper()

    if not id or newKey == '' then
        cb({ ok = false, error = { code = 'VALIDATION_ERROR', message = 'Missing id or key' } })
        return
    end

    if Roby.RebindKey(id, newKey) then
        cb({ ok = true, data = { id = id, key = newKey } })
    else
        cb({ ok = false, error = { code = 'NOT_FOUND', message = 'Keybind id ' .. tostring(id) .. ' not found' } })
    end
end)
