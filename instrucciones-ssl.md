# Instrucciones para corregir el certificado SSL

El certificado SSL actual no incluye el dominio `api.loto-ia.com`, lo que causa errores de validación cuando se intenta acceder a las APIs. Sigue estos pasos para corregir el problema:

## 1. Verificar los certificados actuales

```bash
sudo certbot certificates
```

Esto mostrará los certificados actuales y sus dominios.

## 2. Expandir el certificado existente para incluir api.loto-ia.com

```bash
sudo certbot --expand -d loto-ia.com,www.loto-ia.com,api.loto-ia.com
```

Este comando añadirá `api.loto-ia.com` al certificado existente.

## 3. Verificar que el certificado se ha actualizado correctamente

```bash
sudo certbot certificates
```

Deberías ver que el certificado ahora incluye `api.loto-ia.com`.

## 4. Reiniciar Nginx para aplicar los cambios

```bash
sudo systemctl restart nginx
```

## 5. Probar el acceso a la API

```bash
curl -v https://api.loto-ia.com/euromillon/health
```

Si todo está configurado correctamente, ya no deberías ver errores de certificado.

## Solución alternativa: Crear un certificado independiente

Si el comando de expansión no funciona, puedes crear un certificado independiente para el subdominio:

```bash
sudo certbot --nginx -d api.loto-ia.com
```

Después, edita el archivo de configuración de Nginx para usar el nuevo certificado:

```bash
sudo nano /etc/nginx/sites-available/ia-apis
```

Y actualiza las rutas del certificado:

```
ssl_certificate /etc/letsencrypt/live/api.loto-ia.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/api.loto-ia.com/privkey.pem;
```

Luego reinicia Nginx:

```bash
sudo systemctl restart nginx
```
