#!/bin/zsh
set -e
TAG=$1
REPO=$2
ZIP="iPhone-Audio-${TAG}.zip"
PREV=$(git describe --tags --abbrev=0 "${TAG}^" 2>/dev/null || true)
RANGE=${PREV:+$PREV..}$TAG
cat <<MD
<img src="https://raw.githubusercontent.com/${REPO}/${TAG}/assets/cover-light.jpg" alt="iPhone Audio" width="100%">

Hear your iPhone on your Mac's headphones over a USB cable.

## Download

**[⬇ ${ZIP}](https://github.com/${REPO}/releases/download/${TAG}/${ZIP})**

Signed with Developer ID and notarized by Apple. Requires macOS 13 or later on Apple silicon.

## Install

1. Unzip and move **iPhone Audio.app** to your Applications folder.
2. Open it. An iPhone icon appears in the menu bar.
3. Connect your iPhone with a cable and click **Enable** under it in Audio MIDI Setup.

## Changes

MD
git log --no-merges --format='- %s (%h)' "$RANGE" | grep -v -e 'release workflow' -e 'release notes' || echo "- Maintenance"
echo
if [[ -n $PREV ]]; then
  echo "**Full changelog:** https://github.com/${REPO}/compare/${PREV}...${TAG}"
else
  echo "**Full changelog:** https://github.com/${REPO}/commits/${TAG}"
fi
