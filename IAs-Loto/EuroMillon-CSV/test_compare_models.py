#!/usr/bin/env python3
"""
Sistema de Testing y Comparación de Modelos EuroMillón
========================================================
Compara el rendimiento entre los modelos v2 y v3
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import time
import json
import os
import sys
from collections import Counter, defaultdict
import warnings
warnings.filterwarnings('ignore')

# Importar ambos modelos
try:
    # Renombrar temporalmente para evitar conflictos
    import importlib.util
    
    # Cargar modelo v2
    spec_v2 = importlib.util.spec_from_file_location(
        "euromillon_v2", 
        "euromillon-ai-enhanced-v2.py"
    )
    module_v2 = importlib.util.module_from_spec(spec_v2)
    spec_v2.loader.exec_module(module_v2)
    
    # Cargar modelo v3
    spec_v3 = importlib.util.spec_from_file_location(
        "euromillon_v3",
        "Ultra-Avanzada-ia-EuroMillón-v3.py"
    )
    module_v3 = importlib.util.module_from_spec(spec_v3)
    spec_v3.loader.exec_module(module_v3)
    
except Exception as e:
    print(f"Error importando modelos: {e}")
    sys.exit(1)

class ModelComparator:
    """Comparador avanzado de modelos de predicción"""
    
    def __init__(self, test_data_path="DataFrame_Euromillones.csv"):
        self.test_data_path = test_data_path
        self.model_v2 = None
        self.model_v3 = None
        self.results = {}
        self.metrics = {}
        
    def initialize_models(self):
        """Inicializa ambos modelos"""
        print("="*70)
        print("INICIALIZANDO MODELOS PARA COMPARACIÓN")
        print("="*70)
        
        # Inicializar v2
        print("\n📊 Inicializando Modelo v2 (Enhanced)...")
        try:
            self.model_v2 = module_v2.EuromillonAIUltraAdvanced(self.test_data_path)
            self.model_v2.load_and_preprocess_data()
            print("✅ Modelo v2 inicializado correctamente")
        except Exception as e:
            print(f"❌ Error en v2: {e}")
            
        # Inicializar v3
        print("\n📊 Inicializando Modelo v3 (Ultra Advanced)...")
        try:
            self.model_v3 = module_v3.EuroMillonUltraAdvancedV3(self.test_data_path)
            print("✅ Modelo v3 inicializado correctamente")
        except Exception as e:
            print(f"❌ Error en v3: {e}")
    
    def train_models(self, quick_mode=True):
        """Entrena ambos modelos"""
        print("\n" + "="*70)
        print("ENTRENANDO MODELOS")
        print("="*70)
        
        training_times = {}
        
        # Entrenar v2
        if self.model_v2:
            print("\n🎓 Entrenando Modelo v2...")
            start_time = time.time()
            try:
                # Análisis de patrones
                main_cols = ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5']
                star_cols = ['Start_1', 'Star_2']
                
                self.model_v2.pattern_analyzer.analyze_frequencies_multilevel(
                    self.model_v2.data, main_cols, star_cols
                )
                self.model_v2.pattern_analyzer.detect_hot_cold_numbers(
                    self.model_v2.data, main_cols, star_cols
                )
                self.model_v2.pattern_analyzer.build_markov_chain(
                    self.model_v2.data, main_cols
                )
                
                # Entrenar ensemble
                if not quick_mode:
                    self.model_v2.train_ultra_ensemble()
                
                training_times['v2'] = time.time() - start_time
                print(f"✅ v2 entrenado en {training_times['v2']:.2f} segundos")
            except Exception as e:
                print(f"❌ Error entrenando v2: {e}")
                training_times['v2'] = None
        
        # Entrenar v3 ya viene pre-entrenado en inicialización
        if self.model_v3:
            print("\n🎓 Modelo v3 ya entrenado durante inicialización")
            training_times['v3'] = 0  # Ya se entrena en __init__
        
        self.metrics['training_times'] = training_times
        return training_times
    
    def generate_predictions(self, n_predictions=10):
        """Genera predicciones con ambos modelos"""
        print("\n" + "="*70)
        print("GENERANDO PREDICCIONES")
        print("="*70)
        
        predictions = {'v2': [], 'v3': []}
        generation_times = {'v2': [], 'v3': []}
        
        # Predicciones v2
        if self.model_v2:
            print(f"\n🔮 Generando {n_predictions} predicciones con v2...")
            for i in range(n_predictions):
                start_time = time.time()
                try:
                    preds = self.model_v2.generate_ultra_predictions(n_combinations=1)
                    if preds:
                        pred = preds[0]
                        predictions['v2'].append({
                            'numbers': pred.main_numbers,
                            'stars': pred.star_numbers,
                            'confidence': pred.confidence
                        })
                    generation_times['v2'].append(time.time() - start_time)
                except Exception as e:
                    print(f"Error en predicción v2 #{i+1}: {e}")
                    
        # Predicciones v3
        if self.model_v3:
            print(f"\n🔮 Generando {n_predictions} predicciones con v3...")
            for i in range(n_predictions):
                start_time = time.time()
                try:
                    pred = self.model_v3.generate_prediction_enhanced()
                    predictions['v3'].append(pred)
                    generation_times['v3'].append(time.time() - start_time)
                except Exception as e:
                    print(f"Error en predicción v3 #{i+1}: {e}")
        
        self.results['predictions'] = predictions
        self.metrics['generation_times'] = generation_times
        
        return predictions
    
    def analyze_diversity(self, predictions):
        """Analiza la diversidad de las predicciones"""
        diversity_metrics = {}
        
        for model_name in ['v2', 'v3']:
            if model_name in predictions and predictions[model_name]:
                all_numbers = []
                for pred in predictions[model_name]:
                    all_numbers.extend(pred['numbers'])
                
                # Calcular métricas de diversidad
                unique_numbers = len(set(all_numbers))
                total_numbers = len(all_numbers)
                
                # Distribución de frecuencias
                freq_distribution = Counter(all_numbers)
                
                # Entropía (mayor = más diverso)
                probs = np.array(list(freq_distribution.values())) / total_numbers
                entropy = -np.sum(probs * np.log2(probs + 1e-10))
                
                diversity_metrics[model_name] = {
                    'unique_numbers': unique_numbers,
                    'total_coverage': unique_numbers / 50 * 100,  # % del total posible
                    'entropy': entropy,
                    'most_common': freq_distribution.most_common(5),
                    'frequency_std': np.std(list(freq_distribution.values()))
                }
        
        self.metrics['diversity'] = diversity_metrics
        return diversity_metrics
    
    def analyze_patterns(self, predictions):
        """Analiza patrones en las predicciones"""
        pattern_metrics = {}
        
        for model_name in ['v2', 'v3']:
            if model_name in predictions and predictions[model_name]:
                metrics = {
                    'sum_distribution': [],
                    'range_distribution': [],
                    'parity_distribution': [],
                    'sector_distribution': defaultdict(list)
                }
                
                for pred in predictions[model_name]:
                    numbers = pred['numbers']
                    
                    # Suma total
                    metrics['sum_distribution'].append(sum(numbers))
                    
                    # Rango
                    metrics['range_distribution'].append(max(numbers) - min(numbers))
                    
                    # Paridad
                    even_count = sum(1 for n in numbers if n % 2 == 0)
                    metrics['parity_distribution'].append(even_count)
                    
                    # Distribución por sectores
                    for num in numbers:
                        sector = (num - 1) // 10
                        metrics['sector_distribution'][sector].append(num)
                
                pattern_metrics[model_name] = {
                    'avg_sum': np.mean(metrics['sum_distribution']),
                    'std_sum': np.std(metrics['sum_distribution']),
                    'avg_range': np.mean(metrics['range_distribution']),
                    'avg_even': np.mean(metrics['parity_distribution']),
                    'sector_balance': {
                        s: len(nums) for s, nums in metrics['sector_distribution'].items()
                    }
                }
        
        self.metrics['patterns'] = pattern_metrics
        return pattern_metrics
    
    def backtest_predictions(self, predictions, n_draws=100):
        """Realiza backtesting con sorteos históricos simulados"""
        print("\n" + "="*70)
        print("BACKTESTING")
        print("="*70)
        
        backtest_results = {}
        
        # Generar sorteos simulados para testing
        simulated_draws = []
        for _ in range(n_draws):
            numbers = sorted(np.random.choice(range(1, 51), 5, replace=False))
            stars = sorted(np.random.choice(range(1, 13), 2, replace=False))
            simulated_draws.append({'numbers': numbers, 'stars': stars})
        
        for model_name in ['v2', 'v3']:
            if model_name not in predictions or not predictions[model_name]:
                continue
                
            hits_distribution = defaultdict(int)
            total_hits = []
            star_hits = []
            
            for pred in predictions[model_name]:
                pred_numbers = set(pred['numbers'])
                pred_stars = set(pred['stars'])
                
                for draw in simulated_draws:
                    draw_numbers = set(draw['numbers'])
                    draw_stars = set(draw['stars'])
                    
                    num_hits = len(pred_numbers & draw_numbers)
                    star_hit_count = len(pred_stars & draw_stars)
                    
                    hits_distribution[num_hits] += 1
                    total_hits.append(num_hits)
                    star_hits.append(star_hit_count)
            
            backtest_results[model_name] = {
                'avg_number_hits': np.mean(total_hits),
                'avg_star_hits': np.mean(star_hits),
                'hits_distribution': dict(hits_distribution),
                'hit_rate': sum(1 for h in total_hits if h > 0) / len(total_hits) if total_hits else 0
            }
        
        self.metrics['backtest'] = backtest_results
        return backtest_results
    
    def calculate_confidence_metrics(self, predictions):
        """Calcula métricas de confianza"""
        confidence_metrics = {}
        
        for model_name in ['v2', 'v3']:
            if model_name in predictions and predictions[model_name]:
                confidences = [p.get('confidence', 0) for p in predictions[model_name]]
                
                confidence_metrics[model_name] = {
                    'mean_confidence': np.mean(confidences),
                    'std_confidence': np.std(confidences),
                    'min_confidence': min(confidences),
                    'max_confidence': max(confidences)
                }
        
        self.metrics['confidence'] = confidence_metrics
        return confidence_metrics
    
    def generate_report(self):
        """Genera reporte completo de comparación"""
        print("\n" + "="*70)
        print("REPORTE DE COMPARACIÓN")
        print("="*70)
        
        # 1. Tiempos de procesamiento
        if 'training_times' in self.metrics:
            print("\n📊 TIEMPOS DE ENTRENAMIENTO:")
            for model, time_val in self.metrics['training_times'].items():
                if time_val is not None:
                    print(f"  {model}: {time_val:.2f} segundos")
        
        if 'generation_times' in self.metrics:
            print("\n📊 TIEMPOS DE GENERACIÓN (promedio):")
            for model, times in self.metrics['generation_times'].items():
                if times:
                    print(f"  {model}: {np.mean(times):.3f} segundos")
        
        # 2. Diversidad
        if 'diversity' in self.metrics:
            print("\n📊 DIVERSIDAD DE PREDICCIONES:")
            for model, div_metrics in self.metrics['diversity'].items():
                print(f"\n  {model}:")
                print(f"    - Números únicos: {div_metrics['unique_numbers']}")
                print(f"    - Cobertura: {div_metrics['total_coverage']:.1f}%")
                print(f"    - Entropía: {div_metrics['entropy']:.3f}")
                print(f"    - Desv. estándar frecuencias: {div_metrics['frequency_std']:.2f}")
        
        # 3. Patrones
        if 'patterns' in self.metrics:
            print("\n📊 ANÁLISIS DE PATRONES:")
            for model, patterns in self.metrics['patterns'].items():
                print(f"\n  {model}:")
                print(f"    - Suma promedio: {patterns['avg_sum']:.1f} (±{patterns['std_sum']:.1f})")
                print(f"    - Rango promedio: {patterns['avg_range']:.1f}")
                print(f"    - Números pares promedio: {patterns['avg_even']:.1f}")
        
        # 4. Backtesting
        if 'backtest' in self.metrics:
            print("\n📊 RESULTADOS BACKTESTING:")
            for model, backtest in self.metrics['backtest'].items():
                print(f"\n  {model}:")
                print(f"    - Aciertos promedio: {backtest['avg_number_hits']:.2f}")
                print(f"    - Aciertos estrellas: {backtest['avg_star_hits']:.2f}")
                print(f"    - Tasa de acierto: {backtest['hit_rate']:.1%}")
        
        # 5. Confianza
        if 'confidence' in self.metrics:
            print("\n📊 MÉTRICAS DE CONFIANZA:")
            for model, conf in self.metrics['confidence'].items():
                print(f"\n  {model}:")
                print(f"    - Confianza media: {conf['mean_confidence']:.1%}")
                print(f"    - Desv. estándar: {conf['std_confidence']:.3f}")
                print(f"    - Rango: [{conf['min_confidence']:.1%} - {conf['max_confidence']:.1%}]")
        
        # 6. Ganador
        print("\n" + "="*70)
        print("RESUMEN Y GANADOR")
        print("="*70)
        
        scores = {'v2': 0, 'v3': 0}
        comparisons = []
        
        # Comparar métricas clave
        if 'diversity' in self.metrics:
            v2_entropy = self.metrics['diversity'].get('v2', {}).get('entropy', 0)
            v3_entropy = self.metrics['diversity'].get('v3', {}).get('entropy', 0)
            if v3_entropy > v2_entropy:
                scores['v3'] += 1
                comparisons.append("✅ v3 tiene mayor diversidad")
            else:
                scores['v2'] += 1
                comparisons.append("✅ v2 tiene mayor diversidad")
        
        if 'backtest' in self.metrics:
            v2_hits = self.metrics['backtest'].get('v2', {}).get('avg_number_hits', 0)
            v3_hits = self.metrics['backtest'].get('v3', {}).get('avg_number_hits', 0)
            if v3_hits > v2_hits:
                scores['v3'] += 1
                comparisons.append("✅ v3 tiene mejor tasa de aciertos")
            else:
                scores['v2'] += 1
                comparisons.append("✅ v2 tiene mejor tasa de aciertos")
        
        if 'generation_times' in self.metrics:
            v2_time = np.mean(self.metrics['generation_times'].get('v2', [1000]))
            v3_time = np.mean(self.metrics['generation_times'].get('v3', [1000]))
            if v3_time < v2_time:
                scores['v3'] += 1
                comparisons.append("✅ v3 es más rápido")
            else:
                scores['v2'] += 1
                comparisons.append("✅ v2 es más rápido")
        
        print("\nComparaciones:")
        for comp in comparisons:
            print(f"  {comp}")
        
        print(f"\n🏆 GANADOR: Modelo {max(scores, key=scores.get)}")
        print(f"   Puntuación: v2={scores['v2']} vs v3={scores['v3']}")
        
        return self.metrics
    
    def visualize_comparison(self):
        """Genera visualizaciones de comparación"""
        try:
            import matplotlib.pyplot as plt
            import seaborn as sns
            
            fig, axes = plt.subplots(2, 3, figsize=(15, 10))
            fig.suptitle('Comparación de Modelos EuroMillón v2 vs v3', fontsize=16)
            
            # 1. Tiempos de generación
            if 'generation_times' in self.metrics:
                ax = axes[0, 0]
                times_data = []
                labels = []
                for model, times in self.metrics['generation_times'].items():
                    if times:
                        times_data.append(times)
                        labels.append(model)
                if times_data:
                    ax.boxplot(times_data, labels=labels)
                    ax.set_ylabel('Tiempo (segundos)')
                    ax.set_title('Tiempos de Generación')
            
            # 2. Diversidad
            if 'diversity' in self.metrics:
                ax = axes[0, 1]
                models = []
                entropies = []
                for model, div in self.metrics['diversity'].items():
                    models.append(model)
                    entropies.append(div['entropy'])
                ax.bar(models, entropies)
                ax.set_ylabel('Entropía')
                ax.set_title('Diversidad de Predicciones')
            
            # 3. Cobertura
            if 'diversity' in self.metrics:
                ax = axes[0, 2]
                models = []
                coverages = []
                for model, div in self.metrics['diversity'].items():
                    models.append(model)
                    coverages.append(div['total_coverage'])
                ax.bar(models, coverages)
                ax.set_ylabel('Cobertura (%)')
                ax.set_title('Cobertura del Espacio de Números')
            
            # 4. Distribución de sumas
            if 'patterns' in self.metrics:
                ax = axes[1, 0]
                for model, patterns in self.metrics['patterns'].items():
                    ax.errorbar([model], [patterns['avg_sum']], 
                               yerr=[patterns['std_sum']], 
                               fmt='o', capsize=5, label=model)
                ax.set_ylabel('Suma Total')
                ax.set_title('Distribución de Sumas')
                ax.legend()
            
            # 5. Tasa de aciertos
            if 'backtest' in self.metrics:
                ax = axes[1, 1]
                models = []
                hit_rates = []
                for model, backtest in self.metrics['backtest'].items():
                    models.append(model)
                    hit_rates.append(backtest['hit_rate'] * 100)
                ax.bar(models, hit_rates)
                ax.set_ylabel('Tasa de Acierto (%)')
                ax.set_title('Tasa de Acierto en Backtesting')
            
            # 6. Confianza
            if 'confidence' in self.metrics:
                ax = axes[1, 2]
                for model, conf in self.metrics['confidence'].items():
                    ax.errorbar([model], [conf['mean_confidence'] * 100],
                               yerr=[conf['std_confidence'] * 100],
                               fmt='o', capsize=5)
                ax.set_ylabel('Confianza (%)')
                ax.set_title('Niveles de Confianza')
            
            plt.tight_layout()
            
            # Guardar figura
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"comparison_v2_v3_{timestamp}.png"
            plt.savefig(filename, dpi=100, bbox_inches='tight')
            print(f"\n📊 Visualización guardada en: {filename}")
            
            plt.show()
            
        except ImportError:
            print("\n⚠️ Matplotlib no disponible, saltando visualizaciones")
    
    def save_results(self):
        """Guarda resultados en archivo JSON"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"comparison_results_{timestamp}.json"
        
        # Convertir métricas a formato serializable
        serializable_metrics = {}
        for key, value in self.metrics.items():
            if isinstance(value, dict):
                serializable_metrics[key] = {}
                for k, v in value.items():
                    if isinstance(v, (list, dict, str, int, float, bool, type(None))):
                        serializable_metrics[key][k] = v
                    elif isinstance(v, np.ndarray):
                        serializable_metrics[key][k] = v.tolist()
                    else:
                        serializable_metrics[key][k] = str(v)
        
        results_data = {
            'timestamp': timestamp,
            'metrics': serializable_metrics,
            'predictions': self.results.get('predictions', {})
        }
        
        with open(filename, 'w') as f:
            json.dump(results_data, f, indent=2, default=str)
        
        print(f"\n💾 Resultados guardados en: {filename}")

