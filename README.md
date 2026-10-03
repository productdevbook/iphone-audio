# iPhone Audio

A macOS menu bar app that plays your iPhone's audio (YouTube, music, games…) through the Mac's current output — e.g. wired headphones — over the USB cable. No AirPlay, no screen mirroring.

## How it works

When enabled in Audio MIDI Setup, a USB-connected iPhone shows up on the Mac as an audio input. The app reads that input and plays it to the system default output.

If the iPhone is plugged in but its audio isn't enabled, the app opens Audio MIDI Setup and shows a hint panel; with Accessibility access it also points at the **Enable** button.

## Permissions

- **Microphone** – macOS treats the iPhone's USB audio as an input. Only used to play that audio.
- **Accessibility** (optional) – only to locate the Enable button on screen.

## Build

```sh
./build.sh
```

Compiles, signs with your Apple Development certificate (falls back to ad-hoc) and installs to `~/Applications/iPhone Audio.app`. A stable signature keeps the granted permissions across rebuilds.
