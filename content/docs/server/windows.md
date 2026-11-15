---
title: Server on Windows
nav: On Windows
description: Set up ReCoF Server on a Windows PC, from the package to a server players can join.
---

## 1. Make the server folder

1. Make a folder for the server, for example `C:\ReCoF-Server`. Not inside the Steam folder or the game's folder.
2. Copy the **whole `cryoffear` folder** of your Cry of Fear install into it. To find it, in Steam right-click Cry of Fear, **Manage**, **Browse local files**.

> [!WARNING]
> Copy the whole folder, every file and folder in it. A partial copy loads the maps but stops the server as soon as a player draws a weapon whose model is missing. The start script checks for this and refuses to start.

## 2. Add the package

Download `ReCoF-Server-<version>-windows.zip` from the [releases page](https://github.com/caixax/ReCoF-Server/releases) and extract it into the same folder, replacing files. It adds the server (`hlds.exe` and its DLLs), `cryoffear/cl_dlls/hl.dll`, the server's `server.cfg` and `mapcycle.txt`, and `cryoffear/addons` with Metamod-R and AMX Mod X.

## 3. Add Steam's server files

Every GoldSrc server needs three files from Steam next to `hlds.exe`: `steamclient.dll`, `tier0_s.dll` and `vstdlib_s.dll`.

- **On a PC with Steam**: copy them from your Steam folder, usually `C:\Program Files (x86)\Steam`.
- **On a server without Steam**: install [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD) and the Half-Life dedicated server with it, then copy the three files from that server's folder:

```
steamcmd +login anonymous +app_update 90 -beta steam_legacy +quit
```

The folder should now look like this:

```
C:\ReCoF-Server\
  cryoffear\            the game files, plus the package's cl_dlls, addons and server.cfg
  hlds.exe
  start_server.bat
  steamclient.dll       from Steam
  tier0_s.dll           from Steam
  vstdlib_s.dll         from Steam
  ...
```

## 4. Settings

Open `cryoffear\server.cfg` in Notepad and set at least the server's name, and a password if the game is for your friends only. The map, the number of players and the port are at the top of `start_server.bat`. Every setting is explained in [Server settings](/docs/server/config/).

## 5. Start it

Double-click `start_server.bat`. A console window opens and loads the co-op campaign for up to 4 players on port 27015. Type `quit` in it to stop the server.

The first time, Windows Firewall asks whether `hlds.exe` may use the network: allow it.

## 6. Let players in

- **At home**, forward UDP port 27015 in your router to this PC.
- **The address to give players**: type `status` in the server console. The `public` line is the address players outside your network join; players on your own network use the `tcp/ip` line.

Players then join with `connect <address>:27015`, the launcher's **Join a server**, or the game's server list. See [Playing co-op](/docs/multiplayer/).

## Updating

The package replaces `server.cfg`, `mapcycle.txt` and the plugin settings in `cryoffear\addons\amxmodx\configs`. Copy yours somewhere first, extract the new package over the server folder, then put your files back.

## If it does not start

| The console says | What to do |
|---|---|
| `The Cry of Fear game files are missing` | The `cryoffear` folder is not next to `start_server.bat`. Copy it in (step 1). |
| `The cryoffear folder here is incomplete` | Copy the whole folder again, every file in it. |
| `steamclient.dll, tier0_s.dll and vstdlib_s.dll are missing` | Add Steam's files (step 3). |
| `Could not establish connection to Steam servers` | Look at the `Server IP address` line above it. On a PC with more than one network adapter (WSL, Hyper-V, a VPN) the server can pick one without Internet: set `IP` at the top of `start_server.bat` to the PC's own address (`ipconfig`, the adapter with a default gateway). |
