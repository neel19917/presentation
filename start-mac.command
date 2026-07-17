#!/bin/sh
# FreightPOP LocalDemo — Mac launcher. Double-click me.
cd "$(dirname "$0")" || exit 1

if command -v node >/dev/null 2>&1; then
  node server.js
elif command -v python3 >/dev/null 2>&1; then
  echo "Node.js not found — falling back to Python."
  echo "Open http://localhost:8123/app/index.html in your browser."
  python3 -m http.server 8123
else
  echo "Neither Node.js nor Python 3 found."
  echo "Install Node.js from https://nodejs.org and double-click this file again."
fi

echo ""
read -r -p "Press Enter to close…" _
