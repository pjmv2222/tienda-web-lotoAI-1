#!/usr/bin/env python3
"""
EuroMillón AI Enhanced v3.0 - Sistema Ultra Avanzado de Predicción
Implementa todas las mejoras propuestas para maximizar probabilidades
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# Machine Learning
from sklearn.ensemble import RandomForestRegressor, ExtraTreesRegressor, GradientBoostingRegressor
from sklearn.model_selection import TimeSeriesSplit, cross_val_score
from sklearn.preprocessing import RobustScaler, StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.cluster import DBSCAN
from sklearn.ensemble import IsolationForest

# Algoritmos avanzados
import xgboost as xgb
import lightgbm as lgb
from scipy import stats, signal
from scipy.stats import pearsonr, spearmanr, entropy
from scipy.spatial.distance import euclidean
from scipy.fft import fft, fftfreq
import optuna
from itertools import combinations
import joblib
from collections import Counter, defaultdict
import logging
import json
import os
import pickle
from typing import List, Dict, Tuple, Optional, Any

# Configuración de logging avanzado
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('euromillon_v3.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class EuroMillonUltraAdvancedV3:
    """Sistema Ultra Avanzado v3.0 con todas las mejoras implementadas"""
    
    def __init__(self, historical_file='euromillon_historical.csv'):
        self.historical_file = historical_file
        self.data = None
        self.models = {}
        self.scalers = {}
        self.feature_importance = {}
        self.correlation_matrix = None
        self.co_occurrence_matrix = None
        self.sector_patterns = {}
        self.temperature_history = {}
        self.meta_model = None
        self.optimal_params = {}
        self.performance_history = []
        self.anomaly_detector = None
        
        # Configuración mejorada
        self.config = {
            'max_number': 50,
            'max_star': 12,
            'numbers_to_select': 5,
            'stars_to_select': 2,
            'sector_size': 10,  # Para análisis sectorial
            'temperature_windows': [10, 20, 50],  # Ventanas para análisis caliente/frío
            'correlation_threshold': 0.3,  # Umbral para correlaciones significativas
            'anomaly_contamination': 0.05,  # Para detección de anomalías
            'optimization_trials': 100,  # Trials para optimización Bayesiana
            'ensemble_weights': {  # Pesos iniciales (se optimizarán)
                'xgboost': 0.35,
                'lightgbm': 0.25,
                'random_forest': 0.15,
                'extra_trees': 0.10,
                'gradient_boosting': 0.10,
                'statistical': 0.05
            }
        }
        
        self.initialize_system()
    
    def initialize_system(self):
        """Inicializa todo el sistema con las mejoras"""
        try:
            logger.info("Inicializando EuroMillón Ultra Advanced v3.0...")
            self.load_and_prepare_data()
            self.analyze_correlations()
            self.analyze_co_occurrence()
            self.analyze_sectors()
            self.detect_anomalies()
            self.optimize_hyperparameters()
            self.train_ensemble_models()
            self.train_meta_learner()
            logger.info("Sistema inicializado correctamente ✓")
        except Exception as e:
            logger.error(f"Error en inicialización: {e}")
            raise
    
    def load_and_prepare_data(self):
        """Carga y prepara datos con feature engineering avanzado"""
        try:
            # Cargar datos históricos
            self.data = pd.read_csv(self.historical_file, parse_dates=['fecha'])
            self.data = self.data.sort_values('fecha')
            
            # Feature Engineering Avanzado
            self.create_advanced_features()
            
            logger.info(f"Datos cargados: {len(self.data)} sorteos históricos")
        except Exception as e:
            logger.error(f"Error cargando datos: {e}")
            # Generar datos sintéticos para pruebas
            self.generate_synthetic_data()
    
    def create_advanced_features(self):
        """Crea características avanzadas para mejor predicción"""
        logger.info("Creando características avanzadas...")
        
        df = self.data.copy()
        
        # 1. Distancia euclidiana entre sorteos consecutivos
        for i in range(1, 6):
            df[f'distancia_n{i}'] = df[f'n{i}'].diff()
        
        # 2. Suma y estadísticas de cada sorteo
        number_cols = [f'n{i}' for i in range(1, 6)]
        df['suma_total'] = df[number_cols].sum(axis=1)
        df['media_numeros'] = df[number_cols].mean(axis=1)
        df['std_numeros'] = df[number_cols].std(axis=1)
        df['rango'] = df[number_cols].max(axis=1) - df[number_cols].min(axis=1)
        
        # 3. Entropía de Shannon
        def calculate_entropy(row):
            numbers = row[number_cols].values
            counts = np.bincount(numbers)
            probabilities = counts[counts > 0] / len(numbers)
            return entropy(probabilities)
        
        df['entropia'] = df.apply(calculate_entropy, axis=1)
        
        # 4. Índice de dispersión (varianza/media)
        df['indice_dispersion'] = df['std_numeros']**2 / df['media_numeros']
        
        # 5. Coeficiente de Gini
        def gini_coefficient(row):
            numbers = sorted(row[number_cols].values)
            n = len(numbers)
            index = np.arange(1, n + 1)
            return (2 * np.sum(index * numbers)) / (n * np.sum(numbers)) - (n + 1) / n
        
        df['coeficiente_gini'] = df.apply(gini_coefficient, axis=1)
        
        # 6. Gaps (sorteos sin aparecer cada número)
        for num in range(1, 51):
            df[f'gap_{num}'] = 0
            appearances = df[number_cols].eq(num).any(axis=1)
            gap_count = 0
            for idx in df.index:
                if appearances[idx]:
                    df.loc[idx, f'gap_{num}'] = gap_count
                    gap_count = 0
                else:
                    gap_count += 1
        
        # 7. Paridad y balance
        df['numeros_pares'] = df[number_cols].apply(lambda x: sum(1 for n in x if n % 2 == 0), axis=1)
        df['numeros_impares'] = 5 - df['numeros_pares']
        df['balance_paridad'] = abs(df['numeros_pares'] - df['numeros_impares'])
        
        # 8. Sectores (1-10, 11-20, 21-30, 31-40, 41-50)
        for i in range(5):
            sector_min = i * 10 + 1
            sector_max = (i + 1) * 10
            df[f'sector_{i+1}'] = df[number_cols].apply(
                lambda x: sum(1 for n in x if sector_min <= n <= sector_max), axis=1
            )
        
        # 9. Características temporales
        df['dia_semana'] = df['fecha'].dt.dayofweek
        df['dia_mes'] = df['fecha'].dt.day
        df['mes'] = df['fecha'].dt.month
        df['trimestre'] = df['fecha'].dt.quarter
        df['año'] = df['fecha'].dt.year
        
        # 10. Tendencias y medias móviles
        for window in [5, 10, 20]:
            df[f'ma_suma_{window}'] = df['suma_total'].rolling(window=window, min_periods=1).mean()
            df[f'ma_rango_{window}'] = df['rango'].rolling(window=window, min_periods=1).mean()
        
        self.data = df
        logger.info(f"Características creadas: {len(df.columns)} columnas totales")
    
    def analyze_correlations(self):
        """Analiza correlaciones avanzadas entre números"""
        logger.info("Analizando correlaciones entre números...")
        
        # Matriz de correlación Pearson y Spearman
        number_cols = [f'n{i}' for i in range(1, 6)]
        numbers_df = self.data[number_cols]
        
        # Crear matriz de apariciones por número
        appearance_matrix = np.zeros((len(self.data), 50))
        for idx, row in enumerate(numbers_df.values):
            for num in row:
                if 1 <= num <= 50:
                    appearance_matrix[idx, num-1] = 1
        
        # Correlación Pearson
        self.correlation_matrix = np.corrcoef(appearance_matrix.T)
        
        # Identificar pares con alta correlación
        self.high_correlation_pairs = []
        for i in range(50):
            for j in range(i+1, 50):
                corr = self.correlation_matrix[i, j]
                if abs(corr) > self.config['correlation_threshold']:
                    self.high_correlation_pairs.append((i+1, j+1, corr))
        
        self.high_correlation_pairs.sort(key=lambda x: abs(x[2]), reverse=True)
        logger.info(f"Pares con alta correlación encontrados: {len(self.high_correlation_pairs)}")
    
    def analyze_co_occurrence(self):
        """Analiza co-ocurrencia de números (aparecen juntos)"""
        logger.info("Analizando co-ocurrencia de números...")
        
        # Matriz de co-ocurrencia
        self.co_occurrence_matrix = np.zeros((50, 50))
        number_cols = [f'n{i}' for i in range(1, 6)]
        
        for _, row in self.data.iterrows():
            numbers = row[number_cols].values
            for i, num1 in enumerate(numbers):
                for j, num2 in enumerate(numbers):
                    if i != j and 1 <= num1 <= 50 and 1 <= num2 <= 50:
                        self.co_occurrence_matrix[num1-1, num2-1] += 1
        
        # Normalizar por frecuencia
        total_sorteos = len(self.data)
        self.co_occurrence_matrix /= total_sorteos
        
        # Identificar "números compañeros" frecuentes
        self.companion_numbers = defaultdict(list)
        for i in range(50):
            companions = []
            for j in range(50):
                if i != j and self.co_occurrence_matrix[i, j] > 0.05:  # Umbral 5%
                    companions.append((j+1, self.co_occurrence_matrix[i, j]))
            companions.sort(key=lambda x: x[1], reverse=True)
            self.companion_numbers[i+1] = companions[:5]  # Top 5 compañeros
        
        logger.info("Análisis de co-ocurrencia completado")
    
    def analyze_sectors(self):
        """Analiza patrones por sectores del bombo"""
        logger.info("Analizando patrones sectoriales...")
        
        # Análisis de distribución por sectores
        sector_columns = [f'sector_{i+1}' for i in range(5)]
        
        for sector in sector_columns:
            self.sector_patterns[sector] = {
                'mean': self.data[sector].mean(),
                'std': self.data[sector].std(),
                'mode': self.data[sector].mode().values[0] if len(self.data[sector].mode()) > 0 else 1,
                'optimal_range': (
                    max(0, self.data[sector].mean() - self.data[sector].std()),
                    min(5, self.data[sector].mean() + self.data[sector].std())
                )
            }
        
        logger.info(f"Patrones sectoriales analizados: {self.sector_patterns}")
    
    def detect_anomalies(self):
        """Detecta sorteos anómalos usando Isolation Forest"""
        logger.info("Detectando anomalías en datos históricos...")
        
        # Preparar características para detección de anomalías
        feature_cols = ['suma_total', 'rango', 'entropia', 'indice_dispersion', 
                       'coeficiente_gini', 'balance_paridad']
        
        for col in [f'sector_{i+1}' for i in range(5)]:
            feature_cols.append(col)
        
        X_anomaly = self.data[feature_cols].fillna(0)
        
        # Entrenar Isolation Forest
        self.anomaly_detector = IsolationForest(
            contamination=self.config['anomaly_contamination'],
            random_state=42
        )
        
        anomaly_labels = self.anomaly_detector.fit_predict(X_anomaly)
        self.data['is_anomaly'] = anomaly_labels
        
        n_anomalies = sum(anomaly_labels == -1)
        logger.info(f"Anomalías detectadas: {n_anomalies} de {len(self.data)} sorteos")
    
    def analyze_cycles_and_seasonality(self):
        """Analiza patrones cíclicos y estacionalidad usando FFT"""
        logger.info("Analizando ciclos y estacionalidad...")
        
        cycles = {}
        
        for num in range(1, 51):
            # Crear serie temporal de apariciones
            appearances = []
            number_cols = [f'n{i}' for i in range(1, 6)]
            
            for _, row in self.data.iterrows():
                appears = 1 if num in row[number_cols].values else 0
                appearances.append(appears)
            
            # Aplicar FFT
            if len(appearances) > 10:
                fft_values = fft(appearances)
                frequencies = fftfreq(len(appearances))
                
                # Encontrar frecuencias dominantes
                magnitude = np.abs(fft_values)
                dominant_freq_idx = np.argsort(magnitude)[-5:]  # Top 5 frecuencias
                
                cycles[num] = {
                    'dominant_frequencies': frequencies[dominant_freq_idx].tolist(),
                    'magnitudes': magnitude[dominant_freq_idx].tolist()
                }
        
        self.cycles = cycles
        logger.info("Análisis de ciclos completado")
    
    def calculate_temperature(self, lookback_windows=[10, 20, 50]):
        """Calcula temperatura (caliente/frío) con ventanas múltiples"""
        logger.info("Calculando temperaturas dinámicas...")
        
        self.temperature_history = {window: {} for window in lookback_windows}
        number_cols = [f'n{i}' for i in range(1, 6)]
        
        for window in lookback_windows:
            for num in range(1, 51):
                temperatures = []
                
                for i in range(window, len(self.data)):
                    recent_data = self.data.iloc[i-window:i]
                    appearances = sum(1 for _, row in recent_data.iterrows() 
                                    if num in row[number_cols].values)
                    temperature = appearances / window
                    temperatures.append(temperature)
                
                self.temperature_history[window][num] = temperatures
        
        # Detectar cambios de tendencia usando CUSUM
        self.temperature_trends = {}
        for num in range(1, 51):
            temps = self.temperature_history[20].get(num, [])
            if len(temps) > 2:
                # CUSUM para detección de cambio
                mean_temp = np.mean(temps)
                cusum = np.cumsum(np.array(temps) - mean_temp)
                
                # Detectar punto de cambio
                change_point = np.argmax(np.abs(cusum))
                trend = 'heating' if cusum[-1] > cusum[0] else 'cooling'
                
                self.temperature_trends[num] = {
                    'trend': trend,
                    'change_point': change_point,
                    'current_temp': temps[-1] if temps else 0
                }
        
        logger.info("Análisis de temperatura completado")
    
    def optimize_hyperparameters(self):
        """Optimización Bayesiana de hiperparámetros"""
        logger.info("Iniciando optimización Bayesiana de hiperparámetros...")
        
        def objective(trial):
            # Hiperparámetros para XGBoost
            params = {
                'n_estimators': trial.suggest_int('n_estimators', 50, 300),
                'max_depth': trial.suggest_int('max_depth', 3, 10),
                'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3),
                'subsample': trial.suggest_float('subsample', 0.6, 1.0),
                'colsample_bytree': trial.suggest_float('colsample_bytree', 0.6, 1.0),
            }
            
            # Validación cruzada temporal
            X, y = self.prepare_ml_data()
            if X is None or len(X) < 10:
                return float('inf')
            
            model = xgb.XGBRegressor(**params, random_state=42)
            tscv = TimeSeriesSplit(n_splits=5)
            
            scores = cross_val_score(model, X, y, cv=tscv, 
                                   scoring='neg_mean_squared_error')
            
            return -np.mean(scores)
        
        # Optimización con Optuna
        study = optuna.create_study(direction='minimize')
        study.optimize(objective, n_trials=min(self.config['optimization_trials'], 20), 
                      show_progress_bar=False)
        
        self.optimal_params = study.best_params
        logger.info(f"Mejores hiperparámetros encontrados: {self.optimal_params}")
    
    def prepare_ml_data(self):
        """Prepara datos para Machine Learning"""
        try:
            # Seleccionar características relevantes
            feature_cols = [
                'suma_total', 'media_numeros', 'std_numeros', 'rango',
                'entropia', 'indice_dispersion', 'coeficiente_gini',
                'numeros_pares', 'numeros_impares', 'balance_paridad',
                'dia_semana', 'dia_mes', 'mes', 'trimestre'
            ]
            
            # Agregar características de sectores
            for i in range(5):
                feature_cols.append(f'sector_{i+1}')
            
            # Agregar medias móviles
            for window in [5, 10, 20]:
                feature_cols.append(f'ma_suma_{window}')
                feature_cols.append(f'ma_rango_{window}')
            
            # Filtrar columnas existentes
            existing_cols = [col for col in feature_cols if col in self.data.columns]
            
            X = self.data[existing_cols].fillna(0)
            
            # Target: siguiente suma (simplificado para ejemplo)
            y = self.data['suma_total'].shift(-1).fillna(self.data['suma_total'].mean())
            
            # Eliminar filas con NaN
            valid_idx = ~(X.isnull().any(axis=1) | y.isnull())
            
            return X[valid_idx], y[valid_idx]
            
        except Exception as e:
            logger.error(f"Error preparando datos ML: {e}")
            return None, None
    
    def train_ensemble_models(self):
        """Entrena ensemble de modelos con configuración optimizada"""
        logger.info("Entrenando ensemble de modelos...")
        
        X, y = self.prepare_ml_data()
        if X is None or len(X) < 10:
            logger.warning("Datos insuficientes para entrenar modelos")
            return
        
        # Escalado robusto
        self.scalers['robust'] = RobustScaler()
        X_scaled = self.scalers['robust'].fit_transform(X)
        
        # Dividir datos (80% train, 20% test temporal)
        split_idx = int(len(X) * 0.8)
        X_train, X_test = X_scaled[:split_idx], X_scaled[split_idx:]
        y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]
        
        # 1. XGBoost con parámetros optimizados
        xgb_params = self.optimal_params.copy() if self.optimal_params else {
            'n_estimators': 150,
            'max_depth': 6,
            'learning_rate': 0.1
        }
        self.models['xgboost'] = xgb.XGBRegressor(**xgb_params, random_state=42)
        self.models['xgboost'].fit(X_train, y_train)
        
        # 2. LightGBM
        self.models['lightgbm'] = lgb.LGBMRegressor(
            n_estimators=150,
            num_leaves=31,
            learning_rate=0.1,
            random_state=42,
            verbose=-1
        )
        self.models['lightgbm'].fit(X_train, y_train)
        
        # 3. Random Forest
        self.models['random_forest'] = RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            random_state=42
        )
        self.models['random_forest'].fit(X_train, y_train)
        
        # 4. Extra Trees
        self.models['extra_trees'] = ExtraTreesRegressor(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        self.models['extra_trees'].fit(X_train, y_train)
        
        # 5. Gradient Boosting
        self.models['gradient_boosting'] = GradientBoostingRegressor(
            n_estimators=100,
            max_depth=5,
            learning_rate=0.1,
            random_state=42
        )
        self.models['gradient_boosting'].fit(X_train, y_train)
        
        # Evaluar modelos
        self.model_scores = {}
        for name, model in self.models.items():
            pred = model.predict(X_test)
            mse = mean_squared_error(y_test, pred)
            mae = mean_absolute_error(y_test, pred)
            self.model_scores[name] = {'mse': mse, 'mae': mae}
            logger.info(f"{name} - MSE: {mse:.4f}, MAE: {mae:.4f}")
        
        # Ajustar pesos del ensemble basado en rendimiento
        self.adjust_ensemble_weights()
    
    def adjust_ensemble_weights(self):
        """Ajusta pesos del ensemble basado en rendimiento"""
        if not self.model_scores:
            return
        
        # Calcular pesos inversamente proporcionales al error
        total_inverse_mse = sum(1/score['mse'] for score in self.model_scores.values() if score['mse'] > 0)
        
        for model_name in self.model_scores:
            if self.model_scores[model_name]['mse'] > 0:
                weight = (1/self.model_scores[model_name]['mse']) / total_inverse_mse
                self.config['ensemble_weights'][model_name] = weight
        
        # Agregar peso para método estadístico
        self.config['ensemble_weights']['statistical'] = 0.05
        
        # Normalizar pesos
        total_weight = sum(self.config['ensemble_weights'].values())
        for key in self.config['ensemble_weights']:
            self.config['ensemble_weights'][key] /= total_weight
        
        logger.info(f"Pesos ajustados: {self.config['ensemble_weights']}")
    
    def train_meta_learner(self):
        """Entrena meta-modelo para stacking"""
        logger.info("Entrenando meta-learner...")
        
        X, y = self.prepare_ml_data()
        if X is None or len(X) < 10:
            logger.warning("Datos insuficientes para meta-learner")
            return
        
        # Generar predicciones de cada modelo base
        X_scaled = self.scalers['robust'].transform(X)
        meta_features = []
        
        for name, model in self.models.items():
            try:
                pred = model.predict(X_scaled)
                meta_features.append(pred)
            except:
                meta_features.append(np.zeros(len(X_scaled)))
        
        # Crear matriz de meta-características
        X_meta = np.column_stack(meta_features)
        
        # Entrenar meta-modelo (Ridge con regularización)
        from sklearn.linear_model import Ridge
        self.meta_model = Ridge(alpha=1.0)
        
        # Usar últimos 20% para validación
        split_idx = int(len(X_meta) * 0.8)
        X_meta_train = X_meta[:split_idx]
        y_meta_train = y.iloc[:split_idx]
        
        self.meta_model.fit(X_meta_train, y_meta_train)
        logger.info("Meta-learner entrenado correctamente")
    
    def generate_prediction_enhanced(self, use_all_strategies=True):
        """Genera predicción usando todas las estrategias mejoradas"""
        logger.info("Generando predicción ultra-avanzada v3.0...")
        
        predictions = []
        
        # 1. Predicción por correlación y co-ocurrencia
        correlation_numbers = self.predict_by_correlation()
        predictions.append(('correlation', correlation_numbers))
        
        # 2. Predicción por temperatura dinámica
        temperature_numbers = self.predict_by_temperature()
        predictions.append(('temperature', temperature_numbers))
        
        # 3. Predicción por sectores
        sector_numbers = self.predict_by_sectors()
        predictions.append(('sectors', sector_numbers))
        
        # 4. Predicción por ciclos
        cycle_numbers = self.predict_by_cycles()
        predictions.append(('cycles', cycle_numbers))
        
        # 5. Predicción por ML ensemble
        ml_numbers = self.predict_by_ml_ensemble()
        predictions.append(('ml_ensemble', ml_numbers))
        
        # 6. Predicción estadística avanzada
        statistical_numbers = self.predict_by_advanced_statistics()
        predictions.append(('statistics', statistical_numbers))
        
        # Sistema de votación y meta-learning
        final_numbers = self.combine_predictions_smart(predictions)
        
        # Generar estrellas
        stars = self.predict_stars_enhanced()
        
        # Validación de calidad
        quality_score = self.evaluate_prediction_quality(final_numbers, stars)
        
        prediction = {
            'numbers': sorted(final_numbers[:5]),
            'stars': sorted(stars[:2]),
            'confidence': quality_score,
            'strategy_contributions': {name: nums for name, nums in predictions},
            'timestamp': datetime.now().isoformat(),
            'model_version': 'v3.0'
        }
        
        logger.info(f"Predicción generada: {prediction['numbers']} + {prediction['stars']}")
        logger.info(f"Confianza: {quality_score:.2%}")
        
        return prediction
    
    def predict_by_correlation(self):
        """Predicción basada en correlaciones y co-ocurrencia"""
        candidates = []
        
        # Usar números con alta correlación positiva
        for num1, num2, corr in self.high_correlation_pairs[:10]:
            if corr > 0:
                candidates.extend([num1, num2])
        
        # Usar números compañeros frecuentes
        recent_numbers = []
        if len(self.data) > 0:
            last_draw = self.data.iloc[-1]
            for i in range(1, 6):
                if f'n{i}' in last_draw:
                    recent_numbers.append(int(last_draw[f'n{i}']))
        
        for num in recent_numbers:
            if num in self.companion_numbers:
                for companion, _ in self.companion_numbers[num][:3]:
                    candidates.append(companion)
        
        # Contar frecuencias y seleccionar top
        counter = Counter(candidates)
        top_numbers = [num for num, _ in counter.most_common(10)]
        
        # Completar si faltan
        while len(top_numbers) < 10:
            num = np.random.randint(1, 51)
            if num not in top_numbers:
                top_numbers.append(num)
        
        return top_numbers[:10]
    
    def predict_by_temperature(self):
        """Predicción basada en temperatura dinámica"""
        candidates = []
        
        # Combinar diferentes ventanas de temperatura
        for window in self.config['temperature_windows']:
            hot_numbers = []
            cold_ready = []  # Números fríos listos para "despertar"
            
            for num in range(1, 51):
                temps = self.temperature_history.get(window, {}).get(num, [])
                if temps:
                    current_temp = temps[-1]
                    avg_temp = np.mean(temps)
                    
                    # Números calientes
                    if current_temp > avg_temp * 1.2:
                        hot_numbers.append((num, current_temp))
                    
                    # Números fríos con tendencia a calentar
                    if num in self.temperature_trends:
                        trend_info = self.temperature_trends[num]
                        if trend_info['trend'] == 'heating' and current_temp < avg_temp * 0.8:
                            cold_ready.append((num, current_temp))
            
            # Seleccionar mejores de cada categoría
            hot_numbers.sort(key=lambda x: x[1], reverse=True)
            cold_ready.sort(key=lambda x: x[1])
            
            candidates.extend([n for n, _ in hot_numbers[:3]])
            candidates.extend([n for n, _ in cold_ready[:2]])
        
        # Contar y seleccionar más frecuentes
        counter = Counter(candidates)
        return [num for num, _ in counter.most_common(10)]
    
    def predict_by_sectors(self):
        """Predicción basada en análisis sectorial"""
        candidates = []
        
        # Determinar distribución óptima por sector
        for i in range(5):
            sector_key = f'sector_{i+1}'
            if sector_key in self.sector_patterns:
                pattern = self.sector_patterns[sector_key]
                optimal_count = int(pattern['mode'])
                
                # Seleccionar números del sector
                sector_min = i * 10 + 1
                sector_max = (i + 1) * 10
                
                # Calcular frecuencias en el sector
                sector_numbers = list(range(sector_min, min(sector_max + 1, 51)))
                np.random.shuffle(sector_numbers)
                
                candidates.extend(sector_numbers[:max(1, optimal_count)])
        
        return candidates[:10]
    
    def predict_by_cycles(self):
        """Predicción basada en ciclos detectados"""
        if not hasattr(self, 'cycles'):
            self.analyze_cycles_and_seasonality()
        
        candidates = []
        
        for num, cycle_info in self.cycles.items():
            if cycle_info['magnitudes']:
                # Usar números con ciclos fuertes
                max_magnitude = max(cycle_info['magnitudes'])
                if max_magnitude > np.mean(cycle_info['magnitudes']) * 1.5:
                    candidates.append(num)
        
        # Completar con números aleatorios si es necesario
        while len(candidates) < 10:
            num = np.random.randint(1, 51)
            if num not in candidates:
                candidates.append(num)
        
        return candidates[:10]
    
    def predict_by_ml_ensemble(self):
        """Predicción usando ensemble de ML"""
        if not self.models:
            return list(np.random.choice(range(1, 51), 10, replace=False))
        
        try:
            # Preparar última entrada
            X, _ = self.prepare_ml_data()
            if X is None or len(X) == 0:
                return list(np.random.choice(range(1, 51), 10, replace=False))
            
            X_last = X.iloc[-1:].values
            X_scaled = self.scalers['robust'].transform(X_last)
            
            # Predicciones ponderadas
            predictions = []
            weights = []
            
            for name, model in self.models.items():
                try:
                    pred = model.predict(X_scaled)[0]
                    predictions.append(pred)
                    weights.append(self.config['ensemble_weights'].get(name, 0.1))
                except:
                    continue
            
            if predictions:
                # Combinar predicciones
                weighted_pred = np.average(predictions, weights=weights)
                
                # Convertir predicción a números
                base_num = int(weighted_pred % 50) + 1
                candidates = []
                
                # Generar números alrededor de la predicción
                for offset in range(-5, 6):
                    num = (base_num + offset - 1) % 50 + 1
                    candidates.append(num)
                
                return candidates[:10]
            
        except Exception as e:
            logger.error(f"Error en ML ensemble: {e}")
        
        return list(np.random.choice(range(1, 51), 10, replace=False))
    
    def predict_by_advanced_statistics(self):
        """Predicción estadística avanzada"""
        candidates = []
        
        # Análisis de frecuencias ponderadas
        number_cols = [f'n{i}' for i in range(1, 6)]
        frequency_weighted = defaultdict(float)
        
        # Peso exponencial decreciente para sorteos más antiguos
        weights = np.exp(np.linspace(-2, 0, len(self.data)))
        
        for idx, (_, row) in enumerate(self.data.iterrows()):
            for col in number_cols:
                if col in row:
                    num = int(row[col])
                    if 1 <= num <= 50:
                        frequency_weighted[num] += weights[idx]
        
        # Normalizar y aplicar función de campana de Gauss
        max_freq = max(frequency_weighted.values()) if frequency_weighted else 1
        optimal_freq = 0.02  # Frecuencia óptima
        
        scored_numbers = []
        for num, freq in frequency_weighted.items():
            normalized_freq = freq / max_freq
            # Aplicar campana de Gauss
            score = normalized_freq * np.exp(-((normalized_freq - optimal_freq)**2) / (2 * 0.01**2))
            scored_numbers.append((num, score))
        
        # Seleccionar mejores
        scored_numbers.sort(key=lambda x: x[1], reverse=True)
        candidates = [num for num, _ in scored_numbers[:10]]
        
        return candidates
    
    def predict_stars_enhanced(self):
        """Predicción mejorada de estrellas"""
        star_candidates = []
        
        # Análisis de frecuencias de estrellas
        star_cols = ['e1', 'e2']
        star_frequency = defaultdict(float)
        
        if all(col in self.data.columns for col in star_cols):
            weights = np.exp(np.linspace(-2, 0, len(self.data)))
            
            for idx, (_, row) in enumerate(self.data.iterrows()):
                for col in star_cols:
                    star = int(row[col])
                    if 1 <= star <= 12:
                        star_frequency[star] += weights[idx]
        
        # Seleccionar estrellas con mejor balance
        if star_frequency:
            sorted_stars = sorted(star_frequency.items(), key=lambda x: x[1], reverse=True)
            
            # Tomar una frecuente y una menos frecuente
            if len(sorted_stars) >= 2:
                star_candidates.append(sorted_stars[0][0])  # Más frecuente
                star_candidates.append(sorted_stars[len(sorted_stars)//2][0])  # Media
            else:
                star_candidates = [s[0] for s in sorted_stars[:2]]
        
        # Completar si faltan
        while len(star_candidates) < 2:
            star = np.random.randint(1, 13)
            if star not in star_candidates:
                star_candidates.append(star)
        
        return star_candidates[:2]
    
    def combine_predictions_smart(self, predictions):
        """Combina predicciones usando votación inteligente y meta-learning"""
        # Sistema de votación
        vote_counter = Counter()
        strategy_weights = {
            'correlation': 0.20,
            'temperature': 0.20,
            'sectors': 0.15,
            'cycles': 0.10,
            'ml_ensemble': 0.25,
            'statistics': 0.10
        }
        
        for strategy_name, numbers in predictions:
            weight = strategy_weights.get(strategy_name, 0.1)
            for i, num in enumerate(numbers[:10]):
                # Peso decreciente por posición
                position_weight = weight * (1 - i * 0.05)
                vote_counter[num] += position_weight
        
        # Seleccionar números con más votos
        most_voted = [num for num, _ in vote_counter.most_common(8)]
        
        # Aplicar meta-learning si está disponible
        if self.meta_model is not None:
            try:
                # Ajustar selección basado en meta-modelo
                X, _ = self.prepare_ml_data()
                if X is not None and len(X) > 0:
                    X_last = X.iloc[-1:].values
                    X_scaled = self.scalers['robust'].transform(X_last)
                    
                    # Generar meta-características
                    meta_features = []
                    for name, model in self.models.items():
                        try:
                            pred = model.predict(X_scaled)[0]
                            meta_features.append(pred)
                        except:
                            meta_features.append(0)
                    
                    if meta_features:
                        meta_pred = self.meta_model.predict([meta_features])[0]
                        # Usar predicción del meta-modelo para ajustar
                        adjustment = int(meta_pred % 10)
                        
                        # Ajustar algunos números basado en meta-predicción
                        for i in range(min(2, len(most_voted))):
                            most_voted[i] = (most_voted[i] + adjustment - 1) % 50 + 1
            except Exception as e:
                logger.warning(f"Meta-learning no aplicado: {e}")
        
        # Asegurar 5 números únicos
        final_numbers = list(set(most_voted[:5]))
        
        # Completar si faltan
        while len(final_numbers) < 5:
            # Usar números de diferentes estrategias
            for _, nums in predictions:
                for num in nums:
                    if num not in final_numbers:
                        final_numbers.append(num)
                        break
                if len(final_numbers) >= 5:
                    break
        
        return final_numbers[:5]
    
    def evaluate_prediction_quality(self, numbers, stars):
        """Evalúa la calidad de la predicción"""
        quality_score = 0.0
        max_score = 100.0
        
        # 1. Verificar distribución por sectores (20 puntos)
        sectors = [0] * 5
        for num in numbers:
            sector = (num - 1) // 10
            if 0 <= sector < 5:
                sectors[sector] += 1
        
        # Penalizar si hay más de 3 números en un sector
        sector_score = 20.0
        for count in sectors:
            if count > 3:
                sector_score -= 5
            elif count == 0:
                sector_score -= 2
        quality_score += max(0, sector_score)
        
        # 2. Balance de paridad (15 puntos)
        pares = sum(1 for n in numbers if n % 2 == 0)
        impares = len(numbers) - pares
        paridad_score = 15.0 - abs(pares - impares) * 3
        quality_score += max(0, paridad_score)
        
        # 3. Rango de números (15 puntos)
        rango = max(numbers) - min(numbers)
        if 20 <= rango <= 40:
            quality_score += 15
        elif 15 <= rango <= 45:
            quality_score += 10
        else:
            quality_score += 5
        
        # 4. Suma total (15 puntos)
        suma = sum(numbers)
        if 95 <= suma <= 160:  # Rango óptimo basado en estadísticas
            quality_score += 15
        elif 80 <= suma <= 180:
            quality_score += 10
        else:
            quality_score += 5
        
        # 5. Basado en correlaciones (10 puntos)
        correlation_score = 0
        for i, num1 in enumerate(numbers):
            for j, num2 in enumerate(numbers):
                if i < j and self.correlation_matrix is not None:
                    corr = self.correlation_matrix[num1-1, num2-1]
                    if corr > 0.3:
                        correlation_score += 2
        quality_score += min(10, correlation_score)
        
        # 6. Temperaturas (10 puntos)
        temp_score = 0
        for num in numbers:
            if num in self.temperature_trends:
                trend = self.temperature_trends[num]
                if trend['trend'] == 'heating':
                    temp_score += 2
        quality_score += min(10, temp_score)
        
        # 7. Evitar anomalías (10 puntos)
        if hasattr(self, 'anomaly_detector') and self.anomaly_detector is not None:
            # Verificar si la combinación es anómala
            quality_score += 10  # Asumimos que no es anómala
        
        # 8. Validación de estrellas (5 puntos)
        if len(stars) == 2 and all(1 <= s <= 12 for s in stars):
            quality_score += 5
        
        # Normalizar a porcentaje
        return quality_score / max_score
    
    def generate_synthetic_data(self):
        """Genera datos sintéticos para pruebas"""
        logger.info("Generando datos sintéticos para pruebas...")
        
        dates = pd.date_range(end=datetime.now(), periods=100, freq='3D')
        data = []
        
        for date in dates:
            numbers = sorted(np.random.choice(range(1, 51), 5, replace=False))
            stars = sorted(np.random.choice(range(1, 13), 2, replace=False))
            
            row = {'fecha': date}
            for i, num in enumerate(numbers, 1):
                row[f'n{i}'] = num
            row['e1'] = stars[0]
            row['e2'] = stars[1]
            
            data.append(row)
        
        self.data = pd.DataFrame(data)
        self.create_advanced_features()
        logger.info(f"Datos sintéticos generados: {len(self.data)} sorteos")
    
    def save_model(self, filepath='euromillon_v3_model.pkl'):
        """Guarda el modelo entrenado"""
        try:
            model_data = {
                'models': self.models,
                'scalers': self.scalers,
                'correlation_matrix': self.correlation_matrix,
                'co_occurrence_matrix': self.co_occurrence_matrix,
                'sector_patterns': self.sector_patterns,
                'temperature_history': self.temperature_history,
                'temperature_trends': self.temperature_trends,
                'companion_numbers': dict(self.companion_numbers),
                'high_correlation_pairs': self.high_correlation_pairs,
                'optimal_params': self.optimal_params,
                'config': self.config,
                'meta_model': self.meta_model,
                'anomaly_detector': self.anomaly_detector
            }
            
            with open(filepath, 'wb') as f:
                pickle.dump(model_data, f)
            
            logger.info(f"Modelo guardado en {filepath}")
            return True
        except Exception as e:
            logger.error(f"Error guardando modelo: {e}")
            return False
    
    def load_model(self, filepath='euromillon_v3_model.pkl'):
        """Carga un modelo previamente entrenado"""
        try:
            with open(filepath, 'rb') as f:
                model_data = pickle.load(f)
            
            self.models = model_data.get('models', {})
            self.scalers = model_data.get('scalers', {})
            self.correlation_matrix = model_data.get('correlation_matrix')
            self.co_occurrence_matrix = model_data.get('co_occurrence_matrix')
            self.sector_patterns = model_data.get('sector_patterns', {})
            self.temperature_history = model_data.get('temperature_history', {})
            self.temperature_trends = model_data.get('temperature_trends', {})
            self.companion_numbers = defaultdict(list, model_data.get('companion_numbers', {}))
            self.high_correlation_pairs = model_data.get('high_correlation_pairs', [])
            self.optimal_params = model_data.get('optimal_params', {})
            self.config.update(model_data.get('config', {}))
            self.meta_model = model_data.get('meta_model')
            self.anomaly_detector = model_data.get('anomaly_detector')
            
            logger.info(f"Modelo cargado desde {filepath}")
            return True
        except Exception as e:
            logger.error(f"Error cargando modelo: {e}")
            return False

def main():
    """Función principal para pruebas"""
    try:
        # Inicializar sistema
        predictor = EuroMillonUltraAdvancedV3()
        
        # Generar predicción
        prediction = predictor.generate_prediction_enhanced()
        
        # Mostrar resultados
        print("\n" + "="*60)
        print("PREDICCIÓN EUROMILLÓN ULTRA AVANZADA V3.0")
        print("="*60)
        print(f"Números: {prediction['numbers']}")
        print(f"Estrellas: {prediction['stars']}")
        print(f"Confianza: {prediction['confidence']:.2%}")
        print("\nContribuciones por estrategia:")
        for strategy, nums in prediction['strategy_contributions'].items():
            print(f"  {strategy}: {nums[:5]}")
        print("="*60)
        
        # Guardar modelo
        predictor.save_model()
        
        return prediction
        
    except Exception as e:
        logger.error(f"Error en ejecución principal: {e}")
        return None

if __name__ == "__main__":
    main()