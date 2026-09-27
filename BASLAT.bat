@echo off
chcp 65001 >nul
title TikTok Takim Savasi

echo ==========================================
echo   TikTok Takim Savasi Baslatiliyor...
echo ==========================================
echo.

cd /d "%~dp0"

:: 3000 portunu kullanan eski bir surec varsa sonlandir
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    taskkill /f /pid %%a >nul 2>&1
)

:: 2 saniye sonra tarayiciyi otomatik ac
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000/overlay.html"

echo Sunucu calisiyor. Kapatmak icin bu pencereyi kapatiniz.
echo Overlay: http://localhost:3000/overlay.html
echo.

node server.js
pause
