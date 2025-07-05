from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import numpy as np
import pandas as pd
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler, StandardScaler
import logging
import jwt
from datetime import datetime, timedelta
from functools import wraps
import time

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("ia-server.log"),
        logging.StreamHandler()
    ]
)

# Inicializar la aplicación Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuración
SECRET_KEY = os.environ.get('JWT_SECRET', '8011471e-90c3-4af3-bc53-452557b92001')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Configuración de juegos y sus archivos DataFrame específicos
JUEGOS_CONFIG = {
    'euromillon': {
        'modelo': '/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroMillon-CSV/modelo_euromillon.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroMillon-CSV/DataFrame_Euromillones_2024.csv',
        'separador': ';',
        'columnas_entrada': ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2'],
        'columnas_salida': ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2'],
        'escalador': 'MinMaxScaler',
        'num_principales': 5,
        'num_especiales': 2,
        'rango_principales': (1, 50),
        'rango_especiales': (1, 12)
    },
    'bonoloto': {
        'modelo': '/var/www/tienda-web-lotoAI-1/IAs-Loto/Bonoloto/modelo_Bonoloto.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/IAs-Loto/Bonoloto/DataFrame_Bonoloto.csv',
        'separador': ',',
        'columnas_entrada': ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund'],
        'columnas_salida': ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund'],
        'escalador': 'MinMaxScaler',
        'num_principales': 6,
        'num_especiales': 1,
        'rango_principales': (1, 49),
        'rango_especiales': (0, 9)
    },
    'primitiva': {
        'modelo': '/var/www/tienda-web-lotoAI-1/IAs-Loto/LaPrimitiva/modelo_primitiva.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/IAs-Loto/LaPrimitiva/DataFrame_primitiva_guardado.csv',
        'separador': ',',
        'columnas_entrada': ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund'],
        'columnas_salida': ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Refund'],
        'escalador': 'MinMaxScaler',
        'num_principales': 6,
        'num_especiales': 1,
        'rango_principales': (1, 49),
        'rango_especiales': (0, 9)
    },
    'elgordo': {
        'modelo': '/var/www/tienda-web-lotoAI-1/IAs-Loto/ElGordo/modelo_ElGordo.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/IAs-Loto/ElGordo/DataFrame_ElGordo.csv',
        'separador': ',',
        'columnas_entrada': ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Clue'],
        'columnas_salida': ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Clue'],
        'escalador': 'MinMaxScaler',
        'num_principales': 5,
        'num_especiales': 1,
        'rango_principales': (1, 54),
        'rango_especiales': (0, 9)
    },
    'eurodreams': {
        'modelo': '/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroDreams/modelo_EuroDreams.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroDreams/DataFrame_EuroDreams.csv',
        'separador': ',',
        'columnas_entrada': ['DaysSince', 'Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6'],
        'columnas_salida': ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Dream'],
        'escalador': 'StandardScaler',
        'num_principales': 6,
        'num_especiales': 1,
        'rango_principales': (1, 40),
        'rango_especiales': (1, 5)
    },
    'loterianacional': {
        'modelo': '/var/www/tienda-web-lotoAI-1/IAs-Loto/LOTERIA NACIONAL/modelo_LoteriaNacional.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/IAs-Loto/LOTERIA NACIONAL/DataFrame_LOTERIA NACIONAL.csv',
        'separador': ',',
        'columnas_entrada': ['Fecha', 'Sorteo', 'Euros'],
        'columnas_salida': ['Numero'],
        'escalador': 'MinMaxScaler',
        'num_principales': 5,
        'num_especiales': 0,
        'rango_principales': (0, 99999),
        'rango_especiales': None
    },
    'lototurf': {
        'modelo': '/var/www/tienda-web-lotoAI-1/IAs-Loto/Lototurf/modelo_Lototurf.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/IAs-Loto/Lototurf/DataFrame_Lototurf.csv',
        'separador': ',',
        'columnas_entrada': ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Horse'],
        'columnas_salida': ['Num1', 'Num2', 'Num3', 'Num4', 'Num5', 'Num6', 'Horse'],
        'escalador': 'MinMaxScaler',
        'num_principales': 6,
        'num_especiales': 1,
        'rango_principales': (1, 20),
        'rango_especiales': (1, 10)
    }
}

# Variables globales para modelos y escaladores
modelos = {}
escaladores = {}
datos_historicos = {}

