---
title: Hosting a server
nav: Overview
description: ReCoF Server runs Cry of Fear co-op on Windows or a Linux VPS, with Metamod-R and AMX Mod X.
---

[ReCoF Server](https://github.com/caixax/ReCoF-Server) is a dedicated server for Cry of Fear co-op, for players on ReCoF. It runs on a Windows PC or on a Linux VPS, without a window and without the game running, and takes plugins through Metamod-R and AMX Mod X.

> [!IMPORTANT]
> The server is being tested. It starts on Windows and Linux and runs every co-op map with Metamod-R and AMX Mod X and their plugins; games with players joining are still being tested. Downloads are on the [ReCoF Server releases page](https://github.com/caixax/ReCoF-Server/releases).

## Why a server of its own

Cry of Fear changed the GoldSrc engine, so Valve's server stops at start with `Couldn't find offset for is_donator!!!`, and the game's own engine cannot run without a window. ReCoF Server is a fork of [ReHLDS](https://github.com/rehlds/ReHLDS), the open Half-Life dedicated server, with Cry of Fear's engine changes carried over: its structures, its limits, its Steam identity and the places where it behaves differently.

It also adds what Cry of Fear never had on a server:

- **The map waits for players.** With nobody in the game, the map does not run, so its music, cameras and scripts start when the first player arrives instead of playing to an empty server.
- **A fresh start.** When the last player leaves, the map loads again, so the next group finds it from the start.
- **ReCoF players only**, unless you let everyone in.

## What is in the package

| Part | What it is |
|---|---|
| `hlds.exe` / `hlds_linux` and the engine | the server, from [ReCoF-Server](https://github.com/caixax/ReCoF-Server) |
| `cryoffear/cl_dlls/hl.dll` / `hl.so` | ReCoF's game logic, from [ReCoF](https://github.com/caixax/ReCoF) |
| `cryoffear/addons/metamod` | Metamod-R for Cry of Fear, from [ReCoF-Metamod](https://github.com/caixax/ReCoF-Metamod) |
| `cryoffear/addons/amxmodx` | AMX Mod X for Cry of Fear, from [ReCoF-AMXX](https://github.com/caixax/ReCoF-AMXX) |
| `start_server.bat` / `start_server.sh` | start scripts that check the game files first |
| `cryoffear/server.cfg`, `mapcycle.txt` | the server's settings and its maps |
| `README-SERVER.txt` | the setup guide, the same as these pages |

**Not in the package**: Cry of Fear's own files, which come from your copy of the game (free on Steam), and Steam's server files, which every GoldSrc server needs and which you copy from Steam or SteamCMD.

## What you need

- **The `cryoffear` folder** of a Cry of Fear install, complete.
- **Windows**, or **Linux**: Debian 11, Ubuntu 20.04 or newer. The server is 32-bit, and runs on 64-bit Linux with the 32-bit libraries.
- **One UDP port** open to the Internet, 27015 by default.
- Little hardware: a co-op game is up to 4 players. A small VPS is enough.

## Set it up

1. [On Windows](/docs/server/windows/), or [on a Linux VPS](/docs/server/linux/).
2. [Server settings](/docs/server/config/): the name, a password, the difficulty, the map.
3. Optional: plugins with [Metamod-R](/docs/server/metamod/) and [AMX Mod X](/docs/server/amxmodx/).

Players join as described in [Playing co-op](/docs/multiplayer/).
