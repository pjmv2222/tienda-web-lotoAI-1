#!/bin/bash

echo "🔧 PRUEBA LOCAL DEL BACKEND"
echo "=========================="

# Navegar al backend
cd src/backend

echo "📦 Instalando dependencias..."
npm install

echo "🔨 Compilando TypeScript..."
npm run build

if [ -f "dist/index.js" ]; then
    echo "✅ Compilación exitosa"
    echo "📁 Archivos generados:"
    ls -la dist/
    
    echo ""
    echo "🚀 Iniciando servidor para pruebas..."
    echo "El servidor debería estar disponible en http://localhost:3001"
    echo "Endpoint de prueba: http://localhost:3001/api/predictions/summary"
    echo ""
    echo "Presiona Ctrl+C para detener el servidor"
    echo ""
    
    # Iniciar el servidor
    NODE_ENV=development npm start
else
    echo "❌ Error en la compilación"
    exit 1
fi
