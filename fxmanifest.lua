fx_version 'cerulean'
game 'gta5'
lua54 'yes'

author 'Roby'
description 'Roby - roby_keybinds'
version '1.0.0'

shared_scripts {
    'config.lua',
    'shared/*.lua',
}

client_scripts {
    'client/*.lua',
}

server_scripts {
    'server/*.lua',
}

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/assets/*',
}
