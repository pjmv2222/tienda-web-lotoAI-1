#!/bin/bash
# mantenimiento-servidor.sh - Script de mantenimiento automático para la aplicación
# Se recomienda ejecutarlo mediante un cronjob cada día o semana

# Definir colores para la salida
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Directorio del proyecto
PROJECT_DIR="/var/www/tienda-web-lotoAI-1"
BACKEND_DIR="$PROJECT_DIR/src/backend"
LOG_FILE="$PROJECT_DIR/mantenimiento.log"

# Función para registrar mensajes
log_message() {
    echo -e "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Función para verificar y reparar PM2
check_and_repair_pm2() {
    log_message "${GREEN}Verificando instalación de PM2...${NC}"
    
    if ! command -v pm2 &> /dev/null; then
        log_message "${YELLOW}PM2 no encontrado. Instalando globalmente...${NC}"
        npm install -g pm2
        if [ $? -eq 0 ]; then
            log_message "${GREEN}PM2 instalado correctamente${NC}"
        else
            log_message "${RED}Error al instalar PM2${NC}"
            return 1
        fi
    else
        log_message "${GREEN}PM2 ya está instalado${NC}"
    fi
    
    # Verificar procesos de PM2
    log_message "${GREEN}Verificando procesos PM2...${NC}"
    pm2 list
    
    # Verificar si los procesos están en modo error
    local error_count=$(pm2 list --no-color | grep -c "errored")
    if [ $error_count -gt 0 ]; then
        log_message "${YELLOW}Se detectaron $error_count procesos con errores. Reiniciando...${NC}"
        pm2 restart all
    fi
    
    # Verificar si hay demasiados reinicios
    local restart_threshold=50
    local high_restart_procs=$(pm2 list --no-color | awk '$8 > '"$restart_threshold"' {print $2}')
    
    if [ ! -z "$high_restart_procs" ]; then
        log_message "${YELLOW}Los siguientes procesos tienen más de $restart_threshold reinicios:${NC}"
        echo "$high_restart_procs"
        
        # Reparar los procesos con muchos reinicios
        for proc in $high_restart_procs; do
            log_message "${YELLOW}Reparando proceso $proc con muchos reinicios...${NC}"
            pm2 delete "$proc"
            
            if [ "$proc" = "loto-ia-ssr" ]; then
                log_message "${GREEN}Reiniciando servidor SSR...${NC}"
                cd "$PROJECT_DIR"
                pm2 start server-ssr.js --name loto-ia-ssr
            elif [ "$proc" = "loto-ia-backend" ]; then
                log_message "${GREEN}Reiniciando backend...${NC}"
                cd "$BACKEND_DIR"
                pm2 start dist/index.js --name loto-ia-backend
            fi
        done
        
        pm2 save
    fi
}

# Función para verificar y reparar dependencias
check_and_repair_dependencies() {
    log_message "${GREEN}Verificando dependencias del proyecto...${NC}"
    
    cd "$PROJECT_DIR"
    
    # Verificar que dotenv está instalado
    if ! npm list dotenv | grep -q dotenv; then
        log_message "${YELLOW}Módulo dotenv no encontrado. Instalando...${NC}"
        npm install dotenv
    fi
    
    # Verificar node_modules
    if [ ! -d "node_modules" ] || [ ! -d "node_modules/dotenv" ]; then
        log_message "${YELLOW}Carpeta node_modules incompleta. Reinstalando dependencias...${NC}"
        npm install
    fi
    
    # Verificar backend
    cd "$BACKEND_DIR"
    if [ ! -d "node_modules" ]; then
        log_message "${YELLOW}Carpeta node_modules del backend no encontrada. Reinstalando...${NC}"
        npm install
    fi
}

# Función para verificar y corregir el archivo server-ssr.js
check_and_repair_server_ssr() {
    log_message "${GREEN}Verificando server-ssr.js...${NC}"
    
    cd "$PROJECT_DIR"
    local server_ssr="$PROJECT_DIR/server-ssr.js"
    
    if [ ! -f "$server_ssr" ]; then
        log_message "${YELLOW}Archivo server-ssr.js no encontrado. Creando...${NC}"
        create_server_ssr
        return
    fi
    
    # Verificar tamaño del archivo
    local file_size=$(stat -c%s "$server_ssr")
    if [ "$file_size" -lt 500 ]; then
        log_message "${YELLOW}Archivo server-ssr.js parece incompleto (tamaño: $file_size bytes). Recreando...${NC}"
        create_server_ssr
    else
        log_message "${GREEN}Archivo server-ssr.js parece correcto (tamaño: $file_size bytes)${NC}"
    fi
}

# Función para crear el archivo server-ssr.js
create_server_ssr() {
    log_message "${GREEN}Creando archivo server-ssr.js...${NC}"
    
    cat > "$PROJECT_DIR/server-ssr.js" << 'EOL'
// server-ssr.js - Script de inicio del servidor Angular SSR
// Versión robusta que funciona incluso sin dependencias externas

// Inicializar configuración fundamental
process.env.NODE_OPTIONS = '--no-zone'; // Evitar error NG0908 con NgZone

/**
 * Cargador de variables de entorno con tolerancia a fallos
 */
(function cargarVariablesEntorno() {
  // Posibles rutas para el archivo .env
  const posiblesRutas = [
    '/var/www/tienda-web-lotoAI-1/src/backend/.env',
    __dirname + '/src/backend/.env',
    __dirname + '/.env'
  ];
  
  try {
    // Intentamos cargar el módulo dotenv
    const fs = require('fs');
    const path = require('path');
    
    try {
      // Si dotenv está disponible, intentamos usarlo
      const dotenv = require('dotenv');
      console.log('✅ Módulo dotenv cargado correctamente');
      
      // Buscar en las posibles rutas
      let archivoEncontrado = false;
      
      for (const rutaArchivo of posiblesRutas) {
        try {
          if (fs.existsSync(rutaArchivo)) {
            console.log(`🔍 Archivo .env encontrado en: ${rutaArchivo}`);
            dotenv.config({ path: rutaArchivo });
            archivoEncontrado = true;
            break;
          }
        } catch (err) {
          console.warn(`⚠️ Error al verificar ruta ${rutaArchivo}: ${err.message}`);
        }
      }
      
      if (!archivoEncontrado) {
        console.warn('⚠️ No se encontró ningún archivo .env en las rutas buscadas');
      }
      
    } catch (dotenvError) {
      console.warn('⚠️ No se pudo cargar el módulo dotenv:', dotenvError.message);
      
      // Si dotenv no está disponible, intentamos una lectura manual básica
      for (const rutaArchivo of posiblesRutas) {
        try {
          if (fs.existsSync(rutaArchivo)) {
            console.log(`🔧 Intentando leer .env manualmente desde: ${rutaArchivo}`);
            const contenido = fs.readFileSync(rutaArchivo, 'utf8');
            
            // Parseo manual simple del archivo .env
            const lineas = contenido.split('\n');
            for (const linea of lineas) {
              const partes = linea.trim().split('=');
              if (partes.length >= 2 && !partes[0].startsWith('#')) {
                const clave = partes[0].trim();
                // Unir todo después del primer = (por si hay más = en el valor)
                const valor = partes.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
                if (clave && !process.env[clave]) {
                  process.env[clave] = valor;
                }
              }
            }
            
            console.log('✅ Variables de entorno cargadas manualmente');
            break;
          }
        } catch (fsError) {
          console.warn(`⚠️ Error al leer manualmente ${rutaArchivo}:`, fsError.message);
        }
      }
    }
    
  } catch (err) {
    console.warn('⚠️ Error al acceder a filesystem:', err.message);
  }
  
  // Establecer valores por defecto para variables críticas si no existen
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn('⚠️ Variable STRIPE_SECRET_KEY no encontrada, usando valor por defecto');
    process.env.STRIPE_SECRET_KEY = 'sk_dummy_key_for_ssr_startup_only';
  }
  
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn('⚠️ Variable STRIPE_WEBHOOK_SECRET no encontrada, usando valor por defecto');
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_dummy_key_for_ssr_startup_only';
  }
})();

