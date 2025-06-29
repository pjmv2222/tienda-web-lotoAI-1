#!/bin/bash

echo "🚀 Iniciando despliegue de LOTO IA..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. ¿Estás en el directorio correcto?"
    exit 1
fi

# Stop Python IA server to free memory during compilation
print_status "Deteniendo servidor de IA Python para liberar memoria..."
pkill -f "python3.*server-ia-unificado.py" || true
sleep 2

# Stop any existing Node.js processes
print_status "Deteniendo procesos de Node.js existentes..."
pkill -f "node.*dist/tienda-web-loto-ai/server" || true

# Install dependencies
print_status "Instalando dependencias..."
npm install

# Build the application with SSR
print_status "Construyendo aplicación con SSR..."
npm run build:ssr

# Check if build was successful
if [ ! -d "dist/tienda-web-loto-ai" ]; then
    print_error "El build falló. No se encontró el directorio dist."
    exit 1
fi

print_status "Build completado exitosamente."

# Start the application
print_status "Iniciando servidor Node.js..."
nohup npm run start:prod > /var/log/loto-ia.log 2>&1 &

# Get the process ID
NODE_PID=$!
echo $NODE_PID > /var/run/loto-ia.pid

# Wait a moment and check if the process is running
sleep 3
if ps -p $NODE_PID > /dev/null; then
    print_status "Servidor iniciado correctamente (PID: $NODE_PID)"
    print_status "Logs disponibles en: /var/log/loto-ia.log"
else
    print_error "Error al iniciar el servidor"
    exit 1
fi

# Reload nginx
print_status "Recargando configuración de nginx..."
nginx -t && nginx -s reload

print_status "🎉 ¡Despliegue completado exitosamente!"
print_status "Tu aplicación debería estar disponible en: https://loto-ia.com"
print_warning "Recuerda configurar tu certificado SSL en nginx.conf"

echo ""
echo "📋 Comandos útiles:"
echo "  - Ver logs: tail -f /var/log/loto-ia.log"
echo "  - Parar servidor: kill -TERM \$(cat /var/run/loto-ia.pid)"
echo "  - Verificar estado: ps -p \$(cat /var/run/loto-ia.pid)" 