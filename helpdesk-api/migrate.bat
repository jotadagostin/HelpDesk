@echo off
cd /d "%~dp0"
rmdir /s /q prisma\migrations
npx prisma migrate dev --name init
pause
