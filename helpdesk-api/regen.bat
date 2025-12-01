@echo off
cd /d "c:\Users\dagos\Documents\GitHub\HelpDesk\helpdesk-api"
echo Regenerando Prisma Client...
cmd /c "npx prisma generate"
echo.
echo Completo!
