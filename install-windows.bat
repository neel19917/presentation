@echo off
REM ============================================================================
REM  FreightPOP LocalDemo - Windows installer + launcher.  Double-click me.
REM
REM  Works on a brand-new Windows PC with NOTHING installed - no Node, no admin
REM  rights. If Node.js isn't already on the machine, this downloads a
REM  self-contained copy into a local ".node" folder (using PowerShell, which
REM  ships with Windows 10/11) and runs the demo from there. Nothing is
REM  installed system-wide; delete the LocalDemo folder and it's all gone.
REM
REM  Re-runnable: after the first run the downloaded Node is reused instantly.
REM ============================================================================
setlocal enableextensions
cd /d "%~dp0"

REM Pinned Node LTS - permanent release on nodejs.org, safe to hard-code.
set "NODE_VERSION=v20.18.1"
set "NODE_DIR=.node"
set "NODE_BIN=%NODE_DIR%\node.exe"

echo.
echo === FreightPOP Demo - starting up... ===
echo.

REM -- 1a. System Node already installed? --
where node >nul 2>nul
if %errorlevel%==0 (
  set "NODE=node"
  echo Found Node.js already installed.
  goto run
)

REM -- 1b. Private Node from a previous run? --
if exist "%NODE_BIN%" (
  set "NODE=%NODE_BIN%"
  echo Using the local Node.js from a previous run.
  goto run
)

REM -- 1c. Download a private, no-admin copy of Node (win-x64 runs on x64 and ARM) --
set "PKG=node-%NODE_VERSION%-win-x64"
set "URL=https://nodejs.org/dist/%NODE_VERSION%/%PKG%.zip"

echo First-time setup: downloading a private copy of Node.js %NODE_VERSION% (x64)...
echo (~30 MB, one time only - needs internet for this step)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='Stop';" ^
  "try {" ^
  "  New-Item -ItemType Directory -Force -Path '%NODE_DIR%' | Out-Null;" ^
  "  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;" ^
  "  Invoke-WebRequest -Uri '%URL%' -OutFile '%NODE_DIR%\node.zip';" ^
  "  Expand-Archive -Path '%NODE_DIR%\node.zip' -DestinationPath '%NODE_DIR%\tmp' -Force;" ^
  "  Move-Item -Path ('%NODE_DIR%\tmp\%PKG%\*') -Destination '%NODE_DIR%' -Force;" ^
  "  Remove-Item -Recurse -Force '%NODE_DIR%\tmp','%NODE_DIR%\node.zip'" ^
  "} catch { Write-Host $_.Exception.Message; exit 1 }"

if not exist "%NODE_BIN%" (
  echo.
  echo Download failed. Check your internet connection and try again.
  echo If this PC has no internet, install Node.js from https://nodejs.org on any
  echo machine, or ask IT to whitelist nodejs.org, then run this again.
  echo.
  pause
  exit /b 1
)
set "NODE=%NODE_BIN%"
echo Done - installed a private Node.js.

:run
echo.
echo === Opening the FreightPOP demo in your browser... ===
echo Leave this window open while presenting. Close it (or press Ctrl+C) to stop.
echo If the browser doesn't open, go to:  http://localhost:8123/app/index.html
echo.
"%NODE%" server.js
pause
