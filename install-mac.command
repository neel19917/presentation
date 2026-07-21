#!/bin/bash
# ════════════════════════════════════════════════════════════════════════════
#  FreightPOP LocalDemo — Mac installer + launcher.  Double-click me.
#
#  Works on a brand-new Mac with NOTHING installed — no Homebrew, no Node,
#  no admin password. If Node.js isn't already on the machine, this downloads
#  a self-contained copy into a local ".node" folder (using curl + tar, which
#  ship with macOS) and runs the demo from there. Nothing is installed
#  system-wide; delete the LocalDemo folder and it's all gone.
#
#  Re-runnable: after the first run the downloaded Node is reused instantly.
# ════════════════════════════════════════════════════════════════════════════
set -u

# Pinned Node LTS — permanent release on nodejs.org, safe to hard-code.
NODE_VERSION="v20.18.1"
NODE_DIR=".node"
NODE_BIN="$NODE_DIR/bin/node"

# Always work from the folder this script lives in (double-click safe).
cd "$(dirname "$0")" || { echo "Cannot find the demo folder."; exit 1; }

banner() { printf '\n\033[1;36m%s\033[0m\n' "$1"; }
fail() { printf '\n\033[1;31m%s\033[0m\n' "$1"; echo ""; read -r -p "Press Enter to close…" _; exit 1; }

banner "FreightPOP Demo — starting up…"

# ── 1. Resolve a Node runtime ───────────────────────────────────────────────
NODE=""
if command -v node >/dev/null 2>&1; then
  NODE="$(command -v node)"
  echo "Found Node.js already installed: $("$NODE" --version)"
elif [ -x "$NODE_BIN" ]; then
  NODE="$NODE_BIN"
  echo "Using the local Node.js from a previous run: $("$NODE" --version)"
else
  # ── Detect CPU architecture (Apple Silicon vs Intel) ──
  ARCH="$(uname -m)"
  case "$ARCH" in
    arm64)  NODE_ARCH="arm64" ;;
    x86_64) NODE_ARCH="x64" ;;
    *) fail "Unsupported Mac architecture: $ARCH" ;;
  esac

  PKG="node-${NODE_VERSION}-darwin-${NODE_ARCH}"
  URL="https://nodejs.org/dist/${NODE_VERSION}/${PKG}.tar.gz"

  banner "First-time setup: downloading a private copy of Node.js ${NODE_VERSION} (${NODE_ARCH})…"
  echo "(~40 MB, one time only — needs internet for this step)"
  mkdir -p "$NODE_DIR" || fail "Could not create the .node folder."

  if ! curl -fL --progress-bar "$URL" -o "$NODE_DIR/node.tar.gz"; then
    fail "Download failed. Check your internet connection and try again.
If this Mac has no internet, install Node.js from https://nodejs.org on any
machine, copy it over, or ask IT to whitelist nodejs.org."
  fi

  echo "Unpacking…"
  # --strip-components=1 drops the top-level node-vXX-… folder so bin/ lands in .node/
  if ! tar -xzf "$NODE_DIR/node.tar.gz" -C "$NODE_DIR" --strip-components=1; then
    fail "Could not unpack Node.js."
  fi
  rm -f "$NODE_DIR/node.tar.gz"

  [ -x "$NODE_BIN" ] || fail "Node.js unpacked but the binary is missing."
  NODE="$NODE_BIN"
  echo "Done — installed a private Node.js $("$NODE" --version)"
fi

# ── 2. Launch the demo server (it opens the browser itself) ─────────────────
banner "Opening the FreightPOP demo in your browser…"
echo "Leave this window open while presenting. Close it (or press Ctrl+C) to stop."
echo "If the browser doesn't open, go to:  http://localhost:8123/app/index.html"
echo ""
exec "$NODE" server.js
