@echo off
setlocal enabledelayedexpansion
cd /d "c:\Users\dagos\Documents\GitHub\HelpDesk\helpdesk-api"

REM Delete node_modules\.prisma\client
if exist "node_modules\.prisma\client" (
  rmdir /s /q "node_modules\.prisma\client"
)

REM Regenerate
call npx prisma generate

echo.
echo Prisma Client regenerado!
pause
