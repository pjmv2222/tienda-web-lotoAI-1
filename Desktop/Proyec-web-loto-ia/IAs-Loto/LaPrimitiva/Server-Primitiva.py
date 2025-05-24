from flask import Flask, request, jsonify
import random
from flask_cors import CORS  # Paso 2: Importar CORS

app = Flask(__name__)
CORS(app)  # Paso 3: Aplicar CORS a la aplicación Flask

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if request.method == 'POST':
        # Procesar la solicitud POST
        data = request.json
        # Generar predicción de 6 números y 1 reintegro
        numeros = random.sample(range(1, 50), 6)  # 6 números del 1 al 49
        reintegro = random.randint(0, 9)  # 1 reintegro del 0 al 9
        # Crear la respuesta con la predicción
        response = {'status': 'Recibido', 'input': data['input'], 'prediction': {'numeros': numeros, 'reintegro': reintegro}}
        return jsonify(response)
    elif request.method == 'GET':
        # Procesar la solicitud GET
        response = {'status': 'Recibido', 'message': 'Solicitud GET no soportada actualmente'}
        return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)