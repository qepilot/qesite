#!/usr/bin/env bash
# Package QEPilot source for Hostinger Node.js hosting.
# Hostinger runs `npm install` + `npm run build` itself — do NOT ship
# node_modules/, dist/, or .env.
#
# Usage:
#   ./scripts/hostinger-deploy.sh              # write zip only
#   ./scripts/hostinger-deploy.sh --upload      # zip + FTP upload (needs .env.deploy)
#
# Optional .env.deploy (gitignored):
#   FTP_SERVER=ftp.example.hostinger.com
#   FTP_USERNAME=u123456789
#   FTP_PASSWORD=...
#   FTP_REMOTE_DIR=/home/u123456789/domains/qepilot.live/public_html/
#   # or your Node.js application root path from hPanel

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

OUT_DIR="$ROOT/deploy-artifacts"
ZIP_NAME="qepilot-hostinger-deploy.zip"
ZIP_PATH="$OUT_DIR/$ZIP_NAME"
UPLOAD=false

for arg in "$@"; do
  case "$arg" in
    --upload) UPLOAD=true ;;
    -h|--help)
      sed -n '2,18p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      exit 1
      ;;
  esac
done

mkdir -p "$OUT_DIR"
rm -f "$ZIP_PATH"

echo "→ Packaging source for Hostinger…"

# Match DEPLOY-HOSTINGER.md: full source tree Hostinger needs to build.
zip -r "$ZIP_PATH" \
  package.json \
  package-lock.json \
  server.js \
  index.html \
  vite.config.ts \
  tsconfig.json \
  tsconfig.app.json \
  tsconfig.node.json \
  .oxlintrc.json \
  .env.example \
  public \
  src \
  -x "*.DS_Store" \
  >/dev/null

echo "✓ Wrote $ZIP_PATH"
unzip -l "$ZIP_PATH" | tail -n +1 | head -n 40
echo "…"

if [[ "$UPLOAD" != true ]]; then
  echo
  echo "Zip ready. Upload & extract in hPanel File Manager, then:"
  echo "  Run NPM Install → npm run build → Restart"
  echo
  echo "Or set .env.deploy and re-run with --upload."
  exit 0
fi

if [[ -f "$ROOT/.env.deploy" ]]; then
  # shellcheck disable=SC1091
  set -a
  source "$ROOT/.env.deploy"
  set +a
fi

: "${FTP_SERVER:?Set FTP_SERVER in .env.deploy or the environment}"
: "${FTP_USERNAME:?Set FTP_USERNAME in .env.deploy or the environment}"
: "${FTP_PASSWORD:?Set FTP_PASSWORD in .env.deploy or the environment}"
: "${FTP_REMOTE_DIR:?Set FTP_REMOTE_DIR to your Hostinger Node app root}"

TMP_EXTRACT="$(mktemp -d)"
trap 'rm -rf "$TMP_EXTRACT"' EXIT
unzip -q "$ZIP_PATH" -d "$TMP_EXTRACT"

echo "→ Uploading to $FTP_SERVER:$FTP_REMOTE_DIR …"

# Prefer lftp (handles FTPS well). Fall back to curl for each file if missing.
if command -v lftp >/dev/null 2>&1; then
  lftp -c "
    set ssl:verify-certificate no
    set ftp:ssl-allow yes
    open -u ${FTP_USERNAME},${FTP_PASSWORD} ${FTP_SERVER}
    mirror -R --verbose --exclude-glob .DS_Store ${TMP_EXTRACT}/ ${FTP_REMOTE_DIR}
    bye
  "
else
  echo "lftp not found — installing is recommended (brew install lftp)."
  echo "Falling back to curl FTPS mirror of top-level files…"
  find "$TMP_EXTRACT" -type f | while read -r file; do
    rel="${file#"$TMP_EXTRACT"/}"
    remote_url="ftp://${FTP_SERVER}/${FTP_REMOTE_DIR#/}${rel}"
    curl --silent --show-error --ftp-create-dirs \
      --user "${FTP_USERNAME}:${FTP_PASSWORD}" \
      -T "$file" "$remote_url"
    echo "  uploaded $rel"
  done
fi

echo "✓ Upload complete."
echo "In hPanel Node.js app: Run NPM Install (if deps changed) → Build → Restart."
