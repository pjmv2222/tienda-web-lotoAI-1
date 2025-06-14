print("Inicio del programa")
import sys
from data_preparation import load_and_prepare_data
from model import build_model

if sys.version_info.major >= 3:
    sys.stdout.reconfigure(encoding='utf-8')
print("Inicio del programa")
try:
    datos = load_and_prepare_data('C:\\Users\\Pedro\\Desktop\\LotoIA\\LaPrimitiva\\Histórico-Resultados-Primitiva.csv')
    print(datos.head())
    print(datos.describe())
except Exception as e:
    print(f"Error al cargar o procesar los datos: {e}")

# Aquí continuarías con la preparación de los datos y el entrenamiento del modelo