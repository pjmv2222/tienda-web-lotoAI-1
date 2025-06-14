import requests
import json

# Datos de entrada para la predicción
# Puedes ajustar estos datos según lo que tu API espere recibir
data = {'input': [1, 2, 3, 4, 5]}  # Ejemplo de entrada, ajusta según sea necesario

headers = {'Content-Type': 'application/json'}

try:
    print("Haciendo la solicitud POST...")
    response = requests.post('http://localhost:5000/predict', headers=headers, json=data)
    respuesta_json = response.json()
    print(respuesta_json)

    # Verificar si la respuesta contiene las claves esperadas
    if 'prediction' in respuesta_json and 'status' in respuesta_json:
        # Asumimos que la predicción es un número de 5 dígitos
        numero_predicho = respuesta_json['prediction'].get('numero', 'No disponible')
        
        print(f"Input: {respuesta_json.get('input', 'No proporcionado')}")
        print(f"Predicción - Número: {numero_predicho}")
        print(f"Status: {respuesta_json['status']}")
    else:
        print("La respuesta no contiene los datos esperados.")
except requests.exceptions.RequestException as e:
    print("Error en la solicitud:", e)
except Exception as e:
    print(f"Ocurrió un error: {e}")