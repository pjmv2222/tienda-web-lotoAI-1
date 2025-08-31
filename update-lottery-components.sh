#!/bin/bash

# Script para actualizar todos los componentes de lotería con datos dinámicos
# Reemplaza datos estáticos de "últimos resultados" por datos del scraper

echo "🔄 Actualizando componentes de lotería para usar datos dinámicos..."

# Lista de componentes a actualizar
COMPONENTS=(
    "bonoloto"
    "gordo-primitiva" 
    "eurodreams"
    "lototurf"
    "loteria-nacional"
)

# Directorio base
BASE_DIR="c:\Users\Pedro\Desktop\Proyec-web-loto-ia\tienda-web-lotoAI-1\src\app\pages"

for COMPONENT in "${COMPONENTS[@]}"; do
    echo "📄 Procesando $COMPONENT..."
    
    TS_FILE="$BASE_DIR/$COMPONENT/$COMPONENT.component.ts"
    HTML_FILE="$BASE_DIR/$COMPONENT/$COMPONENT.component.html"
    
    if [ -f "$TS_FILE" ]; then
        echo "  ✅ Encontrado: $TS_FILE"
    else
        echo "  ❌ No encontrado: $TS_FILE"
    fi
    
    if [ -f "$HTML_FILE" ]; then
        echo "  ✅ Encontrado: $HTML_FILE"
    else
        echo "  ❌ No encontrado: $HTML_FILE"
    fi
done

echo "✅ Análisis completado. Proceder con actualizaciones manuales..."
