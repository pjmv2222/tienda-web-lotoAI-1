#!/bin/bash

# Control del servidor de IA - Arrancar/Parar bajo demanda
# Uso: ./ia-server-control.sh [start|stop|status|restart]

SCRIPT_DIR="/var/www/tienda-web-lotoAI-1"
SERVER_SCRIPT="server-ia-unificado.py"
PID_FILE="$SCRIPT_DIR/ia-server.pid"
LOG_FILE="$SCRIPT_DIR/server-ia.log"
PORT=5000

start_server() {
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        echo "⚠️ El servidor de IA ya está corriendo (PID: $(cat $PID_FILE))"
        return 1
    fi
    
    echo "🚀 Iniciando servidor de IA..."
    cd "$SCRIPT_DIR"
    
    # Limpiar logs anteriores
    > "$LOG_FILE"
    
    # Arrancar en background
    nohup python3 "$SERVER_SCRIPT" > "$LOG_FILE" 2>&1 &
    SERVER_PID=$!
    
    # Guardar PID
    echo "$SERVER_PID" > "$PID_FILE"
    
    # Esperar a que arranque
    sleep 5
    
    # Verificar que arrancó correctamente
    if kill -0 "$SERVER_PID" 2>/dev/null && lsof -i :$PORT >/dev/null 2>&1; then
        echo "✅ Servidor de IA iniciado correctamente (PID: $SERVER_PID)"
        echo "📋 Puerto: $PORT"
        echo "📄 Logs: $LOG_FILE"
        return 0
    else
        echo "❌ Error al iniciar el servidor de IA"
        cat "$LOG_FILE" | tail -10
        rm -f "$PID_FILE"
        return 1
    fi
}

stop_server() {
    if [ ! -f "$PID_FILE" ]; then
        echo "⚠️ No se encontró archivo PID. Buscando procesos..."
        pkill -f "$SERVER_SCRIPT"
        fuser -k ${PORT}/tcp 2>/dev/null
        echo "🛑 Procesos terminados"
        return 0
    fi
    
    SERVER_PID=$(cat "$PID_FILE")
    
    if kill -0 "$SERVER_PID" 2>/dev/null; then
        echo "🛑 Deteniendo servidor de IA (PID: $SERVER_PID)..."
        kill "$SERVER_PID"
        
        # Esperar hasta 10 segundos
        for i in {1..10}; do
            if ! kill -0 "$SERVER_PID" 2>/dev/null; then
                break
            fi
            sleep 1
        done
        
        # Forzar si sigue activo
        if kill -0 "$SERVER_PID" 2>/dev/null; then
            echo "🔫 Forzando terminación..."
            kill -9 "$SERVER_PID"
        fi
        
        echo "✅ Servidor de IA detenido"
    else
        echo "⚠️ El servidor no estaba corriendo"
    fi
    
    rm -f "$PID_FILE"
    
    # Limpiar cualquier proceso que use el puerto
    fuser -k ${PORT}/tcp 2>/dev/null
}

status_server() {
    if [ -f "$PID_FILE" ] && kill -0 $(cat "$PID_FILE") 2>/dev/null; then
        SERVER_PID=$(cat "$PID_FILE")
        echo "✅ Servidor de IA corriendo (PID: $SERVER_PID)"
        echo "📋 Puerto: $PORT"
        if lsof -i :$PORT >/dev/null 2>&1; then
            echo "🌐 Puerto $PORT activo"
        else
            echo "❌ Puerto $PORT no responde"
        fi
        return 0
    else
        echo "❌ Servidor de IA no está corriendo"
        return 1
    fi
}

case "$1" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    status)
        status_server
        ;;
    restart)
        stop_server
        sleep 2
        start_server
        ;;
    *)
        echo "Uso: $0 {start|stop|status|restart}"
        echo ""
        echo "  start   - Iniciar servidor de IA"
        echo "  stop    - Detener servidor de IA"
        echo "  status  - Ver estado del servidor"
        echo "  restart - Reiniciar servidor de IA"
        exit 1
        ;;
esac

exit $? 