#!/bin/bash

echo "🚀 Compilando backend TypeScript..."

# Ir al directorio del backend
cd src/backend || exit 1

# Instalar dependencias
echo "📦 Instalando dependencias del backend..."
npm install

# Compilar TypeScript
echo "🔨 Compilando TypeScript..."
npm run build

# Verificar que la compilación fue exitosa
if [ -f "dist/index.js" ]; then
    echo "✅ Backend compilado exitosamente: dist/index.js"
    echo "📁 Archivos compilados:"
    ls -la dist/
else
    echo "❌ Error: No se pudo compilar el backend. Archivo dist/index.js no encontrado."
    exit 1
fi

# Volver al directorio raíz
cd ../..

echo "✅ Compilación del backend completada!"
