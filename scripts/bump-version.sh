#!/bin/bash
# Script to bump version for cache-busting on deployment
# This ensures each deployment has a unique version number
# 
# Usage: 
#   ./scripts/bump-version.sh          # Uses timestamp (recommended)
#   ./scripts/bump-version.sh increment # Increments patch version

set -e

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "Error: node is required but not installed"
    exit 1
fi

# Get script directory and resolve to project root
# This allows the script to work from any directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PACKAGE_JSON="$PROJECT_ROOT/package.json"

# Check if package.json exists
if [ ! -f "$PACKAGE_JSON" ]; then
    echo "Error: package.json not found at $PACKAGE_JSON"
    exit 1
fi

# Change to project root for all operations
cd "$PROJECT_ROOT"

# Check write permissions on package.json
if [ ! -w "$PACKAGE_JSON" ]; then
    echo "Error: package.json is not writable"
    exit 1
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Extract major.minor - handle versions with or without patch
# This works for: "0.15", "0.15.66", "0.15.66-beta", etc.
VERSION_BASE=$(echo "$CURRENT_VERSION" | sed -E 's/^([0-9]+\.[0-9]+).*/\1/')
if [ -z "$VERSION_BASE" ]; then
    echo "Error: Invalid version format: $CURRENT_VERSION"
    exit 1
fi

if [ "$1" = "increment" ]; then
    # Extract current patch number
    CURRENT_PATCH=$(echo "$CURRENT_VERSION" | sed -E 's/^[0-9]+\.[0-9]+\.([0-9]+).*/\1/')
    if [ -z "$CURRENT_PATCH" ] || [ "$CURRENT_PATCH" = "$CURRENT_VERSION" ]; then
        CURRENT_PATCH=0
    fi
    NEW_PATCH=$((CURRENT_PATCH + 1))
    NEW_VERSION="$VERSION_BASE.$NEW_PATCH"
    echo "Incrementing patch version from $CURRENT_VERSION to $NEW_VERSION"
else
    # Timestamp approach (ensures unique version each deployment)
    # Format: YYMMDDHHMM (e.g., 2412151430 for Dec 15, 2024, 2:30 PM)
    # Using minute precision for shorter versions
    TIMESTAMP=$(date +%y%m%d%H%M)
    NEW_VERSION="$VERSION_BASE.$TIMESTAMP"
    echo "Bumping version from $CURRENT_VERSION to $NEW_VERSION (using timestamp)"
fi

# Validate new version format (basic check)
if ! echo "$NEW_VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
    echo "Error: Generated invalid version format: $NEW_VERSION"
    exit 1
fi

# Update package.json using node (pass version via env var for safety)
export NEW_VERSION
node -e "
const fs = require('fs');
const pkg = require('./package.json');
pkg.version = process.env.NEW_VERSION;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 4) + '\\n');
"

echo "✓ Version updated successfully to $NEW_VERSION"

