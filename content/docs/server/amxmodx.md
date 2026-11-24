---
title: AMX Mod X
description: Admins, plugins and writing your own for Cry of Fear, with the AMX Mod X in the package.
---

The package has [ReCoF AMXX](https://github.com/caixax/ReCoF-AMXX), AMX Mod X built for Cry of Fear, in `cryoffear/addons/amxmodx`. It's loaded by [Metamod-R](/docs/server/metamod/) and works out of the box. Most of what you know from Half-Life plugins carries over.

## Where things go

| Folder or file | What it holds |
|---|---|
| `configs/plugins.ini` | the plugins to load, one file name a line |
| `configs/users.ini` | the admins |
| `configs/amxx.cfg` | AMX Mod X's own settings |
| `plugins/` | the compiled plugins (`.amxx`) |
| `scripting/` | the compiler (`amxxpc`) and the includes, `cof.inc` among them |
| `modules/` | the modules plugins use |
| `logs/` | AMX Mod X's logs and errors, made when the server first runs |

All paths are under `cryoffear/addons/amxmodx/`.

## Adding an admin

Add a line to `configs/users.ini` with the player's Steam ID, an empty password, the access flags and `ce` (the ID is a Steam ID, no password needed):

```
"STEAM_0:1:12345678" "" "abcdefghijklmnopqrstu" "ce"
```

`abcdefghijklmnopqrstu` gives every admin right, and the comments at the top of the file explain each flag. A player's Steam ID shows in the server's `status` list. The admin rights apply from the next map, or right away with `amx_reloadadmins`.

## Adding a plugin

1. Put the `.amxx` file in `plugins/`.
2. Add its file name on a line of its own at the end of `configs/plugins.ini`.
3. Change the map, or restart the server.

`amxx plugins` in the server console lists every plugin and whether it's running, and `amxx modules` does the same for the modules.

> [!NOTE]
> Plugins written for Half-Life generally work. Plugins for Counter-Strike or another game don't, and neither do modules made for one game, such as `cstrike`, `csx` or `dodx`. These modules are built for Cry of Fear: fakemeta, engine, hamsandwich, fun, nvault, sqlite, regex, json, sockets and geoip.

## Writing plugins for Cry of Fear

Compile with the compiler in `scripting/` (`amxxpc.exe yourplugin.sma` on Windows, `./amxxpc yourplugin.sma` on Linux), then move the `.amxx` it writes to `plugins/`.

`#include <cof>` gives you:

| Name | What it is |
|---|---|
| `COF_WEAPONS`, `COF_AMMO`, `COF_ITEMS`, `COF_MONSTERS` | every class name of each kind in Cry of Fear, to loop over or to hook |
| `cof_is_game()` | whether the server runs Cry of Fear, for plugins that also run elsewhere |
| `cof_get_recof_version(id, version[], len)` | the ReCoF version a player runs, for example `0.2.3` |
| `cof_is_weapon(classname[])`, `cof_is_monster(classname[])` | tests on a class name |
| `COF_MAX_COOP_PLAYERS` | 4, the co-op player limit |

### What's different from Half-Life

- Weapons, ammo, items and monsters have Cry of Fear's own **class names** (`weapon_glock`, `ammo_shells`, `monster_twitcher`). `cof.inc` has them all.
- In **Ham Sandwich**, three functions take different parameters than in Half-Life. Hook `Ham_CoF_GiveAmmo`, `Ham_CoF_Item_Holster` and `Ham_CoF_StopFollowing` instead of `Ham_GiveAmmo`, `Ham_Item_Holster` and `Ham_StopFollowing`. `Ham_IsTriggered`, `Ham_Item_AddDuplicate` and `Ham_CanPlaySequence` don't exist in Cry of Fear.
- For **entity fields**, fakemeta (`pev`, `set_pev`) and the engine module read every Half-Life field at the right place. The two fields Cry of Fear added aren't offered as `pev_` fields yet.
- **The game DLL** is `cl_dlls/hl.dll` (`cl_dlls/hl.so` on Linux), not `dlls/`.

### An example

Ham Sandwich hooks one class at a time, so a plugin that wants to know when any monster dies registers its hook for every class in `COF_MONSTERS`:

```pawn
#include <amxmodx>
#include <hamsandwich>
#include <cof>

public plugin_init()
{
	register_plugin("Monster kills", "1.0", "you");
	for (new i = 0; i < sizeof(COF_MONSTERS); i++)
		RegisterHam(Ham_Killed, COF_MONSTERS[i], "fw_monster_killed_post", 1);
}

public fw_monster_killed_post(monster, killer)
{
	if (is_user_connected(killer))
	{
		new name[32];
		get_user_name(killer, name, charsmax(name));
		client_print(0, print_chat, "%s killed a monster", name);
	}
}
```

The full example in the repository, [cof_killfeed.sma](https://github.com/caixax/ReCoF-AMXX/blob/master/support/cof/examples/cof_killfeed.sma), also greets each player with the ReCoF version they're running. The plugin guide is [docs/cryoffear.md](https://github.com/caixax/ReCoF-AMXX/blob/master/docs/cryoffear.md).

### Checking a server

The test plugin [cof_selftest.sma](https://github.com/caixax/ReCoF-AMXX/blob/master/plugins/testsuite/cof_selftest.sma) adds the server command `cof_selftest`. It puts a bot in the game, checks that fakemeta and the engine module read its fields where Cry of Fear has them and that the Spawn, TakeDamage and GiveAmmo hooks fire with the right values, and prints a PASS or FAIL line for each check.
