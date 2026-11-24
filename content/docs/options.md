---
title: Options
description: Every option ReCoF adds, what it does and its default.
---

There are three ways to change these:

- In the game, **Options** has a **ReCoF** tab, and the graphics options are on the **Graphics** tab. Each option has a help line.
- In the launcher, **Launch options** lists them by group with an explanation for each, and saves them for the next start.
- In the console, type the name and a value, for example `rc_hud_timer 1`. Options are saved with your settings, so they stay set.

A launch option, such as `-novid`, is given when the game starts rather than typed in the console. The launcher sets those for you.

> [!NOTE]
> The defaults keep the game playing like the original. The exception is the performance options, which are on by default, and they don't change how the game looks.

<!-- intro: Performance -->
The options that are on by default here only make drawing cheaper, and the game looks identical with them on or off. Setting one to `0` switches back to the original code path, if you want to compare.
<!-- /intro -->

{{cvars}}

## More for runners and testers

ReCoF has more commands than the ones above, like the practice commands that need `sv_cheats 1`, the profilers and the server settings. They're listed in [Speedrunning](/docs/speedrun/), [Server settings](/docs/server/config/) and, in full, in the [ReCoF documentation on GitHub](https://github.com/caixax/ReCoF/blob/main/docs/speedrun.md#recof-cvars).
