# Instrucciones de Implementación

Este documento contiene las instrucciones para implementar los cambios en el sistema de predicciones de LOTO IA.

## 1. Actualizar el Backend

### 1.1. Instalar dependencias

```bash
cd /var/www/tienda-web-lotoAI-1/src/backend
bash update-dependencies.sh
```

### 1.2. Compilar el backend

```bash
cd /var/www/tienda-web-lotoAI-1/src/backend
npm run build
```

### 1.3. Reiniciar el servicio del backend

```bash
pm2 restart loto-ia-backend
```

## 2. Configurar los Servidores Python

### 2.1. Ejecutar el script de configuración

```bash
cd /var/www/tienda-web-lotoAI-1/IAs-Loto
chmod +x setup-servers.sh
./setup-servers.sh
```

### 2.2. Verificar la configuración

```bash
supervisorctl status
```

## 3. Corregir el Certificado SSL

Sigue las instrucciones en el archivo `instrucciones-ssl.md`.

## 4. Actualizar el Frontend

### 4.1. Compilar el frontend

```bash
cd /var/www/tienda-web-lotoAI-1
npm run build:ssr
```

### 4.2. Reiniciar el servicio del frontend

```bash
pm2 restart loto-ia-ssr
```

## 5. Verificar la Implementación

### 5.1. Verificar que el backend está funcionando

```bash
curl -v https://loto-ia.com/api/predictions/test
```

### 5.2. Verificar que los servidores Python se inician correctamente

1. Accede a la página de predicciones de Euromillón: https://loto-ia.com/euromillon/prediccion
2. Haz clic en "Generar nuevas predicciones"
3. Verifica en el servidor que el proceso Python se ha iniciado:

```bash
supervisorctl status loto-ia-euromillon
```

4. Verifica los logs:

```bash
tail -f /var/log/loto-ia/euromillon.out.log
```

## 6. Solución de Problemas

### 6.1. Si los servidores Python no se inician

Verifica los logs de error:

```bash
tail -f /var/log/loto-ia/euromillon.err.log
```

### 6.2. Si el backend no puede comunicarse con los servidores Python

Verifica que los puertos están abiertos:

```bash
netstat -tulpn | grep 500
```

### 6.3. Si hay problemas con el certificado SSL

Verifica la configuración de Nginx:

```bash
nginx -t
```

## 7. Mantenimiento

### 7.1. Reiniciar todos los servidores Python

```bash
supervisorctl restart all
```

### 7.2. Detener todos los servidores Python

```bash
supervisorctl stop all
```

### 7.3. Ver los logs de todos los servidores

```bash
tail -f /var/log/loto-ia/*.log
```
