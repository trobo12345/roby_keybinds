AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    print(('[%s] Resource started.'):format(GetCurrentResourceName()))
end)

AddEventHandler('onResourceStop', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    print(('[%s] Resource stopped.'):format(GetCurrentResourceName()))
end)
