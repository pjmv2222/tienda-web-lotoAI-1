from flask import Flask, request, jsonify
import random  # Importar el módulo random
from flask_cors import CORS  # Paso 2: Importar CORS

app = Flask(__name__)
CORS(app)  # Paso 3: Aplicar CORS a la aplicación Flask

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        # Procesar la solicitud POST
        data = request.json
        # Generar predicción de 5 números y 2 estrellas
        numeros = random.sample(range(1, 51), 5)  # 5 números del 1 al 50
        estrellas = random.sample(range(1, 13), 2)  # 2 estrellas del 1 al 12
        # Crear la respuesta con la predicción
        response = {'status': 'Recibido', 'input': data['input'], 'prediction': {'numeros': numeros, 'estrellas': estrellas}}
        return jsonify(response)
    elif request.method == 'GET':
        # Procesar la solicitud GET
        response = {'status': 'Recibido', 'message': 'Solicitud GET no soportada actualmente'}
        return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)