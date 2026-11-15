---
title: Credits and license
nav: Credits and license
description: Who made the game ReCoF is built on, the projects it learned from, and the terms of its code.
---

ReCoF is made by caixax, on [DeCoF](https://github.com/caixax/DeCoF), the decompilation of Cry of Fear by the same author.

## Credits

- **Team Psykskallar** made Cry of Fear. ReCoF fixes and extends their game and ships none of its assets.
- **Valve** made the GoldSrc engine and the Half-Life SDK that Cry of Fear is built on.
- **BUzer** wrote the Paranoia renderer that Cry of Fear's client and OpenGL wrapper come from.
- **cd_n0** made RebuiltSimon. ReCoF's information panel, HUD numbers, ducktap and autojump aids and other speedrun options are rebuilt from what it shows and does; none of its code is used.
- **YaLTeR** made BunnymodXT, whose practice commands, crosshair, timer and ideas ReCoF follows, and the fork of discord-rpc that ReCoF's Discord status uses.
- **IlyaTsyganov** wrote the Cry of Fear LiveSplit script, whose timing rules ReCoF's run timer follows.
- **The ReHLDS team** made ReHLDS, which ReCoF Server is a fork of, and **Metamod-R**; **the AMX Mod X team** made AMX Mod X.
- **Discord** made discord-rpc, and **Tencent and Milo Yip** made RapidJSON.

## The projects

| Repository | What it is | License |
|---|---|---|
| [ReCoF](https://github.com/caixax/ReCoF) | the game | see below |
| [DeCoF](https://github.com/caixax/DeCoF) | the faithful decompilation ReCoF starts from | see below |
| [ReCoF Launcher](https://github.com/caixax/ReCoF-Launcher) | the installer, updater and launcher | MIT |
| [ReCoF Autosplitter](https://github.com/caixax/ReCoF-Autosplitter) | the LiveSplit component | MIT |
| [ReCoF Server](https://github.com/caixax/ReCoF-Server) | the dedicated server, a fork of ReHLDS | MIT |
| [ReCoF Metamod](https://github.com/caixax/ReCoF-Metamod) | Metamod-R for Cry of Fear | GPL v3 |
| [ReCoF AMXX](https://github.com/caixax/ReCoF-AMXX) | AMX Mod X for Cry of Fear | GPL v3 with the Half-Life engine exception |
| [ReCoF HLSDK](https://github.com/caixax/ReCoF-HLSDK) | the SDK headers with Cry of Fear's fields | Half-Life 1 SDK License |

## License of ReCoF and DeCoF

ReCoF's [LICENSE](https://github.com/caixax/ReCoF/blob/main/LICENSE) keeps DeCoF's terms and adds ReCoF's own code. In short:

- **Code written for ReCoF** (its own files, and every change it made to the game's code) and the tools and documentation are under the **MIT License**.
- Code that comes from the **Half-Life SDK** stays under the Half-Life 1 SDK License (free distribution only), and code from **Paranoia** under Paranoia's terms.
- The code reconstructed from the **Cry of Fear binaries** belongs to its original authors, and no rights over it are granted. It is published for research, preservation and interoperability with a copy of the game you own.

If you use ReCoF or DeCoF in your own project, a fork or a mod, please credit them: name ReCoF and DeCoF by caixax and link to [the repository](https://github.com/caixax/ReCoF) in your README or credits.

ReCoF is not affiliated with or endorsed by Team Psykskallar or Valve. No game assets or original binaries are distributed; you need your own copy of Cry of Fear.
