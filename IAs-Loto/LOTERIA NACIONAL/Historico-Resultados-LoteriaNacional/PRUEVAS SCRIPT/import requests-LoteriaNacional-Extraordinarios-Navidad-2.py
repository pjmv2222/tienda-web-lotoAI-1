import sys
import os
import pdfplumber
import pandas as pd
import re
from datetime import datetime
import glob

# Definir la ruta del directorio donde se encuentran los archivos PDF
pdf_dir = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\NAVIDAD'

# Crear una lista vacía para almacenar los datos
data = []

# Expresiones regulares para buscar números y premios
number_pattern = re.compile(r'\b\d{5}\b')
prize_pattern = re.compile(r'(\d{1,3}(?:\.\d{3})*)\s*(?:DE\s*)?EUROS', re.IGNORECASE)

# Iterar a través de los archivos PDF en el directorio
for pdf_file in glob.glob(os.path.join(pdf_dir, '*.pdf')):
    with pdfplumber.open(pdf_file) as pdf:
        # Leer el texto de todas las páginas del PDF
        text = "\n".join(page.extract_text() for page in pdf.pages)
        
        # Verificar el texto extraído
        print(f"Texto extraído del archivo {pdf_file}:\n{text}\n{'='*50}")
        
        # Buscar los números y premios
        numbers = number_pattern.findall(text)
        prizes = prize_pattern.findall(text)
        
        # Convertir los premios a float
        prizes = [float(prize.replace('.', '')) for prize in prizes]
        
        # Iterar a través de los números y premios encontrados
        for number, prize in zip(numbers, prizes):
            # Verificar si el premio coincide con los valores deseados
            if prize in [4000000, 1250000, 500000, 200000, 60000]:
                # Agregar los datos a la lista
                data.append({
                    'Fecha': '',
                    'Sorteo': '',
                    'Euros': prize,
                    'Número': int(number),
                    'Categoria': ''
                })

# Crear un DataFrame de Pandas a partir de la lista de datos
df = pd.DataFrame(data, columns=['Fecha', 'Sorteo', 'Euros', 'Número', 'Categoria'])
print(f"Números encontrados: {numbers}")
print(f"Premios encontrados: {prizes}")
print(f"Datos a agregar al DataFrame: {data}")
# Guardar el DataFrame en un archivo Excel
df.to_excel('Premios-Extraordinarios-Navidad-1.xlsx', index=False)

print("Datos extraídos y guardados en Premios-Extraordinarios-Navidad-1.xlsx")