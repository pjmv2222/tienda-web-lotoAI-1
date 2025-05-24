#!/bin/bash

# Script para configurar los servidores de IA en la VPS
# Este script debe ejecutarse en la VPS después de transferir los archivos

# Colores para la salida
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con formato
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si el script se está ejecutando como root
if [ "$EUID" -ne 0 ]; then
    print_error "Este script debe ejecutarse como root"
    exit 1
fi

# Directorio base para las IAs
BASE_DIR="/var/www/tienda-web-lotoAI-1/ias"

# Crear directorio base si no existe
if [ ! -d "$BASE_DIR" ]; then
    print_message "Creando directorio base para las IAs: $BASE_DIR"
    mkdir -p "$BASE_DIR"
fi

# Instalar dependencias
print_message "Instalando dependencias..."
apt-get update
apt-get install -y python3 python3-pip python3-venv nginx supervisor

# Crear entorno virtual
print_message "Creando entorno virtual..."
python3 -m venv "$BASE_DIR/venv"
source "$BASE_DIR/venv/bin/activate"

# Instalar dependencias de Python
print_message "Instalando dependencias de Python..."
pip install flask flask-cors pyjwt tensorflow numpy pandas gunicorn

# Configurar supervisor para cada servidor
print_message "Configurando supervisor para los servidores..."

# Euromillón
cat > /etc/supervisor/conf.d/euromillon.conf << EOF
[program:euromillon]
command=$BASE_DIR/venv/bin/gunicorn -b 127.0.0.1:5001 server:app
directory=$BASE_DIR/EuroMillon-CSV
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/supervisor/euromillon.err.log
stdout_logfile=/var/log/supervisor/euromillon.out.log
environment=PORT=5001,MODEL_PATH="modelo_euromillon.h5",SKIP_AUTH="false",JWT_SECRET="lotoia_super_secret_key_2024_verification_token"
EOF

# Bonoloto
cat > /etc/supervisor/conf.d/bonoloto.conf << EOF
[program:bonoloto]
command=$BASE_DIR/venv/bin/gunicorn -b 127.0.0.1:5002 server:app
directory=$BASE_DIR/Bonoloto
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/supervisor/bonoloto.err.log
stdout_logfile=/var/log/supervisor/bonoloto.out.log
environment=PORT=5002,MODEL_PATH="modelo_Bonoloto.h5",SKIP_AUTH="false",JWT_SECRET="lotoia_super_secret_key_2024_verification_token"
EOF

# EuroDreams
cat > /etc/supervisor/conf.d/eurodreams.conf << EOF
[program:eurodreams]
command=$BASE_DIR/venv/bin/gunicorn -b 127.0.0.1:5003 server:app
directory=$BASE_DIR/EuroDreams
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/supervisor/eurodreams.err.log
stdout_logfile=/var/log/supervisor/eurodreams.out.log
environment=PORT=5003,MODEL_PATH="modelo_EuroDreams.h5",SKIP_AUTH="false",JWT_SECRET="lotoia_super_secret_key_2024_verification_token"
EOF

# El Gordo
cat > /etc/supervisor/conf.d/elgordo.conf << EOF
[program:elgordo]
command=$BASE_DIR/venv/bin/gunicorn -b 127.0.0.1:5004 server:app
directory=$BASE_DIR/ElGordo
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/supervisor/elgordo.err.log
stdout_logfile=/var/log/supervisor/elgordo.out.log
environment=PORT=5004,MODEL_PATH="modelo_ElGordo.h5",SKIP_AUTH="false",JWT_SECRET="lotoia_super_secret_key_2024_verification_token"
EOF

# Lotería Nacional
cat > /etc/supervisor/conf.d/loterianacional.conf << EOF
[program:loterianacional]
command=$BASE_DIR/venv/bin/gunicorn -b 127.0.0.1:5005 server:app
directory=$BASE_DIR/LOTERIA\ NACIONAL
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/supervisor/loterianacional.err.log
stdout_logfile=/var/log/supervisor/loterianacional.out.log
environment=PORT=5005,MODEL_PATH="modelo_LoteriaNacional.h5",SKIP_AUTH="false",JWT_SECRET="lotoia_super_secret_key_2024_verification_token"
EOF

# Lototurf
cat > /etc/supervisor/conf.d/lototurf.conf << EOF
[program:lototurf]
command=$BASE_DIR/venv/bin/gunicorn -b 127.0.0.1:5006 server:app
directory=$BASE_DIR/Lototurf
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/supervisor/lototurf.err.log
stdout_logfile=/var/log/supervisor/lototurf.out.log
environment=PORT=5006,MODEL_PATH="modelo_Lototurf.h5",SKIP_AUTH="false",JWT_SECRET="lotoia_super_secret_key_2024_verification_token"
EOF

# La Primitiva
cat > /etc/supervisor/conf.d/primitiva.conf << EOF
[program:primitiva]
command=$BASE_DIR/venv/bin/gunicorn -b 127.0.0.1:5007 server:app
directory=$BASE_DIR/LaPrimitiva
user=www-data
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/supervisor/primitiva.err.log
stdout_logfile=/var/log/supervisor/primitiva.out.log
environment=PORT=5007,MODEL_PATH="modelo_primitiva.h5",SKIP_AUTH="false",JWT_SECRET="lotoia_super_secret_key_2024_verification_token"
EOF

# Configurar Nginx para redirigir las solicitudes a los servidores
print_message "Configurando Nginx..."

cat > /etc/nginx/sites-available/ia-apis << EOF
server {
    listen 80;
    server_name api.loto-ia.com;

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name api.loto-ia.com;

    ssl_certificate /etc/letsencrypt/live/loto-ia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/loto-ia.com/privkey.pem;

    # Configuración SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Cabeceras de seguridad
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # Euromillón
    location /euromillon/ {
        proxy_pass http://127.0.0.1:5001/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Bonoloto
    location /bonoloto/ {
        proxy_pass http://127.0.0.1:5002/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # EuroDreams
    location /eurodreams/ {
        proxy_pass http://127.0.0.1:5003/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # El Gordo
    location /gordo-primitiva/ {
        proxy_pass http://127.0.0.1:5004/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Lotería Nacional
    location /loteria-nacional/ {
        proxy_pass http://127.0.0.1:5005/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Lototurf
    location /lototurf/ {
        proxy_pass http://127.0.0.1:5006/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # La Primitiva
    location /primitiva/ {
        proxy_pass http://127.0.0.1:5007/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Habilitar el sitio
ln -sf /etc/nginx/sites-available/ia-apis /etc/nginx/sites-enabled/

# Verificar la configuración de Nginx
nginx -t

# Reiniciar servicios
print_message "Reiniciando servicios..."
systemctl restart supervisor
systemctl restart nginx

print_message "Configuración completada. Los servidores de IA deberían estar funcionando."
print_message "Puedes verificar el estado con: supervisorctl status"
