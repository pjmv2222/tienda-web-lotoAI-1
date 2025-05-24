# Inteligencias Artificiales para Predicciones de Lotería

Este directorio contiene las 7 inteligencias artificiales desarrolladas para generar predicciones para diferentes juegos de lotería.

## Estructura del Proyecto

Cada juego tiene su propio directorio con los siguientes componentes:

- Modelo entrenado (archivo .h5)
- Servidor API (server.py)
- Scripts de solicitud para probar las APIs (Solicitud API-*.py)

## Implementación en la VPS

Para implementar las IAs en la VPS, sigue estos pasos:

1. **Transferir los archivos a la VPS**:
   - Puedes usar el workflow de GitHub Actions `deploy-with-ias.yml` para transferir automáticamente los archivos a la VPS.
   - Alternativamente, puedes transferir los archivos manualmente usando SCP o SFTP.

2. **Configurar el entorno en la VPS**:
   - Ejecuta el script `setup_vps.sh` para configurar el entorno en la VPS.
   - Este script instalará las dependencias necesarias, configurará los servidores de API y configurará Nginx para redirigir las solicitudes a los servidores.

3. **Verificar la instalación**:
   - Verifica que los servidores estén funcionando correctamente usando `supervisorctl status`.
   - Verifica que Nginx esté configurado correctamente usando `nginx -t`.
   - Prueba las APIs accediendo a `https://api.loto-ia.com/euromillon/health` (y las demás rutas).

## Uso de las APIs

Cada API tiene las siguientes rutas:

- `GET /health`: Verifica el estado de la API.
- `POST /predict`: Genera una predicción para el juego correspondiente.
- `GET /`: Obtiene información sobre la API.

### Ejemplo de solicitud para generar una predicción:

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"input": [1, 2, 3, 4, 5]}' https://api.loto-ia.com/euromillon/predict
```

### Ejemplo de respuesta:

```json
{
  "success": true,
  "prediction": {
    "numeros": [5, 17, 23, 32, 41],
    "estrellas": [2, 9]
  }
}
```

## Desarrollo Local

Para ejecutar los servidores localmente, puedes usar el script `start_all_servers.py`:

```bash
python start_all_servers.py
```

Este script iniciará todos los servidores en puertos diferentes:

- Euromillón: 5001
- Bonoloto: 5002
- EuroDreams: 5003
- El Gordo: 5004
- Lotería Nacional: 5005
- Lototurf: 5006
- La Primitiva: 5007

## Integración con el Frontend

El frontend se comunica con las APIs a través del servicio `PredictionService` en Angular. Este servicio utiliza la URL configurada en el archivo `environment.ts` (o `environment.prod.ts` en producción).

En desarrollo, las solicitudes se envían a través del backend, que actúa como proxy para las APIs de IA. En producción, las solicitudes se envían directamente a las APIs de IA.

## Solución de Problemas

Si encuentras problemas con las APIs, puedes verificar los logs de los servidores:

```bash
tail -f /var/log/supervisor/euromillon.err.log
```

También puedes reiniciar los servidores:

```bash
supervisorctl restart euromillon
```

## Notas Adicionales

- Los modelos de IA están entrenados con datos históricos de los sorteos de lotería.
- Las APIs utilizan autenticación JWT para proteger las rutas.
- Las APIs verifican si el usuario tiene una suscripción activa antes de generar predicciones.
- En caso de que el modelo no esté disponible, las APIs generarán predicciones aleatorias como respaldo.
