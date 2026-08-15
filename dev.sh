#!/usr/bin/env bash
# Run the Astro site locally so you can check it in a browser.
# Ctrl+C stops it cleanly — nothing is left running in the background.

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

PORT="${PORT:-4321}"
REQUIRED_NODE_MAJOR=22

# This project needs Node >=22.12.0 (see .nvmrc). Pick it up via nvm if available,
# in case the shell's default node is older. Falls back to the newest installed v22.x
# if the exact .nvmrc patch version isn't installed.
if [ -f .nvmrc ] && [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
  # shellcheck disable=SC1090
  source "${NVM_DIR:-$HOME/.nvm}/nvm.sh"
  nvm use >/dev/null 2>&1 || nvm use "$(cut -d. -f1 .nvmrc)" >/dev/null 2>&1 || true
fi

node_major="$(node -v 2>/dev/null | sed -E 's/^v([0-9]+).*/\1/')" || true
if [ -z "${node_major:-}" ] || [ "$node_major" -lt "$REQUIRED_NODE_MAJOR" ]; then
  echo "error: Node >= ${REQUIRED_NODE_MAJOR} is required (found: $(node -v 2>/dev/null || echo none))." >&2
  echo "       Install it, or install nvm — this script will then pick up .nvmrc automatically." >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

kill_port() {
  local sig="${1:--TERM}"
  lsof -ti ":$PORT" -sTCP:LISTEN 2>/dev/null | xargs -r kill "$sig" 2>/dev/null || true
}

cleaned_up=0
cleanup() {
  [ "$cleaned_up" = "1" ] && return
  cleaned_up=1
  echo
  echo "Stopping dev server on port $PORT..."
  # npm doesn't reliably forward signals to the astro/vite process it spawns, so killing
  # $DEV_PID (npm itself) alone isn't enough — kill_port (by port, not by process tree) is
  # what actually frees things up.
  if [ -n "${DEV_PID:-}" ]; then
    kill "$DEV_PID" 2>/dev/null || true
  fi
  kill_port
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    lsof -ti ":$PORT" -sTCP:LISTEN >/dev/null 2>&1 || return 0
    sleep 0.2
  done
  kill_port -KILL # still holding the port after ~2s of graceful shutdown — force it
}
trap cleanup EXIT INT TERM

kill_port # in case a previous run was left dangling

echo "Starting Astro dev server: http://localhost:${PORT}"
echo "Press Ctrl+C to stop."
# Run as a background job and `wait` on it (rather than running it as a plain foreground
# command) so that Ctrl+C interrupts the `wait` builtin and runs the trap above right away —
# bash otherwise defers a trap until a synchronous foreground command finishes on its own,
# which a dev server never does.
#
# ASTRO_DEV_BACKGROUND=1 also forces Astro 7.2+'s dev server to stay attached to this
# process instead of auto-detaching into its own daemon when it thinks it's run by an
# AI coding agent (which would otherwise make it survive Ctrl+C here).
ASTRO_DEV_BACKGROUND=1 npm run dev -- --port "$PORT" &
DEV_PID=$!
wait "$DEV_PID"
