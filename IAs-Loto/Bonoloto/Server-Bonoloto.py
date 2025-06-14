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
        
        # Generar predicción de 6 números y 1 reintegro
        numeros = random.sample(range(1, 50), 6)
        reintegro = random.randint(0, 9)
        
        # Crear la respuesta con la predicción
        response = {'status': 'Recibido', 'input': data['input'], 'prediction': {'numeros': numeros, 'reintegro': reintegro}}
        return jsonify(response)
    else:
        # Mejorar la respuesta para solicitudes GET
        response = {'status': 'Recibido', 'message': 'Utiliza el método POST con un cuerpo JSON para obtener una predicción.'}
        return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)