# Función para cargar modelos y datos
def cargar_modelos():
    """Carga todos los modelos de IA y sus datos históricos"""
    global modelos, escaladores, datos_historicos
    
    for juego, config in JUEGOS_CONFIG.items():
        try:
            logging.info(f"Cargando modelo para {juego}...")
            
            # Cargar modelo
            if os.path.exists(config['modelo']):
                modelos[juego] = load_model(config['modelo'])
                logging.info(f"✅ Modelo {juego} cargado correctamente")
            else:
                logging.warning(f"⚠️ Modelo {juego} no encontrado en {config['modelo']}")
                continue
            
            # Cargar datos históricos
            if os.path.exists(config['dataset']):
                datos_historicos[juego] = pd.read_csv(
                    config['dataset'], 
                    sep=config['separador'],
                    encoding='utf-8'
                )
                
                # Preparar escaladores usando las columnas específicas de entrenamiento
                if juego == 'loterianacional':
                    # Lotería Nacional: X de entrada, Y de salida
                    X = datos_historicos[juego][config['columnas_entrada']].copy()
                    # Convertir fecha a timestamp si es necesario
                    if 'Fecha' in X.columns:
                        X['Fecha'] = pd.to_datetime(X['Fecha'], format='%d/%m/%Y').astype('int64') // 10**9
                    X = X.astype(float)
                elif juego == 'eurodreams':
                    # EuroDreams: crear DaysSince si no existe
                    datos_temp = datos_historicos[juego].copy()
                    if 'DaysSince' not in datos_temp.columns and 'Date' in datos_temp.columns:
                        datos_temp['Date'] = pd.to_datetime(datos_temp['Date'])
                        reference_date = pd.Timestamp('2000-01-01')
                        datos_temp['DaysSince'] = (datos_temp['Date'] - reference_date).dt.days
                    X = datos_temp[config['columnas_entrada']].astype(float)
                else:
                    # Otros juegos: usar columnas de entrada directamente
                    X = datos_historicos[juego][config['columnas_entrada']].astype(float)
                
                # Usar el escalador especificado en configuración
                if config['escalador'] == 'StandardScaler':
                    escaladores[juego] = StandardScaler()
                else:
                    escaladores[juego] = MinMaxScaler()
                
                escaladores[juego].fit(X)
                
                logging.info(f"✅ Dataset {juego} cargado: {len(datos_historicos[juego])} registros")
            else:
                logging.warning(f"⚠️ Dataset {juego} no encontrado en {config['dataset']}")
                
        except Exception as e:
            logging.error(f"❌ Error cargando {juego}: {str(e)}")

# Función para verificar token JWT
def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")  # Cambiado de "sub" a "id"
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
        
        return f(*args, **kwargs)
    return decorated

# Función para generar predicción con IA
def generar_prediccion_ia(juego):
    """Genera predicción usando el modelo de IA entrenado"""
    try:
        if juego not in modelos or juego not in escaladores:
            raise Exception(f"Modelo para {juego} no disponible")
        
        config = JUEGOS_CONFIG[juego]
        modelo = modelos[juego]
        scaler = escaladores[juego]
        
        # AÑADIR VARIABILIDAD: usar datos históricos aleatorios de los últimos 20 registros
        datos_recientes = datos_historicos[juego].tail(20)
        # Seleccionar aleatoriamente uno de los últimos registros
        indice_aleatorio = np.random.randint(0, min(len(datos_recientes), 10))
        datos_seleccionados = datos_recientes.iloc[indice_aleatorio:indice_aleatorio+1]
        
        if juego == 'loterianacional':
            # Lotería Nacional: usar estructura específica con Fecha, Sorteo, Euros
            datos_temp = datos_seleccionados[config['columnas_entrada']].copy()
            if 'Fecha' in datos_temp.columns:
                datos_temp['Fecha'] = pd.to_datetime(datos_temp['Fecha'], format='%d/%m/%Y').astype('int64') // 10**9
            entrada_base = datos_temp.values.astype(float)
        elif juego == 'eurodreams':
            # EuroDreams: crear DaysSince si no existe
            datos_temp = datos_seleccionados.copy()
            if 'DaysSince' not in datos_temp.columns and 'Date' in datos_temp.columns:
                datos_temp['Date'] = pd.to_datetime(datos_temp['Date'])
                reference_date = pd.Timestamp('2000-01-01')
                datos_temp['DaysSince'] = (datos_temp['Date'] - reference_date).dt.days
            entrada_base = datos_temp[config['columnas_entrada']].values.astype(float)
        else:
            # Otros juegos: usar columnas de entrada directamente
            entrada_base = datos_seleccionados[config['columnas_entrada']].values.astype(float)
        
        # AÑADIR VARIABILIDAD: añadir ruido aleatorio pequeño a la entrada
        ruido = np.random.normal(0, 0.1, entrada_base.shape)
        entrada_base_con_ruido = entrada_base + ruido
        
        # Normalizar entrada
        entrada_normalizada = scaler.transform(entrada_base_con_ruido)
        
        # Reformatear para LSTM
        entrada_reshaped = entrada_normalizada.reshape(
            entrada_normalizada.shape[0], 
            entrada_normalizada.shape[1], 
            1
        )
        
        # Generar predicción
        prediccion_raw = modelo.predict(entrada_reshaped, verbose=0)
        
        # Desnormalizar
        prediccion_desnormalizada = scaler.inverse_transform(prediccion_raw)
        
        # AÑADIR VARIABILIDAD: añadir componente temporal para más variación
        timestamp_factor = int(time.time()) % 1000
        prediccion_con_variacion = prediccion_desnormalizada[0] + (timestamp_factor * 0.001)
        
        # Ajustar predicción a rangos válidos
        prediccion_ajustada = ajustar_prediccion(prediccion_con_variacion, config)
        
        return prediccion_ajustada
        
    except Exception as e:
        logging.error(f"Error generando predicción IA para {juego}: {str(e)}")
        # Fallback a predicción aleatoria
        return generar_prediccion_aleatoria(juego)

