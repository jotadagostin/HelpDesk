@echo off
cd /d "%~dp0"
call npx prisma generate
call npx prisma db push
echo.
echo Prisma Client gerado e DB atualizado!
pause
