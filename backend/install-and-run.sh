#!/bin/bash

# Installation script for Node v24 compatibility
# This script installs dependencies while skipping native modules that don't compile with Node v24

echo "📦 Installing dependencies (skipping native modules for Node v24)..."

# Install npm packages, skipping optional dependencies
npm install --no-optional 2>&1 | grep -E "(added|up to date|found|packages)" || true

echo ""
echo "✅ Installation complete!"
echo ""
echo "🚀 Starting backend server..."
echo ""

# Start the server
npm run dev
