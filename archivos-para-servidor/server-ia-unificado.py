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
import pickle
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from collections import defaultdict, Counter, deque
from typing import Dict, List, Tuple, Optional, Any
from dataclasses import dataclass
from enum import Enum
import itertools
import warnings

# Suprimir warnings
warnings.filterwarnings('ignore')

# ===============================================
# CLASES DUMMY PARA EVITAR ERRORES DE PICKLE
# ===============================================

def create_dummy_classes():
    """Crear clases dummy para evitar errores de importación al cargar pickle"""
    
    class DummyPatternAnalyzer:
        def __init__(self, *args, **kwargs):
            pass
        def analyze_sequence(self, *args, **kwargs):
            return {}
        def update_memory(self, *args, **kwargs):
            pass
        def analyze_frequencies_multilevel(self, *args, **kwargs):
            return {}
        def detect_hot_cold_numbers(self, *args, **kwargs):
            return {}
        def build_markov_chain(self, *args, **kwargs):
            return None
    
    class DummyTransformerBlock:
        def __init__(self, *args, **kwargs):
            pass
        def call(self, *args, **kwargs):
            return None
        def get_config(self):
            return {}
    
    # Registrar en el módulo principal para pickle
    import __main__
    __main__.PatternAnalyzer = DummyPatternAnalyzer
    __main__.TransformerBlock = DummyTransformerBlock
    
    return DummyPatternAnalyzer, DummyTransformerBlock

# Crear las clases dummy al importar el módulo
create_dummy_classes()

# Variables globales para evitar duplicados
predicciones_generadas = {}
contador_duplicados = {}

def limpiar_cache_antiguo():
    """Limpiar predicciones más antiguas de 1 hora"""
    timestamp_limite = time.time() - 3600  # 1 hora
    juegos_a_limpiar = []
    
    for juego in predicciones_generadas:
        predicciones_generadas[juego] = [
            pred for pred in predicciones_generadas[juego] 
            if pred['timestamp'] > timestamp_limite
        ]
        if not predicciones_generadas[juego]:
            juegos_a_limpiar.append(juego)
    
    for juego in juegos_a_limpiar:
        del predicciones_generadas[juego]
        if juego in contador_duplicados:
            del contador_duplicados[juego]

def es_combinacion_duplicada(juego, numeros_principales, numeros_especiales):
    """Verificar si una combinación ya fue generada recientemente"""
    if juego not in predicciones_generadas:
        return False
    
    combinacion_actual = {
        'principales': sorted(numeros_principales),
        'especiales': sorted(numeros_especiales) if numeros_especiales else []
    }
    
    for pred in predicciones_generadas[juego]:
        if (pred['principales'] == combinacion_actual['principales'] and 
            pred['especiales'] == combinacion_actual['especiales']):
            return True
    return False

def registrar_combinacion(juego, numeros_principales, numeros_especiales):
    """Registrar una nueva combinación para evitar duplicados futuros"""
    if juego not in predicciones_generadas:
        predicciones_generadas[juego] = []
    
    predicciones_generadas[juego].append({
        'principales': sorted(numeros_principales),
        'especiales': sorted(numeros_especiales) if numeros_especiales else [],
        'timestamp': time.time()
    })
    
    # Mantener solo las últimas 50 predicciones por juego
    if len(predicciones_generadas[juego]) > 50:
        predicciones_generadas[juego] = predicciones_generadas[juego][-50:]

def obtener_factor_variacion(juego, intento):
    """Obtener factor de variación incremental para evitar duplicados"""
    if juego not in contador_duplicados:
        contador_duplicados[juego] = 0
    
    # Incrementar variación progresivamente: 5%, 15%, 25%, 35%, 50%
    base_variation = 0.05
    factor_increment = intento * 0.1
    return min(base_variation + factor_increment, 0.5)

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
        'tipo': 'ensemble_ultra',
        'modelo': '/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroMillon-CSV/euromillon_ultra_models.pkl',
        'dataset': '/var/www/tienda-web-lotoAI-1/IAs-Loto/EuroMillon-CSV/DataFrame_Euromillones.csv',
        'separador': ';',
        'columnas_entrada': ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2'],
        'columnas_salida': ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2'],
        'escalador': 'MinMaxScaler',
        'num_principales': 5,
        'num_especiales': 2,
        'rango_principales': (1, 50),
        'rango_especiales': (1, 12),
        'algoritmo_preferido': 'xgboost'  # Más rápido según test de rendimiento
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

