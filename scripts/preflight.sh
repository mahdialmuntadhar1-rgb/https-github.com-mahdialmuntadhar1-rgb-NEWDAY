#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting preflight checks..."

# Check for Supabase environment variables
if [ -z "$VITE_SUPABASE_URL" ]; then
  echo "❌ Error: VITE_SUPABASE_URL is not set."
  exit 1
fi

if [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
  echo "❌ Error: VITE_SUPABASE_ANON_KEY is not set."
  exit 1
fi

echo "✅ Environment variables found."

# Run linting
echo "🔍 Running linting..."
npm run lint

# Run build
echo "🏗️  Running build..."
npm run build

echo "✨ Preflight checks passed! Build output is in dist/"
