# Cron Job del Scraper de Lotería

## Descripción
Este sistema automatiza la ejecución del scraper de lotería para mantener actualizados tanto los **botes** como los **resultados de sorteos** en la página web.

## ¿Qué actualiza?
El scraper actualiza automáticamente:
- ✅ **Botes de lotería** (Euromillones, Primitiva, Bonoloto, etc.) - para la cabecera de la página
- ✅ **Resultados de sorteos** - para la página de "últimos sorteos"
- ✅ **Números especiales** (complementarios, reintegros, estrellas, etc.)
- ✅ **Códigos El Millón y Joker**

## Archivos generados
- `src/assets/lottery-data.json` - Datos completos (botes + resultados)
- `src/assets/botes.json` - Solo botes (para compatibilidad)
- `dist/tienda-web-loto-ai/browser/assets/lottery-data.json` - Copia para producción
- `dist/tienda-web-loto-ai/browser/assets/botes.json` - Copia para producción

## Instalación en el servidor

### 1. Subir archivos al servidor
```bash
# Copiar los scripts al servidor
scp cron-scraper.sh setup-cron.sh monitor-scraper.sh root@212.227.230.103:/var/www/tienda-web-lotoAI-1/
```

### 2. Configurar el cron job
```bash
# Conectar al servidor
ssh root@212.227.230.103

# Ir al directorio del proyecto
cd /var/www/tienda-web-lotoAI-1

# Ejecutar el script de configuración
chmod +x setup-cron.sh
./setup-cron.sh
```

## Horarios de ejecución

### Ejecuciones regulares
- **Cada 2 horas**: De 8:00 AM a 10:00 PM
- **Madrugada**: 2:00 AM (para datos del día anterior)

### Ejecuciones especiales (después de sorteos)
- **Jueves 21:30**: Después de Primitiva, Bonoloto, Lotería Nacional
- **Viernes 22:30**: Después de Euromillones
- **Sábado 21:30**: Después de Primitiva, Bonoloto, Lotería Nacional  
- **Domingo 22:30**: Después de El Gordo de la Primitiva

## Monitoreo y mantenimiento

### Ver estado actual
```bash
cd /var/www/tienda-web-lotoAI-1
./monitor-scraper.sh
```

### Ver logs en tiempo real
```bash
sudo tail -f /var/log/loto-scraper.log
```

### Ejecutar scraper manualmente
```bash
cd /var/www/tienda-web-lotoAI-1
./cron-scraper.sh
```

### Ver configuración del cron
```bash
crontab -l
```

### Editar configuración del cron
```bash
crontab -e
```

## Verificación de funcionamiento

### Verificar archivos de datos
```bash
ls -la /var/www/tienda-web-lotoAI-1/src/assets/*.json
ls -la /var/www/tienda-web-lotoAI-1/dist/tienda-web-loto-ai/browser/assets/*.json
```

### Verificar contenido de los datos
```bash
# Ver botes actuales
cat /var/www/tienda-web-lotoAI-1/src/assets/botes.json

# Ver timestamp de última actualización
grep '"timestamp"' /var/www/tienda-web-lotoAI-1/src/assets/lottery-data.json
```

### Verificar logs de ejecución
```bash
# Ver últimas 20 líneas del log
tail -20 /var/log/loto-scraper.log

# Buscar errores
grep -i error /var/log/loto-scraper.log

# Ver últimas ejecuciones exitosas
grep "exitosamente" /var/log/loto-scraper.log | tail -5
```

## Solución de problemas

### El scraper no se ejecuta
1. Verificar que el cron está configurado: `crontab -l`
2. Verificar permisos del script: `ls -la cron-scraper.sh`
3. Verificar logs: `tail -f /var/log/loto-scraper.log`

### Los datos no se actualizan
1. Ejecutar manualmente: `./cron-scraper.sh`
2. Verificar que el proceso no esté bloqueado
3. Verificar conectividad con las páginas de lotería

### Errores de permisos
```bash
# Corregir permisos de scripts
chmod +x /var/www/tienda-web-lotoAI-1/*.sh

# Corregir permisos de archivos de datos
chmod 644 /var/www/tienda-web-lotoAI-1/src/assets/*.json
chmod 644 /var/www/tienda-web-lotoAI-1/dist/tienda-web-loto-ai/browser/assets/*.json
```

### Timeout del scraper
El scraper tiene un timeout de 5 minutos. Si necesita más tiempo:
```bash
# Editar cron-scraper.sh y cambiar la línea:
timeout 300 node dist/scraper.js
# Por ejemplo, para 10 minutos:
timeout 600 node dist/scraper.js
```

## Comandos de mantenimiento

### Limpiar logs antiguos (opcional)
```bash
# Mantener solo las últimas 1000 líneas
tail -1000 /var/log/loto-scraper.log > /tmp/loto-scraper-temp.log
mv /tmp/loto-scraper-temp.log /var/log/loto-scraper.log
```

### Backup de configuración del cron
```bash
crontab -l > ~/crontab-backup-$(date +%Y%m%d).txt
```

### Desinstalar el cron job
```bash
# Eliminar entradas del scraper
crontab -l | grep -v "cron-scraper.sh" | crontab -
```

## Notas importantes
- El scraper utiliza Puppeteer y puede consumir memoria significativa
- Se recomienda monitorear el uso de memoria del servidor
- Los datos se actualizan automáticamente en ambos directorios (src y dist)
- El sistema es compatible con el funcionamiento actual de la aplicación
- No requiere cambios en el código de la aplicación web