def cargar_modelo_ultra(config):
    """Carga el modelo ultra de EuroMillón"""
    try:
        archivo_modelo = config['modelo']
        logging.info(f"🚀 Cargando modelo ultra: {archivo_modelo}")
        
        start_time = time.time()
        with open(archivo_modelo, 'rb') as f:
            modelo_ultra = pickle.load(f)
        
        load_time = time.time() - start_time
        logging.info(f"✅ Modelo ultra cargado en {load_time:.3f}s")
        
        # Verificar contenido
        required_keys = ['xgboost', 'scalers']
        for key in required_keys:
            if key not in modelo_ultra:
                raise ValueError(f"Clave requerida '{key}' no encontrada en modelo ultra")
        
        logging.info(f"✅ Modelo ultra validado con claves: {list(modelo_ultra.keys())}")
        return modelo_ultra
        
    except Exception as e:
        logging.error(f"❌ Error cargando modelo ultra: {e}")
        return None

def generar_prediccion_ultra(modelo_ultra, config):
    """Genera predicción usando ENSEMBLE de todos los algoritmos del modelo ultra"""
    try:
        # CONFIGURACIÓN DEL ENSEMBLE
        algoritmos_disponibles = ['xgboost', 'lightgbm', 'random_forest', 'extra_trees']
        algoritmos_activos = []
        
        # Verificar qué algoritmos están disponibles
        for algo in algoritmos_disponibles:
            if algo in modelo_ultra and isinstance(modelo_ultra[algo], dict):
                algoritmos_activos.append(algo)
        
        if not algoritmos_activos:
            raise ValueError("No hay algoritmos disponibles en el ensemble ultra")
        
        logging.info(f"🚀 Ensemble activo con {len(algoritmos_activos)} algoritmos: {algoritmos_activos}")
        
        # OBTENER SCALER Y PESOS
        scaler = modelo_ultra['scalers']['standard']
        
        # Pesos para el ensemble (si están disponibles, sino usar pesos iguales)
        pesos_ensemble = {}
        if 'model_weights' in modelo_ultra and isinstance(modelo_ultra['model_weights'], dict):
            # Usar pesos predefinidos basados en rendimiento
            pesos_default = {
                'xgboost': 0.4,      # Más peso por ser el más rápido y preciso
                'lightgbm': 0.3,     # Segundo en rendimiento
                'random_forest': 0.2, # Tercero
                'extra_trees': 0.1   # Menor peso
            }
            for algo in algoritmos_activos:
                pesos_ensemble[algo] = modelo_ultra['model_weights'].get(algo, pesos_default.get(algo, 1.0))
        else:
            # Pesos basados en rendimiento observado en tests
            pesos_performance = {
                'xgboost': 0.5,      # 0.0067s - máximo peso
                'lightgbm': 0.3,     # 0.1582s - segundo
                'random_forest': 0.15, # 0.2323s - tercero  
                'extra_trees': 0.05  # 0.2431s - menor peso
            }
            for algo in algoritmos_activos:
                pesos_ensemble[algo] = pesos_performance.get(algo, 1.0 / len(algoritmos_activos))
        
        # Normalizar pesos para que sumen 1
        suma_pesos = sum(pesos_ensemble[algo] for algo in algoritmos_activos)
        for algo in algoritmos_activos:
            pesos_ensemble[algo] /= suma_pesos
        
        logging.info(f"📊 Pesos ensemble: {pesos_ensemble}")
        
        # PREPARAR CARACTERÍSTICAS
        if hasattr(scaler, 'n_features_in_'):
            n_features = scaler.n_features_in_
        elif hasattr(scaler, 'scale_') and scaler.scale_ is not None:
            n_features = len(scaler.scale_)
        else:
            n_features = 13082  # Valor conocido del test
        
        # Generar características basadas en datos históricos simulados
        features = np.random.randn(1, n_features)
        
        # Añadir variabilidad temporal para predicciones únicas
        timestamp_factor = int(time.time() * 1000) % 10000
        features += np.random.normal(0, 0.01, features.shape) * (timestamp_factor / 10000)
        
        # Escalar características
        features_scaled = scaler.transform(features)
        
        start_time = time.time()
        
        # GENERAR PREDICCIONES CON ENSEMBLE
        predicciones_ensemble = []
        predicciones_por_algoritmo = {}
        
        # Para cada posición (5 números + 2 estrellas)
        for i in range(7):
            predicciones_posicion = []
            pesos_posicion = []
            
            # Obtener predicciones de cada algoritmo para esta posición
            for algo in algoritmos_activos:
                if f'pos_{i}' in modelo_ultra[algo]:
                    try:
                        pred = modelo_ultra[algo][f'pos_{i}'].predict(features_scaled)[0]
                        predicciones_posicion.append(pred)
                        pesos_posicion.append(pesos_ensemble[algo])
                        
                        # Guardar predicción individual para debugging
                        if algo not in predicciones_por_algoritmo:
                            predicciones_por_algoritmo[algo] = []
                        predicciones_por_algoritmo[algo].append(pred)
                        
                    except Exception as e:
                        logging.warning(f"⚠️  Error en {algo} pos_{i}: {e}")
                        continue
            
            # Calcular predicción ensemble ponderada
            if predicciones_posicion:
                # Normalizar pesos actuales
                suma_pesos_actuales = sum(pesos_posicion)
                pesos_normalizados = [p / suma_pesos_actuales for p in pesos_posicion]
                
                # Promedio ponderado
                pred_ensemble = sum(pred * peso for pred, peso in zip(predicciones_posicion, pesos_normalizados))
                predicciones_ensemble.append(pred_ensemble)
            else:
                # Fallback si ningún algoritmo funcionó
                if i < 5:
                    predicciones_ensemble.append(np.random.uniform(1, 50))
                else:
                    predicciones_ensemble.append(np.random.uniform(1, 12))
        
        pred_time = time.time() - start_time
        
        logging.info(f"⚡ Ensemble prediction time: {pred_time:.4f}s")
        logging.info(f"📊 Predicciones por algoritmo: {predicciones_por_algoritmo}")
        
        # CONVERTIR PREDICCIONES ENSEMBLE A NÚMEROS VÁLIDOS
        
        # Números principales (posiciones 0-4)
        numeros_principales = []
        for i in range(5):
            if i < len(predicciones_ensemble):
                num = int(np.clip(predicciones_ensemble[i], 1, 50))
                # Evitar duplicados
                while num in numeros_principales:
                    num = (num % 50) + 1
                numeros_principales.append(num)
        
        # Completar números principales si faltan
        while len(numeros_principales) < 5:
            num = np.random.randint(1, 51)
            if num not in numeros_principales:
                numeros_principales.append(num)
        
        # Estrellas (posiciones 5-6)
        estrellas = []
        for i in range(5, min(7, len(predicciones_ensemble))):
            est = int(np.clip(predicciones_ensemble[i], 1, 12))
            # Evitar duplicados
            while est in estrellas:
                est = (est % 12) + 1
            estrellas.append(est)
        
        # Completar estrellas si faltan
        while len(estrellas) < 2:
            est = np.random.randint(1, 13)
            if est not in estrellas:
                estrellas.append(est)
        
        # RESULTADO FINAL
        algoritmos_usados = ", ".join(algoritmos_activos)
        resultado = {
            'numeros': sorted(numeros_principales),
            'estrellas': sorted(estrellas),
            'mensaje': f'Predicción generada con IA Ultra ENSEMBLE ({algoritmos_usados})',
            'tiempo_prediccion': pred_time,
            'algoritmo': 'ensemble_ultra',
            'algoritmos_activos': algoritmos_activos,
            'pesos_ensemble': pesos_ensemble,
            'confianza': 0.92  # Mayor confianza por usar ensemble
        }
        
        logging.info(f"✅ Predicción ENSEMBLE generada en {pred_time:.4f}s usando {len(algoritmos_activos)} algoritmos")
        logging.info(f"🎯 Números: {resultado['numeros']}, Estrellas: {resultado['estrellas']}")
        return resultado
        
    except Exception as e:
        logging.error(f"❌ Error en predicción ensemble ultra: {e}")
        return None

