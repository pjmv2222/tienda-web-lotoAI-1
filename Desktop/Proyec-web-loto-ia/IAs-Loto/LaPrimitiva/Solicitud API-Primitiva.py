import requests
import json

# Datos de entrada para la predicción
data = {'input': [1, 2, 3, 4, 5]}

headers = {'Content-Type': 'application/json'}

try:
    print("Haciendo la solicitud POST...")

    # Hacer la solicitud POST
    response = requests.post('http://127.0.0.1:5000/predict', data=json.dumps(data), headers=headers)

    print("Solicitud POST completada. Respuesta recibida.")

    # Convertir la respuesta en JSON
    respuesta_json = response.json()

    # Extraer y formatear los números y el reintegro para imprimir en horizontal
    numeros = ', '.join(map(str, respuesta_json['prediction']['numeros']))
    reintegro = respuesta_json['prediction']['reintegro']
    print(f"Input: {respuesta_json['input']}")
    print(f"Predicción - Números: {numeros} | Reintegro: {reintegro}")
    print(f"Status: {respuesta_json['status']}")

except Exception as e:
    print(f"Ocurrió un error: {e}")