# Función para ajustar predicción a rangos válidos
def ajustar_prediccion(prediccion, config):
    """Ajusta la predicción a los rangos válidos del juego"""
    juego_nombre = None
    for nombre, conf in JUEGOS_CONFIG.items():
        if conf == config:
            juego_nombre = nombre
            break
    
    if juego_nombre == 'loterianacional':
        # Lotería Nacional: número de 5 dígitos
        numero = int(abs(prediccion[0])) % 100000
        return {
            'numero': f"{numero:05d}",
            'mensaje': 'Predicción generada con IA para Lotería Nacional'
        }
    
    elif juego_nombre == 'euromillon':
        # EuroMillon: 5 números + 2 estrellas
        numeros = []
        for i in range(5):
            num = int(abs(prediccion[i])) % 50 + 1
            while num in numeros:
                num = num % 50 + 1
            numeros.append(num)
        
        estrellas = []
        for i in range(5, min(7, len(prediccion))):
            est = int(abs(prediccion[i])) % 12 + 1
            while est in estrellas:
                est = est % 12 + 1
            estrellas.append(est)
        
        # Asegurar que tenemos 2 estrellas
        while len(estrellas) < 2:
            est = np.random.randint(1, 13)
            if est not in estrellas:
                estrellas.append(est)
        
        return {
            'numeros': sorted(numeros),
            'estrellas': sorted(estrellas),
            'mensaje': 'Predicción generada con IA para EuroMillon'
        }
    
    else:
        # Otros juegos: estructura estándar
        numeros = []
        rango_min, rango_max = config['rango_principales']
        
        for i in range(config['num_principales']):
            if i < len(prediccion):
                num = int(abs(prediccion[i])) % (rango_max - rango_min + 1) + rango_min
                while num in numeros:
                    num = (num % (rango_max - rango_min + 1)) + rango_min
                numeros.append(num)
        
        resultado = {
            'numeros': sorted(numeros),
            'mensaje': f'Predicción generada con IA para {juego_nombre.title()}'
        }
        
        # Agregar número especial si existe
        if config['num_especiales'] > 0 and config['rango_especiales']:
            esp_min, esp_max = config['rango_especiales']
            especial = int(abs(prediccion[-1])) % (esp_max - esp_min + 1) + esp_min
            resultado['especial'] = especial
        
        return resultado

