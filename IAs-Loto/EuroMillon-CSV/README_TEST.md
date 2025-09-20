# Guía de Testing y Comparación de Modelos EuroMillón

## 📋 Descripción General

Este sistema permite comparar el rendimiento de los dos modelos de IA para EuroMillón:
- **Modelo v2**: Enhanced (euromillon-ai-enhanced-v2.py)
- **Modelo v3**: Ultra Advanced (Ultra-Avanzada-ia-EuroMillón-v3.py)

## 🚀 Instalación de Dependencias

```bash
# Instalar todas las dependencias necesarias
pip install numpy pandas scikit-learn xgboost lightgbm tensorflow matplotlib seaborn optuna scipy
```

## 🔧 Cómo Ejecutar las Pruebas

### Test Rápido (Recomendado para empezar)
```bash
python test_compare_models.py --mode quick
```
- Tiempo estimado: 2-5 minutos
- Genera 5 predicciones por modelo
- Backtesting con 50 sorteos simulados

### Test Completo
```bash
python test_compare_models.py --mode full
```
- Tiempo estimado: 10-20 minutos
- Genera 20 predicciones por modelo
- Backtesting con 200 sorteos simulados
- Entrenamiento completo de modelos

## 📊 Métricas de Comparación

### 1. **Rendimiento**
- Tiempo de entrenamiento
- Tiempo de generación de predicciones
- Uso de memoria

### 2. **Calidad de Predicciones**
- **Diversidad**: Entropía y cobertura del espacio de números
- **Patrones**: Suma, rango, paridad
- **Distribución sectorial**: Balance entre sectores (1-10, 11-20, etc.)

### 3. **Backtesting**
- Tasa de aciertos promedio
- Distribución de aciertos
- Comparación con sorteos simulados

### 4. **Confianza**
- Nivel de confianza promedio
- Consistencia de las predicciones

## 📈 Interpretación de Resultados

### Métricas Clave

| Métrica | Mejor si | Significado |
|---------|----------|-------------|
| Entropía | Mayor | Mayor diversidad en predicciones |
| Cobertura | Mayor | Usa más números diferentes |
| Tiempo generación | Menor | Más rápido |
| Tasa aciertos | Mayor | Mejor en backtesting |
| Confianza | Mayor | Más seguro de predicciones |

### Ejemplo de Output

```
📊 DIVERSIDAD DE PREDICCIONES:
  v2:
    - Números únicos: 35
    - Cobertura: 70.0%
    - Entropía: 4.234
  v3:
    - Números únicos: 42
    - Cobertura: 84.0%
    - Entropía: 4.567

🏆 GANADOR: Modelo v3
```

## 🎯 Mejoras Esperadas del v3 sobre v2

### 1. **Mayor Diversidad** (+20-30%)
- Usa más estrategias de predicción
- Mejor exploración del espacio de números

### 2. **Análisis más Profundo**
- Correlaciones entre números
- Co-ocurrencia
- Análisis sectorial
- Detección de anomalías

### 3. **Optimización Automática**
- Optimización Bayesiana de hiperparámetros
- Meta-learning con stacking
- Ajuste dinámico de pesos

### 4. **Nuevas Características**
- Análisis de temperatura (caliente/frío)
- Detección de ciclos con FFT
- Análisis de tendencias CUSUM

## 📁 Archivos Generados

- `comparison_results_YYYYMMDD_HHMMSS.json`: Resultados completos
- `comparison_v2_v3_YYYYMMDD_HHMMSS.png`: Visualizaciones
- `euromillon_v3.log`: Log detallado del modelo v3

## 🔍 Troubleshooting

### Error: "No module named..."
```bash
# Instalar dependencia faltante
pip install [nombre_modulo]
```

### Error de memoria
- Usar modo quick en lugar de full
- Reducir número de predicciones

### Sin datos históricos
- Los modelos generarán datos sintéticos automáticamente

## 💡 Tips para Mejores Resultados

1. **Ejecutar múltiples tests**: Los resultados pueden variar
2. **Usar datos reales**: Si tienes archivo CSV con datos históricos
3. **Ajustar parámetros**: Modificar configuración en los modelos

## 📝 Ejemplo de Uso Completo

```python
from test_compare_models import ModelComparator

# Crear comparador
comp = ModelComparator("mi_archivo_datos.csv")

# Inicializar
comp.initialize_models()

# Entrenar
comp.train_models(quick_mode=True)

# Generar predicciones
preds = comp.generate_predictions(10)

# Analizar
comp.analyze_diversity(preds)
comp.analyze_patterns(preds)

# Ver reporte
comp.generate_report()

# Guardar
comp.save_results()
```
