import os
import pandas as pd
import pdfplumber
import logging
from datetime import datetime
import re

# Configuración de logging
logging.basicConfig(level=logging.ERROR)

# Función para convertir el texto de la fecha a un objeto datetime
def convertir_fecha(texto_fecha):
    meses = {
        'ENERO': 1, 'FEBRERO': 2, 'MARZO': 3, 'ABRIL': 4, 'MAYO': 5, 'JUNIO': 6,
        'JULIO': 7, 'AGOSTO': 8, 'SEPTIEMBRE': 9, 'OCTUBRE': 10, 'NOVIEMBRE': 11, 'DICIEMBRE': 12
    }
    match = re.search(r'\b(\d{1,2}) DE ([A-Z]+) DE (\d{4})\b', texto_fecha)
    if match:
        dia, mes_texto, año = match.groups()
        mes = meses[mes_texto]
        return datetime(int(año), int(mes), int(dia))
    else:
        return None

# Función para procesar cada elemento de la fila extraída
def process_data(item):
    if item is None:
        return [None]  # Retorna una lista con None para mantener la estructura
    else:
        processed_items = item.split('\n')
        return processed_items  # Retorna una lista de elementos procesados

# Definir la nueva estructura del DataFrame
columns = ['FECHA', '0 Números Euros/Billete', '1 Números Euros/Billete', '2 Números Euros/Billete', '3 Números Euros/Billete', '4 Números Euros/Billete', '5 Números Euros/Billete', '6 Números Euros/Billete', '7 Números Euros/Billete', '8 Números Euros/Billete', '9 Números Euros/Billete']
data = []

# Directorio base donde se encuentran las carpetas por año
base_dir = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional'

# Iterar sobre los años del 2014 al 2024
for year in range(2014, 2025):
    pdf_dir = os.path.join(base_dir, str(year))
    
    if os.path.exists(pdf_dir):
        for filename in os.listdir(pdf_dir):
            if filename.endswith('.pdf'):
                pdf_path = os.path.join(pdf_dir, filename)
                
                try:
                    with pdfplumber.open(pdf_path) as pdf:
                        for page in pdf.pages:
                            if pdf.pages.index(page) == 0:
                                texto_pagina = page.extract_text()
                                lineas = texto_pagina.split('\n')
                                for linea in lineas:
                                    if "SORTEO DEL DÍA" in linea:
                                        texto_fecha = linea
                                        break
                                fecha_sorteo = convertir_fecha(texto_fecha)
                            
                            table = page.extract_table()
                            if table:
                                for row in table[1:]:
                                    processed_row = [fecha_sorteo]
                                    for item in row[1:]:
                                        processed_data = process_data(item)
                                        processed_row.extend(processed_data)
                                    
                                    if len(processed_row) > len(columns):
                                        processed_row = processed_row[:len(columns)-1] + ['; '.join(str(item) if item is not None else '' for item in processed_row[len(columns)-1:])]
                                        data.append(processed_row)
                                    elif len(processed_row) < len(columns):
                                        processed_row.extend([None] * (len(columns) - len(processed_row)))
                                        data.append(processed_row)
                                    else:
                                        data.append(processed_row)
                except Exception as e:
                    logging.error(f"Error al procesar el archivo PDF {pdf_path}: {e}")
    else:
        print(f"El directorio no existe: {pdf_dir}")

df = pd.DataFrame(data, columns=columns)
df.to_excel('datos_loteria-5.xlsx', index=False)