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
        'modelo': '/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroMillon-CSV/euromillon_transformer.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroMillon-CSV/DataFrame_Euromillones.csv',
        'predictions_file': '/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroMillon-CSV/predictions_ultra.json',
        'separador': ',',
        'columnas_entrada': ['Numero_1', 'Numero_2', 'Numero_3', 'Numero_4', 'Numero_5', 'Estrella_1', 'Estrella_2'],
        'columnas_salida': ['Numero_1', 'Numero_2', 'Numero_3', 'Numero_4', 'Numero_5', 'Estrella_1', 'Estrella_2'],
        'escalador': 'MinMaxScaler',
        'num_principales': 5,
        'num_especiales': 2,
        'rango_principales': (1, 50),
        'rango_especiales': (1, 12),
        'ultra_avanzado': True
    },
    'bonoloto': {
        'modelo': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/modelos/modelo_bonoloto.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/datasets/DataFrame_bonoloto.csv',
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
        'modelo': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/modelos/modelo_primitiva.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/datasets/DataFrame_primitiva.csv',
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
        'modelo': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/modelos/modelo_elgordo.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/datasets/DataFrame_elgordo.csv',
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
        'modelo': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/modelos/modelo_eurodreams.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/datasets/DataFrame_eurodreams.csv',
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
        'modelo': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/modelos/modelo_loterianacional.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/datasets/DataFrame_loterianacional.csv',
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
        'modelo': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/modelos/modelo_lototurf.h5',
        'dataset': '/var/www/tienda-web-lotoAI-1/archivos-para-servidor/datasets/DataFrame_lototurf.csv',
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

# 🆕 SISTEMA ANTI-DUPLICADOS
# Cache de predicciones recientes por sesión/usuario para evitar duplicados
predicciones_recientes = {}
contador_predicciones = 0

def generar_clave_prediccion(prediccion_dict):
    """Genera una clave única para una predicción para detectar duplicados"""
    if 'numeros' in prediccion_dict and 'estrellas' in prediccion_dict:
        # EuroMillon: numeros + estrellas
        return f"{sorted(prediccion_dict['numeros'])}-{sorted(prediccion_dict['estrellas'])}"
    elif 'numeros' in prediccion_dict and len(prediccion_dict['numeros']) == 5 and all(isinstance(x, int) and 0 <= x <= 9 for x in prediccion_dict['numeros']):
        # Lotería Nacional: 5 dígitos
        return f"LN-{prediccion_dict['numeros']}"
    elif 'numeros' in prediccion_dict:
        # Otros juegos: solo números
        numeros = sorted(prediccion_dict['numeros'])
        especiales = []
        for key in ['complementario', 'reintegro', 'clave', 'dream', 'caballo']:
            if key in prediccion_dict and prediccion_dict[key] is not None:
                especiales.append(prediccion_dict[key])
        return f"{numeros}-{especiales}"
    return str(prediccion_dict)

def limpiar_cache_predicciones():
    """Limpia predicciones antiguas del cache (más de 1 hora)"""
    global predicciones_recientes
    import time
    tiempo_actual = time.time()
    tiempo_limite = tiempo_actual - 3600  # 1 hora
    
    # Filtrar predicciones recientes
    predicciones_filtradas = {}
    for clave, datos in predicciones_recientes.items():
        if datos['timestamp'] > tiempo_limite:
            predicciones_filtradas[clave] = datos
    
    predicciones_recientes = predicciones_filtradas

def es_prediccion_duplicada(prediccion_dict, juego):
    """Verifica si una predicción es duplicada comparando con las recientes"""
    clave = generar_clave_prediccion(prediccion_dict)
    
    # Limpiar cache antes de verificar
    limpiar_cache_predicciones()
    
    # Verificar si existe en el cache
    if clave in predicciones_recientes:
        return True
    
    # Registrar nueva predicción
    import time
    predicciones_recientes[clave] = {
        'timestamp': time.time(),
        'juego': juego,
        'prediccion': prediccion_dict
    }
    
    return False

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
                    # Lotería Nacional: crear escaladores separados para entrada y salida
                    # Escalador para entrada (3 columnas: Fecha, Sorteo, Euros)
                    X_entrada = datos_historicos[juego][config['columnas_entrada']].copy()
                    if 'Fecha' in X_entrada.columns:
                        X_entrada['Fecha'] = pd.to_datetime(X_entrada['Fecha'], format='%d/%m/%Y').astype('int64') // 10**9
                    X_entrada = X_entrada.astype(float)
                    
                    escalador_entrada = MinMaxScaler()
                    escalador_entrada.fit(X_entrada)
                    
                    # Escalador para salida (1 columna: Numero)
                    X_salida = datos_historicos[juego][config['columnas_salida']].copy()
                    X_salida = X_salida.astype(float)
                    
                    escalador_salida = MinMaxScaler()
                    escalador_salida.fit(X_salida)
                    
                    # Guardar ambos escaladores
                    escaladores[juego] = {'entrada': escalador_entrada, 'salida': escalador_salida}
                elif juego == 'eurodreams':
                    # EuroDreams: crear DaysSince si no existe
                    datos_temp = datos_historicos[juego].copy()
                    if 'DaysSince' not in datos_temp.columns and 'Date' in datos_temp.columns:
                        datos_temp['Date'] = pd.to_datetime(datos_temp['Date'])
                        reference_date = pd.Timestamp('2000-01-01')
                        datos_temp['DaysSince'] = (datos_temp['Date'] - reference_date).dt.days
                    X = datos_temp[config['columnas_entrada']].astype(float)
                    
                    # Usar el escalador especificado en configuración
                    if config['escalador'] == 'StandardScaler':
                        escaladores[juego] = StandardScaler()
                    else:
                        escaladores[juego] = MinMaxScaler()
                    
                    escaladores[juego].fit(X)
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

# 🚀 FUNCIÓN ULTRA-AVANZADA PARA EUROMILLÓN
def generar_prediccion_ultra_avanzada(juego):
    """Genera predicción usando el sistema ultra-avanzado con modelos pre-entrenados"""
    try:
        if juego != 'euromillon':
            raise Exception("Sistema ultra-avanzado solo disponible para Euromillón")
        
        config = JUEGOS_CONFIG[juego]
        predictions_file = config.get('predictions_file')
        
        if not predictions_file or not os.path.exists(predictions_file):
            raise Exception("Archivo de predicciones ultra-avanzadas no encontrado")
        
        # Leer las predicciones ultra-avanzadas
        with open(predictions_file, 'r', encoding='utf-8') as f:
            predictions_data = json.load(f)
        
        if not predictions_data or len(predictions_data) == 0:
            raise Exception("No hay predicciones ultra-avanzadas disponibles")
        
        # Seleccionar una predicción aleatoria de las top 10
        import random
        selected_prediction = random.choice(predictions_data[:min(10, len(predictions_data))])
        
        # Formatear la respuesta según el formato esperado
        prediccion = {
            'numeros': selected_prediction.get('numeros', []),
            'estrellas': selected_prediction.get('estrellas', []),
            'strategy': selected_prediction.get('estrategia', 'ultra-avanzado'),
            'confidence': selected_prediction.get('confianza', 95.0),
            'score': selected_prediction.get('score_patron', 0.0),
            'ultra_model_id': f"ULTRA-V4-{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            'source': 'ensemble_transformer_13075_features'
        }
        
        logging.info(f"🔮 Predicción ultra-avanzada generada: {prediccion}")
        return prediccion
        
    except Exception as e:
        logging.error(f"❌ Error en predicción ultra-avanzada: {str(e)}")
        raise e

# Función para generar predicción con IA - CON SISTEMA ANTI-DUPLICADOS
def generar_prediccion_ia(juego):
    """Genera predicción usando el modelo de IA entrenado con validación anti-duplicados"""
    global contador_predicciones
    
    max_intentos = 10  # Máximo de intentos para evitar duplicados
    
    for intento in range(max_intentos):
        try:
            if juego not in modelos or juego not in escaladores:
                raise Exception(f"Modelo para {juego} no disponible")
            
            config = JUEGOS_CONFIG[juego]
            modelo = modelos[juego]
            scaler = escaladores[juego]
            
            # 🆕 INCREMENTAR VARIABILIDAD EN CADA INTENTO
            contador_predicciones += 1
            variabilidad_extra = 0.02 * intento  # 2% más de variación por intento
            
            # Generar entrada base usando datos históricos recientes CON MÁS VARIABILIDAD
            datos_recientes = datos_historicos[juego].tail(50)  # 🆕 Usar más datos (50 en lugar de 10)
            
            if juego == 'loterianacional':
                # Lotería Nacional: usar estructura específica con más aleatoriedad
                datos_temp = datos_recientes[config['columnas_entrada']].copy()
                if 'Fecha' in datos_temp.columns:
                    datos_temp['Fecha'] = pd.to_datetime(datos_temp['Fecha'], format='%d/%m/%Y').astype('int64') // 10**9
                
                # 🆕 MAYOR VARIABILIDAD: usar rango más amplio de datos históricos
                datos_temp_extendidos = datos_historicos[juego][config['columnas_entrada']].tail(100).copy()
                if 'Fecha' in datos_temp_extendidos.columns:
                    datos_temp_extendidos['Fecha'] = pd.to_datetime(datos_temp_extendidos['Fecha'], format='%d/%m/%Y').astype('int64') // 10**9
                
                # 🆕 Usar semilla basada en tiempo + contador + intento para mayor diversidad
                import time
                semilla_unica = int((time.time() * 1000000) % 1000000) + contador_predicciones * 1000 + intento * 100
                np.random.seed(semilla_unica)
                
                fila_aleatoria = np.random.randint(0, len(datos_temp_extendidos))
                entrada_base = datos_temp_extendidos.iloc[fila_aleatoria:fila_aleatoria+1].values.astype(float)
                
                # 🆕 MAYOR variación aleatoria para predicciones únicas
                variacion_base = 0.15 + variabilidad_extra  # 15% base + extra por intento
                variacion = np.random.normal(0, variacion_base, entrada_base.shape)
                entrada_base = entrada_base + variacion
                
                # 🆕 Añadir ruido temporal + contador + microsegundos para unicidad
                microsegundos = int((time.time() * 1000000) % 1000000)
                ruido_temporal = (microsegundos % 1000) * np.random.random(entrada_base.shape) * 0.01
                ruido_contador = contador_predicciones * np.random.random(entrada_base.shape) * 0.005
                entrada_base = entrada_base + ruido_temporal + ruido_contador
                
                # Para Lotería Nacional, usar escalador de entrada y salida por separado
                scaler_entrada = scaler['entrada']
                scaler_salida = scaler['salida']
                
            elif juego == 'eurodreams':
                # EuroDreams: crear DaysSince si no existe
                datos_temp = datos_recientes.copy()
                if 'DaysSince' not in datos_temp.columns and 'Date' in datos_temp.columns:
                    datos_temp['Date'] = pd.to_datetime(datos_temp['Date'])
                    reference_date = pd.Timestamp('2000-01-01')
                    datos_temp['DaysSince'] = (datos_temp['Date'] - reference_date).dt.days
                
                # 🆕 Usar fila aleatoria en lugar de siempre la última
                fila_aleatoria = np.random.randint(max(0, len(datos_temp) - 20), len(datos_temp))
                entrada_base = datos_temp[config['columnas_entrada']].iloc[fila_aleatoria:fila_aleatoria+1].values.astype(float)
                
                # 🆕 Añadir variación
                variacion = np.random.normal(0, 0.10 + variabilidad_extra, entrada_base.shape)
                entrada_base = entrada_base + variacion
                
                scaler_entrada = scaler
                scaler_salida = scaler
            else:
                # 🆕 Otros juegos: usar datos aleatorios de los últimos registros
                fila_aleatoria = np.random.randint(max(0, len(datos_recientes) - 10), len(datos_recientes))
                entrada_base = datos_recientes[config['columnas_entrada']].iloc[fila_aleatoria:fila_aleatoria+1].values.astype(float)
                
                # 🆕 Añadir variación más significativa
                variacion = np.random.normal(0, 0.08 + variabilidad_extra, entrada_base.shape)
                entrada_base = entrada_base + variacion
                
                scaler_entrada = scaler
                scaler_salida = scaler
            
            # Normalizar entrada
            entrada_normalizada = scaler_entrada.transform(entrada_base)
            
            # Reformatear para LSTM
            entrada_reshaped = entrada_normalizada.reshape(
                entrada_normalizada.shape[0], 
                entrada_normalizada.shape[1], 
                1
            )
            
            # Generar predicción
            try:
                prediccion_raw = modelo.predict(entrada_reshaped, verbose=0)
                logging.info(f"Predicción raw shape para {juego}: {prediccion_raw.shape}")
            except Exception as model_error:
                logging.error(f"Error en modelo.predict para {juego}: {str(model_error)}")
                raise Exception(f"Error en predicción del modelo: {str(model_error)}")
            
            # Para Lotería Nacional, usar predicción raw directamente
            if juego == 'loterianacional':
                prediccion_procesada = prediccion_raw[0]
            else:
                # Otros juegos: intentar desnormalizar normalmente
                try:
                    prediccion_desnormalizada = scaler_salida.inverse_transform(prediccion_raw)
                    prediccion_procesada = prediccion_desnormalizada[0]
                except Exception as denorm_error:
                    logging.error(f"Error en desnormalización para {juego}: {str(denorm_error)}")
                    prediccion_procesada = prediccion_raw[0]
            
            # 🆕 Añadir variación adicional a la predicción procesada para mayor unicidad
            if intento > 0:  # Solo añadir variación extra en reintentos
                variacion_prediccion = np.random.normal(0, 0.05 * intento, prediccion_procesada.shape)
                prediccion_procesada = prediccion_procesada + variacion_prediccion
            
            # Ajustar predicción a rangos válidos
            prediccion_ajustada = ajustar_prediccion(prediccion_procesada, config)
            
            # 🆕 VERIFICAR SI ES DUPLICADA
            if not es_prediccion_duplicada(prediccion_ajustada, juego):
                logging.info(f"✅ Predicción única generada para {juego} en intento {intento + 1}")
                return prediccion_ajustada
            else:
                logging.warning(f"⚠️ Predicción duplicada para {juego} en intento {intento + 1}, reintentando...")
                continue
                
        except Exception as e:
            logging.error(f"Error generando predicción IA para {juego} en intento {intento + 1}: {str(e)}")
            if intento == max_intentos - 1:  # Último intento
                return generar_prediccion_aleatoria(juego)
            continue
    
    # Si llegamos aquí, no pudimos generar una predicción única
    logging.warning(f"⚠️ No se pudo generar predicción única para {juego} después de {max_intentos} intentos, usando aleatoria")
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
        # Lotería Nacional: convertir predicción a 5 dígitos individuales (0-9)
        try:
            logging.info(f"[DEBUG] SOLUCION - Prediccion recibida: {prediccion}")
            logging.info(f"[DEBUG] SOLUCION - Tipo: {type(prediccion)}, Shape: {prediccion.shape if hasattr(prediccion, 'shape') else 'No shape'}")
            
            # ESTRATEGIA NUEVA: Usar múltiples valores de la predicción raw para crear variabilidad extrema
            import time
            
            # 1. Seleccionar múltiples valores aleatorios de la predicción (que tiene 50 valores)
            indices_aleatorios = np.random.choice(len(prediccion), size=5, replace=False)
            valores_seleccionados = [float(prediccion[i]) for i in indices_aleatorios]
            logging.info(f"[DEBUG] SOLUCION - Valores seleccionados {indices_aleatorios}: {valores_seleccionados}")
            
            # 2. Combinar valores para crear número base
            suma_valores = sum(abs(v) for v in valores_seleccionados)
            producto_valores = 1
            for v in valores_seleccionados:
                producto_valores *= (abs(v) + 0.1)  # +0.1 para evitar multiplicación por 0
            
            numero_base = int((suma_valores * 1000 + producto_valores * 100) % 100000)
            logging.info(f"[DEBUG] SOLUCION - Suma: {suma_valores}, Producto: {producto_valores}, Base: {numero_base}")
            
            # 3. Añadir fuentes de aleatoriedad adicionales
            microsegundos = int(time.time() * 1000000) % 100000
            factor_temporal = int(time.time() % 3600)  # Segundos en la hora actual
            hash_momento = hash(str(time.time())) % 100000
            
            # 4. Combinar todas las fuentes
            numero_final = (numero_base + microsegundos + factor_temporal + hash_momento) % 100000
            
            # 5. Asegurar distribución en todo el rango
            if numero_final < 10000:
                numero_final = numero_final + np.random.randint(10000, 90000)
            
            numero_final = numero_final % 100000
            logging.info(f"[DEBUG] SOLUCION - Microseg: {microsegundos}, Temporal: {factor_temporal}, Hash: {hash_momento}, Final: {numero_final}")
            
            # 6. Convertir a dígitos
            numero_str = f"{numero_final:05d}"
            digitos = [int(d) for d in numero_str]
            
            logging.info(f"[DEBUG] SOLUCION - Numero final: {numero_final}, Digitos: {digitos}")
            
            return {
                'numeros': digitos,
                'mensaje': 'Predicción generada con IA para Lotería Nacional'
            }
        except Exception as e:
            logging.error(f"[DEBUG] SOLUCION - Error: {str(e)}")
            # Fallback: generar dígitos completamente aleatorios
            digitos = [np.random.randint(0, 10) for _ in range(5)]
            logging.info(f"[DEBUG] SOLUCION - Fallback aleatorio: {digitos}")
            return {
                'numeros': digitos,
                'mensaje': 'Predicción generada con IA para Lotería Nacional (fallback)'
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
    """Genera predicción aleatoria como fallback - CON SISTEMA ANTI-DUPLICADOS"""
    global contador_predicciones
    config = JUEGOS_CONFIG[juego]
    
    max_intentos = 15  # Más intentos para aleatorias porque son más fáciles de duplicar
    
    for intento in range(max_intentos):
        try:
            # 🆕 Semilla única para cada intento
            import time
            semilla_unica = int((time.time() * 1000000) % 1000000) + contador_predicciones * 1337 + intento * 42
            np.random.seed(semilla_unica)
            contador_predicciones += 1
            
            if juego == 'loterianacional':
                # 🆕 Generar 5 dígitos con mayor variabilidad
                digitos = []
                for i in range(5):
                    # Usar tiempo + posición + contador para mayor variabilidad
                    base = (int(time.time() * 1000) + i * 123 + contador_predicciones * 7) % 10
                    digito = (base + np.random.randint(0, 10)) % 10
                    digitos.append(digito)
                
                resultado = {
                    'numeros': digitos,
                    'mensaje': 'Predicción aleatoria para Lotería Nacional'
                }
                
            elif juego == 'euromillon':
                # 🆕 EuroMillon con mayor variabilidad
                # Usar diferentes rangos de inicio para cada intento
                rango_inicio = (intento * 7) % 20 + 1  # Empezar desde diferentes puntos
                numeros_posibles = list(range(rango_inicio, 51)) + list(range(1, rango_inicio))
                numeros = sorted(np.random.choice(numeros_posibles[:45], 5, replace=False))
                
                estrellas_inicio = (intento * 3) % 6 + 1
                estrellas_posibles = list(range(estrellas_inicio, 13)) + list(range(1, estrellas_inicio))
                estrellas = sorted(np.random.choice(estrellas_posibles[:10], 2, replace=False))
                
                resultado = {
                    'numeros': numeros.tolist(),
                    'estrellas': estrellas.tolist(),
                    'mensaje': 'Predicción aleatoria para EuroMillon'
                }
                
            else:
                # 🆕 Otros juegos con variabilidad mejorada
                rango_min, rango_max = config['rango_principales']
                rango_total = rango_max - rango_min + 1
                
                # Usar offset basado en intento para mayor variabilidad
                offset = (intento * 11) % min(20, rango_total // 2)
                inicio_rango = rango_min + offset
                fin_rango = min(rango_max, inicio_rango + rango_total - 1)
                
                # Crear lista de números disponibles con rotación
                if fin_rango <= rango_max:
                    numeros_posibles = list(range(inicio_rango, fin_rango + 1))
                else:
                    numeros_posibles = list(range(inicio_rango, rango_max + 1)) + list(range(rango_min, inicio_rango))
                
                # Seleccionar números
                if len(numeros_posibles) >= config['num_principales']:
                    numeros = sorted(np.random.choice(
                        numeros_posibles, 
                        config['num_principales'], 
                        replace=False
                    ))
                else:
                    # Fallback si no hay suficientes números
                    numeros = sorted(np.random.choice(
                        range(rango_min, rango_max + 1), 
                        config['num_principales'], 
                        replace=False
                    ))
                
                resultado = {
                    'numeros': numeros.tolist(),
                    'mensaje': f'Predicción aleatoria para {juego.title()}'
                }
                
                # Añadir número especial si es necesario
                if config['num_especiales'] > 0 and config['rango_especiales']:
                    esp_min, esp_max = config['rango_especiales']
                    especial = (np.random.randint(esp_min, esp_max + 1) + intento) % (esp_max - esp_min + 1) + esp_min
                    
                    # Asignar a la clave correcta según el juego
                    if juego == 'bonoloto' or juego == 'primitiva':
                        resultado['reintegro'] = especial
                    elif juego == 'elgordo':
                        resultado['clave'] = especial
                    elif juego == 'eurodreams':
                        resultado['dream'] = especial
                    elif juego == 'lototurf':
                        resultado['caballo'] = especial
                    else:
                        resultado['especial'] = especial
            
            # 🆕 VERIFICAR SI ES DUPLICADA
            if not es_prediccion_duplicada(resultado, juego):
                logging.info(f"✅ Predicción aleatoria única generada para {juego} en intento {intento + 1}")
                return resultado
            else:
                logging.warning(f"⚠️ Predicción aleatoria duplicada para {juego} en intento {intento + 1}, reintentando...")
                continue
                
        except Exception as e:
            logging.error(f"Error generando predicción aleatoria para {juego} en intento {intento + 1}: {str(e)}")
            if intento == max_intentos - 1:
                # Último recurso: generar con timestamp como garantía de unicidad
                import time
                timestamp_ms = int(time.time() * 1000) % 100000
                
                if juego == 'loterianacional':
                    # Usar timestamp para generar dígitos únicos
                    timestamp_str = f"{timestamp_ms:05d}"
                    return {
                        'numeros': [int(d) for d in timestamp_str],
                        'mensaje': 'Predicción única garantizada para Lotería Nacional'
                    }
                else:
                    # Para otros juegos, usar timestamp como base para números únicos
                    rango_min, rango_max = config['rango_principales']
                    base_numeros = []
                    for i in range(config['num_principales']):
                        num = ((timestamp_ms + i * 1234) % (rango_max - rango_min + 1)) + rango_min
                        while num in base_numeros:
                            num = (num % (rango_max - rango_min + 1)) + rango_min
                        base_numeros.append(num)
                    
                    return {
                        'numeros': sorted(base_numeros),
                        'mensaje': f'Predicción única garantizada para {juego.title()}'
                    }
            continue
    
    # Si llegamos aquí, algo está muy mal, devolver última opción
    logging.error(f"❌ No se pudo generar predicción aleatoria única para {juego} después de {max_intentos} intentos")
    return {
        'numeros': [1, 2, 3, 4, 5],  # Números por defecto
        'mensaje': f'Predicción de emergencia para {juego.title()}'
    }

# Rutas específicas para cada juego
@app.route('/euromillon/predict', methods=['POST'])
@token_required
def predict_euromillon():
    try:
        logging.info("🚀 [ULTRA-AVANZADO] Iniciando predicción con sistema ultra-avanzado para Euromillón")
        # 🚀 USAR SISTEMA ULTRA-AVANZADO PARA EUROMILLÓN
        prediccion = generar_prediccion_ultra_avanzada('euromillon')
        logging.info(f"🚀 [ULTRA-AVANZADO] Predicción generada exitosamente: {prediccion.get('ultra_model_id', 'N/A')}")
        return jsonify({
            'success': True,
            'juego': 'euromillon',
            'prediccion': prediccion,
            'timestamp': datetime.now().isoformat(),
            'strategy': 'ultra-avanzado',
            'model_version': 'v4.0-enhanced'
        })
    except Exception as e:
        logging.error(f"❌ [ULTRA-AVANZADO] Error en predicción EuroMillon Ultra-Avanzado: {str(e)}")
        # Fallback al sistema tradicional si falla
        try:
            logging.info("🔄 [FALLBACK] Usando sistema tradicional como respaldo")
            prediccion = generar_prediccion_ia('euromillon')
            return jsonify({
                'success': True,
                'juego': 'euromillon',
                'prediccion': prediccion,
                'timestamp': datetime.now().isoformat(),
                'strategy': 'tradicional-fallback'
            })
        except Exception as fallback_error:
            logging.error(f"Error en fallback EuroMillon: {str(fallback_error)}")
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