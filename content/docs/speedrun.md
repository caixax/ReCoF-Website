---
title: Speedrunning
description: ReCoF keeps every technique runners use, and adds a timer, an autosplitter and practice tools.
---

ReCoF is built so it doesn't take away anything runners rely on. If a fix would touch a technique, the original behavior stays available behind an option.

> [!NOTE]
> Before you submit a run played on ReCoF, check the rules of the leaderboard you submit to. Options that change the game, such as `rc_door_skip` or `rc_bhopcap 0`, mean your run isn't comparable with runs on the original game.

## What's kept

- **The 100 fps cap** and low fps binds such as `fps_max 4` for the sewer wall skip.
- **Bunny hopping under the Half-Life cap**, dodge jumps, crouch jumps and air strafing.
- **Using objects through walls**, using NPCs to trigger entities, the Water Glitch and the Lake Skip, the phone skip in chapter 5.
- **The console commands of the speedrun guide**, which are `cl_fastcredits`, `cl_fovmultiplier`, `cl_showfps`, `developer 1` and the `inventoryuse` and `padlockrotate` binds.
- **Practice saves.** The save format and the `SAVE` folder haven't changed, and saves from the original game load.

## Why 100 fps

The engine counts the time of each frame in whole milliseconds and drops the rest. At 100 fps a frame is exactly 10 ms and nothing is lost. At 60 fps a frame of 16.67 ms counts as 16, so movement runs about 4% slow, and the physics also change with the length of a frame. Above 100 the game runs in slow motion. Keep `fps_max` at 100, the default.

## Timer and autosplitter

- `rc_hud_timer 1` shows the **in-game timer** at the left edge of the screen. It counts what the LiveSplit script counts, which is real time without pauses, loads, menus and the cutscenes that take control away. You start and reset it by hand with `rc_timer_start` and `rc_timer_reset` (for example `bind DEL "map c_nightmare;rc_timer_reset;rc_timer_start"`), and it stops by itself at the endings the script splits on.
- For **LiveSplit**, use the [ReCoF Autosplitter](https://github.com/caixax/ReCoF-Autosplitter). The published Cry of Fear autosplitter reads memory addresses that only match the original game.

## Movement and HUD options

These are built into ReCoF, so no external tool has to patch the game.

| Option | What it does |
|---|---|
| `rc_bhopcap` | `0` removes the bunny hop speed cap (a separate category) |
| `rc_ducktap` | `1` brings back the Half-Life ducktap that Cry of Fear removed |
| `+rc_ducktap`, `rc_autojump` | input aids: ducktap while held, jump while held |
| `rc_infinite_stamina` | stamina never runs out |
| `rc_speedometer` | your speed on screen, with the speed of each jump |
| `rc_info` | an information panel with position, speed, health and stamina |
| `rc_hud_health`, `rc_hud_stamina` | health and stamina as numbers |

> [!WARNING]
> Don't load **RebuiltSimon** with ReCoF. Its hl.dll patch only fits the original files and lands on different code in ReCoF's. Everything runners use from it is built in: the panel, the HUD numbers, ducktap, autojump, the bunny hop cap and raw input.

## Practice commands

With `sv_cheats 1` you get BunnymodXT's practice commands for routing, with `rc_` in place of `bxt_`.

| Command | What it does |
|---|---|
| `rc_ch_set_pos <x> <y> <z>` | moves you to a position |
| `rc_ch_get_pos` | prints your position and view, and a line that puts them back |
| `rc_ch_set_vel <vx> <vy> <vz>` | sets your velocity |
| `rc_ch_set_health <health>` | sets your health |
| `rc_ch_give <name> [count]` | gives a weapon, ammo or an item, for example `rc_ch_give weapon_glock` |
| `god`, `noclip`, `notarget` | as in Half-Life; god mode and noclip stay on while `sv_cheats` is 1 |

The full list, with every option and its details, is in [docs/speedrun.md](https://github.com/caixax/ReCoF/blob/main/docs/speedrun.md) on GitHub.
