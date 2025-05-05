import requests
import json
import os
import sys

# URL de la API (por defecto, localhost)
API_URL = os.environ.get('API_URL', 'http://localhost:5001')

def test_health():
    """Prueba el endpoint de salud de la API"""
    try:
        response = requests.get(f"{API_URL}/health")
        print(f"Estado de la API: {response.status_code}")
        if response.status_code == 200:
            print(json.dumps(response.json(), indent=2))
            return True
        else:
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"Error al conectar con la API: {str(e)}")
        return False

def test_predict():
    """Prueba el endpoint de predicción de la API"""
    try:
        # Datos de entrada para la predicción
        input_data = {
            "input": [1, 2, 3, 4, 5, 6, 7]  # 5 números + 2 estrellas
        }
        
        # Realizar la solicitud
        response = requests.post(f"{API_URL}/predict", json=input_data)
        
        print(f"Predicción: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(json.dumps(result, indent=2))
            
            if result['success']:
                print("\nNúmeros predichos:")
                print(f"  Números: {', '.join(map(str, result['prediction']['numeros']))}")
                print(f"  Estrellas: {', '.join(map(str, result['prediction']['estrellas']))}")
            else:
                print(f"Error en la predicción: {result.get('error', 'Error desconocido')}")
            
            return True
        else:
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"Error al conectar con la API: {str(e)}")
        return False

def main():
    """Función principal"""
    print("=== Prueba de la API de Predicción de Euromillón ===")
    
    # Verificar si la API está en funcionamiento
    if not test_health():
        print("La API no está disponible. Asegúrate de que el servidor esté en ejecución.")
        return
    
    print("\n=== Prueba de Predicción ===")
    test_predict()

if __name__ == "__main__":
    main()
