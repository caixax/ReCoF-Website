---
title: Install with the launcher
nav: Install with the launcher
description: The ReCoF Launcher copies your game, installs ReCoF on the copy, keeps it updated and backs up your saves.
---

The [ReCoF Launcher](https://github.com/caixax/ReCoF-Launcher) is the recommended way to install and play ReCoF. It never writes anything into your Steam folder. It reads your Cry of Fear, copies it to a folder you choose, and applies ReCoF to the copy.

## 1. Download the launcher

Open the [launcher's latest release](https://github.com/caixax/ReCoF-Launcher/releases/latest) and download one of the two files. They're the same launcher:

| File | What it is |
|---|---|
| `ReCoF-Launcher-<version>-setup.exe` | Installs the launcher for your Windows user, with a Start menu entry and an optional desktop shortcut. No administrator rights needed. |
| `ReCoF-Launcher.exe` | The portable launcher, a single file with nothing to install. Put it in any folder you can write to. |

Both keep their settings, backups and downloads in `%LOCALAPPDATA%\ReCoF Launcher`, and both update themselves.

> [!NOTE]
> Windows SmartScreen may warn that the file comes from an unknown publisher, since the launcher isn't signed with a paid certificate. Choose **More info**, then **Run anyway**.

## 2. Let it find Cry of Fear

Start the launcher, choose your language and read the three short intro pages. It then looks for your Steam copy of Cry of Fear through Steam's own library files.

- If it finds the game, it shows the folder and the Steam build. Build 5821301 is the one ReCoF is made for.
- If it doesn't, pick the folder that has `cof.exe` in it yourself.

Next it checks the game files against the known files of version 1.6a and tells you if something's different, for example a community patch. That won't stop the install, since ReCoF replaces those files in the copy anyway.

## 3. Choose where to install

Pick a new folder for the copy, **outside** the Steam folder and outside `Program Files`, for example `D:\Games\ReCoF`. The launcher measures the copy (about 4.4 GiB) and tells you whether the drive has room, including space for backups and the last few versions, so you can always roll back.

You get two options here:

- **Bring your saves, settings and unlocks over from the Steam copy.** Recommended if you've played before. It only copies one way, and the Steam copy is never changed.
- **Create a desktop shortcut.**

## 4. Install

The launcher downloads the latest ReCoF release from GitHub and checks its signature and the hash of every file before anything is copied. Then it copies the game and applies ReCoF. You can cancel at any point. Nothing is left behind, and your Steam copy isn't affected.

## 5. Play

Make sure Steam is running, then press **Play ReCoF**. The menu beside it also has **Play vanilla**, which starts the original game through Steam, and **Join a server** (launcher 1.0.5 and later), which starts ReCoF connected to a server address you type.

From now on the launcher checks for updates when it starts and every few minutes while it's open. See [Updates and beta](/docs/updates/).

## The launcher's other tools

- **Launch options** has the display settings and every ReCoF option, grouped and explained, so you don't need the console. The full list is on the [Options](/docs/options/) page.
- **Maintenance** lets you verify and repair the files, back up and restore saves, import progress from the Steam copy again, move the installation or uninstall.
- **Report a problem** collects the versions, your system details and the last lines of the log into a bug report you can read and trim, then opens a GitHub issue in your browser. Nothing gets sent on its own.

> [!TIP]
> If the game stops at start with a "Bad Image" error that names `hw.dll`, see [Troubleshooting](/docs/troubleshooting/#bad-image-error-on-windows-11). The launcher checks for this and warns you before it starts the game.
