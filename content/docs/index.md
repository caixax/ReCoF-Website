---
title: What is ReCoF
nav: Introduction
description: An improved Cry of Fear, built from the game's own source code, that plays like the original.
---

ReCoF fixes the bugs of **Cry of Fear** (the Steam release, version `1.6a`) and improves the game. It's built from [DeCoF](https://github.com/caixax/DeCoF), a complete decompilation of every Cry of Fear binary (the game logic, the client and its renderer, the engine, the menus and both launchers) turned back into source code that compiles into the same machine code as the original files.

Having the source means ReCoF can fix what the original game gets wrong one documented fix at a time, without guesswork.

## What changes

- **Fixes** for crashes, save problems, AI and collision bugs, sounds that played for the wrong player in co-op, and leaks that slowed the game down over a long session. Every fix is listed with where it was found and how it was tested.
- **Better performance**, with the same image drawn for far less work on the CPU and the graphics driver. See the [performance options](/docs/options/#performance).
- **Quality of life** options, like a borderless window, raw mouse input, vertical sync, custom crosshairs, the weapon's field of view, and an options window that explains every setting.
- **Speedrun tools**, including an in-game timer, a LiveSplit autosplitter and practice commands. Every technique runners use still works. See [Speedrunning](/docs/speedrun/).
- A **dedicated co-op server** for Windows and Linux, with plugin support. See [Hosting a server](/docs/server/).

## What stays the same

- The maps, the story, the sounds and the models. ReCoF doesn't ship any game files and runs on your own copy.
- How the game plays. The balance fixes (monster damage and health, AI, ladders, collision) all switch back to the original with one option, `rc_retail_gameplay 1`.
- Your saves. Saves from the original game load in ReCoF.
- Your Steam installation. ReCoF lives in a separate copy of the game, so the Steam copy keeps working as before.

## What you need

- **Windows 10 or 11.** The launcher needs the 64-bit version, which almost every PC has.
- **Cry of Fear on Steam**, which is free ([store page](https://store.steampowered.com/app/223710/)). ReCoF is made for the current Steam version, build 5821301.
- **About 4.4 GiB of free space** for the copy of the game, plus some room for backups.
- **Steam running** while you play, as with the original game.

> [!WARNING]
> On Windows 11 with **Smart App Control** turned on, Windows refuses to load ReCoF's files, which aren't digitally signed yet. See [Troubleshooting](/docs/troubleshooting/#bad-image-error-on-windows-11) for how to turn it off.

## Where to go next

- [Install with the launcher](/docs/install/), the recommended way.
- [Install by hand](/docs/install-by-hand/), from a release zip.
- [Host a server](/docs/server/) for co-op.
