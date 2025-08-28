#!/usr/bin/env sh
set -eu

echo "[entrypoint] Running prisma db seed…"
npx prisma db seed

echo "[entrypoint] Starting app…"
exec node dist/main.js