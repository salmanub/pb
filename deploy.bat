@echo off
REM Script de Auto-Despliegue para Perito.barcelona (Windows)
REM Uso: deploy.bat "Mensaje del commit"

if "%~1"=="" (
  echo ❌ Error: Debes proporcionar un mensaje para el commit.
  echo Uso: deploy.bat "Mensaje del commit"
  exit /b 1
)

echo 🚀 Iniciando proceso de despliegue...

REM 1. Git: Add, Commit, Push
echo 📦 Guardando cambios en Git...
git add .
git commit -m "%~1"
git push

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Error al subir cambios a GitHub.
  exit /b 1
) else (
  echo ✅ Cambios subidos a GitHub correctamente.
)

REM 2. Wrangler: Deploy Worker
echo ☁️ Desplegando Worker en Cloudflare...
cd chatbot
call npx wrangler deploy
cd ..

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Error al desplegar el Worker.
  exit /b 1
) else (
  echo ✅ Worker desplegado correctamente.
  echo 🎉 ¡Despliegue completado con éxito!
)
