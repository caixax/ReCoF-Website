---
title: Updates and beta
description: How ReCoF keeps itself up to date, how to roll back, and how to test the beta builds.
---

## Automatic updates

The launcher checks GitHub for a new ReCoF release when it starts and every few minutes while it is open. When one is out, the home screen shows **Update to** with the version, next to **Play without updating** if you would rather play first.

Before every update the launcher:

1. downloads the release and checks the signature of its manifest, the SHA-256 of the archive and every file in it;
2. backs up your saves;
3. installs the new files through a journal, so a power cut or a crash halfway never leaves a broken install.

It also keeps the last few versions, so you can go back to the one before.

The launcher updates itself the same way, from its own releases.

## Release channels

| Channel | What you get |
|---|---|
| **Stable** | The releases that have been tested in game. The default. |
| **Beta** | The stable releases and the test builds in between, with the newest fixes and features. Expect problems and keep your backups. |

To switch, open **Tools**, **Updates** in the launcher and set the **Release channel**. Back on Stable, the launcher offers the stable releases again from the next stable version on.

Beta builds are listed on the [releases page](https://github.com/caixax/ReCoF/releases) as pre-releases, with what changed in each. If you find a problem in one, [report it](/docs/troubleshooting/#reporting-a-problem): that is what betas are for.

## Installing a release from a file

In the launcher, **Maintenance**, **Install from a file** takes a release you downloaded yourself: put the three launcher files of the release (`recof-<version>.zip`, `recof-manifest.json` and `recof-manifest.json.sig`) in one folder and choose it. The same checks apply.

## Your saves

Saves, settings and unlocks live in the ReCoF copy. **Maintenance** has **Back up saves** and **Restore saves**, and the launcher backs them up on its own before every update. Backups are kept in `%LOCALAPPDATA%\ReCoF Launcher` and are never deleted when you uninstall.
