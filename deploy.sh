#!/bin/bash
cd "$(dirname "$0")"

echo "==> Initializing git..."
git init

echo "==> Adding all files..."
git add -A

echo "==> Creating commit..."
git commit -m "Initial commit — Dahl Industries portfolio"

echo "==> Setting branch to main..."
git branch -M main

echo "==> Adding remote..."
git remote add origin https://github.com/Dahl-Industries/dahlindustries.se.git 2>/dev/null || git remote set-url origin https://github.com/Dahl-Industries/dahlindustries.se.git

echo "==> Pushing to GitHub..."
git push -u origin main

echo ""
echo "==> Done! Check https://github.com/Dahl-Industries/dahlindustries.se"
