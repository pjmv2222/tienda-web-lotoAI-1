# API de Predicción de Euromillón

Este directorio contiene la inteligencia artificial para generar predicciones para el juego de Euromillón.

## Archivos Principales

- `EUROMILLON-4.1.py`: El script principal que contiene la IA para generar pronósticos de Euromillón.
- `DataFrame_Euromillones.csv`: Base de datos histórica de sorteos de Euromillón que alimenta a la IA.
- `modelo_euromillon.h5`: Modelo entrenado de la IA.
- `server.py`: Servidor API para exponer la funcionalidad de predicción.
- `test_api.py`: Script para probar la API localmente.
- `check_files.py`: Script para verificar que todos los archivos necesarios estén presentes.

## Preparación para el Despliegue

Antes de desplegar en la VPS, asegúrate de que todos los archivos necesarios estén presentes y sean válidos:

```bash
python check_files.py
```

## Ejecución Local

Para ejecutar el servidor API localmente:

```bash
python server.py
```

Para probar la API:

```bash
python test_api.py
```

## Estructura de la API

La API expone los siguientes endpoints:

- `GET /health`: Verifica el estado de la API.
- `POST /predict`: Genera una predicción para Euromillón.
- `GET /`: Obtiene información sobre la API.

### Ejemplo de solicitud para generar una predicción:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"input": [1, 2, 3, 4, 5, 6, 7]}' http://localhost:5001/predict
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

## Notas Importantes

1. **Rutas Relativas**: El código ha sido modificado para usar rutas relativas en lugar de absolutas, lo que facilita su despliegue en la VPS.

2. **Normalización de Datos**: La API utiliza los datos históricos para normalizar las entradas y desnormalizar las salidas del modelo.

3. **Manejo de Errores**: Si el modelo o los datos históricos no están disponibles, la API generará predicciones aleatorias como respaldo.

4. **Autenticación**: En producción, la API requiere autenticación mediante token JWT. Para desarrollo, se puede omitir la autenticación configurando la variable de entorno `SKIP_AUTH=true`.

## Despliegue en la VPS

Para desplegar en la VPS, sigue estos pasos:

1. Asegúrate de que todos los archivos necesarios estén presentes y sean válidos.
2. Transfiere los archivos a la VPS.
3. Configura el servidor para ejecutar la API.
4. Configura Nginx para redirigir las solicitudes a la API.

Para más detalles, consulta el archivo `setup_vps.sh` en el directorio principal.