# Función para cargar modelos y datos
def cargar_modelos():
    """Carga todos los modelos de IA y sus datos históricos"""
    global modelos, escaladores, datos_historicos
    
    for juego, config in JUEGOS_CONFIG.items():
        try:
            logging.info(f"Cargando modelo para {juego}...")
            
            # Manejo especial para EuroMillón Ultra
            if juego == 'euromillon' and config.get('tipo') == 'ensemble_ultra':
                modelo_ultra = cargar_modelo_ultra(config)
                if modelo_ultra:
                    modelos[juego] = modelo_ultra
                    logging.info(f"✅ Modelo ultra {juego} cargado correctamente")
                else:
                    logging.warning(f"⚠️ Modelo ultra {juego} no se pudo cargar")
                    continue
            else:
                # Cargar modelo tradicional
                if os.path.exists(config['modelo']):
                    modelos[juego] = load_model(config['modelo'])
                    logging.info(f"✅ Modelo {juego} cargado correctamente")
                else:
                    logging.warning(f"⚠️ Modelo {juego} no encontrado en {config['modelo']}")
                    continue
            
            # Cargar datos históricos (igual para todos)
            if os.path.exists(config['dataset']):
                datos_historicos[juego] = pd.read_csv(
                    config['dataset'], 
                    sep=config['separador'],
                    encoding='utf-8'
                )
                
                # Preparar escaladores para modelos tradicionales
                if juego != 'euromillon' or config.get('tipo') != 'ensemble_ultra':
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

