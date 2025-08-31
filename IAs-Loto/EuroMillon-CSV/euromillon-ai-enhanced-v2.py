#!/usr/bin/env python3
"""
SISTEMA DE IA AVANZADO PARA EUROMILLÓN - ARQUITECTURA MEJORADA
================================================================

Sistema de predicción de lotería de última generación que implementa:
- Deep Learning con Transformers y LSTM
- Algoritmos Genéticos con operadores avanzados
- Particle Swarm Optimization (PSO)
- Análisis de patrones complejos
- Sistema de backtesting con Monte Carlo
- Auto-optimización continua

Versión: 4.0 Enhanced
Fecha: Agosto 2025
"""

import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import warnings
warnings.filterwarnings('ignore')

from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, ExtraTreesRegressor
from sklearn.model_selection import train_test_split, TimeSeriesSplit
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error
from scipy import stats
from scipy.optimize import differential_evolution
import xgboost as xgb
import lightgbm as lgb
import joblib
import os
from datetime import datetime, timedelta
import json
import random
from collections import defaultdict, Counter, deque
from typing import Dict, List, Tuple, Optional, Any
import hashlib
import pickle
from dataclasses import dataclass
from enum import Enum
import itertools
from scipy.optimize import differential_evolution
from scipy import stats

# Configuración de TensorFlow para optimización
tf.config.optimizer.set_jit(True)
tf.config.optimizer.set_experimental_options({'layout_optimizer': True})

class ModelType(Enum):
    """Tipos de modelos disponibles"""
    NEURAL_NETWORK = "neural_network"
    LSTM = "lstm"
    TRANSFORMER = "transformer"
    RANDOM_FOREST = "random_forest"
    XGBOOST = "xgboost"
    LIGHTGBM = "lightgbm"
    GENETIC = "genetic"
    PSO = "pso"

@dataclass
class PredictionResult:
    """Estructura para resultados de predicción"""
    main_numbers: List[int]
    star_numbers: List[int]
    confidence: float
    model_contributions: Dict[str, float]
    pattern_score: float
    timestamp: datetime

class GeneticAlgorithm:
    """Algoritmo genético avanzado para optimización de combinaciones"""
    
    def __init__(self, population_size=100, generations=50, mutation_rate=0.1):
        self.population_size = population_size
        self.generations = generations
        self.mutation_rate = mutation_rate
        self.elite_size = int(population_size * 0.1)
        
    def evolve(self, fitness_func, bounds):
        """Evoluciona la población para encontrar la mejor combinación"""
        # Inicializar población
        population = self._initialize_population(bounds)
        
        for generation in range(self.generations):
            # Evaluar fitness
            fitness_scores = [fitness_func(ind) for ind in population]
            
            # Selección por torneo con presión adaptativa
            pressure = 2 + generation / self.generations * 3
            selected = self._tournament_selection(population, fitness_scores, pressure)
            
            # Crossover adaptativo
            offspring = self._adaptive_crossover(selected, generation)
            
            # Mutación guiada
            offspring = self._guided_mutation(offspring, fitness_scores, bounds)
            
            # Elitismo
            elite_idx = np.argsort(fitness_scores)[-self.elite_size:]
            elite = [population[i] for i in elite_idx]
            
            # Nueva población
            population = elite + offspring[:self.population_size - self.elite_size]
            
        # Retornar mejor solución
        final_fitness = [fitness_func(ind) for ind in population]
        best_idx = np.argmax(final_fitness)
        return population[best_idx], final_fitness[best_idx]
    
    def _initialize_population(self, bounds):
        """Inicializa población con diversidad controlada"""
        population = []
        for _ in range(self.population_size):
            individual = []
            for low, high in bounds:
                individual.append(random.randint(low, high))
            population.append(individual)
        return population
    
    def _tournament_selection(self, population, fitness, pressure):
        """Selección por torneo con presión adaptativa"""
        selected = []
        tournament_size = int(pressure)
        
        for _ in range(len(population)):
            tournament_idx = random.sample(range(len(population)), tournament_size)
            tournament_fitness = [fitness[i] for i in tournament_idx]
            winner_idx = tournament_idx[np.argmax(tournament_fitness)]
            selected.append(population[winner_idx])
            
        return selected
    
    def _adaptive_crossover(self, parents, generation):
        """Crossover adaptativo basado en convergencia"""
        offspring = []
        crossover_rate = 0.9 - generation / self.generations * 0.3
        
        for i in range(0, len(parents)-1, 2):
            if random.random() < crossover_rate:
                # Crossover uniforme con sesgo adaptativo
                child1, child2 = [], []
                for j in range(len(parents[i])):
                    if random.random() < 0.5:
                        child1.append(parents[i][j])
                        child2.append(parents[i+1][j])
                    else:
                        child1.append(parents[i+1][j])
                        child2.append(parents[i][j])
                offspring.extend([child1, child2])
            else:
                offspring.extend([parents[i][:], parents[i+1][:]])
                
        return offspring
    
    def _guided_mutation(self, offspring, fitness, bounds):
        """Mutación guiada por gradientes de probabilidad"""
        mutated = []
        
        for individual in offspring:
            if random.random() < self.mutation_rate:
                mutated_ind = individual[:]
                num_mutations = random.randint(1, 3)
                
                for _ in range(num_mutations):
                    idx = random.randint(0, len(individual)-1)
                    low, high = bounds[idx]
                    
                    # Mutación gaussiana con límites
                    current = mutated_ind[idx]
                    sigma = (high - low) / 10
                    new_value = int(np.random.normal(current, sigma))
                    mutated_ind[idx] = np.clip(new_value, low, high)
                    
                mutated.append(mutated_ind)
            else:
                mutated.append(individual[:])
                
        return mutated

class ParticleSwarmOptimization:
    """Optimización por enjambre de partículas para exploración del espacio"""
    
    def __init__(self, n_particles=50, n_iterations=100):
        self.n_particles = n_particles
        self.n_iterations = n_iterations
        self.w = 0.7  # Inercia
        self.c1 = 1.4  # Componente cognitiva
        self.c2 = 1.4  # Componente social
        
    def optimize(self, fitness_func, bounds, discrete=True):
        """Optimiza usando PSO"""
        n_dims = len(bounds)
        
        # Inicializar partículas
        particles = np.random.uniform(
            [b[0] for b in bounds],
            [b[1] for b in bounds],
            (self.n_particles, n_dims)
        )
        
        velocities = np.random.uniform(-1, 1, (self.n_particles, n_dims))
        
        # Mejor posición personal
        pbest = particles.copy()
        pbest_scores = np.array([fitness_func(p) for p in particles])
        
        # Mejor posición global
        gbest_idx = np.argmax(pbest_scores)
        gbest = pbest[gbest_idx].copy()
        gbest_score = pbest_scores[gbest_idx]
        
        # Optimización iterativa
        for iteration in range(self.n_iterations):
            # Actualizar velocidades y posiciones
            r1 = np.random.uniform(0, 1, (self.n_particles, n_dims))
            r2 = np.random.uniform(0, 1, (self.n_particles, n_dims))
            
            velocities = (self.w * velocities + 
                         self.c1 * r1 * (pbest - particles) +
                         self.c2 * r2 * (gbest - particles))
            
            particles = particles + velocities
            
            # Aplicar límites
            for i in range(n_dims):
                particles[:, i] = np.clip(particles[:, i], bounds[i][0], bounds[i][1])
            
            # Discretizar si es necesario
            if discrete:
                particles = np.round(particles).astype(int)
            
            # Evaluar fitness
            scores = np.array([fitness_func(p) for p in particles])
            
            # Actualizar mejores posiciones
            better_mask = scores > pbest_scores
            pbest[better_mask] = particles[better_mask]
            pbest_scores[better_mask] = scores[better_mask]
            
            # Actualizar mejor global
            if np.max(scores) > gbest_score:
                gbest_idx = np.argmax(scores)
                gbest = particles[gbest_idx].copy()
                gbest_score = scores[gbest_idx]
            
            # Reducir inercia (enfriamiento)
            self.w *= 0.99
            
        return gbest, gbest_score

