import sys
import os
import pdfplumber
import pandas as pd
import re
from datetime import datetime
import glob

# Reconfigurar la salida estándar para usar UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Nueva ruta base donde están almacenados los archivos PDF
base_path = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\NAVIDAD'

# Lista para almacenar los datos encontrados
datos_premios = []

# Función para determinar la categoría del premio
def determinar_categoria(premio):
    if premio['Euros'] == 4000000:
        premio['Categoria'] = "Primer Premio Gordo de Navidad"
    elif premio['Euros'] == 1250000:
        premio['Categoria'] = "Segundo Premio Extraordinario de Navidad"
    elif premio['Euros'] == 500000:
        premio['Categoria'] = "Tercer Premio Extraordinario de Navidad"
    elif premio['Euros'] == 200000:
        premio['Categoria'] = "Cuarto Premio Extraordinario de Navidad"
    elif premio['Euros'] == 60000:
        premio['Categoria'] = "Quinto Premio Extraordinario de Navidad"
    else:
        premio['Categoria'] = "Desconocido"

# Función para procesar cada archivo PDF
def procesar_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        texto_completo = ""
        for pagina in pdf.pages:
            texto_pagina = pagina.extract_text()
            texto_completo += texto_pagina + "\n"

        # Buscar los premios en el formato de dos líneas
        premios_sorteo = []
        lineas = texto_completo.splitlines()
        for i in range(len(lineas)-1):
            if lineas[i].strip() and lineas[i+1].strip():
                numero = lineas[i].strip()
                euros = lineas[i+1].strip()
                if euros in ['4000000', '1250000', '500000', '200000', '60000']:
                    premio = {
                        "Fecha": "Desconocida",
                        "Sorteo": "Desconocido",
                        "Euros": int(euros),
                        "Número": int(numero)
                    }
                    determinar_categoria(premio)
                    premios_sorteo.append(premio)

        datos_premios.extend(premios_sorteo)

# Recorrer todas las subcarpetas y procesar los archivos PDF
for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith(".pdf"):
            pdf_path = os.path.join(root, file)
            print(f"Procesando archivo: {pdf_path}")
            procesar_pdf(pdf_path)

# Convertir los datos a un DataFrame y guardar en Excel
if datos_premios:
    df_premios = pd.DataFrame(datos_premios)
    print(df_premios)
    df_premios.to_excel('Premios-Extraordinarios-Navidad.xlsx', index=False)
else:
    print("No se encontraron premios en los archivos PDF.")