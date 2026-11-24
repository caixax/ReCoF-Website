---
title: Troubleshooting
description: The problems players run into most, and what to send when you report one.
---

## "Bad Image" error on Windows 11

The game stops at start with a "Bad Image" message that names `hw.dll` (error status `0xc0e90002`).

This is **Smart App Control**, a Windows 11 feature that refuses to load files that are not digitally signed. ReCoF's files are not signed yet. To play ReCoF, turn it off:

1. Open **Windows Security**.
2. Go to **App & browser control**.
3. Click **Smart App Control settings** and choose **Off**.

A shortcut: press <kbd>Win</kbd>+<kbd>R</kbd>, type `windowsdefender://smartapp/` and press <kbd>Enter</kbd>.

> [!WARNING]
> On many versions of Windows 11, Smart App Control cannot be turned back on afterwards without resetting Windows. Microsoft Defender keeps protecting the PC either way.

Windows 10 is not affected, nor is Windows 11 when Smart App Control is off or still in evaluation mode.

## The game runs on the wrong graphics card

On a laptop with two graphics chips, Windows may start the game on the slow integrated one.

1. Open Windows **Settings**, **System**, **Display**, **Graphics**.
2. Add `cof.exe` from your ReCoF folder.
3. Choose **High performance**.

Type `gl_dump` in the game's console to see which graphics card the game uses. Laptops with a "discrete graphics only" or MUX mode in their settings or BIOS run the game faster with it on.

## Low fps or stutters

Try these in order:

- In **Options**, **Graphics**, turn **Bump maps** off (or type `gl_bump 0` in the console). On slow graphics chips it is the heaviest setting by far.
- Keep `fps_max` at 100. The game is made for 100 frames a second; see [Why 100 fps](/docs/speedrun/#why-100-fps).
- Start the game from the launcher rather than `Play ReCoF.bat`. The batch file writes the console to `qconsole.log`, and on slow PCs Windows Defender checks that file on every console line.

If it still stutters, send a **performance log**:

1. Turn on **Performance log** in the launcher's options (Performance section), or type `rc_perflog 1` in the console.
2. Play the part that runs badly for a minute or two.
3. Quit the game, or type `rc_perflog 0`.
4. Send the newest file in `cryoffear\perflogs\` with the map and what was happening.

The log has what your computer is (processor, graphics card and driver, Windows version, power plan), a line for each second and a line for each stutter with where the time went. It changes nothing in the game.

> [!TIP]
> If the log says **the system held the processors**, part of the stutter comes from the computer, not the game: drivers or the BIOS can stop every processor for 20 to 30 ms at a time. The free tool LatencyMon names the driver; updating the BIOS, the chipset, audio, network and graphics drivers usually helps.

## The game crashed

ReCoF catches crashes itself: the game closes with a message, and a report and a dump are written in the `crashes` folder next to `cof.exe`. Send both files with what you were doing. The launch option `-rc_nocrashhandler` leaves crashes to Steam's handler instead, as in the original game.

## Do not combine ReCoF with other patches

- **RebuiltSimon** must not be loaded with ReCoF: its patch lands on other code in ReCoF's files. ReCoF has its options built in, its information panel and HUD numbers included.
- The **Linux patcher** for Cry of Fear does not apply to ReCoF's files.
- Install ReCoF on a clean copy of the game. The launcher tells you when the copy it starts from has other patches in it.

## Reporting a problem

Open an issue on [GitHub](https://github.com/caixax/ReCoF/issues), or use **Report a problem** in the launcher, which fills the versions and your system details in for you. For a quick question, or to talk it through first, join the [ReCoF Discord](https://discord.gg/m63drEUJ4v). Say:

- the ReCoF version (shown in the corner of the main menu);
- the map (type `status` in the console if you are not sure) and what you were doing;
- what happened, and what you expected.

Attach `qconsole.log` (written when you start with `Play ReCoF.bat`), the files in `crashes\` after a crash, or a performance log for stutters.
