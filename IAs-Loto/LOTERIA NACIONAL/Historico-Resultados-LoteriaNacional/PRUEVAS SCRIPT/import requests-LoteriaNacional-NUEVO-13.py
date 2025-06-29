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

# Ruta base donde están almacenados los archivos PDF
base_path = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\2016'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresiones regulares mejoradas
patron_fecha = re.compile(r'(\d{1,2})\s+de\s+([a-zá-ú]+)\s+de\s+(\d{4})', re.IGNORECASE)
patron_premio = re.compile(r'(\d)[\w\s]*Premio\s*(?:de|por)\s*([\d.]+)\s*(?:de\s*)?euros\s*(?:para\s*el\s*billete\s*número|al\s*número)\s*[.\s]*(\d+)', re.IGNORECASE)
patron_sorteo = re.compile(r'SORTEO\s+(\d+)\.º', re.IGNORECASE)

# Diccionario para convertir el mes de texto a número
meses = {
    'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
    'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
}

# Función para determinar la categoría del premio
def determinar_categoria(premios_sorteo, es_extraordinario):
    premios_sorteo.sort(key=lambda x: x['Euros'], reverse=True)
    
    for i, premio in enumerate(premios_sorteo):
        if es_extraordinario:
            if i == 0:
                premio['Categoria'] = "Primer Premio Extraordinario"
            elif i == 1:
                premio['Categoria'] = "Segundo Premio Extraordinario"
            elif i == 2:
                premio['Categoria'] = "Tercer Premio Extraordinario"
            else:
                premio['Categoria'] = "Otro Premio Extraordinario"
        else:
            if i == 0:
                premio['Categoria'] = "Primer Premio Ordinario"
            elif i == 1:
                premio['Categoria'] = "Segundo Premio Ordinario"
            elif i == 2:
                premio['Categoria'] = "Tercer Premio Ordinario"
            else:
                premio['Categoria'] = "Otro Premio Ordinario"

# Función para procesar cada archivo PDF
def procesar_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        texto_completo = ""
        texto_segunda_pagina = ""
        
        for i, pagina in enumerate(pdf.pages):
            texto_pagina = pagina.extract_text()
            texto_completo += texto_pagina + "\n"
            
            # Guardamos el texto de la segunda página
            if i == 1:
                texto_segunda_pagina = texto_pagina
                break  # Solo necesitamos la segunda página
            
            print(f"Texto de la página {i+1}:\n{texto_pagina}\n{'='*50}")

        fecha_sorteo = None
        match_fecha = patron_fecha.search(texto_completo)
        if match_fecha:
            dia, mes_texto, año = match_fecha.groups()
            mes = meses[mes_texto.lower()]
            fecha_sorteo = datetime(day=int(dia), month=mes, year=int(año))
        
        es_extraordinario = "SORTEO EXTRAORDINARIO" in texto_completo.upper() or "SORTEO ESPECIAL" in texto_completo.upper()
        
        # Buscamos las líneas que contienen información del sorteo en la segunda página
        matches_sorteo = patron_sorteo.findall(texto_segunda_pagina)
        print(f"Matches de sorteo encontrados: {matches_sorteo}")
        
        numero_sorteo = "Desconocido"
        if matches_sorteo:
            numero_sorteo_match = matches_sorteo[0]  # Primer match
            numero_sorteo = f"{numero_sorteo_match}.º"
        
        print(f"Número de sorteo extraído: {numero_sorteo}")
        
        premios_sorteo = []
        for match in patron_premio.finditer(texto_completo):
            premio, euros, numero = match.groups()
            euros_int = int(euros.replace('.', ''))
            premios_sorteo.append({
                "Fecha": fecha_sorteo.strftime('%d/%m/%Y') if fecha_sorteo else "Desconocida",
                "Sorteo": numero_sorteo,
                "Euros": euros_int,
                "Número": int(numero)
            })
        
        determinar_categoria(premios_sorteo, es_extraordinario)
        datos_premios.extend(premios_sorteo)

# Iterar sobre los archivos PDF en la carpeta
archivos_pdf = glob.glob(os.path.join(base_path, '*.pdf'))
for pdf_file in archivos_pdf:
    print(f"Procesando archivo: {pdf_file}")
    procesar_pdf(pdf_file)

# Convertir los datos a un DataFrame y guardar en Excel
df_premios = pd.DataFrame(datos_premios)
print(df_premios)
df_premios.to_excel('premios_mayores_completo.xlsx', index=False)