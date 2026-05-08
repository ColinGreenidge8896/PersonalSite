My laptop fills up fast with school files, and paying for cloud storage felt unnecessary when I had a Samsung Galaxy S20 sitting unused in a drawer. It runs constantly, has decent storage, and costs nothing extra to operate. With Syncthing and Tailscale it works as a self-hosted alternative to Google Drive across all my devices.

## The setup

Three pieces of software are involved:

- **Syncthing** handles the actual file sync between devices. It is peer-to-peer, so files transfer directly between machines without going through a central server.
- **Tailscale** connects all the devices into a private network, so they can reach each other regardless of which network they are on.
- **A strong password** on the Syncthing web interface, since it is otherwise accessible to anything on the network.

The S20 runs the Syncthing Android app and stays plugged in. Everything syncs to and from it: laptop, desktop, Raspberry Pi, and my daily phone. Any file I put in a synced folder shows up on all of them.

## Getting Syncthing working

Syncthing is a bit fiddly to configure. A few things worth getting right before adding devices:

**Disable battery optimization for the Syncthing app on Android.** Android will aggressively kill background apps to save battery, which means Syncthing stops syncing the moment the screen turns off. Exempting it from battery optimization keeps it running properly.

**Set up auto-accept on the right devices.** When a new device tries to connect, Syncthing prompts you to accept it. You can configure devices to auto-accept folder shares from trusted devices, which saves a lot of back-and-forth when adding a new machine. Getting this set correctly on the NAS device means you only have to approve things once.

**Add devices before sharing folders.** Syncthing's flow is: add a device by its device ID first, then share a folder with that device. Doing it in the other order causes confusion.

Once it is running cleanly it is genuinely reliable. The bugginess mostly shows up during initial setup rather than day-to-day use.

## Why this over cloud storage

The main reason is cost, but the self-hosted angle is useful too. Files stay on hardware I own, sync happens over my private Tailscale network, and there is no storage limit beyond the phone's capacity. For school files and general file sharing between my own machines it covers everything I need.
