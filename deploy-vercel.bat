@echo off
echo ==============================================
echo Deploying SEO Software to Vercel Cloud...
echo ==============================================
cd /d "%~dp0"
npx vercel
pause
