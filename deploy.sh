#!/bin/bash

# Script de Auto-Despliegue para Perito.barcelona
# Uso: ./deploy.sh "Mensaje del commit"

if [ -z "$1" ]; then
  echo "❌ Error: Debes proporcionar un mensaje para el commit."
  echo "Uso: ./deploy.sh \"Mensaje del commit\""
  exit 1
fi

echo "🚀 Iniciando proceso de despliegue..."

# 1. Git: Add, Commit, Push
echo "📦 Guardando cambios en Git..."
git add .
git commit -m "$1"
git push

if [ $? -eq 0 ]; then
  echo "✅ Cambios subidos a GitHub correctamente."
else
  echo "❌ Error al subir cambios a GitHub."
  exit 1
fi

# 2. Wrangler: Deploy Worker
echo "☁️ Desplegando Worker en Cloudflare..."
cd chatbot
npx wrangler deploy

if [ $? -eq 0 ]; then
  echo "✅ Worker desplegado correctamente."
  echo "🎉 ¡Despliegue completado con éxito!"
else
  echo "❌ Error al desplegar el Worker."
  exit 1
fi
