import sys
import os
import fitz  # PyMuPDF
import pandas as pd
import re
import glob
from datetime import datetime

# Reconfigurar la salida estándar para usar UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Directorio donde se encuentran los archivos PDF
directory = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016'

# Patrón regular ajustado para encontrar la frase de interés
pattern = r'1 Premio de (\d+\.\d+,\d+) de euros para el billete número\s+(\d{5})'

# Crear un dataframe vacío para almacenar los datos
df = pd.DataFrame(columns=['Fecha', 'Euros Billete', 'Número', 'Categoría'])

# Función para extraer texto de un PDF usando PyMuPDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as pdf:
        for page in pdf:
            text += page.get_text()
    return text

# Iterar sobre los archivos PDF en el directorio
for file in glob.glob(os.path.join(directory, '*.pdf')):
    # Extraer el texto del PDF
    text = extract_text_from_pdf(file)
    print(f"Texto extraído del archivo {file}:\n{text}\n")  # Imprimir el texto extraído para depuración
    
    # Verificar si el texto extraído no está vacío
    if not text.strip():
        print(f"El texto extraído del archivo {file} está vacío o no se pudo extraer correctamente.")
        continue
    
    # Buscar la frase de interés en el texto
    match = re.search(pattern, text)
    if match:
        print(f"Coincidencia encontrada: {match.groups()}")
        # Extraer los datos de la frase
        euros, billete = match.groups()
        # Convertir el monto a un número entero
        euros = int(re.sub(r'[.,\s]', '', euros))
        # Asignar la categoría según el monto
        if euros >= 1000000:
            categoría = 'Primera'
        elif euros >= 500000:
            categoría = 'Segunda'
        elif euros >= 200000:
            categoría = 'Tercera'
        else:
            categoría = 'Cuarta'
        # Imprimir los valores de euros, billete y categoría
        print(f"Euros: {euros}, Billete: {billete}, Categoría: {categoría}")
        # Crear un nuevo registro para el dataframe
        fecha = datetime.strptime(file.split('\\')[-1].split('.')[0], '%Y%m%d%H%M%S')
        df = df.append({'Fecha': fecha,
                        'Euros Billete': euros,
                        'Número': billete,
                        'Categoría': categoría}, ignore_index=True)
        print(df)
    else:
        print(f"No se encontró coincidencia en el archivo {file}")

# Guardar el dataframe en un archivo Excel
df.to_excel('premios_mayores_completo-HuggingChat.xlsx', index=False)
print(df)