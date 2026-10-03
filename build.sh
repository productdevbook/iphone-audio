#!/bin/zsh
#
# iPhone Audio
# Created by productdevbook (https://productdevbook.com).
# Copyright (c) 2026 productdevbook. Licensed under the MIT License.
#
# Builds the iPhone Audio menu bar app and installs it to ~/Applications.
# Signs with a stable identity (Apple Development); with ad-hoc signing macOS drops the
# microphone and Accessibility permissions after every build.
set -e
cd "$(dirname "$0")"
APP="build/iPhone Audio.app"
SIGN_IDS=(${SIGN_ID:-$(security find-identity -v -p codesigning | awk '/"Apple Development/ {print $2}' | sort -u)})
rm -rf build
mkdir -p "$APP/Contents/MacOS"
swiftc -O -swift-version 5 -target arm64-apple-macos13.0 main.swift Hint.swift -o "$APP/Contents/MacOS/iPhoneSes"
cp Info.plist "$APP/Contents/Info.plist"
# assets/icon-1024.png → AppIcon.icns
ICONSET=build/AppIcon.iconset
mkdir -p "$ICONSET" "$APP/Contents/Resources"
for s in 16 32 128 256 512; do
  sips -z $s $s assets/icon-1024.png --out "$ICONSET/icon_${s}x${s}.png" >/dev/null
  sips -z $((s * 2)) $((s * 2)) assets/icon-1024.png --out "$ICONSET/icon_${s}x${s}@2x.png" >/dev/null
done
iconutil -c icns "$ICONSET" -o "$APP/Contents/Resources/AppIcon.icns"
SIGN_ID=""
for id in $SIGN_IDS; do
  codesign --force --sign "$id" "$APP" 2>/dev/null && { SIGN_ID=$id; break; }
done
[[ -n $SIGN_ID ]] || codesign --force --sign - "$APP"
mkdir -p ~/Applications
pkill -x iPhoneSes && sleep 1 || true
rm -rf ~/Applications/"iPhone Audio.app"
cp -R "$APP" ~/Applications/
open ~/Applications/"iPhone Audio.app"
echo "Installed: ~/Applications/iPhone Audio.app (signed with: ${SIGN_ID:-adhoc})"