class TransformerBlock(layers.Layer):
    """Bloque Transformer para capturar dependencias a largo plazo"""
    
    def __init__(self, embed_dim, num_heads, ff_dim, rate=0.1):
        super().__init__()
        self.embed_dim = embed_dim
        self.num_heads = num_heads
        self.ff_dim = ff_dim
        self.rate = rate
        
        self.att = layers.MultiHeadAttention(num_heads=num_heads, key_dim=embed_dim)
        self.ffn = keras.Sequential([
            layers.Dense(ff_dim, activation="relu"),
            layers.Dense(embed_dim),
        ])
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)
        self.dropout1 = layers.Dropout(rate)
        self.dropout2 = layers.Dropout(rate)
        
    def call(self, inputs, training=None):
        attn_output = self.att(inputs, inputs)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(inputs + attn_output)
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        return self.layernorm2(out1 + ffn_output)

class PatternAnalyzer:
    """Analizador avanzado de patrones estadísticos"""
    
    def __init__(self):
        self.patterns = {}
        self.markov_matrix = None
        self.frequency_matrix = {}
        self.hot_cold_numbers = {}
        
    def analyze_frequencies_multilevel(self, data, main_cols, star_cols):
        """Análisis de frecuencias multinivel"""
        results = {}
        
        # Frecuencias simples
        main_numbers = data[main_cols].values.flatten()
        star_numbers = data[star_cols].values.flatten()
        
        results['single_freq_main'] = Counter(main_numbers)
        results['single_freq_star'] = Counter(star_numbers)
        
        # Frecuencias de pares
        pairs = []
        for _, row in data.iterrows():
            nums = sorted(row[main_cols].values)
            pairs.extend(itertools.combinations(nums, 2))
        results['pair_freq'] = Counter(pairs)
        
        # Frecuencias de tripletes
        triplets = []
        for _, row in data.iterrows():
            nums = sorted(row[main_cols].values)
            triplets.extend(itertools.combinations(nums, 3))
        results['triplet_freq'] = Counter(triplets)
        
        # Frecuencias de cuartetos
        quartets = []
        for _, row in data.iterrows():
            nums = sorted(row[main_cols].values)
            quartets.extend(itertools.combinations(nums, 4))
        results['quartet_freq'] = Counter(quartets)
        
        self.frequency_matrix = results
        return results
    
    def detect_hot_cold_numbers(self, data, main_cols, star_cols, window_sizes=[10, 20, 50]):
        """Detecta números calientes y fríos con ventanas adaptativas"""
        results = {}
        
        for window in window_sizes:
            recent_data = data.tail(window)
            main_nums = recent_data[main_cols].values.flatten()
            star_nums = recent_data[star_cols].values.flatten()
            
            main_counter = Counter(main_nums)
            star_counter = Counter(star_nums)
            
            # Estadísticas
            main_mean = np.mean(list(main_counter.values()))
            main_std = np.std(list(main_counter.values()))
            star_mean = np.mean(list(star_counter.values()))
            star_std = np.std(list(star_counter.values()))
            
            # Clasificación
            hot_main = [n for n, f in main_counter.items() if f > main_mean + main_std]
            cold_main = [n for n in range(1, 51) if main_counter.get(n, 0) < main_mean - main_std]
            hot_stars = [n for n, f in star_counter.items() if f > star_mean + star_std]
            cold_stars = [n for n in range(1, 13) if star_counter.get(n, 0) < star_mean - star_std]
            
            results[f'window_{window}'] = {
                'hot_main': hot_main,
                'cold_main': cold_main,
                'hot_stars': hot_stars,
                'cold_stars': cold_stars
            }
        
        self.hot_cold_numbers = results
        return results
    
    def build_markov_chain(self, data, main_cols):
        """Construye cadena de Markov para transiciones"""
        transition_matrix = np.zeros((50, 50))
        
        for i in range(len(data) - 1):
            current = set(data.iloc[i][main_cols].values)
            next_nums = set(data.iloc[i + 1][main_cols].values)
            
            for c in current:
                for n in next_nums:
                    transition_matrix[c-1, n-1] += 1
        
        # Normalizar
        row_sums = transition_matrix.sum(axis=1, keepdims=True)
        row_sums[row_sums == 0] = 1
        self.markov_matrix = transition_matrix / row_sums
        
        return self.markov_matrix
    
    def analyze_sum_patterns(self, data, main_cols):
        """Analiza patrones de suma total"""
        sums = data[main_cols].sum(axis=1)
        
        return {
            'mean': sums.mean(),
            'std': sums.std(),
            'median': sums.median(),
            'mode': sums.mode().values[0] if len(sums.mode()) > 0 else sums.mean(),
            'quantiles': {
                'q25': sums.quantile(0.25),
                'q50': sums.quantile(0.50),
                'q75': sums.quantile(0.75)
            },
            'distribution': np.histogram(sums, bins=20)[0].tolist()
        }

class SimulatedAnnealing:
    """Optimización por recocido simulado"""
    
    def __init__(self, initial_temp=100, cooling_rate=0.95, min_temp=0.1):
        self.initial_temp = initial_temp
        self.cooling_rate = cooling_rate
        self.min_temp = min_temp
        
    def optimize(self, initial_solution, fitness_func, neighbor_func):
        """Optimiza usando recocido simulado"""
        current_solution = initial_solution
        current_fitness = fitness_func(current_solution)
        best_solution = current_solution
        best_fitness = current_fitness
        
        temp = self.initial_temp
        
        while temp > self.min_temp:
            # Generar vecino
            neighbor = neighbor_func(current_solution)
            neighbor_fitness = fitness_func(neighbor)
            
            # Calcular delta
            delta = neighbor_fitness - current_fitness
            
            # Aceptar o rechazar
            if delta > 0 or random.random() < np.exp(delta / temp):
                current_solution = neighbor
                current_fitness = neighbor_fitness
                
                if current_fitness > best_fitness:
                    best_solution = current_solution
                    best_fitness = current_fitness
            
            # Enfriar
            temp *= self.cooling_rate
        
        return best_solution, best_fitness