def run_quick_test():
    """Ejecuta un test rápido de comparación"""
    print("\n" + "="*70)
    print("TEST RÁPIDO DE COMPARACIÓN DE MODELOS")
    print("="*70)
    
    comparator = ModelComparator()
    
    # Inicializar modelos
    comparator.initialize_models()
    
    # Entrenar modelos (modo rápido)
    comparator.train_models(quick_mode=True)
    
    # Generar predicciones
    predictions = comparator.generate_predictions(n_predictions=5)
    
    # Analizar resultados
    comparator.analyze_diversity(predictions)
    comparator.analyze_patterns(predictions)
    comparator.backtest_predictions(predictions, n_draws=50)
    comparator.calculate_confidence_metrics(predictions)
    
    # Generar reporte
    metrics = comparator.generate_report()
    
    # Visualizar si es posible
    comparator.visualize_comparison()
    
    # Guardar resultados
    comparator.save_results()
    
    return metrics

def run_full_test():
    """Ejecuta un test completo y exhaustivo"""
    print("\n" + "="*70)
    print("TEST COMPLETO DE COMPARACIÓN DE MODELOS")
    print("="*70)
    
    comparator = ModelComparator()
    
    # Inicializar modelos
    comparator.initialize_models()
    
    # Entrenar modelos (modo completo)
    print("\n⚠️ Este proceso puede tardar varios minutos...")
    comparator.train_models(quick_mode=False)
    
    # Generar más predicciones
    predictions = comparator.generate_predictions(n_predictions=20)
    
    # Análisis exhaustivo
    comparator.analyze_diversity(predictions)
    comparator.analyze_patterns(predictions)
    comparator.backtest_predictions(predictions, n_draws=200)
    comparator.calculate_confidence_metrics(predictions)
    
    # Generar reporte
    metrics = comparator.generate_report()
    
    # Visualizar
    comparator.visualize_comparison()
    
    # Guardar resultados
    comparator.save_results()
    
    return metrics

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Test y comparación de modelos EuroMillón')
    parser.add_argument('--mode', choices=['quick', 'full'], default='quick',
                       help='Modo de test: quick (rápido) o full (completo)')
    args = parser.parse_args()
    
    if args.mode == 'quick':
        results = run_quick_test()
    else:
        results = run_full_test()
    
    print("\n" + "="*70)
    print("✅ TEST COMPLETADO")
    print("="*70)
