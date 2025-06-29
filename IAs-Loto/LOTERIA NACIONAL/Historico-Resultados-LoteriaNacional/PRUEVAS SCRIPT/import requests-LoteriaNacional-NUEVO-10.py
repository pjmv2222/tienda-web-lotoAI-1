import os
import pdfplumber
import pandas as pd
import re
from datetime import datetime
import glob

# Ruta base donde están almacenados los archivos PDF del año 2016
base_path = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\2016'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresiones regulares mejoradas
patron_fecha = re.compile(r'(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})', re.IGNORECASE)
patron_premio = re.compile(r'(\d)\s*Premio\s*de\s*([\d.]+)\s*(?:de\s*)?euros\s*(?:para\s*el\s*billete\s*número|al\s*número)\s*[.\s]*(\d+)', re.IGNORECASE)

# Diccionario para convertir el mes de texto a número
meses = {
    'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
    'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
}

# Obtener la lista de archivos PDF en la carpeta de 2016
archivos_pdf = glob.glob(os.path.join(base_path, '*.pdf'))

# Función para determinar la categoría del premio
def determinar_categoria(premio, euros, es_sorteo_extraordinario):
    if es_sorteo_extraordinario:
        if premio == 1:
            return "Primer Premio Extraordinario"
        elif premio == 2:
            return "Segundo Premio Extraordinario"
        elif premio == 3:
            return "Tercer Premio Extraordinario"
        else:
            return "Otro Premio Extraordinario"
    else:
        if premio == 1:
            return "Primer Premio"
        elif premio == 2:
            return "Segundo Premio"
        elif premio == 3:
            return "Tercer Premio"
        else:
            return "Otro Premio"

# Función para procesar cada archivo PDF
def procesar_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        fecha_sorteo = None
        es_sorteo_extraordinario = False
        for pagina in pdf.pages:
            texto = pagina.extract_text()
            if not fecha_sorteo:
                match_fecha = patron_fecha.search(texto)
                if match_fecha:
                    dia, mes_texto, año = match_fecha.groups()
                    mes = meses[mes_texto.lower()]
                    fecha_sorteo = datetime(day=int(dia), month=mes, year=int(año))
            
            if "SORTEO EXTRAORDINARIO" in texto.upper():
                es_sorteo_extraordinario = True
            
            for match in patron_premio.finditer(texto):
                premio, euros, numero = match.groups()
                euros_int = int(euros.replace('.', ''))
                categoria = determinar_categoria(int(premio), euros_int, es_sorteo_extraordinario)
                datos_premios.append({
                    "Fecha": fecha_sorteo.strftime('%d/%m/%Y') if fecha_sorteo else "Desconocida",
                    "Premio": int(premio),
                    "Euros Billete": euros_int,
                    "Número": int(numero),
                    "Categoría": categoria
                })

# Iterar sobre los archivos PDF en la carpeta de 2016
for pdf_file in archivos_pdf:
    procesar_pdf(pdf_file)

# Convertir los datos a un DataFrame y guardar en Excel
df_premios = pd.DataFrame(datos_premios)
print(df_premios)
df_premios.to_excel('premios_mayores_completo.xlsx', index=False)