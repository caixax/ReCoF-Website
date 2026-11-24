---
title: Metamod-R
description: The server's plugin loader, already set up in the package.
---

[Metamod-R](https://github.com/rehlds/metamod-r) sits between the server and the game logic and loads plugins written for it, AMX Mod X first among them. The package has [ReCoF Metamod](https://github.com/caixax/ReCoF-Metamod), a build of Metamod-R that knows about Cry of Fear's game folder, its game DLL in `cl_dlls/`, and the fields Cry of Fear added to the engine's structures.

## How it's loaded

There's nothing to install. The start scripts load Metamod-R with `-dll`, and Metamod-R then loads ReCoF's game logic. `liblist.gam` stays the way the game has it.

| | Windows | Linux |
|---|---|---|
| Metamod-R | `cryoffear/addons/metamod/dlls/metamod.dll` | `cryoffear/addons/metamod/dlls/metamod_i386.so` |
| Its plugin list | `cryoffear/addons/metamod/plugins.ini` | the same file |

To run the server without any plugins, remove the `-dll ...` part from the start script.

## plugins.ini

One plugin per line, with `win32` or `linux` in front, so the same file serves both systems. The package's file loads AMX Mod X:

```
; Metamod plugins: one per line, "win32" for Windows and "linux" for Linux.
win32 addons/amxmodx/dlls/amxmodx_mm.dll
linux addons/amxmodx/dlls/amxmodx_mm_i386.so
```

To add another Metamod plugin, put its files under `cryoffear/addons/` and add its line. Paths start at the `cryoffear` folder.

## Checking that it works

In the server console:

```
meta list
```

lists the plugins Metamod-R loaded and whether each one is running. `meta version` prints its version.

## Which plugins work

Metamod plugins that only use the engine and the standard game functions usually work. Plugins made for a particular game (Counter-Strike, Day of Defeat) or that read that game's memory layout don't. Cry of Fear added two fields to every entity, so build a plugin that reads entity fields against [ReCoF-HLSDK](https://github.com/caixax/ReCoF-HLSDK), the SDK headers with Cry of Fear's fields, rather than the plain Half-Life SDK.

For most server plugins, use [AMX Mod X](/docs/server/amxmodx/), which is already in the package.
