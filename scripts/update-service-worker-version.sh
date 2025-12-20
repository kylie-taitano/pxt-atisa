#!/bin/bash
# Script to update pxtRelId for service worker cache-busting
# Phased approach - currently implements Phase 1: HTML files only
# 
# Usage: ./scripts/update-service-worker-version.sh [version]
#   If version not provided, reads from package.json

set -e

# Get script directory and resolve to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "Error: node is required but not installed"
    exit 1
fi

# Determine version to use
if [ -n "$1" ]; then
    NEW_VERSION="$1"
    echo "Using provided version: $NEW_VERSION"
else
    NEW_VERSION=$(node -p "require('./package.json').version")
    echo "Using version from package.json: $NEW_VERSION"
fi

# Validate version format (basic check)
if ! echo "$NEW_VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
    echo "Error: Invalid version format: $NEW_VERSION"
    exit 1
fi

# Check if build directory exists
BUILD_DIR="built/packaged/pxt-atisa"
if [ ! -d "$BUILD_DIR" ]; then
    echo "Error: Build directory not found: $BUILD_DIR"
    echo "Run 'pxt staticpkg --route pxt-atisa' first"
    exit 1
fi

# Phase 1: Update HTML files only (safest starting point)
echo ""
echo "=== Phase 1: Updating HTML files ==="
HTML_FILES=$(find "$BUILD_DIR" -name "*.html" -type f)

if [ -z "$HTML_FILES" ]; then
    echo "Warning: No HTML files found in $BUILD_DIR"
    exit 1
fi

UPDATED_COUNT=0
for file in $HTML_FILES; do
    # Use sed to replace "pxtRelId": "localDirRelId" with version
    # Only replace if it's exactly "localDirRelId" (safe pattern)
    if grep -q '"pxtRelId": "localDirRelId"' "$file" 2>/dev/null; then
        # Use node to do JSON-safe replacement
        node -e "
            const fs = require('fs');
            const content = fs.readFileSync('$file', 'utf8');
            const updated = content.replace(
                /\"pxtRelId\":\s*\"localDirRelId\"/g,
                '\"pxtRelId\": \"$NEW_VERSION\"'
            );
            fs.writeFileSync('$file', updated, 'utf8');
        "
        UPDATED_COUNT=$((UPDATED_COUNT + 1))
        echo "  ✓ Updated: $(basename $file)"
    fi
done

echo "Updated $UPDATED_COUNT HTML file(s)"

# Validate JSON in updated files
echo ""
echo "=== Validating JSON in updated files ==="
VALIDATION_FAILED=0
for file in $HTML_FILES; do
    if grep -q '"pxtRelId":' "$file" 2>/dev/null; then
        # Extract the pxtConfig JSON and validate it (basic check)
        if node -e "
            const fs = require('fs');
            const content = fs.readFileSync('$file', 'utf8');
            const match = content.match(/var pxtConfig = (\{[\s\S]*?\});/);
            if (match) {
                try {
                    JSON.parse(match[1]);
                    process.exit(0);
                } catch(e) {
                    console.error('Invalid JSON in ' + '$file');
                    process.exit(1);
                }
            }
        " 2>/dev/null; then
            echo "  ✓ Valid JSON in $(basename $file)"
        else
            echo "  ✗ Invalid JSON in $(basename $file)"
            VALIDATION_FAILED=1
        fi
    fi
done

if [ $VALIDATION_FAILED -eq 1 ]; then
    echo "Error: JSON validation failed"
    exit 1
fi

echo ""
echo "✓ Phase 1 completed successfully"
echo "Version set to: $NEW_VERSION"
echo ""
echo "Next steps:"
echo "1. Test the updated build locally"
echo "2. Check browser DevTools → Application → Service Workers"
echo "3. Verify cache names include the new version"

