@echo off
echo ========================================
echo    Budget Buddy Deployment Script
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed

echo.
echo [2/4] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed successfully

echo.
echo [3/4] Starting Budget Buddy server...
echo.
echo ========================================
echo    Budget Buddy is starting...
echo    Open your browser and go to:
echo    http://localhost:3000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

node server.js