// Verificar entorno
console.log(`🔵 Entorno: ${process.env.NODE_ENV || 'no definido'}`);
console.log(`🔵 Directorio actual: ${__dirname}`);

// Preparar manejo de errores global para evitar fallos silenciosos
process.on('uncaughtException', (error) => {
  console.error('❌ Error no controlado en el servidor SSR:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada:', reason);
});

console.log('🚀 Iniciando servidor Angular SSR...');

// Envolver el inicio del servidor en un try-catch para mayor seguridad
try {
  require('./dist/tienda-web-loto-ai/server/main.js');
  console.log('✅ Servidor Angular SSR iniciado correctamente');
} catch (error) {
  console.error('❌ Error al iniciar el servidor SSR:', error);
  console.error('🔍 Verificar si se ha compilado la aplicación correctamente con "npm run build:ssr"');
  process.exit(1);
}
EOL

    log_message "${GREEN}Archivo server-ssr.js creado correctamente${NC}"
}

# Función principal
main() {
    log_message "${GREEN}=== INICIO DEL MANTENIMIENTO AUTOMÁTICO ===${NC}"
    
    # Verificar que estamos en el directorio del proyecto
    if [ ! -d "$PROJECT_DIR" ]; then
        log_message "${RED}Directorio del proyecto no encontrado: $PROJECT_DIR${NC}"
        exit 1
    fi
    
    # Ejecutar verificaciones
    check_and_repair_dependencies
    check_and_repair_server_ssr
    check_and_repair_pm2
    
    log_message "${GREEN}=== MANTENIMIENTO COMPLETADO ===${NC}"
}

# Ejecutar función principal
main
