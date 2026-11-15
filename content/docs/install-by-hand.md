---
title: Install by hand
description: Every release also comes as one zip that mirrors the game folder, for installing without the launcher.
---

The launcher does all of this for you and checks every file. Installing by hand works too, if you prefer it.

> [!IMPORTANT]
> Install ReCoF in a **copy** of the game, never in your Steam folder. Steam would put the original files back on its next update or file check, and you would lose the way back to the original game.

## Steps

1. **Copy the game.** In Steam, right-click Cry of Fear in your library, then **Manage**, **Browse local files**. Go up one folder and copy the whole `Cry of Fear` folder somewhere else, for example `D:\Games\Cry of Fear ReCoF`.
2. **Download ReCoF.** On the [releases page](https://github.com/caixax/ReCoF/releases/latest), download `ReCoF-v<version>.zip`. The other three files of a release are for the launcher.
3. **Extract it into the copy.** The zip mirrors the game folder, so extracting it into the copy puts every file in place. Let it replace the existing files.
4. **Start Steam**, then double-click `Play ReCoF.bat` in the copy, or start `cof.exe`.

The main menu shows the ReCoF version in its corner, for example `ReCoF-v0.2.2`.

## What the zip holds

| File in the game folder | What it is |
|---|---|
| `cof.exe` | the engine launcher |
| `CoFLaunchApp.exe` | the settings window that opens before the game |
| `hw.dll`, `sw.dll` | the GoldSrc engine (`sw.dll` is the same file, as in the original game) |
| `opengl32.dll` | the OpenGL wrapper of the renderer |
| `cryoffear/cl_dlls/hl.dll` | the game logic |
| `cryoffear/cl_dlls/client.dll` | the client and its renderer |
| `cryoffear/cl_dlls/GameUI.dll` | the menus |
| `Play ReCoF.bat` | starts the game with the console written to `qconsole.log`; open it in Notepad to set the resolution, windowed mode or extra options such as `-novid` |
| `recof-cvars.json` | the list of ReCoF options, for the launcher |
| `README-ReCoF-TEST.txt` | notes, the new options and the SHA-256 of every file |

No game assets are in the zip: the maps, models and sounds come from your own copy.

## Updating by hand

Download the newer zip and extract it into the same copy again, replacing the files. Your saves and settings stay where they are.

## Going back

Delete the copy. Your Steam installation was never changed, so the original game is still there. If you replaced files in the Steam folder by mistake, Steam can restore them: right-click Cry of Fear, **Properties**, **Installed Files**, **Verify integrity of game files**.
