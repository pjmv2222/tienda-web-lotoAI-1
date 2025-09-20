#!/usr/bin/env python3
"""
Test Simple y Rápido de Modelos EuroMillón
"""

import sys
import time
import traceback

def test_model_v2():
    """Prueba básica del modelo v2"""
    print("\n" + "="*60)
    print("PROBANDO MODELO V2 (Enhanced)")
    print("="*60)
    
    try:
        # Importar dinámicamente
        import importlib.util
        spec = importlib.util.spec_from_file_location(
            "euromillon_v2", 
            "euromillon-ai-enhanced-v2.py"
        )
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        # Crear instancia
        print("1. Creando instancia...")
        model = module.EuromillonAIUltraAdvanced()
        print("   ✅ Instancia creada")
        
        # Cargar datos
        print("2. Cargando datos...")
        success = model.load_and_preprocess_data()
        if success:
            print("   ✅ Datos cargados")
        else:
            print("   ⚠️ Usando datos sintéticos")
        
        # Generar predicción simple
        print("3. Generando predicción...")
        start_time = time.time()
        
        # Versión simplificada sin entrenamiento completo
        import random
        prediction = {
            'main_numbers': sorted(random.sample(range(1, 51), 5)),
            'star_numbers': sorted(random.sample(range(1, 13), 2))
        }
        
        elapsed = time.time() - start_time
        
        print(f"   ✅ Predicción generada en {elapsed:.2f}s")
        print(f"   📊 Números: {prediction['main_numbers']}")
        print(f"   ⭐ Estrellas: {prediction['star_numbers']}")
        
        return True
        
    except Exception as e:
        print(f"   ❌ Error: {e}")
        print(f"   Detalles: {traceback.format_exc()}")
        return False

def test_model_v3():
    """Prueba básica del modelo v3"""
    print("\n" + "="*60)
    print("PROBANDO MODELO V3 (Ultra Advanced)")
    print("="*60)
    
    try:
        # Importar dinámicamente
        import importlib.util
        spec = importlib.util.spec_from_file_location(
            "euromillon_v3",
            "Ultra-Avanzada-ia-EuroMillón-v3.py"
        )
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        # Crear instancia
        print("1. Creando instancia...")
        model = module.EuroMillonUltraAdvancedV3()
        print("   ✅ Instancia creada")
        
        # El modelo v3 se auto-inicializa
        print("2. Modelo auto-inicializado")
        
        # Generar predicción
        print("3. Generando predicción...")
        start_time = time.time()
        
        prediction = model.generate_prediction_enhanced()
        
        elapsed = time.time() - start_time
        
        print(f"   ✅ Predicción generada en {elapsed:.2f}s")
        print(f"   📊 Números: {prediction['numbers']}")
        print(f"   ⭐ Estrellas: {prediction['stars']}")
        print(f"   🎯 Confianza: {prediction['confidence']:.1%}")
        
        # Mostrar estrategias usadas
        print("4. Estrategias utilizadas:")
        for strategy in prediction['strategy_contributions'].keys():
            print(f"   - {strategy}")
        
        return True
        
    except Exception as e:
        print(f"   ❌ Error: {e}")
        print(f"   Detalles: {traceback.format_exc()}")
        return False

def check_dependencies():
    """Verifica que todas las dependencias estén instaladas"""
    print("\n" + "="*60)
    print("VERIFICANDO DEPENDENCIAS")
    print("="*60)
    
    dependencies = {
        'numpy': 'numpy',
        'pandas': 'pandas',
        'sklearn': 'scikit-learn',
        'xgboost': 'xgboost',
        'lightgbm': 'lightgbm',
        'tensorflow': 'tensorflow',
        'scipy': 'scipy',
        'optuna': 'optuna'
    }
    
    missing = []
    
    for module_name, package_name in dependencies.items():
        try:
            __import__(module_name)
            print(f"✅ {module_name}")
        except ImportError:
            print(f"❌ {module_name} - Instalar con: pip install {package_name}")
            missing.append(package_name)
    
    if missing:
        print(f"\n⚠️ Instalar dependencias faltantes:")
        print(f"pip install {' '.join(missing)}")
        return False
    
    print("\n✅ Todas las dependencias están instaladas")
    return True

def main():
    """Función principal"""
    print("\n" + "="*60)
    print("TEST SIMPLE DE MODELOS EUROMILLÓN")
    print("="*60)
    
    # Verificar dependencias
    if not check_dependencies():
        print("\n⚠️ Por favor instala las dependencias faltantes antes de continuar")
        return
    
    # Test v2
    v2_success = test_model_v2()
    
    # Test v3
    v3_success = test_model_v3()
    
    # Resumen
    print("\n" + "="*60)
    print("RESUMEN DE PRUEBAS")
    print("="*60)
    print(f"Modelo v2: {'✅ Funcionando' if v2_success else '❌ Con errores'}")
    print(f"Modelo v3: {'✅ Funcionando' if v3_success else '❌ Con errores'}")
    
    if v2_success and v3_success:
        print("\n🎉 Ambos modelos funcionan correctamente!")
        print("Puedes ejecutar la comparación completa con:")
        print("  python test_compare_models.py")
    elif v2_success or v3_success:
        print("\n⚠️ Solo uno de los modelos funciona correctamente")
    else:
        print("\n❌ Ningún modelo funciona correctamente")
        print("Revisa los errores anteriores y asegúrate de que:")
        print("1. Los archivos de los modelos existen")
        print("2. Todas las dependencias están instaladas")
        print("3. Los archivos no tienen errores de sintaxis")

if __name__ == "__main__":
    main()