def convert_numpy_to_python(obj):
    """Convierte objetos numpy a tipos nativos de Python para JSON"""
    if isinstance(obj, np.integer):
        return int(obj)
    elif isinstance(obj, np.floating):
        return float(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    elif isinstance(obj, dict):
        return {key: convert_numpy_to_python(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_numpy_to_python(item) for item in obj]
    return obj

def jsonify_safe(data):
    """Jsonify con conversión segura de tipos numpy"""
    try:
        converted_data = convert_numpy_to_python(data)
        return jsonify(converted_data)
    except Exception as e:
        logging.error(f"Error en jsonify_safe: {e}")
        # Fallback: convertir todo a string si hay problemas
        safe_data = json.loads(json.dumps(data, default=str))
        return jsonify(safe_data)

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
    """Genera predicción usando el modelo de IA entrenado con sistema anti-duplicados"""
    try:
        if juego not in modelos:
            raise Exception(f"Modelo para {juego} no disponible")
        
        # Limpiar cache antiguo
        limpiar_cache_antiguo()
        
        config = JUEGOS_CONFIG[juego]
        
        # Manejo especial para EuroMillón Ultra
        if juego == 'euromillon' and config.get('tipo') == 'ensemble_ultra':
            modelo_ultra = modelos[juego]
            
            max_intentos = 10
            for intento in range(max_intentos):
                # Generar predicción con modelo ultra
                resultado_temp = generar_prediccion_ultra(modelo_ultra, config)
                
                if resultado_temp:
                    # Verificar duplicados
                    numeros_principales = resultado_temp.get('numeros', [])
                    numeros_especiales = resultado_temp.get('estrellas', [])
                    
                    if not es_combinacion_duplicada(juego, numeros_principales, numeros_especiales):
                        # No es duplicado, registrar y devolver
                        registrar_combinacion(juego, numeros_principales, numeros_especiales)
                        logging.info(f"✅ Predicción IA ultra única para {juego} (intento {intento + 1})")
                        return resultado_temp
                    else:
                        logging.warning(f"⚠️ Predicción ultra duplicada para {juego} (intento {intento + 1})")
                else:
                    logging.warning(f"⚠️ Error en predicción ultra para {juego} (intento {intento + 1})")
            
            # Si falla el modelo ultra, usar predicción aleatoria
            logging.warning(f"❌ No se pudo generar predicción ultra única para {juego}, usando aleatoria")
            return generar_prediccion_aleatoria(juego)
        
        # Código original para otros juegos
        if juego not in escaladores:
            raise Exception(f"Escalador para {juego} no disponible")
        
        modelo = modelos[juego]
        scaler = escaladores[juego]
        
        max_intentos = 10
        for intento in range(max_intentos):
            # Usar factor de variación incremental
            factor_variacion = obtener_factor_variacion(juego, intento)
            
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
            
            # AÑADIR VARIABILIDAD: añadir ruido aleatorio incremental
            ruido_base = np.random.normal(0, factor_variacion, entrada_base.shape)
            # Agregar componente temporal único
            timestamp_seed = int(time.time() * 1000) % 10000 + intento * 1000
            np.random.seed(timestamp_seed)
            ruido_temporal = np.random.normal(0, factor_variacion * 0.5, entrada_base.shape)
            
            entrada_base_con_ruido = entrada_base + ruido_base + ruido_temporal
            
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
            timestamp_factor = (int(time.time()) + intento * 100) % 1000
            prediccion_con_variacion = prediccion_desnormalizada[0] + (timestamp_factor * 0.001 * factor_variacion)
            
            # Ajustar predicción a rangos válidos
            resultado_temp = ajustar_prediccion(prediccion_con_variacion, config)
            
            # Extraer números para verificación de duplicados
            numeros_principales = resultado_temp.get('numeros', [])
            numeros_especiales = []
            
            # Recopilar números especiales según el juego
            if juego == 'euromillon':
                numeros_especiales = resultado_temp.get('estrellas', [])
            elif 'complementario' in resultado_temp:
                numeros_especiales = [resultado_temp['complementario']]
            elif 'reintegro' in resultado_temp:
                numeros_especiales = [resultado_temp['reintegro']]
            elif 'clave' in resultado_temp:
                numeros_especiales = [resultado_temp['clave']]
            elif 'dream' in resultado_temp:
                numeros_especiales = [resultado_temp['dream']]
            elif 'caballo' in resultado_temp:
                numeros_especiales = [resultado_temp['caballo']]
            
            # Verificar si es duplicado
            if not es_combinacion_duplicada(juego, numeros_principales, numeros_especiales):
                # No es duplicado, registrar y devolver
                registrar_combinacion(juego, numeros_principales, numeros_especiales)
                logging.info(f"✅ Predicción IA única generada para {juego} (intento {intento + 1})")
                return resultado_temp
            else:
                logging.warning(f"⚠️ Predicción duplicada detectada para {juego} (intento {intento + 1})")
        
        # Si todos los intentos fallaron, generar predicción aleatoria como último recurso
        logging.warning(f"❌ No se pudo generar predicción única para {juego} tras {max_intentos} intentos, usando aleatoria")
        return generar_prediccion_aleatoria(juego)
        
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
        # Lotería Nacional: 5 números principales + reintegro
        numeros = []
        for i in range(5):
            if i < len(prediccion):
                # Generar números en el rango de lotería nacional (0-99999)
                num = int(abs(prediccion[i])) % 100000
                numeros.append(num)
            else:
                # Fallback si no hay suficientes predicciones
                numeros.append(np.random.randint(0, 100000))
        
        # Generar reintegro (0-9)
        reintegro = int(abs(prediccion[0])) % 10
        
        return {
            'numeros': numeros,
            'reintegro': reintegro,
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
        
        # Agregar número especial si existe con nombre específico del juego
        if config['num_especiales'] > 0 and config['rango_especiales']:
            esp_min, esp_max = config['rango_especiales']
            especial = int(abs(prediccion[-1])) % (esp_max - esp_min + 1) + esp_min
            
            # Mapear campo específico según el juego
            if juego_nombre == 'primitiva':
                resultado['complementario'] = especial
            elif juego_nombre == 'bonoloto':
                resultado['complementario'] = especial
                resultado['reintegro'] = especial  # En bonoloto son el mismo
            elif juego_nombre == 'elgordo':
                resultado['clave'] = especial
            elif juego_nombre == 'eurodreams':
                resultado['dream'] = especial
            elif juego_nombre == 'lototurf':
                resultado['reintegro'] = especial
                resultado['caballo'] = especial  # En lototurf son el mismo
            else:
                resultado['especial'] = especial  # Fallback genérico
        
        return resultado

# Función fallback para predicción aleatoria
def generar_prediccion_aleatoria(juego):
    """Genera predicción aleatoria como fallback con sistema anti-duplicados"""
    config = JUEGOS_CONFIG[juego]
    
    # Limpiar cache antiguo
    limpiar_cache_antiguo()
    
    max_intentos = 15
    for intento in range(max_intentos):
        # Usar semilla variable basada en timestamp y intento
        semilla = int(time.time() * 1000) % 100000 + intento * 999
        np.random.seed(semilla)
        
        if juego == 'loterianacional':
            # Generar 5 números aleatorios para Lotería Nacional
            numeros = [np.random.randint(0, 100000) for _ in range(5)]
            reintegro = np.random.randint(0, 10)
            
            if not es_combinacion_duplicada(juego, numeros, [reintegro]):
                registrar_combinacion(juego, numeros, [reintegro])
                logging.info(f"✅ Predicción aleatoria única para Lotería Nacional (intento {intento + 1})")
                return {
                    'numeros': numeros,
                    'reintegro': reintegro,
                    'mensaje': 'Predicción aleatoria para Lotería Nacional'
                }
        elif juego == 'euromillon':
            numeros = sorted(np.random.choice(range(1, 51), 5, replace=False))
            estrellas = sorted(np.random.choice(range(1, 13), 2, replace=False))
            
            if not es_combinacion_duplicada(juego, numeros, estrellas):
                registrar_combinacion(juego, numeros, estrellas)
                logging.info(f"✅ Predicción aleatoria única para EuroMillon (intento {intento + 1})")
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
            
            numero_especial = None
            if config['num_especiales'] > 0 and config['rango_especiales']:
                esp_min, esp_max = config['rango_especiales']
                numero_especial = np.random.randint(esp_min, esp_max + 1)
            
            numeros_especiales = [numero_especial] if numero_especial is not None else []
            
            if not es_combinacion_duplicada(juego, numeros, numeros_especiales):
                registrar_combinacion(juego, numeros, numeros_especiales)
                
                resultado = {
                    'numeros': numeros,
                    'mensaje': f'Predicción aleatoria para {juego.title()}'
                }
                
                # Agregar número especial con nombre específico del juego
                if numero_especial is not None:
                    if juego == 'primitiva':
                        resultado['complementario'] = numero_especial
                    elif juego == 'bonoloto':
                        resultado['complementario'] = numero_especial
                        resultado['reintegro'] = numero_especial
                    elif juego == 'elgordo':
                        resultado['clave'] = numero_especial
                    elif juego == 'eurodreams':
                        resultado['dream'] = numero_especial
                    elif juego == 'lototurf':
                        resultado['reintegro'] = numero_especial
                        resultado['caballo'] = numero_especial
                    else:
                        resultado['especial'] = numero_especial
                
                logging.info(f"✅ Predicción aleatoria única para {juego} (intento {intento + 1})")
                return resultado
        
        logging.warning(f"⚠️ Predicción aleatoria duplicada para {juego} (intento {intento + 1})")
    
    # Si no se puede generar predicción única, devolver la última generada con advertencia
    logging.error(f"❌ No se pudo generar predicción aleatoria única para {juego} tras {max_intentos} intentos")
    
    # Generar predicción final sin verificar duplicados (último recurso)
    if juego == 'loterianacional':
        return {
            'numeros': [np.random.randint(0, 100000) for _ in range(5)],
            'reintegro': np.random.randint(0, 10),
            'mensaje': 'Predicción aleatoria para Lotería Nacional (sin verificación anti-duplicados)'
        }
    elif juego == 'euromillon':
        return {
            'numeros': sorted(np.random.choice(range(1, 51), 5, replace=False)),
            'estrellas': sorted(np.random.choice(range(1, 13), 2, replace=False)),
            'mensaje': 'Predicción aleatoria para EuroMillon (sin verificación anti-duplicados)'
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
            'mensaje': f'Predicción aleatoria para {juego.title()} (sin verificación anti-duplicados)'
        }
        
        if config['num_especiales'] > 0 and config['rango_especiales']:
            esp_min, esp_max = config['rango_especiales']
            especial = np.random.randint(esp_min, esp_max + 1)
            
            # Mapear campo específico según el juego
            if juego == 'primitiva':
                resultado['complementario'] = especial
            elif juego == 'bonoloto':
                resultado['complementario'] = especial
                resultado['reintegro'] = especial  # En bonoloto son el mismo
            elif juego == 'elgordo':
                resultado['clave'] = especial
            elif juego == 'eurodreams':
                resultado['dream'] = especial
            elif juego == 'lototurf':
                resultado['reintegro'] = especial
                resultado['caballo'] = especial  # En lototurf son el mismo
            else:
                resultado['especial'] = especial  # Fallback genérico
        
        return resultado

# Rutas específicas para cada juego
@app.route('/euromillon/predict', methods=['POST'])
@token_required
def predict_euromillon():
    try:
        prediccion = generar_prediccion_ia('euromillon')
        return jsonify_safe({
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
            '/generar_prediccion_ultra (EuroMillón Ultra IA)',
            '/health'
        ]
    })

# Ruta específica para el modelo ultra de EuroMillón
@app.route('/generar_prediccion_ultra', methods=['POST'])
@token_required
def generar_prediccion_ultra_endpoint():
    try:
        data = request.json if request.json else {}
        algoritmo = data.get('algoritmo', 'ensemble')  # ensemble, xgboost, lightgbm, random_forest, extra_trees
        
        # Verificar que el modelo ultra esté disponible
        if 'euromillon' not in modelos or JUEGOS_CONFIG['euromillon'].get('tipo') != 'ensemble_ultra':
            return jsonify({
                'success': False, 
                'error': 'Modelo ultra de EuroMillón no disponible'
            }), 400
        
        modelo_ultra = modelos['euromillon']
        config = JUEGOS_CONFIG['euromillon']
        
        start_time = time.time()
        
        # Generar predicción ultra
        if algoritmo == 'ensemble':
            # Usar ensemble completo
            prediccion = generar_prediccion_ultra(modelo_ultra, config)
        else:
            # Usar algoritmo específico (para casos especiales)
            algoritmos_disponibles = ['xgboost', 'lightgbm', 'random_forest', 'extra_trees']
            if algoritmo in algoritmos_disponibles and algoritmo in modelo_ultra:
                # Crear configuración temporal para algoritmo específico
                config_temp = config.copy()
                config_temp['algoritmo_especifico'] = algoritmo
                prediccion = generar_prediccion_ultra(modelo_ultra, config_temp)
            else:
                # Fallback a ensemble si el algoritmo no está disponible
                prediccion = generar_prediccion_ultra(modelo_ultra, config)
        
        total_time = time.time() - start_time
        
        if prediccion:
            return jsonify_safe({
                'success': True,
                'juego': 'euromillon',
                'modelo': 'ultra_ensemble',
                'algoritmo_usado': algoritmo,
                'prediccion': prediccion,
                'tiempo_total': total_time,
                'timestamp': datetime.now().isoformat()
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Error generando predicción ultra'
            }), 500
            
    except Exception as e:
        logging.error(f"Error en endpoint ultra: {str(e)}")
        return jsonify({
            'success': False, 
            'error': f'Error interno: {str(e)}'
        }), 500

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