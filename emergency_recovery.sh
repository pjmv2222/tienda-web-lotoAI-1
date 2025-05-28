#!/bin/bash

# Script de recuperación de emergencia para LOTO-IA
# Ejecutar como root en el servidor

echo "=== SCRIPT DE RECUPERACIÓN DE EMERGENCIA LOTO-IA ==="
echo "Iniciando recuperación en $(date)"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

# Función para logging
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# 1. Verificar servicios básicos
log "1. Verificando servicios básicos..."

# Verificar Nginx
if ! systemctl is-active --quiet nginx; then
    warning "Nginx no está activo. Intentando iniciar..."
    systemctl start nginx
    if systemctl is-active --quiet nginx; then
        log "Nginx iniciado correctamente"
    else
        error "No se pudo iniciar Nginx"
        systemctl status nginx
    fi
else
    log "Nginx está funcionando"
fi

# 2. Verificar configuración de Nginx
log "2. Verificando configuración de Nginx..."
if nginx -t; then
    log "Configuración de Nginx es válida"
else
    error "Configuración de Nginx tiene errores"
    # Restaurar configuración básica
    warning "Restaurando configuración básica de Nginx..."
    
    # Crear configuración básica para loto-ia.com
    cat > /etc/nginx/sites-available/loto-ia.com << 'EOF'
server {
    listen 80;
    server_name loto-ia.com www.loto-ia.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name loto-ia.com www.loto-ia.com;

    ssl_certificate /etc/letsencrypt/live/loto-ia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/loto-ia.com/privkey.pem;

    root /var/www/tienda-web-lotoAI-1/dist/tienda-web-loto-ai/browser;
    index index.html;

    # Configuración para Angular Universal (SSR)
    location / {
        try_files $uri $uri/ @fallback;
    }

    location @fallback {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Proxy para API del backend
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }
}
EOF

    # Habilitar el sitio
    ln -sf /etc/nginx/sites-available/loto-ia.com /etc/nginx/sites-enabled/
    
    # Verificar nueva configuración
    if nginx -t; then
        log "Configuración básica restaurada correctamente"
        systemctl reload nginx
    else
        error "Error en la configuración restaurada"
    fi
fi

# 3. Verificar PM2
log "3. Verificando servicios PM2..."
if command -v pm2 >/dev/null 2>&1; then
    pm2 list
    
    # Verificar si los servicios están corriendo
    if ! pm2 list | grep -q "loto-ia-ssr.*online"; then
        warning "Servicio frontend no está corriendo. Intentando iniciar..."
        cd /var/www/tienda-web-lotoAI-1
        pm2 start dist/tienda-web-loto-ai/server/server.mjs --name "loto-ia-ssr"
    fi
    
    if ! pm2 list | grep -q "loto-ia-backend.*online"; then
        warning "Servicio backend no está corriendo. Intentando iniciar..."
        cd /var/www/tienda-web-lotoAI-1
        pm2 start dist/tienda-web-loto-ai/browser/backend/index.js --name "loto-ia-backend"
    fi
else
    error "PM2 no está instalado"
fi

# 4. Verificar archivos del proyecto
log "4. Verificando archivos del proyecto..."
if [ ! -d "/var/www/tienda-web-lotoAI-1" ]; then
    error "Directorio del proyecto no existe"
else
    log "Directorio del proyecto existe"
    
    if [ ! -d "/var/www/tienda-web-lotoAI-1/dist" ]; then
        warning "Directorio dist no existe. El proyecto necesita ser compilado."
    else
        log "Directorio dist existe"
    fi
fi

# 5. Verificar certificados SSL
log "5. Verificando certificados SSL..."
if [ -f "/etc/letsencrypt/live/loto-ia.com/fullchain.pem" ]; then
    log "Certificados SSL encontrados"
    # Verificar si están próximos a expirar
    if openssl x509 -checkend 604800 -noout -in /etc/letsencrypt/live/loto-ia.com/fullchain.pem; then
        log "Certificados SSL válidos por al menos 7 días más"
    else
        warning "Certificados SSL expiran pronto. Considera renovarlos."
    fi
else
    error "Certificados SSL no encontrados"
fi

# 6. Verificar puertos
log "6. Verificando puertos..."
netstat -tulpn | grep LISTEN | grep -E ":(80|443|3001|4000)"

# 7. Mostrar logs recientes
log "7. Logs recientes de Nginx:"
echo "--- Últimos errores ---"
tail -5 /var/log/nginx/error.log 2>/dev/null || echo "No hay logs de error"

echo "--- Últimos accesos ---"
tail -5 /var/log/nginx/access.log 2>/dev/null || echo "No hay logs de acceso"

# 8. Reiniciar servicios si es necesario
log "8. Reiniciando servicios..."
systemctl reload nginx
pm2 restart all 2>/dev/null || echo "PM2 no disponible o sin procesos"

log "=== RECUPERACIÓN COMPLETADA ==="
log "Verifica el estado del sitio en: https://loto-ia.com"
log "Si persisten los problemas, revisa los logs detallados."
