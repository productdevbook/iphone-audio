#!/bin/zsh
# iPhone Audio menü çubuğu uygulamasını derler ve ~/Applications'a kurar.
# Sabit bir imza (Apple Development) kullanılır; geçici imzada macOS her derlemeden sonra
# mikrofon ve Erişilebilirlik izinlerini geçersiz sayar.
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
echo "Kuruldu: ~/Applications/iPhone Audio.app (imza: ${SIGN_ID:-adhoc})"
