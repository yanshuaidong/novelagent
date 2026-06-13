@echo off
cd /d "%~dp0" || exit /b 1
claude --dangerously-skip-permissions
