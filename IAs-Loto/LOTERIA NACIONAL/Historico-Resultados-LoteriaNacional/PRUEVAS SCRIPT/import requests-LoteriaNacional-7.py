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

# Función para procesar cada fila de la tabla
def process_row(row):
    processed_row = []
    for item in row:
        if item is None:
            processed_row.append(None)
        else:
            processed_items = item.split('\n')
            processed_row.extend(processed_items)
    return processed_row

# Directorio base donde se encuentra el archivo PDF
base_dir = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2014'
pdf_filename = 'SM_LISTAOFICIAL.A2014.S001.pdf'
pdf_path = os.path.join(base_dir, pdf_filename)

data = []
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
                    processed_row = process_row(row[1:])
                    data.append(processed_row)
except Exception as e:
    logging.error(f"Error al procesar el archivo PDF {pdf_path}: {e}")

# Determinar el número máximo de columnas
max_columns = max(len(row) for row in data)

# Crear un DataFrame con el número de columnas adecuado
columns = [f'Columna {i}' for i in range(max_columns)]
df = pd.DataFrame(data, columns=columns)

# Guardar el DataFrame en un archivo Excel
df.to_excel('datos_loteria_2014.xlsx', index=False)