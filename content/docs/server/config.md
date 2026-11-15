---
title: Server settings
nav: Settings
description: The start script, server.cfg and the settings ReCoF adds for servers.
---

## The start script

`start_server.bat` (Windows) and `start_server.sh` (Linux) set four things at the top:

| Setting | Default | What it is |
|---|---|---|
| `MAP` | `cof_campaign_01` | the map the server starts on: `cof_campaign_01` for the co-op campaign, `cof_manhunt_campaign` for Manhunt |
| `PLAYERS` | `4` | the most players at once; Cry of Fear co-op takes up to 4 |
| `PORT` | `27015` | the UDP port players connect to |
| `IP` | empty | the address to use, only on a machine with more than one network adapter where the server picks the wrong one |

On Linux they can also be given when you start it, without editing the script:

```
MAP=cof_manhunt_campaign PORT=27016 ./start_server.sh
```

Anything after the script's name goes to the server as well, for example `./start_server.sh +sv_lan 1`.

## server.cfg

`cryoffear/server.cfg` runs when the server starts and again at every map. The package's file, with what each line does:

```
hostname "ReCoF co-op server"
sv_lan 0                  // 1 lets in only players on the server's own network
sv_password ""            // a password players must type to join; empty for none
rcon_password ""          // set one to use the remote console (rcon); empty turns it off

// ReCoF
rc_require_recof 1        // only players on ReCoF can join; 0 lets the original game in too
sv_pause_empty 1          // with nobody in the game the map waits, so it starts for the first player
sv_restart_empty 1        // when the last player leaves, the map loads again from its start

// Cry of Fear co-op
difficulty 2              // 1 easy, 2 normal, 3 hard, 4 nightmare
sv_lobby_time 60          // seconds the lobby waits for players before the game starts
sv_votekick_time 30       // seconds a kick vote lasts
sv_disablehints 0         // 1 hides the hints
mp_timelimit 0            // no time limit: the campaign moves on through its own doors
mp_fraglimit 0

// Voice chat
sv_voiceenable 1
sv_voicecodec voice_miles
sv_voicequality 3

// Logs in cryoffear/logs
log on
```

With `sv_password` set, players type `password <the password>` in their console before they `connect`.

## Settings ReCoF adds

| Setting | Default | What it does |
|---|---|---|
| `rc_require_recof` | `1` | Only players on ReCoF 0.2.3 or later can join. The others get a message with a link to ReCoF. `0` lets everyone in. |
| `sv_pause_empty` | `1` | With nobody in the game, the map waits: its music, cameras and scripts start when the first player arrives. |
| `sv_restart_empty` | `1` | When the last player leaves, the map loads again, so the next group finds it from the start. |
| `rc_retail_gameplay` | `0` | `1` plays with the original game's balance instead of ReCoF's fixes. |

## Commands in the server console

| Command | What it does |
|---|---|
| `status` | the server's addresses and the players in the game |
| `changelevel <map>` | moves everyone to another map |
| `kick <name>` | removes a player |
| `say <text>` | writes to every player |
| `quit` | stops the server |

With `rcon_password` set, the same commands work from a player's console: `rcon_password <password>`, then `rcon status`.