# Función fallback para predicción aleatoria
def generar_prediccion_aleatoria(juego):
    """Genera predicción aleatoria como fallback"""
    config = JUEGOS_CONFIG[juego]
    
    if juego == 'loterianacional':
        return {
            'numero': f"{np.random.randint(10000, 99999):05d}",
            'mensaje': 'Predicción aleatoria para Lotería Nacional'
        }
    elif juego == 'euromillon':
        numeros = sorted(np.random.choice(range(1, 51), 5, replace=False))
        estrellas = sorted(np.random.choice(range(1, 13), 2, replace=False))
        return {
            'numeros': numeros,
            'estrellas': estrellas,
            'mensaje': 'Predicción aleatoria para EuroMillon'
        }
    else:
        rango_min, rango_max = config['rango_principales']
        numeros = sorted(np.random.choice(
            range(rango_min, rango_max + 1), 
            config['num_principales'], 
            replace=False
        ))
        
        resultado = {
            'numeros': numeros,
            'mensaje': f'Predicción aleatoria para {juego.title()}'
        }
        
        if config['num_especiales'] > 0 and config['rango_especiales']:
            esp_min, esp_max = config['rango_especiales']
            resultado['especial'] = np.random.randint(esp_min, esp_max + 1)
        
        return resultado

# Rutas específicas para cada juego
@app.route('/euromillon/predict', methods=['POST'])
@token_required
def predict_euromillon():
    try:
        prediccion = generar_prediccion_ia('euromillon')
        return jsonify({
            'success': True,
            'juego': 'euromillon',
            'prediccion': prediccion,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logging.error(f"Error en predicción EuroMillon: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/bonoloto/predict', methods=['POST'])
@token_required
def predict_bonoloto():
    try:
        prediccion = generar_prediccion_ia('bonoloto')
        return jsonify({
            'success': True,
            'juego': 'bonoloto',
            'prediccion': prediccion,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logging.error(f"Error en predicción Bonoloto: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/primitiva/predict', methods=['POST'])
@token_required
def predict_primitiva():
    try:
        prediccion = generar_prediccion_ia('primitiva')
        return jsonify({
            'success': True,
            'juego': 'primitiva',
            'prediccion': prediccion,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logging.error(f"Error en predicción Primitiva: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/elgordo/predict', methods=['POST'])
@token_required
def predict_elgordo():
    try:
        prediccion = generar_prediccion_ia('elgordo')
        return jsonify({
            'success': True,
            'juego': 'elgordo',
            'prediccion': prediccion,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logging.error(f"Error en predicción El Gordo: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/eurodreams/predict', methods=['POST'])
@token_required
def predict_eurodreams():
    try:
        prediccion = generar_prediccion_ia('eurodreams')
        return jsonify({
            'success': True,
            'juego': 'eurodreams',
            'prediccion': prediccion,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logging.error(f"Error en predicción EuroDreams: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/loterianacional/predict', methods=['POST'])
@token_required
def predict_loterianacional():
    try:
        prediccion = generar_prediccion_ia('loterianacional')
        return jsonify({
            'success': True,
            'juego': 'loterianacional',
            'prediccion': prediccion,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logging.error(f"Error en predicción Lotería Nacional: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/lototurf/predict', methods=['POST'])
@token_required
def predict_lototurf():
    try:
        prediccion = generar_prediccion_ia('lototurf')
        return jsonify({
            'success': True,
            'juego': 'lototurf',
            'prediccion': prediccion,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logging.error(f"Error en predicción Lototurf: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

# Ruta genérica de predicción (mantener compatibilidad)
@app.route('/predict', methods=['POST'])
@token_required
def predict_generic():
    try:
        data = request.json
        juego = data.get('juego', 'euromillon') if data else 'euromillon'
        
        prediccion = generar_prediccion_ia(juego)
        return jsonify({
            'success': True,
            'juego': juego,
            'prediccion': prediccion,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        logging.error(f"Error en predicción genérica: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

# Ruta de información
@app.route('/', methods=['GET'])
def info():
    return jsonify({
        'name': 'IA Lotería Unificada API',
        'version': '2.0.0',
        'description': 'API unificada para predicciones de lotería con IA real',
        'juegos_disponibles': list(JUEGOS_CONFIG.keys()),
        'modelos_cargados': list(modelos.keys()),
        'endpoints': [
            '/euromillon/predict',
            '/bonoloto/predict',
            '/primitiva/predict',
            '/elgordo/predict',
            '/eurodreams/predict',
            '/loterianacional/predict',
            '/lototurf/predict',
            '/predict (genérico)',
            '/health'
        ]
    })

# Ruta de salud
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'timestamp': datetime.now().isoformat(),
        'service': 'IA Lotería Unificada',
        'modelos_activos': len(modelos),
        'total_juegos': len(JUEGOS_CONFIG)
    })

# Inicialización
if __name__ == '__main__':
    logging.info("🚀 Iniciando servidor IA Lotería Unificada...")
    cargar_modelos()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)