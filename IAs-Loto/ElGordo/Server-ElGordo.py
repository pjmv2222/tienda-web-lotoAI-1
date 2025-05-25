from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import logging

app = Flask(__name__)
CORS(app)  # Habilitar CORS en todas las rutas

# Configurar logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        data = request.json
        if 'input' not in data:
            # Si falta el campo 'input', devuelve un error
            response = {'status': 'Error', 'message': 'Falta el campo de entrada'}
            return jsonify(response), 400
        
        # Generar predicción de 5 números y 1 número clave para el Gordo
        numeros = random.sample(range(1, 55), 5)  # Cambio de rango a 1-54 y cantidad a 5
        reintegro = random.randint(0, 9)  # Número clave sin cambios
        
        # Crear la respuesta con la predicción
        # Crear la respuesta con la predicción
        response = {'status': 'Recibido', 'input': data['input'], 'prediction': {'numeros': numeros, 'clue': reintegro}}
        return jsonify(response)
    else:
        # Mejorar la respuesta para solicitudes GET
        response = {'status': 'Recibido', 'message': 'Utiliza el método POST con un cuerpo JSON para obtener una predicción.'}
        return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)