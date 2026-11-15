---
title: What is ReCoF
nav: Introduction
description: An improved Cry of Fear, built from the game's own source code, that plays like the original.
---

ReCoF fixes the bugs of **Cry of Fear** (the Steam release, version `1.6a`) and improves the game. It is built from [DeCoF](https://github.com/caixax/DeCoF), a complete decompilation of every Cry of Fear binary: the game logic, the client and its renderer, the engine, the menus and both launchers, turned back into source code that compiles into the same machine code as the original files.

With the source in hand, ReCoF can fix what the original game gets wrong, one documented fix at a time, without guessing.

## What changes

- **Fixes.** Crashes, save problems, AI and collision bugs, sounds that play for the wrong player in co-op, leaks that slow the game down over a long session. Every fix is listed with where it was found and how it was tested.
- **Performance.** The same picture drawn with far less work for the processor and the graphics driver. See the [performance options](/docs/options/#performance).
- **Quality of life.** Borderless window, raw mouse input, vertical sync, custom crosshairs, weapon field of view, an options window with every setting explained.
- **Speedrunning.** An in-game timer, a LiveSplit autosplitter and practice commands; every technique runners use is kept. See [Speedrunning](/docs/speedrun/).
- **Co-op servers.** A dedicated server for Windows and Linux with plugin support. See [Hosting a server](/docs/server/).

## What stays the same

- The maps, the story, the sounds and the models: ReCoF ships no game files at all, it runs on your own copy.
- The way the game plays. The balance fixes (monster damage and health, AI, ladders, collision) can all be switched back to the original with one option, `rc_retail_gameplay 1`.
- Your saves: saves from the original game load in ReCoF.
- Your Steam installation. ReCoF lives in a separate copy of the game, and the Steam copy keeps working as before.

## What you need

- **Windows 10 or 11.** The launcher needs the 64-bit version, which almost every PC has.
- **Cry of Fear on Steam**, which is free: [store page](https://store.steampowered.com/app/223710/). ReCoF is made for the current Steam version, build 5821301.
- **About 4.4 GiB of free space** for the copy of the game, plus some room for backups.
- **Steam running** while you play, as with the original game.

> [!WARNING]
> On Windows 11 with **Smart App Control** turned on, Windows refuses to load ReCoF's files, which are not digitally signed yet. See [Troubleshooting](/docs/troubleshooting/#bad-image-error-on-windows-11) for how to turn it off.

## Where to go next

- [Install with the launcher](/docs/install/), the recommended way.
- [Install by hand](/docs/install-by-hand/), from a release zip.
- [Host a server](/docs/server/) for co-op.
