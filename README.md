<p align="center">
  <img src="assets/cover.jpg" alt="iPhone Audio — hear your iPhone through your Mac's headphones" width="100%">
</p>

# <img src="assets/logo.jpg" alt="" width="40" align="top"> iPhone Audio

A macOS menu bar app that plays your iPhone's audio (YouTube, music, games…) through the Mac's current output — e.g. wired headphones — over the USB cable. No AirPlay, no screen mirroring.

## How it works

When enabled in Audio MIDI Setup, a USB-connected iPhone shows up on the Mac as an audio input. The app reads that input and plays it to the system default output.

If the iPhone is plugged in but its audio isn't enabled, the app opens Audio MIDI Setup and shows a hint panel; with Accessibility access it also points at the **Enable** button.

## About the microphone indicator

While audio is playing, macOS shows the orange microphone icon in the menu bar and lists **iPhone Audio** under "Mic Mode" in Control Center.

**No microphone is used** — not the iPhone's, not the Mac's, not the headphones'. macOS treats the iPhone's USB audio stream as an *input device*, and it shows the microphone indicator for any app reading any input. Apps can't hide it; this is a deliberate macOS privacy feature. Any wired way of getting iPhone audio onto a Mac (QuickTime included) shows the same icon.

The app only ever opens the USB audio device named "iPhone"/"iPad", never a Continuity or built-in microphone.

> Keep **Mic Mode** on **Standard**. Voice Isolation treats music as background noise and will make it sound bad.

## Permissions

- **Microphone** – required by macOS to read any audio input, including the iPhone's audio stream.
- **Accessibility** (optional) – only to locate the Enable button in Audio MIDI Setup on screen.

## Build

```sh
./build.sh
```

Compiles, signs with your Apple Development certificate (falls back to ad-hoc) and installs to `~/Applications/iPhone Audio.app`. A stable signature keeps the granted permissions across rebuilds.
