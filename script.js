// Documentation content for each resource
const docs = {
    'as-core': `
# AS-Core

**AS Framework Core** - The foundation of the AS server framework for FiveM.

## Features

- **Player Management** - Complete player data handling with automatic database integration
- **Money System** - Multiple account types (cash, bank) with transaction support
- **Job System** - Job management with grades and permissions
- **Callback System** - ox_lib based server/client callbacks
- **Optimized** - Built with ox_lib and oxmysql for performance
- **Auto-save** - Automatic player data persistence every 5 minutes
- **Centralized Config** - All framework settings in convars.cfg

## Installation

1. Add \`as-core\` to your resources folder
2. Import \`database.sql\` into your MySQL database
3. Add to \`server.cfg\`:

\`\`\`cfg
ensure oxmysql
ensure ox_lib
ensure as-core

# Load centralized configuration
exec @as-core/convars.cfg
\`\`\`

## Configuration

All settings are managed through \`convars.cfg\`:

\`\`\`cfg
# Debug mode
set as_core_debug 0

# Default spawn location
set as_default_spawn_x -269.4
set as_default_spawn_y -955.3
set as_default_spawn_z 31.2
set as_default_spawn_h 206.0

# Enable target system
set as_use_target 1
\`\`\`

## Usage

### Get Core Object

\`\`\`lua
local AS = exports['as-core']:GetCoreObject()
\`\`\`

### Server-Side Functions

\`\`\`lua
-- Get player object
local player = AS.Server.GetPlayer(source)

-- Player money
local cash = player.getMoney('cash')
player.addMoney('bank', 1000)
player.removeMoney('cash', 500)

-- Player job
local job = player.getJob()
player.setJob('police', 2)

-- Player data
local identifier = player.getIdentifier()
local name = player.getName()
\`\`\`

### Callbacks

\`\`\`lua
-- Server callback
AS.Server.RegisterCallback('as-core:getData', function(source, cb)
    cb({data = 'example'})
end)

-- Client trigger
AS.Client.TriggerCallback('as-core:getData', function(data)
    print(data.data)
end)
\`\`\`

## Ace Permissions

Add admins to \`convars.cfg\`:

\`\`\`cfg
# Admin permissions
add_principal identifier.license:YOUR_LICENSE group.admin

# Superadmin permissions
add_principal identifier.license:YOUR_LICENSE group.superadmin
\`\`\`

## Dependencies

- [oxmysql](https://github.com/overextended/oxmysql)
- [ox_lib](https://github.com/overextended/ox_lib)
`,

    'as-spawn': `
# AS-Spawn

**AS Framework Spawn System** - Advanced multicharacter spawn selection with appearance integration.

## Features

- **Multicharacter Support** - Up to 5 characters per player (configurable)
- **Character Creation** - Full character customization on first spawn
- **Spawn Selection** - Choose from multiple spawn locations
- **Job-Based Spawns** - Automatic spawn points based on player job
- **Appearance Integration** - Auto-detects fivem-appearance or illenium-appearance
- **Modern UI** - Clean purple-themed NUI interface
- **Database Persistence** - Character data stored in MySQL

## Installation

1. Add \`as-spawn\` to your resources folder
2. Install appearance resource (fivem-appearance or illenium-appearance)
3. Add to \`server.cfg\`:

\`\`\`cfg
ensure as-core
ensure fivem-appearance  # or illenium-appearance
ensure as-spawn
\`\`\`

## Configuration

Settings are in \`as-core/convars.cfg\`:

\`\`\`cfg
# Maximum characters per player
set as_spawn_max_characters 5

# Enable multicharacter (0 = single character, 1 = multiple)
set as_spawn_multicharacter 1

# Starting money for new characters
set as_spawn_starting_money 5000
\`\`\`

Customize spawn points in \`config.lua\`:

\`\`\`lua
Config.SpawnPoints = {
    {
        name = 'Bus Station',
        coords = vector4(452.8, -662.3, 28.5, 180.0),
        icon = 'fa-bus'
    },
    -- Add more spawn points
}

Config.JobSpawns = {
    ['police'] = vector4(442.4, -981.9, 30.7, 180.0),
    ['ambulance'] = vector4(332.2, -595.3, 43.3, 70.0),
    -- Add more job spawns
}
\`\`\`

## Default Spawn Locations

- **Bus Station** - Downtown LS
- **Beach** - Vespucci Beach
- **Airport** - LSIA Terminal
- **Motel** - Pink Cage Motel
- **Last Position** - Where you logged out

## Dependencies

- as-core
- fivem-appearance OR illenium-appearance
- oxmysql
- ox_lib
`,

    'as-target': `
# AS-Target

**AS Framework Target System** - Custom raycast-based targeting with compatibility bridge.

## Features

- **Custom Target Eye** - Raycast-based entity targeting
- **Optimized Performance** - Efficient entity detection
- **Compatibility Bridge** - Converts ox_target/qb-target calls to AS-Target
- **Modern UI** - 35px purple eye icon positioned 120px right of center
- **Entity Types** - Support for entities, models, zones, and bones
- **Distance Detection** - Configurable interaction distance (3.0m default)

## Installation

\`\`\`cfg
ensure as-core
ensure as-target
\`\`\`

## Configuration

\`\`\`lua
Config.MaxDistance = 3.0  -- Maximum interaction distance
Config.DebugPoly = false  -- Show debug boxes
\`\`\`

## Usage

### Add Entity Target

\`\`\`lua
exports['as-target']:AddEntity(entity, {
    {
        name = 'interact',
        icon = 'fas fa-hand',
        label = 'Interact',
        onSelect = function(data)
            print('Interacted with entity')
        end,
        canInteract = function(entity, distance)
            return distance < 2.0
        end
    }
})
\`\`\`

### Add Model Target

\`\`\`lua
exports['as-target']:AddModel({'prop_atm_01', 'prop_atm_02'}, {
    {
        name = 'use_atm',
        icon = 'fas fa-credit-card',
        label = 'Use ATM',
        onSelect = function(data)
            -- Open banking menu
        end
    }
})
\`\`\`

### Add Zone Target

\`\`\`lua
exports['as-target']:AddBoxZone('shop_entrance', vector3(25.0, -1347.0, 29.5), 2.0, 2.0, {
    name = 'shop_entrance',
    heading = 0.0,
    debugPoly = false,
    minZ = 28.5,
    maxZ = 30.5
}, {
    options = {
        {
            name = 'enter_shop',
            icon = 'fas fa-door-open',
            label = 'Enter Shop',
            onSelect = function()
                -- Enter shop
            end
        }
    },
    distance = 2.0
})
\`\`\`

## Compatibility Bridge

Automatically converts ox_target and qb-target calls to AS-Target format.

## Dependencies

- as-core (optional, for job/item checks)
`,

    'as-hud': `
# AS-HUD

**AS Framework HUD** - Modern purple-themed HUD with player stats and vehicle speedometer.

## Features

- **Compact Design** - 40px status bars positioned bottom-left
- **Player Stats** - Health, armor, hunger, thirst, stamina, oxygen
- **Vehicle Speedometer** - Semi-circular gauge with speed, RPM, and fuel
- **Color Themes** - 6 pre-defined themes (Purple, Blue, Green, Red, Orange, Pink)
- **Customizable Settings** - Position, scale, and visibility options
- **Conditional Display** - Stamina only shows when below 100%
- **Fuel Integration** - Reads from as-fuel if available
- **Settings Menu** - In-game configuration (F9 by default)

## Installation

\`\`\`cfg
ensure as-core
ensure as-fuel  # Optional but recommended
ensure as-hud
\`\`\`

## Configuration

Settings in \`as-core/convars.cfg\`:

\`\`\`cfg
# Update interval in milliseconds
set as_hud_update_interval 250

# Settings menu keybind
set as_hud_settings_key "F9"
\`\`\`

## HUD Elements

### Player HUD (Bottom-Left)

- **Health** - Red heart icon
- **Armor** - Blue shield icon
- **Hunger** - Orange utensils icon
- **Thirst** - Cyan droplet icon
- **Stamina** - Green person-running icon (hidden at 100%)
- **Oxygen** - Blue lungs icon (only when underwater)

### Vehicle HUD (Bottom-Center)

- **Speed Arc** - Outer arc showing speed (0-220 km/h or mph)
- **RPM Arc** - Middle arc showing engine RPM
- **Fuel Arc** - Inner arc showing fuel/battery level
- **Gear Display** - Current gear (R, N, 1-6)
- **Speed Display** - Digital speed readout

## Settings Menu

Press F9 to customize:

- Player HUD position, scale, offsets
- Vehicle HUD position, scale, offsets
- Speed unit (km/h or mph)
- Color theme
- Show/hide elements

## Exports

\`\`\`lua
-- Toggle HUD visibility
exports['as-hud']:ToggleHUD(show)

-- Update hunger/thirst
exports['as-hud']:SetHunger(value) -- 0-100
exports['as-hud']:SetThirst(value) -- 0-100
\`\`\`

## Dependencies

- as-core
- as-fuel (optional)
- ox_lib
`,

    'as-fuel': `
# AS-Fuel

**AS Framework Fuel System** - Comprehensive fuel and electric vehicle battery management.

## Features

- **Realistic Fuel Consumption** - Vehicle-specific consumption rates
- **Electric Vehicle Support** - Battery drain for electric vehicles
- **Fuel Stations** - 24 gas stations and 5 charging stations across the map
- **Station Blips** - Optional map markers for fuel/charging stations
- **Entity State Persistence** - Fuel levels persist across resource restarts
- **Export Integration** - Easy integration with other resources (HUD, etc.)

## Installation

\`\`\`cfg
ensure as-core
ensure as-fuel
\`\`\`

## Configuration

Settings in \`as-core/convars.cfg\`:

\`\`\`cfg
# Fuel consumption rate multiplier
set as_fuel_consumption_rate 1.0

# Electric vehicle battery drain multiplier
set as_fuel_electric_drain_rate 1.0

# Show fuel blips on map
set as_fuel_show_blips 1

# Fuel price per liter
set as_fuel_price_per_liter 5
\`\`\`

## Exports

\`\`\`lua
-- Get vehicle fuel level (0-100)
local fuel = exports['as-fuel']:GetVehicleFuel(vehicle)

-- Set vehicle fuel level
exports['as-fuel']:SetVehicleFuel(vehicle, 75.0)

-- Check if vehicle is electric
local isElectric = exports['as-fuel']:IsElectricVehicle(vehicle)
\`\`\`

## Vehicle Classes

Fuel consumption varies by vehicle class:
- **Compacts** - 0.8x consumption
- **Sedans** - 1.0x consumption
- **SUVs** - 1.3x consumption
- **Sports** - 1.5x consumption
- **Super** - 2.0x consumption
- **Motorcycles** - 0.6x consumption
- **Bicycles** - 0.0x (no fuel)

## Electric Vehicles

Pre-configured electric vehicles:
- voltic, raiden, cyclone, tezeract
- dilettante, surge, khamelion, neon

Add more in \`shared/config.lua\`:

\`\`\`lua
Config.ElectricVehicles = {
    ['model_name'] = true,
}
\`\`\`

## Fuel Stations

### Gas Stations (24 locations)
- Downtown Los Santos
- Vespucci Beach
- Del Perro
- Route 68
- And more...

### Charging Stations (5 locations)
- LifeInvader Parking
- Legion Square Parking
- Rockford Plaza
- Vinewood Hills
- Pacific Bluffs

## Dependencies

- as-core
- oxmysql
- ox_lib
`,

    'as-anticheat': `
# AS-AntiCheat

**AS Framework Anti-Cheat** - Comprehensive cheat detection and prevention system.

## Features

- **Weapon Detection** - Blacklisted and modded weapon removal
- **Speed Detection** - Speed hack and abnormal movement detection
- **Godmode Detection** - Invincibility and damage immunity detection
- **Noclip Detection** - Collision and physics state monitoring
- **Invisibility Detection** - Alpha channel and visibility checks
- **Teleport Detection** - Unauthorized position change prevention
- **Explosion Detection** - Mass explosion and spam prevention
- **Resource Injection** - Detects unauthorized resource starts
- **Progressive Punishment** - Warn → Kick → Ban system
- **Discord Logging** - Real-time violation notifications
- **Admin Bypass** - Automatic bypass for authorized admins

## Installation

\`\`\`cfg
ensure as-core
ensure as-anticheat
\`\`\`

## Configuration

All settings in \`as-core/convars.cfg\`:

\`\`\`cfg
# Enable/Disable individual checks
setr as_ac_weapon_check 1
setr as_ac_speed_check 1
setr as_ac_godmode_check 1
setr as_ac_noclip_check 1
setr as_ac_invisible_check 1
setr as_ac_teleport_check 1
setr as_ac_resource_check 1
setr as_ac_explosion_check 1

# Auto-ban on detection
setr as_ac_autoban 1

# Ban duration in days (0 = permanent)
setr as_ac_ban_duration 0

# Discord webhook URL
setr as_ac_webhook ""
\`\`\`

## Detection Systems

### Weapon Detection
Blacklisted weapons:
- WEAPON_RAILGUN
- WEAPON_RAYPISTOL
- WEAPON_RAYCARBINE
- Various explosion weapons

### Speed Detection
Monitors:
- Player velocity (threshold: 150 units/sec)
- Vehicle speed
- Rapid position changes

### Godmode Detection
Checks:
- Invincibility flags
- Damage immunity
- Health regeneration patterns

### Teleport Detection
Prevents:
- Instant position changes
- Long-distance warps
- Unauthorized spawning

Distance threshold configurable:
\`\`\`cfg
setr as_ac_teleport_distance 100.0
\`\`\`

## Punishment System

Violation tracking:
- **Warnings**: 1-2 violations
- **Kick**: 3 violations
- **Ban**: 5+ violations

## Admin Bypass

Ace permissions that bypass anti-cheat:
- \`as.admin\`
- \`as.moderator\`
- \`as.superadmin\`

Configure in \`as-core/convars.cfg\`:

\`\`\`cfg
add_ace group.admin as.admin allow
add_principal identifier.license:YOUR_LICENSE group.admin
\`\`\`

## Discord Logging

Set webhook URL:
\`\`\`cfg
setr as_ac_webhook "https://discord.com/api/webhooks/YOUR_WEBHOOK"
\`\`\`

Logs include:
- Player name and identifier
- Violation type and details
- Punishment action taken
- Timestamp

## Exports

\`\`\`lua
-- Check if player is admin
local isAdmin = exports['as-anticheat']:IsPlayerAdmin(source)

-- Add violation manually
exports['as-anticheat']:AddViolation(source, 'Custom violation')

-- Ban player
exports['as-anticheat']:BanPlayer(source, 'Reason', 7) -- 7 days
\`\`\`

## Dependencies

- as-core
- oxmysql
- ox_lib
`,

    'as-admin': `
# AS-Admin

**AS Framework Admin Menu** - Comprehensive server administration and player management system.

## Features

- **Modern UI** - Purple-themed admin interface with tabbed navigation
- **Player Management** - View, manage, and moderate all online players
- **Teleportation** - Quick teleport to locations, players, or coordinates
- **Vehicle Management** - Spawn, repair, and delete vehicles
- **Server Controls** - Weather, time, and server announcements
- **Self Actions** - Noclip, godmode, invisibility, heal, revive
- **Permission System** - 3-tier access control (Moderator/Admin/Superadmin)
- **Discord Logging** - All admin actions logged to webhook
- **Command Integration** - Both menu and commands available

## Installation

\`\`\`cfg
ensure as-core
ensure as-admin
\`\`\`

## Configuration

Settings in \`as-core/convars.cfg\`:

\`\`\`cfg
# Admin menu key
set as_admin_menu_key "F10"

# Discord webhook URL
setr as_admin_webhook "https://discord.com/api/webhooks/YOUR_WEBHOOK"
\`\`\`

## Permission Levels

### Moderator (Level 1)
- Kick players
- Warn players
- Notify players
- Freeze players
- Teleport to/bring players
- Spectate players
- Heal/revive players
- Noclip, godmode, invisibility

### Admin (Level 2)
- All Moderator permissions
- Ban players
- Spawn/delete/repair vehicles
- Give/remove money
- Set player jobs
- Control weather
- Control time
- Server announcements

### Superadmin (Level 3)
- All Admin permissions
- Full access to all features

## Admin Menu Tabs

### 1. Players Tab
View all online players with actions:
- Teleport To / Bring Player
- Spectate / Freeze
- Heal / Revive
- Give/Remove Money
- Set Job / Notify
- Warn / Kick / Ban

### 2. Teleport Tab
Quick locations:
- LSPD, Hospital, Garage
- Airport, Beach, LifeInvader
- Maze Bank, Casino

### 3. Vehicle Tab
- Spawn vehicle by model
- Quick spawn (Adder, T20, Zentorno, etc.)
- Repair current vehicle
- Delete nearby vehicle

### 4. Server Tab
- Weather control (Clear, Rain, Snow, etc.)
- Time control (Set hour and minute)
- Server announcements

### 5. Self Tab
- Toggle Noclip
- Toggle Godmode
- Toggle Invisible
- Heal Self
- Revive Self

## Commands

### Player Management
\`\`\`
/kick [id] [reason]
/ban [id] [days] [reason]
/spectate [id]
\`\`\`

### Teleportation
\`\`\`
/tp [id] or /tp [x] [y] [z]
/bring [id]
\`\`\`

### Vehicle
\`\`\`
/car [model]
/dv
/fix
\`\`\`

### Server
\`\`\`
/weather [type]
/time [hour] [minute]
/announce [message]
\`\`\`

### Self
\`\`\`
/noclip
/god
/invis
/heal [id]
/revive [id]
\`\`\`

## Noclip Controls

- **W/S** - Forward/Backward
- **A/D** - Left/Right
- **Shift** - Speed boost (5x)
- **Alt** - Slow mode (0.2x)

## Ace Permissions

Grant admin access in \`server.cfg\`:

\`\`\`cfg
# Moderators
add_ace group.moderator as.moderator allow
add_principal identifier.license:LICENSE1 group.moderator

# Admins
add_ace group.admin as.admin allow
add_principal identifier.license:LICENSE2 group.admin

# Superadmins
add_ace group.superadmin as.superadmin allow
add_principal identifier.license:LICENSE3 group.superadmin
\`\`\`

## Exports

\`\`\`lua
-- Server-side
local adminLevel = exports['as-admin']:GetAdminLevel(source)
local hasPerm = exports['as-admin']:HasPermission(source, 'kick')

-- Client-side
exports['as-admin']:OpenAdminMenu()
exports['as-admin']:CloseAdminMenu()
\`\`\`

## Dependencies

- as-core
- oxmysql
- ox_lib
`
};

// Parse markdown to HTML
function parseMarkdown(markdown) {
    let html = markdown;

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Paragraphs
    html = html.split('\n\n').map(para => {
        if (para.startsWith('<h') || para.startsWith('<ul') || 
            para.startsWith('<pre') || para.startsWith('<li')) {
            return para;
        }
        if (para.trim()) {
            return `<p>${para.trim()}</p>`;
        }
        return '';
    }).join('\n');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    return html;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Load documentation
function loadDoc(resourceName) {
    const content = document.getElementById('doc-content');
    const markdown = docs[resourceName];
    
    if (markdown) {
        content.innerHTML = parseMarkdown(markdown);
    }

    // Update active sidebar item
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.resource === resourceName) {
            item.classList.add('active');
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load initial documentation
    loadDoc('as-core');

    // Sidebar click events
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            loadDoc(item.dataset.resource);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
