Roby.Dbg = function(...)
    if not Roby.Debug then return end
    print(('[%s]'):format(GetCurrentResourceName()), ...)
end