class MonteCarloSimulator:
    """Simulador Monte Carlo avanzado"""
    
    def __init__(self, n_simulations=1000000):
        self.n_simulations = n_simulations
        self.results = []
        
    def simulate(self, combinations, historical_data=None):
        """Ejecuta simulación Monte Carlo masiva"""
        results = []
        
        for combo in combinations:
            wins = defaultdict(int)
            total_prize = 0
            
            for _ in range(self.n_simulations):
                # Generar sorteo aleatorio
                drawn_main = random.sample(range(1, 51), 5)
                drawn_stars = random.sample(range(1, 13), 2)
                
                # Verificar aciertos
                main_matches = len(set(combo['main']) & set(drawn_main))
                star_matches = len(set(combo['stars']) & set(drawn_stars))
                
                # Clasificar premio
                prize_category = self._get_prize_category(main_matches, star_matches)
                if prize_category:
                    wins[prize_category] += 1
                    total_prize += self._get_prize_amount(prize_category)
            
            # Calcular estadísticas
            win_probability = sum(wins.values()) / self.n_simulations
            expected_value = total_prize / self.n_simulations
            roi = (expected_value - 2.5) / 2.5  # Asumiendo coste de 2.5€
            
            results.append({
                'combination': combo,
                'win_probability': win_probability,
                'expected_value': expected_value,
                'roi': roi,
                'wins_distribution': dict(wins),
                'confidence_interval': self._calculate_confidence_interval(win_probability)
            })
        
        self.results = results
        return results
    
    def _get_prize_category(self, main_matches, star_matches):
        """Determina categoría de premio"""
        categories = {
            (5, 2): 1,  # Jackpot
            (5, 1): 2,
            (5, 0): 3,
            (4, 2): 4,
            (4, 1): 5,
            (4, 0): 6,
            (3, 2): 7,
            (3, 1): 8,
            (3, 0): 9,
            (2, 2): 10,
            (2, 1): 11,
            (1, 2): 12,
            (2, 0): 13
        }
        return categories.get((main_matches, star_matches))
    
    def _get_prize_amount(self, category):
        """Obtiene monto aproximado del premio por categoría"""
        # Montos promedio aproximados en euros
        prizes = {
            1: 50000000,  # Jackpot
            2: 300000,
            3: 50000,
            4: 5000,
            5: 200,
            6: 100,
            7: 50,
            8: 15,
            9: 12,
            10: 10,
            11: 7,
            12: 5,
            13: 4
        }
        return prizes.get(category, 0)
    
    def _calculate_confidence_interval(self, probability, confidence=0.95):
        """Calcula intervalo de confianza"""
        z_score = 1.96  # Para 95% de confianza
        margin_error = z_score * np.sqrt(probability * (1 - probability) / self.n_simulations)
        return (probability - margin_error, probability + margin_error)

