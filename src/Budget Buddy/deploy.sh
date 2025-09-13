#!/bin/bash

echo "========================================"
echo "    Budget Buddy Deployment Script"
echo "========================================"
echo

echo "[1/4] Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js is installed"

echo
echo "[2/4] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed successfully"

echo
echo "[3/4] Starting Budget Buddy server..."
echo
echo "========================================"
echo "    Budget Buddy is starting..."
echo "    Open your browser and go to:"
echo "    http://localhost:3000"
echo "========================================"
echo
echo "Press Ctrl+C to stop the server"
echo

node server.js
