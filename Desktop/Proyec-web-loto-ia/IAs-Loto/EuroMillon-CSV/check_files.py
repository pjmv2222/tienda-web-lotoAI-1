import os
import sys

def check_files():
    """Verifica que todos los archivos necesarios estén presentes"""
    required_files = [
        'server.py',
        'modelo_euromillon.h5',
        'DataFrame_Euromillones.csv'
    ]
    
    missing_files = []
    
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print("ADVERTENCIA: Faltan los siguientes archivos:")
        for file in missing_files:
            print(f"  - {file}")
        return False
    else:
        print("Todos los archivos necesarios están presentes.")
        return True

def check_model():
    """Verifica que el modelo esté presente y sea válido"""
    model_path = 'modelo_euromillon.h5'
    
    if not os.path.exists(model_path):
        print(f"ADVERTENCIA: No se encontró el modelo en {model_path}")
        return False
    
    # Verificar el tamaño del archivo
    size = os.path.getsize(model_path)
    if size < 1000:  # Menos de 1KB
        print(f"ADVERTENCIA: El modelo parece demasiado pequeño ({size} bytes)")
        return False
    
    print(f"El modelo está presente y tiene un tamaño de {size} bytes.")
    return True

def check_data():
    """Verifica que los datos históricos estén presentes y sean válidos"""
    data_path = 'DataFrame_Euromillones.csv'
    
    if not os.path.exists(data_path):
        print(f"ADVERTENCIA: No se encontraron los datos históricos en {data_path}")
        return False
    
    # Verificar el tamaño del archivo
    size = os.path.getsize(data_path)
    if size < 1000:  # Menos de 1KB
        print(f"ADVERTENCIA: Los datos históricos parecen demasiado pequeños ({size} bytes)")
        return False
    
    # Verificar el contenido del archivo
    try:
        with open(data_path, 'r', encoding='utf-8') as f:
            header = f.readline().strip()
            if not all(col in header for col in ['Num_1', 'Num_2', 'Num_3', 'Num_4', 'Num_5', 'Start_1', 'Star_2']):
                print(f"ADVERTENCIA: Los datos históricos no tienen las columnas esperadas")
                print(f"Columnas encontradas: {header}")
                return False
    except Exception as e:
        print(f"Error al leer los datos históricos: {str(e)}")
        return False
    
    print(f"Los datos históricos están presentes y tienen un tamaño de {size} bytes.")
    return True

def main():
    """Función principal"""
    print("=== Verificación de archivos para despliegue ===")
    
    # Cambiar al directorio del script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Verificar archivos
    files_ok = check_files()
    model_ok = check_model()
    data_ok = check_data()
    
    if files_ok and model_ok and data_ok:
        print("\nTodo está listo para el despliegue.")
        return 0
    else:
        print("\nHay problemas que deben resolverse antes del despliegue.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