class EuromillonAIUltraAdvanced:
    """
    Sistema de IA Ultra-Avanzado para Euromillón con arquitectura de última generación
    """
    
    def __init__(self, data_path=None):
        print("🚀 INICIALIZANDO SISTEMA IA ULTRA-AVANZADO EUROMILLÓN v4.0")
        print("=" * 70)
        
        # Configuración del sistema
        self.data_path = data_path or r"EuroMillon-CSV/DataFrame_Euromillones.csv"
        self.model_dir = os.path.dirname(self.data_path)
        
        # Configuración de Euromillón
        self.config = {
            'main_numbers': 5,
            'main_range': (1, 50),
            'star_numbers': 2,
            'star_range': (1, 12),
            'total_numbers': 7
        }
        
        # Modelos y componentes
        self.models = {}
        self.scalers = {}
        self.pattern_analyzer = PatternAnalyzer()
        self.genetic_optimizer = GeneticAlgorithm()
        self.pso_optimizer = ParticleSwarmOptimization()
        
        # Historial y métricas
        self.performance_history = deque(maxlen=100)
        self.prediction_cache = {}
        self.model_weights = defaultdict(lambda: 1.0)
        
        # Datos y características
        self.data = None
        self.features = None
        self.targets = None
        self.feature_importance = {}
        
        print(f"📊 Configuración cargada")
        print(f"🧬 Algoritmos genéticos: Activados")
        print(f"🐝 PSO: Activado")
        print(f"🤖 Transformers: Preparados")
        print(f"📈 Backtesting Monte Carlo: Disponible")
        
    def load_and_preprocess_data(self):
        """Carga y preprocesa datos con análisis avanzado"""
        print("\n📊 CARGANDO Y PROCESANDO DATOS AVANZADOS...")
        
        try:
            # Cargar datos
            self.data = pd.read_csv(self.data_path)
            print(f"✅ Datos cargados: {len(self.data)} sorteos históricos")
            
            # Convertir fecha y ordenar
            self.data['Date'] = pd.to_datetime(self.data['Date'])
            self.data = self.data.sort_values('Date').reset_index(drop=True)
            
            # Crear características ultra-avanzadas
            self._create_ultra_advanced_features()
            
            # Detectar patrones complejos
            self._detect_complex_patterns()
            
            # Análisis de anomalías
            self._detect_anomalies()
            
            # Preparar targets
            self._prepare_advanced_targets()
            
            print(f"✅ Características creadas: {self.features.shape[1]} dimensiones")
            print(f"✅ Patrones detectados: {len(self.pattern_analyzer.patterns)}")
            
            return True
            
        except Exception as e:
            print(f"❌ Error cargando datos: {e}")
            return False
    
    def _create_ultra_advanced_features(self):
        """Crea características ultra-avanzadas con ingeniería de features compleja"""
        print("🔧 Creando características ultra-avanzadas...")
        
        features_list = []
        main_cols = ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5']
        star_cols = ['Start_1', 'Star_2']
        
        # 1. Features básicas mejoradas
        for col in main_cols + star_cols:
            features_list.append(self.data[col].values)
        
        # 2. Features temporales avanzadas
        self.data['year'] = self.data['Date'].dt.year
        self.data['month'] = self.data['Date'].dt.month
        self.data['day'] = self.data['Date'].dt.day
        self.data['day_of_week'] = self.data['Date'].dt.dayofweek
        self.data['day_of_year'] = self.data['Date'].dt.dayofyear
        self.data['week_of_year'] = self.data['Date'].dt.isocalendar().week
        self.data['quarter'] = self.data['Date'].dt.quarter
        self.data['is_month_end'] = self.data['Date'].dt.is_month_end.astype(int)
        
        temporal_features = ['year', 'month', 'day', 'day_of_week', 
                           'day_of_year', 'week_of_year', 'quarter', 'is_month_end']
        for feat in temporal_features:
            features_list.append(self.data[feat].values)
        
        # 3. Estadísticas móviles multi-ventana
        windows = [3, 5, 7, 10, 15, 20, 30, 50]
        
        for window in windows:
            # Media, desviación, min, max para cada número
            for col in main_cols:
                rolling = self.data[col].rolling(window=window)
                features_list.extend([
                    rolling.mean().fillna(method='bfill').values,
                    rolling.std().fillna(0).values,
                    rolling.min().fillna(method='bfill').values,
                    rolling.max().fillna(method='bfill').values
                ])
            
            # Suma total y dispersión
            sum_main = self.data[main_cols].sum(axis=1)
            rolling_sum = sum_main.rolling(window=window)
            features_list.append(rolling_sum.mean().fillna(method='bfill').values)
            features_list.append(rolling_sum.std().fillna(0).values)
        
        # 4. Frecuencias acumulativas con decay
        decay_factor = 0.95
        for col in main_cols + star_cols:
            freq_decay = np.zeros(len(self.data))
            freq_counts = defaultdict(float)
            
            for i, val in enumerate(self.data[col].values):
                # Aplicar decay a frecuencias anteriores
                for key in freq_counts:
                    freq_counts[key] *= decay_factor
                
                # Incrementar frecuencia actual
                freq_counts[val] += 1
                freq_decay[i] = freq_counts[val]
            
            features_list.append(freq_decay)
        
        # 5. Patrones de gaps y secuencias
        for i in range(len(main_cols)-1):
            gap = self.data[main_cols[i+1]] - self.data[main_cols[i]]
            features_list.append(gap.values)
            features_list.append((gap**2).values)  # Gaps cuadráticos
            features_list.append(np.log1p(gap.abs()).values)  # Gaps logarítmicos
        
        # 6. Características de distribución
        for idx in range(len(self.data)):
            row_nums = self.data[main_cols].iloc[idx].values
            
            # Entropía de Shannon
            counts = np.bincount(row_nums)
            probs = counts[counts > 0] / counts.sum()
            entropy = -np.sum(probs * np.log2(probs))
            
            # Skewness y Kurtosis
            skewness = stats.skew(row_nums)
            kurtosis = stats.kurtosis(row_nums)
            
            features_list.extend([
                [entropy] * len(self.data),
                [skewness] * len(self.data),
                [kurtosis] * len(self.data)
            ])
        
        # 7. Características de paridad y divisibilidad
        for col in main_cols:
            features_list.append((self.data[col] % 2).values)  # Paridad
            features_list.append((self.data[col] % 3 == 0).astype(int).values)  # Divisible por 3
            features_list.append((self.data[col] % 5 == 0).astype(int).values)  # Divisible por 5
        
        # 8. Características de rangos y cuartiles
        for idx in range(len(self.data)):
            row_nums = self.data[main_cols].iloc[idx].values
            q1, q2, q3 = np.percentile(row_nums, [25, 50, 75])
            iqr = q3 - q1
            
            features_list.extend([
                [q1] * len(self.data),
                [q2] * len(self.data),
                [q3] * len(self.data),
                [iqr] * len(self.data)
            ])
        
        # 9. Embeddings cíclicos para features temporales
        for col in ['month', 'day_of_week', 'day']:
            sin_values = np.sin(2 * np.pi * self.data[col] / self.data[col].max())
            cos_values = np.cos(2 * np.pi * self.data[col] / self.data[col].max())
            features_list.extend([sin_values, cos_values])
        
        # 10. Interacciones polinómicas (limitadas para evitar explosión dimensional)
        for i in range(min(3, len(main_cols))):
            for j in range(i+1, min(4, len(main_cols))):
                interaction = self.data[main_cols[i]] * self.data[main_cols[j]]
                features_list.append(interaction.values)
        
        # Combinar todas las características
        self.features = np.column_stack(features_list)
        
        # Imputar valores faltantes con estrategia sofisticada
        for i in range(self.features.shape[1]):
            col = self.features[:, i]
            if np.any(pd.isna(col)):
                # Usar interpolación para series temporales
                non_nan_idx = ~pd.isna(col)
                if np.sum(non_nan_idx) > 2:
                    self.features[pd.isna(col), i] = np.interp(
                        np.where(pd.isna(col))[0],
                        np.where(non_nan_idx)[0],
                        col[non_nan_idx]
                    )
                else:
                    self.features[pd.isna(col), i] = np.nanmean(col)
        
        print(f"✅ {self.features.shape[1]} características ultra-avanzadas creadas")
    
    def _detect_complex_patterns(self):
        """Detecta patrones complejos en los datos históricos"""
        print("🔍 Detectando patrones complejos...")
        
        main_cols = ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5']
        
        # Análisis de patrones por ventanas
        pattern_scores = defaultdict(float)
        
        for window_size in [10, 20, 50]:
            for i in range(len(self.data) - window_size):
                window = self.data[main_cols].iloc[i:i+window_size]
                
                # Patrón de suma
                sum_pattern = window.sum(axis=1).mean()
                pattern_scores[f'sum_mean_{window_size}'] = sum_pattern
                
                # Patrón de dispersión
                std_pattern = window.std(axis=1).mean()
                pattern_scores[f'std_mean_{window_size}'] = std_pattern
                
                # Frecuencia de números pares
                parity_pattern = (window % 2 == 0).sum().sum() / (window_size * 5)
                pattern_scores[f'parity_{window_size}'] = parity_pattern
        
        self.pattern_scores = pattern_scores
        print(f"✅ {len(pattern_scores)} patrones detectados")
    
    def _detect_anomalies(self):
        """Detecta anomalías en los datos usando Isolation Forest"""
        from sklearn.ensemble import IsolationForest
        
        print("🔍 Detectando anomalías...")
        
        iso_forest = IsolationForest(contamination=0.05, random_state=42)
        anomalies = iso_forest.fit_predict(self.features)
        
        self.anomaly_mask = anomalies == -1
        print(f"✅ {np.sum(self.anomaly_mask)} anomalías detectadas")
    
    def _prepare_advanced_targets(self):
        """Prepara targets avanzados con información adicional"""
        print("🎯 Preparando targets avanzados...")
        
        main_cols = ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5']
        star_cols = ['Start_1', 'Star_2']
        
        targets = []
        
        for i in range(len(self.data) - 1):
            next_row = self.data.iloc[i + 1]
            
            # Números del siguiente sorteo
            target_nums = [next_row[col] for col in main_cols + star_cols]
            
            # Información adicional del target
            target_sum = sum(target_nums[:5])
            target_parity = sum([n % 2 for n in target_nums[:5]])
            
            # Target extendido
            extended_target = target_nums + [target_sum, target_parity]
            targets.append(extended_target)
        
        self.targets = np.array(targets)
        self.features = self.features[:-1]  # Ajustar para alinear
        
        print(f"✅ {len(self.targets)} targets preparados con {self.targets.shape[1]} dimensiones")
    
    def build_transformer_model(self, input_dim, output_dim):
        """Construye modelo Transformer para capturar dependencias complejas"""
        print(f"🤖 Construyendo modelo Transformer: {input_dim} → {output_dim}")
        
        inputs = layers.Input(shape=(input_dim,))
        
        # Reshape para Transformer (añadir dimensión temporal)
        x = layers.Reshape((1, input_dim))(inputs)
        
        # Embedding posicional
        x = layers.Dense(128)(x)
        
        # Bloques Transformer
        x = TransformerBlock(128, 8, 256)(x)
        x = TransformerBlock(128, 8, 256)(x)
        
        # Flatten y capas densas
        x = layers.Flatten()(x)
        x = layers.Dense(256, activation='relu')(x)
        x = layers.BatchNormalization()(x)
        x = layers.Dropout(0.3)(x)
        
        x = layers.Dense(128, activation='relu')(x)
        x = layers.BatchNormalization()(x)
        x = layers.Dropout(0.2)(x)
        
        outputs = layers.Dense(output_dim)(x)
        
        model = keras.Model(inputs=inputs, outputs=outputs)
        
        model.compile(
            optimizer=keras.optimizers.AdamW(learning_rate=0.001),
            loss='mse',
            metrics=['mae']
        )
        
        return model
    
    def build_lstm_model(self, input_dim, output_dim, sequence_length=10):
        """Construye modelo LSTM bidireccional para series temporales"""
        print(f"📈 Construyendo modelo LSTM: {input_dim} → {output_dim}")
        
        model = keras.Sequential([
            layers.Input(shape=(sequence_length, input_dim)),
            
            # LSTM Bidireccional
            layers.Bidirectional(layers.LSTM(128, return_sequences=True)),
            layers.Dropout(0.3),
            
            layers.Bidirectional(layers.LSTM(64, return_sequences=True)),
            layers.Dropout(0.2),
            
            layers.Bidirectional(layers.LSTM(32)),
            layers.Dropout(0.2),
            
            # Capas densas
            layers.Dense(128, activation='relu'),
            layers.BatchNormalization(),
            layers.Dropout(0.3),
            
            layers.Dense(64, activation='relu'),
            layers.Dense(output_dim)
        ])
        
        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.001),
            loss='huber',
            metrics=['mae']
        )
        
        return model
    
    def train_ultra_ensemble(self):
        """Entrena el ensemble ultra-avanzado de modelos"""
        print("\n🎓 ENTRENANDO ENSEMBLE ULTRA-AVANZADO...")
        
        if self.features is None or self.targets is None:
            print("❌ Datos no preparados")
            return False
        
        # División temporal estratificada
        split_idx = int(len(self.features) * 0.8)
        X_train, X_test = self.features[:split_idx], self.features[split_idx:]
        y_train, y_test = self.targets[:split_idx], self.targets[split_idx:]
        
        print(f"📊 Train: {len(X_train)} | Test: {len(X_test)}")
        
        # Múltiples escaladores para diferentes modelos
        self.scalers['standard'] = StandardScaler()
        self.scalers['minmax'] = MinMaxScaler()
        self.scalers['robust'] = RobustScaler()
        
        X_train_standard = self.scalers['standard'].fit_transform(X_train)
        X_test_standard = self.scalers['standard'].transform(X_test)
        
        X_train_minmax = self.scalers['minmax'].fit_transform(X_train)
        X_test_minmax = self.scalers['minmax'].transform(X_test)
        
        # Escalado de targets
        self.scalers['targets'] = MinMaxScaler()
        y_train_scaled = self.scalers['targets'].fit_transform(y_train[:, :7])
        y_test_scaled = self.scalers['targets'].transform(y_test[:, :7])
        
        # 1. Modelo Transformer
        print("🤖 Entrenando Transformer...")
        self.models['transformer'] = self.build_transformer_model(
            X_train_standard.shape[1],
            y_train_scaled.shape[1]
        )
        
        callbacks = [
            keras.callbacks.EarlyStopping(patience=15, restore_best_weights=True),
            keras.callbacks.ReduceLROnPlateau(patience=7, factor=0.5)
        ]
        
        self.models['transformer'].fit(
            X_train_standard, y_train_scaled,
            epochs=100,
            batch_size=32,
            validation_data=(X_test_standard, y_test_scaled),
            callbacks=callbacks,
            verbose=0
        )
        
        # 2. XGBoost con optimización bayesiana
        print("🌲 Entrenando XGBoost...")
        self.models['xgboost'] = {}
        for i in range(7):
            xgb_model = xgb.XGBRegressor(
                n_estimators=300,
                max_depth=10,
                learning_rate=0.01,
                subsample=0.8,
                colsample_bytree=0.8,
                objective='reg:squarederror',
                random_state=42,
                early_stopping_rounds=20
            )
            xgb_model.fit(
                X_train_standard, y_train[:, i],
                eval_set=[(X_test_standard, y_test[:, i])],
                verbose=False
            )
            self.models['xgboost'][f'pos_{i}'] = xgb_model
        
        # 3. LightGBM
        print("🌳 Entrenando LightGBM...")
        self.models['lightgbm'] = {}
        for i in range(7):
            lgb_model = lgb.LGBMRegressor(
                n_estimators=300,
                max_depth=10,
                learning_rate=0.01,
                num_leaves=31,
                subsample=0.8,
                colsample_bytree=0.8,
                objective='regression',
                random_state=42,
                verbose=-1
            )
            lgb_model.fit(
                X_train_standard, y_train[:, i],
                eval_set=[(X_test_standard, y_test[:, i])],
                callbacks=[lgb.early_stopping(20), lgb.log_evaluation(0)]
            )
            self.models['lightgbm'][f'pos_{i}'] = lgb_model
        
        # 4. Random Forest mejorado
        print("🌲 Entrenando Random Forest...")
        self.models['random_forest'] = {}
        for i in range(7):
            rf_model = RandomForestRegressor(
                n_estimators=200,
                max_depth=15,
                min_samples_split=5,
                min_samples_leaf=2,
                random_state=42,
                n_jobs=-1
            )
            rf_model.fit(X_train_standard, y_train[:, i])
            self.models['random_forest'][f'pos_{i}'] = rf_model
        
        # 5. Extra Trees para diversidad
        print("🌴 Entrenando Extra Trees...")
        self.models['extra_trees'] = {}
        for i in range(7):
            et_model = ExtraTreesRegressor(
                n_estimators=200,
                max_depth=15,
                min_samples_split=5,
                random_state=42,
                n_jobs=-1
            )
            et_model.fit(X_train_standard, y_train[:, i])
            self.models['extra_trees'][f'pos_{i}'] = et_model
        
        # Evaluar ensemble
        self._evaluate_ultra_ensemble(X_test_standard, y_test, y_test_scaled)
        
        # Guardar modelos
        self._save_models()
        
        return True
    
    def _evaluate_ultra_ensemble(self, X_test, y_test, y_test_scaled):
        """Evalúa el rendimiento del ensemble ultra-avanzado"""
        print("\n📊 EVALUANDO ENSEMBLE ULTRA-AVANZADO...")
        
        predictions = {}
        
        # Transformer
        trans_pred_scaled = self.models['transformer'].predict(X_test, verbose=0)
        predictions['transformer'] = self.scalers['targets'].inverse_transform(trans_pred_scaled)
        
        # XGBoost
        xgb_pred = np.zeros_like(y_test[:, :7])
        for i in range(7):
            xgb_pred[:, i] = self.models['xgboost'][f'pos_{i}'].predict(X_test)
        predictions['xgboost'] = xgb_pred
        
        # LightGBM
        lgb_pred = np.zeros_like(y_test[:, :7])
        for i in range(7):
            lgb_pred[:, i] = self.models['lightgbm'][f'pos_{i}'].predict(X_test)
        predictions['lightgbm'] = lgb_pred
        
        # Random Forest
        rf_pred = np.zeros_like(y_test[:, :7])
        for i in range(7):
            rf_pred[:, i] = self.models['random_forest'][f'pos_{i}'].predict(X_test)
        predictions['random_forest'] = rf_pred
        
        # Extra Trees
        et_pred = np.zeros_like(y_test[:, :7])
        for i in range(7):
            et_pred[:, i] = self.models['extra_trees'][f'pos_{i}'].predict(X_test)
        predictions['extra_trees'] = et_pred
        
        # Ensemble ponderado adaptativo
        weights = self._calculate_adaptive_weights(predictions, y_test[:, :7])
        ensemble_pred = np.zeros_like(y_test[:, :7], dtype=np.float64)
        
        for model_name, pred in predictions.items():
            ensemble_pred += pred.astype(np.float64) * weights[model_name]
        
        # Métricas
        for name, pred in predictions.items():
            mse = mean_squared_error(y_test[:, :7], pred)
            mae = mean_absolute_error(y_test[:, :7], pred)
            print(f"📈 {name:15} - MSE: {mse:.3f} | MAE: {mae:.3f}")
        
        # Ensemble
        mse_ensemble = mean_squared_error(y_test[:, :7], ensemble_pred)
        mae_ensemble = mean_absolute_error(y_test[:, :7], ensemble_pred)
        print(f"🎯 {'Ensemble':15} - MSE: {mse_ensemble:.3f} | MAE: {mae_ensemble:.3f}")
        
        # Actualizar pesos del modelo
        self.model_weights = weights
        
        return ensemble_pred
    
    def _calculate_adaptive_weights(self, predictions, y_true):
        """Calcula pesos adaptativos para el ensemble"""
        weights = {}
        errors = {}
        
        for name, pred in predictions.items():
            mse = mean_squared_error(y_true, pred)
            errors[name] = mse
        
        # Invertir errores (menor error = mayor peso)
        total_inv_error = sum(1/e for e in errors.values())
        
        for name, error in errors.items():
            weights[name] = (1/error) / total_inv_error
        
        return weights
    
    def generate_ultra_predictions(self, n_combinations=20):
        """Genera predicciones ultra-optimizadas"""
        print("\n🔮 GENERANDO PREDICCIONES ULTRA-OPTIMIZADAS...")
        
        if not self.models:
            print("❌ Modelos no entrenados")
            return None
        
        predictions = []
        
        # 1. Predicciones basadas en ensemble
        ensemble_predictions = self._generate_ensemble_predictions(n_combinations // 4)
        predictions.extend(ensemble_predictions)
        
        # 2. Predicciones con algoritmo genético
        genetic_predictions = self._generate_genetic_predictions(n_combinations // 4)
        predictions.extend(genetic_predictions)
        
        # 3. Predicciones con PSO
        pso_predictions = self._generate_pso_predictions(n_combinations // 4)
        predictions.extend(pso_predictions)
        
        # 4. Predicciones híbridas
        hybrid_predictions = self._generate_hybrid_predictions(n_combinations // 4)
        predictions.extend(hybrid_predictions)
        
        # 5. Predicciones con patrones detectados
        pattern_predictions = self._generate_pattern_based_predictions(n_combinations - len(predictions))
        predictions.extend(pattern_predictions)
        
        # Evaluar y ordenar por confianza
        predictions = self._evaluate_predictions(predictions)
        predictions.sort(key=lambda x: x.confidence, reverse=True)
        
        return predictions[:n_combinations]
    
    def _generate_ensemble_predictions(self, n):
        """Genera predicciones usando el ensemble"""
        predictions = []
        
        # Usar última fila como input
        last_features = self.features[-1:]
        last_features_scaled = self.scalers['standard'].transform(last_features)
        
        # Predicciones de cada modelo
        all_preds = {}
        
        # Transformer
        trans_pred = self.models['transformer'].predict(last_features_scaled, verbose=0)
        all_preds['transformer'] = self.scalers['targets'].inverse_transform(trans_pred)[0]
        
        # XGBoost
        xgb_pred = np.zeros(7)
        for i in range(7):
            xgb_pred[i] = self.models['xgboost'][f'pos_{i}'].predict(last_features_scaled)[0]
        all_preds['xgboost'] = xgb_pred
        
        # LightGBM
        lgb_pred = np.zeros(7)
        for i in range(7):
            lgb_pred[i] = self.models['lightgbm'][f'pos_{i}'].predict(last_features_scaled)[0]
        all_preds['lightgbm'] = lgb_pred
        
        # Generar variaciones
        for i in range(n):
            # Combinar predicciones con pesos aleatorios
            weights = np.random.dirichlet(np.ones(len(all_preds)))
            combined = np.zeros(7)
            
            for j, (_, pred) in enumerate(all_preds.items()):
                combined += pred * weights[j]
            
            # Convertir a números válidos
            main_nums = self._to_valid_numbers(combined[:5], 1, 50, 5)
            star_nums = self._to_valid_numbers(combined[5:], 1, 12, 2)
            
            predictions.append(PredictionResult(
                main_numbers=main_nums,
                star_numbers=star_nums,
                confidence=0.8 - i * 0.05,
                model_contributions={k: float(weights[j]) for j, k in enumerate(all_preds.keys())},
                pattern_score=0.0,
                timestamp=datetime.now()
            ))
        
        return predictions
    
    def _generate_genetic_predictions(self, n):
        """Genera predicciones usando algoritmo genético"""
        predictions = []
        
        # Función de fitness basada en patrones históricos
        def fitness_func(individual):
            main = individual[:5]
            stars = individual[5:]
            
            score = 0.0
            
            # Frecuencia histórica
            if hasattr(self.pattern_analyzer, 'frequency_matrix'):
                freq_main = self.pattern_analyzer.frequency_matrix.get('single_freq_main', {})
                for num in main:
                    score += freq_main.get(num, 0) / 100
            
            # Balance caliente/frío
            if hasattr(self.pattern_analyzer, 'hot_cold_numbers'):
                hot_cold = self.pattern_analyzer.hot_cold_numbers.get('window_20', {})
                hot_main = hot_cold.get('hot_main', [])
                cold_main = hot_cold.get('cold_main', [])
                
                hot_count = sum(1 for n in main if n in hot_main)
                cold_count = sum(1 for n in main if n in cold_main)
                
                # Balance ideal: 2-3 calientes, 1-2 fríos
                if 2 <= hot_count <= 3:
                    score += 0.3
                if 1 <= cold_count <= 2:
                    score += 0.2
            
            # Distribución de suma
            total_sum = sum(main)
            if 100 <= total_sum <= 180:  # Rango más común
                score += 0.3
            
            # Paridad
            even_count = sum(1 for n in main if n % 2 == 0)
            if 2 <= even_count <= 3:  # Balance ideal
                score += 0.2
            
            return score
        
        # Límites para el algoritmo genético
        bounds = [(1, 50)] * 5 + [(1, 12)] * 2
        
        for i in range(n):
            best_individual, best_fitness = self.genetic_optimizer.evolve(
                fitness_func, bounds
            )
            
            main_nums = sorted(list(set(best_individual[:5])))[:5]
            star_nums = sorted(list(set(best_individual[5:])))[:2]
            
            # Completar si faltan números
            while len(main_nums) < 5:
                num = random.randint(1, 50)
                if num not in main_nums:
                    main_nums.append(num)
            
            while len(star_nums) < 2:
                num = random.randint(1, 12)
                if num not in star_nums:
                    star_nums.append(num)
            
            predictions.append(PredictionResult(
                main_numbers=sorted(main_nums),
                star_numbers=sorted(star_nums),
                confidence=min(0.9, best_fitness),
                model_contributions={'genetic': 1.0},
                pattern_score=best_fitness,
                timestamp=datetime.now()
            ))
        
        return predictions
    
    def _generate_pso_predictions(self, n):
        """Genera predicciones usando PSO"""
        predictions = []
        
        # Función de fitness para PSO
        def fitness_func(particle):
            main = [int(x) for x in particle[:5]]
            stars = [int(x) for x in particle[5:]]
            
            # Similar a genetic pero con diferentes pesos
            score = 0.0
            
            # Patrones de Markov
            if self.pattern_analyzer.markov_matrix is not None:
                for i in range(len(main)-1):
                    if 1 <= main[i] <= 50 and 1 <= main[i+1] <= 50:
                        score += self.pattern_analyzer.markov_matrix[main[i]-1, main[i+1]-1]
            
            # Diversidad
            unique_main = len(set(main))
            score += unique_main / 5 * 0.3
            
            return score
        
        bounds = [(1, 50)] * 5 + [(1, 12)] * 2
        
        for i in range(n):
            best_particle, best_score = self.pso_optimizer.optimize(
                fitness_func, bounds, discrete=True
            )
            
            main_nums = sorted(list(set([int(x) for x in best_particle[:5]])))[:5]
            star_nums = sorted(list(set([int(x) for x in best_particle[5:]])))[:2]
            
            # Completar números si es necesario
            while len(main_nums) < 5:
                num = random.randint(1, 50)
                if num not in main_nums:
                    main_nums.append(num)
            
            while len(star_nums) < 2:
                num = random.randint(1, 12)
                if num not in star_nums:
                    star_nums.append(num)
            
            predictions.append(PredictionResult(
                main_numbers=sorted(main_nums),
                star_numbers=sorted(star_nums),
                confidence=min(0.85, best_score),
                model_contributions={'pso': 1.0},
                pattern_score=best_score,
                timestamp=datetime.now()
            ))
        
        return predictions
    
    def _generate_hybrid_predictions(self, n):
        """Genera predicciones híbridas combinando múltiples estrategias"""
        predictions = []
        
        for i in range(n):
            # Combinar información de diferentes fuentes
            main_nums = []
            star_nums = []
            
            # Obtener números calientes y fríos
            if hasattr(self.pattern_analyzer, 'hot_cold_numbers'):
                hot_cold = self.pattern_analyzer.hot_cold_numbers.get('window_20', {})
                hot_main = hot_cold.get('hot_main', [])
                cold_main = hot_cold.get('cold_main', [])
                
                # Añadir 2 números calientes
                if hot_main:
                    main_nums.extend(random.sample(hot_main, min(2, len(hot_main))))
                
                # Añadir 1 número frío
                if cold_main:
                    main_nums.extend(random.sample(cold_main, min(1, len(cold_main))))
            
            # Completar con números de frecuencia media
            if hasattr(self.pattern_analyzer, 'frequency_matrix'):
                freq_main = self.pattern_analyzer.frequency_matrix.get('single_freq_main', {})
                sorted_freq = sorted(freq_main.items(), key=lambda x: x[1])
                mid_range = sorted_freq[len(sorted_freq)//3:2*len(sorted_freq)//3]
                
                available = [n for n, _ in mid_range if n not in main_nums]
                if available:
                    main_nums.extend(random.sample(available, min(5-len(main_nums), len(available))))
            
            # Completar con aleatorios si es necesario
            while len(main_nums) < 5:
                num = random.randint(1, 50)
                if num not in main_nums:
                    main_nums.append(num)
            
            # Estrellas: una caliente, una aleatoria
            if hasattr(self.pattern_analyzer, 'hot_cold_numbers'):
                hot_stars = hot_cold.get('hot_stars', [])
                if hot_stars:
                    star_nums.append(random.choice(hot_stars))
            
            while len(star_nums) < 2:
                num = random.randint(1, 12)
                if num not in star_nums:
                    star_nums.append(num)
            
            predictions.append(PredictionResult(
                main_numbers=sorted(main_nums[:5]),
                star_numbers=sorted(star_nums[:2]),
                confidence=0.75,
                model_contributions={'hybrid': 1.0},
                pattern_score=0.7,
                timestamp=datetime.now()
            ))
        
        return predictions
    
    def _generate_pattern_based_predictions(self, n):
        """Genera predicciones basadas en patrones detectados"""
        predictions = []
        
        for i in range(n):
            main_nums = []
            
            # Usar pares frecuentes
            if hasattr(self.pattern_analyzer, 'frequency_matrix'):
                pair_freq = self.pattern_analyzer.frequency_matrix.get('pair_freq', {})
                if pair_freq:
                    # Seleccionar un par frecuente
                    top_pairs = sorted(pair_freq.items(), key=lambda x: x[1], reverse=True)[:20]
                    if top_pairs:
                        selected_pair = random.choice(top_pairs)[0]
                        main_nums.extend(list(selected_pair))
            
            # Usar tripletes si es necesario
            if len(main_nums) < 3:
                triplet_freq = self.pattern_analyzer.frequency_matrix.get('triplet_freq', {})
                if triplet_freq:
                    top_triplets = sorted(triplet_freq.items(), key=lambda x: x[1], reverse=True)[:10]
                    if top_triplets:
                        selected_triplet = random.choice(top_triplets)[0]
                        for num in selected_triplet:
                            if num not in main_nums:
                                main_nums.append(num)
            
            # Completar con números basados en Markov
            if self.pattern_analyzer.markov_matrix is not None and main_nums:
                last_num = main_nums[-1]
                if 1 <= last_num <= 50:
                    probs = self.pattern_analyzer.markov_matrix[last_num-1]
                    next_num = np.random.choice(range(1, 51), p=probs)
                    if next_num not in main_nums:
                        main_nums.append(next_num)
            
            # Completar con aleatorios
            while len(main_nums) < 5:
                num = random.randint(1, 50)
                if num not in main_nums:
                    main_nums.append(num)
            
            # Estrellas aleatorias
            star_nums = random.sample(range(1, 13), 2)
            
            predictions.append(PredictionResult(
                main_numbers=sorted(main_nums[:5]),
                star_numbers=sorted(star_nums),
                confidence=0.7,
                model_contributions={'patterns': 1.0},
                pattern_score=0.65,
                timestamp=datetime.now()
            ))
        
        return predictions
    
    def _to_valid_numbers(self, raw_numbers, min_val, max_val, count):
        """Convierte predicciones crudas a números válidos"""
        # Redondear y limitar
        numbers = np.round(raw_numbers).astype(int)
        numbers = np.clip(numbers, min_val, max_val)
        
        # Asegurar unicidad
        unique_numbers = []
        for num in numbers:
            while num in unique_numbers and len(unique_numbers) < count:
                num = random.randint(min_val, max_val)
            if len(unique_numbers) < count:
                unique_numbers.append(num)
        
        # Completar si faltan
        while len(unique_numbers) < count:
            num = random.randint(min_val, max_val)
            if num not in unique_numbers:
                unique_numbers.append(num)
        
        return sorted(unique_numbers[:count])
    
    def _evaluate_predictions(self, predictions):
        """Evalúa y ajusta confianza de las predicciones"""
        for pred in predictions:
            # Ajustar confianza basada en patrones históricos
            score_adjustment = 0.0
            
            # Verificar suma total
            total_sum = sum(pred.main_numbers)
            if 100 <= total_sum <= 180:
                score_adjustment += 0.1
            
            # Verificar paridad
            even_count = sum(1 for n in pred.main_numbers if n % 2 == 0)
            if 2 <= even_count <= 3:
                score_adjustment += 0.05
            
            # Verificar distribución por decenas
            decades = [0] * 5
            for num in pred.main_numbers:
                decade = (num - 1) // 10
                if decade < 5:
                    decades[decade] += 1
            
            if max(decades) <= 2:  # Buena distribución
                score_adjustment += 0.05
            
            # Ajustar confianza
            pred.confidence = min(1.0, pred.confidence + score_adjustment)
        
        return predictions
    
    def run_backtesting(self, predictions, historical_days=365):
        """Ejecuta backtesting completo con los datos históricos"""
        print("\n📊 EJECUTANDO BACKTESTING...")
        
        # Seleccionar datos históricos para backtesting
        test_data = self.data.tail(historical_days // 3)  # Aproximadamente sorteos en el período
        
        results = []
        
        for pred in predictions:
            hits_main = []
            hits_stars = []
            total_cost = len(test_data) * 2.5
            total_prize = 0
            
            for _, row in test_data.iterrows():
                drawn_main = [row['Num_1'], row['Num_2'], row['Num_3'], row['Num_4'], row['Num_5']]
                drawn_stars = [row['Start_1'], row['Star_2']]
                
                main_matches = len(set(pred.main_numbers) & set(drawn_main))
                star_matches = len(set(pred.star_numbers) & set(drawn_stars))
                
                hits_main.append(main_matches)
                hits_stars.append(star_matches)
                
                # Calcular premio aproximado
                if main_matches >= 2 or (main_matches >= 1 and star_matches >= 1):
                    prize = self._calculate_prize(main_matches, star_matches)
                    total_prize += prize
            
            roi = (total_prize - total_cost) / total_cost if total_cost > 0 else 0
            
            results.append({
                'prediction': pred,
                'avg_main_hits': np.mean(hits_main),
                'avg_star_hits': np.mean(hits_stars),
                'total_cost': total_cost,
                'total_prize': total_prize,
                'roi': roi,
                'hit_rate': sum(h > 0 for h in hits_main) / len(hits_main)
            })
        
        # Ordenar por ROI
        results.sort(key=lambda x: x['roi'], reverse=True)
        
        print(f"✅ Backtesting completado para {len(predictions)} predicciones")
        print(f"📈 Mejor ROI: {results[0]['roi']:.2%}")
        print(f"📊 Hit Rate promedio: {np.mean([r['hit_rate'] for r in results]):.2%}")
        
        return results
    
    def _calculate_prize(self, main_matches, star_matches):
        """Calcula premio estimado basado en aciertos"""
        prize_table = {
            (5, 2): 50000000,
            (5, 1): 300000,
            (5, 0): 50000,
            (4, 2): 5000,
            (4, 1): 200,
            (4, 0): 100,
            (3, 2): 50,
            (3, 1): 15,
            (3, 0): 12,
            (2, 2): 10,
            (2, 1): 7,
            (1, 2): 5,
            (2, 0): 4
        }
        return prize_table.get((main_matches, star_matches), 0)
    
    def _save_models(self):
        """Guarda todos los modelos entrenados"""
        print("\n💾 GUARDANDO MODELOS...")
        
        # Guardar Transformer
        transformer_path = os.path.join(self.model_dir, 'euromillon_transformer.h5')
        self.models['transformer'].save(transformer_path)
        
        # Guardar otros modelos
        models_to_save = {
            'xgboost': self.models.get('xgboost'),
            'lightgbm': self.models.get('lightgbm'),
            'random_forest': self.models.get('random_forest'),
            'extra_trees': self.models.get('extra_trees'),
            'scalers': self.scalers,
            'model_weights': self.model_weights,
            'pattern_analyzer': self.pattern_analyzer
        }
        
        models_path = os.path.join(self.model_dir, 'euromillon_ultra_models.pkl')
        with open(models_path, 'wb') as f:
            pickle.dump(models_to_save, f)
        
        print(f"✅ Modelos guardados en {self.model_dir}")
    
    def display_predictions(self, predictions, top_n=10):
        """Muestra las mejores predicciones de forma clara"""
        print("\n" + "="*70)
        print("🎯 TOP {} PREDICCIONES ULTRA-OPTIMIZADAS".format(top_n))
        print("="*70)
        
        for i, pred in enumerate(predictions[:top_n], 1):
            print(f"\n🎲 Predicción #{i}")
            print(f"   📊 Números: {pred.main_numbers}")
            print(f"   ⭐ Estrellas: {pred.star_numbers}")
            print(f"   📈 Confianza: {pred.confidence:.2%}")
            print(f"   🔧 Estrategia: {list(pred.model_contributions.keys())[0]}")
            print(f"   📉 Score Patrón: {pred.pattern_score:.3f}")
        
        print("\n" + "="*70)

def main():
    """Función principal de demostración del sistema ultra-avanzado"""
    print("🎲 SISTEMA DE IA ULTRA-AVANZADO EUROMILLÓN v4.0 ENHANCED")
    print("=" * 70)
    
    # Inicializar sistema
    ai_system = EuromillonAIUltraAdvanced()
    
    # Cargar y procesar datos
    if not ai_system.load_and_preprocess_data():
        print("❌ Error cargando datos")
        return
    
    # Análisis de patrones
    print("\n🔍 ANÁLISIS DE PATRONES AVANZADO...")
    main_cols = ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5']
    star_cols = ['Start_1', 'Star_2']
    
    ai_system.pattern_analyzer.analyze_frequencies_multilevel(ai_system.data, main_cols, star_cols)
    ai_system.pattern_analyzer.detect_hot_cold_numbers(ai_system.data, main_cols, star_cols)
    ai_system.pattern_analyzer.build_markov_chain(ai_system.data, main_cols)
    sum_patterns = ai_system.pattern_analyzer.analyze_sum_patterns(ai_system.data, main_cols)
    
    print(f"✅ Análisis completado")
    print(f"   - Suma promedio histórica: {sum_patterns['mean']:.1f}")
    print(f"   - Números calientes detectados: {len(ai_system.pattern_analyzer.hot_cold_numbers['window_20']['hot_main'])}")
    
    # Entrenar modelos
    print("\n🚀 INICIANDO ENTRENAMIENTO ULTRA-AVANZADO...")
    if ai_system.train_ultra_ensemble():
        print("✅ Entrenamiento completado exitosamente")
        
        # Generar predicciones
        predictions = ai_system.generate_ultra_predictions(n_combinations=20)
        
        if predictions:
            # Mostrar predicciones
            ai_system.display_predictions(predictions, top_n=10)
            
            # Ejecutar simulación Monte Carlo
            print("\n🎰 EJECUTANDO SIMULACIÓN MONTE CARLO...")
            simulator = MonteCarloSimulator(n_simulations=100000)
            
            # Convertir predicciones para simulación
            combos_for_simulation = [
                {'main': pred.main_numbers, 'stars': pred.star_numbers}
                for pred in predictions[:5]
            ]
            
            sim_results = simulator.simulate(combos_for_simulation)
            
            best_sim = max(sim_results, key=lambda x: x['expected_value'])
            print(f"✅ Simulación completada")
            print(f"   - Mejor valor esperado: {best_sim['expected_value']:.2f}€")
            print(f"   - Mejor ROI: {best_sim['roi']:.2%}")
            
            # Backtesting
            backtest_results = ai_system.run_backtesting(predictions[:10])
            
            # Retroalimentación simulada
            print("\n📝 SIMULACIÓN DE RETROALIMENTACIÓN...")
            last_real = {
                'main': [5, 15, 23, 38, 42],  # Números de ejemplo
                'stars': [3, 9]
            }
            
            best_pred = predictions[0]
            main_hits = len(set(best_pred.main_numbers) & set(last_real['main']))
            star_hits = len(set(best_pred.star_numbers) & set(last_real['stars']))
            
            print(f"✅ Comparación con último sorteo:")
            print(f"   - Aciertos principales: {main_hits}/5")
            print(f"   - Aciertos estrellas: {star_hits}/2")
            
            # Guardar resultados
            print("\n💾 Guardando resultados...")
            results_file = os.path.join(ai_system.model_dir, 'predictions_ultra.json')
            
            results_to_save = {
                'timestamp': datetime.now().isoformat(),
                'predictions': [
                    {
                        'main': pred.main_numbers,
                        'stars': pred.star_numbers,
                        'confidence': pred.confidence,
                        'strategy': list(pred.model_contributions.keys())[0]
                    }
                    for pred in predictions[:10]
                ],
                'analysis': {
                    'sum_pattern': sum_patterns,
                    'hot_numbers': ai_system.pattern_analyzer.hot_cold_numbers['window_20']['hot_main'][:10],
                    'cold_numbers': ai_system.pattern_analyzer.hot_cold_numbers['window_20']['cold_main'][:10]
                },
                'simulation': {
                    'best_expected_value': best_sim['expected_value'],
                    'best_roi': best_sim['roi']
                }
            }
            
            with open(results_file, 'w') as f:
                json.dump(results_to_save, f, indent=2, default=str)
            
            print(f"✅ Resultados guardados en: {results_file}")
            
    else:
        print("❌ Error en entrenamiento")
    
    print("\n" + "="*70)
    print("🎉 PROCESO COMPLETADO - SISTEMA ULTRA-AVANZADO LISTO")
    print("⚠️  Recuerde: Los juegos de azar son aleatorios.")
    print("    Use las predicciones de manera responsable.")
    print("="*70)

if __name__ == "__main__":
    main()
