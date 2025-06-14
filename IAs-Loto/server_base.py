from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import random
import logging
import jwt
from datetime import datetime, timedelta
from functools import wraps

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("api.log"),
        logging.StreamHandler()
    ]
)

# Inicializar la aplicación Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuración
SECRET_KEY = os.environ.get('JWT_SECRET', 'lotoia_super_secret_key_2024_verification_token')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Función para verificar token JWT
def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except jwt.PyJWTError:
        return None

# Decorador para proteger rutas
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header:
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        user_id = verify_token(token)
        if not user_id:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        # Verificar si el usuario tiene una suscripción activa
        if not has_active_subscription(user_id):
            return jsonify({'message': 'No active subscription found!'}), 403
        
        return f(*args, **kwargs)
    return decorated

# Función para verificar si un usuario tiene una suscripción activa
def has_active_subscription(user_id):
    # En un entorno real, esto consultaría una base de datos
    # Para simplificar, asumimos que todos los usuarios autenticados tienen suscripción
    return True

# Ruta para verificar el estado de la API
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'timestamp': datetime.now().isoformat(),
        'service': 'IA Prediction API'
    })

# Ruta para generar predicciones
@app.route('/predict', methods=['POST'])
@token_required
def predict():
    try:
        data = request.json
        if not data or 'input' not in data:
            return jsonify({
                'success': False,
                'error': 'Invalid input data'
            }), 400
        
        # Aquí iría la lógica específica de cada juego para generar predicciones
        # Por ahora, generamos números aleatorios como ejemplo
        prediction = generate_random_prediction()
        
        return jsonify({
            'success': True,
            'prediction': prediction
        })
    except Exception as e:
        logging.error(f"Error generating prediction: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Función para generar una predicción aleatoria (debe ser sobrescrita por cada juego)
def generate_random_prediction():
    # Esta función debe ser implementada específicamente para cada juego
    return {
        'numbers': [random.randint(1, 50) for _ in range(5)],
        'special': random.randint(1, 10)
    }

# Ruta para obtener información sobre la API
@app.route('/', methods=['GET'])
def info():
    return jsonify({
        'name': 'IA Prediction API',
        'version': '1.0.0',
        'description': 'API for lottery number predictions using AI',
        'endpoints': [
            {
                'path': '/health',
                'method': 'GET',
                'description': 'Check API health'
            },
            {
                'path': '/predict',
                'method': 'POST',
                'description': 'Generate predictions',
                'requires_auth': True
            }
        ]
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
