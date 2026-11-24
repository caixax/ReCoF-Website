---
title: Server on a Linux VPS
nav: On a Linux VPS
description: Set up ReCoF Server on a Debian or Ubuntu VPS, from the 32-bit libraries to a server that keeps running.
---

These steps are for **Debian 11 or newer, or Ubuntu 20.04 or newer**, 64-bit, on a VPS you reach over SSH. Run the commands as a normal user with `sudo`, not as root.

## 1. Install the 32-bit libraries

The server is a 32-bit program. Install its libraries once:

```
sudo dpkg --add-architecture i386
sudo apt update
sudo apt install lib32gcc-s1 lib32stdc++6 curl tar
```

## 2. Copy the game files

The VPS needs the **whole `cryoffear` folder** of a Cry of Fear install. Make the server's folder and copy the game's `cryoffear` folder into it from a PC with the game, with any SFTP program (WinSCP, FileZilla) or from the PC's terminal:

```
ssh user@your-vps mkdir -p recof-server
scp -r "C:\Program Files (x86)\Steam\steamapps\common\Cry of Fear\cryoffear" user@your-vps:recof-server/
```

The server lives in `~/recof-server`, with the game in `~/recof-server/cryoffear`.

> [!WARNING]
> Copy the whole folder. A partial copy loads the maps, but the server stops as soon as a player draws a weapon whose model is missing. `start_server.sh` checks for this and refuses to start.

## 3. Add the package

Download `ReCoF-Server-<version>-linux.tar.gz` from the [releases page](https://github.com/caixax/ReCoF-Server/releases) on the VPS and extract it over the game files, so the package's files replace the game's:

```
cd ~
curl -LO https://github.com/caixax/ReCoF-Server/releases/download/v<version>/ReCoF-Server-<version>-linux.tar.gz
tar xzf ReCoF-Server-<version>-linux.tar.gz -C recof-server --strip-components=1
```

It adds the server (`hlds_linux` and its libraries), `cryoffear/cl_dlls/hl.so`, the server's `server.cfg` and `mapcycle.txt`, and `cryoffear/addons` with Metamod-R and AMX Mod X.

## 4. Add Steam's server file

Every GoldSrc server needs `steamclient.so` next to `hlds_linux`. Get it from SteamCMD:

```
mkdir -p ~/steamcmd && cd ~/steamcmd
curl -sqL https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz | tar zxf -
./steamcmd.sh +quit
cp ~/steamcmd/linux32/steamclient.so ~/recof-server/
```

## 5. Settings

Edit `~/recof-server/cryoffear/server.cfg` (`nano cryoffear/server.cfg`) and set at least the server's name. The map, the number of players and the port are at the top of `start_server.sh`. Every setting is explained in [Server settings](/docs/server/config/).

## 6. Open the port

The server listens on UDP port 27015. If the VPS uses `ufw`:

```
sudo ufw allow 27015/udp
```

Many VPS providers also have a firewall in their control panel, so open UDP 27015 there too.

## 7. Start it and keep it running

Run the server inside `tmux`, so it keeps running when you close SSH:

```
sudo apt install tmux
cd ~/recof-server
tmux new -s recof ./start_server.sh
```

- To leave it running, press <kbd>Ctrl</kbd>+<kbd>B</kbd>, then <kbd>D</kbd>.
- To get back to its console, run `tmux attach -t recof`.
- To stop it, type `quit` in its console.

## 8. Give players the address

Type `status` in the server console. The `public` line is the address players join, for example `connect 203.0.113.10:27015`. See [Playing co-op](/docs/multiplayer/).

## Updating

The package replaces `server.cfg`, `mapcycle.txt` and the plugin settings, so keep a copy of yours first:

```
cd ~/recof-server
tar czf ~/recof-settings.tar.gz cryoffear/server.cfg cryoffear/mapcycle.txt cryoffear/addons/amxmodx/configs
cd ~
tar xzf ReCoF-Server-<new version>-linux.tar.gz -C recof-server --strip-components=1
tar xzf ~/recof-settings.tar.gz -C recof-server
```

Then check the new package's notes for settings that are new in that version.

## If it doesn't start

- **`Could not establish connection to Steam servers`**: check that `steamclient.so` is next to `hlds_linux` (step 4). On a machine with several network adapters, set `IP` at the top of `start_server.sh` to the address `ip addr` shows for the one with Internet access.
- **Errors about missing `.so` files** mean the 32-bit libraries are missing (step 1).
- **If the script stops at the game files check**, copy the whole `cryoffear` folder again (step 2), then extract the package over it once more (step 3).
