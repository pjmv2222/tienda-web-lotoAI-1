import requests
import json

# Datos de entrada para la predicción
data = {'input': [1, 2, 3, 4, 5]}

headers = {'Content-Type': 'application/json'}

try:
    print("Haciendo la solicitud POST...")

    # Hacer la solicitud POST
    response = requests.post('http://127.0.0.1:5000/predict', data=json.dumps(data), headers=headers)

    if response.status_code == 200:
        print("Solicitud POST completada. Respuesta recibida.")

        # Convertir la respuesta en JSON
        respuesta_json = response.json()

        # Verificar si la respuesta contiene las claves esperadas
        if 'prediction' in respuesta_json and 'status' in respuesta_json:
            # Extraer y formatear los números y el reintegro para imprimir en horizontal
            numeros = ', '.join(map(str, respuesta_json['prediction']['numeros']))
            reintegro = respuesta_json['prediction']['reintegro']
            print(f"Input: {respuesta_json.get('input', 'No proporcionado')}")
            print(f"Predicción - Números: {numeros} | Reintegro: {reintegro}")
            print(f"Status: {respuesta_json['status']}")
        else:
            print("La respuesta no contiene los datos esperados.")
    else:
        print(f"Error en la solicitud: {response.status_code} - {response.text}")

except Exception as e:
    print(f"Ocurrió un error: {e}")