@echo off
echo ===================================================
echo Deploying SEO Software to Vercel (coolbot1352)...
echo ===================================================
cd /d "%~dp0"
npx vercel --prod
pause
