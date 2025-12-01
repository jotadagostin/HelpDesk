@echo off
cd /d "c:\Users\dagos\Documents\GitHub\HelpDesk\helpdesk-api"
echo Aplicando migrations ao banco de dados...
cmd /c "npx prisma db push"
echo.
echo Completo!
pause
