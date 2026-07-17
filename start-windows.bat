@echo off
REM FreightPOP LocalDemo - Windows launcher. Double-click me.
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel%==0 (
  node server.js
  goto end
)

where python >nul 2>nul
if %errorlevel%==0 (
  echo Node.js not found - falling back to Python.
  echo Open http://localhost:8123/app/index.html in your browser.
  python -m http.server 8123
  goto end
)

echo Neither Node.js nor Python found.
echo Install Node.js from https://nodejs.org and double-click this file again.

:end
pause
