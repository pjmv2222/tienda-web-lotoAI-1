import os
import pdfplumber
import pandas as pd
import re
from datetime import datetime
import glob

# Ruta base donde están almacenados los archivos PDF del año 2016
base_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresiones regulares para buscar y extraer las fechas y los datos de los premios
patron_fecha = re.compile(r'(\d{1,2}) de ([a-z]+) de (\d{4})')
patron_premio = re.compile(r'(\d) Premio de ([\d.]+) euros para el billete número.*?(\d+)')

# Diccionario para convertir el mes de texto a número
meses = {
    'enero': 1,
    'febrero': 2,
    'marzo': 3,
    'abril': 4,
    'mayo': 5,
    'junio': 6,
    'julio': 7,
    'agosto': 8,
    'septiembre': 9,
    'octubre': 10,
    'noviembre': 11,
    'diciembre': 12
}

# Obtener la lista de archivos PDF en la carpeta de 2016
archivos_pdf = glob.glob(os.path.join(base_path, '*.pdf'))

# Función para determinar la categoría del premio
def determinar_categoria(euros, es_sorteo_extraordinario):
    if es_sorteo_extraordinario:
        if euros == 2000000:
            return "Primer Premio Extraordinario"
        elif 500000 <= euros < 2000000:
            return "Segundo Premio Extraordinario"
        elif 400000 <= euros < 500000:
            return "Tercer Premio Extraordinario"
        elif 100000 <= euros < 400000:
            return "Cuarto Premio Extraordinario"
        else:
            return "Otro Premio Extraordinario"
    else:
        if 300000 <= euros <= 1300000:
            return "Primer Premio"
        elif 50000 < euros < 300000:  # Ajuste aquí para incluir 60000 en Segundo Premio
            return "Segundo Premio"
        elif euros == 50000:
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
                    mes = meses[mes_texto]
                    fecha_sorteo = datetime(day=int(dia), month=mes, year=int(año))
            if "SORTEO EXTRAORDINARIO DE VACACIONES" in texto.upper():
                es_sorteo_extraordinario = True
            for linea in texto.split('\n'):
                match_premio = patron_premio.search(linea)
                if match_premio:
                    premio, euros, numero = match_premio.groups()
                    euros_int = int(euros.replace('.', ''))
                    categoria = determinar_categoria(euros_int, es_sorteo_extraordinario)
                    datos_premios.append({
                        "Fecha": fecha_sorteo.strftime('%d/%m/%Y'),
                        "Premio": int(premio),
                        "Euros Billete": euros_int,
                        "Número": int(numero),
                        "Categoría": categoria
                    })

# Iterar sobre los archivos PDF en la carpeta de 2016
for pdf_file in archivos_pdf:
    procesar_pdf(pdf_file)

# Convertir los datos a un DataFrame
df_premios = pd.DataFrame(datos_premios)

# Asegurar que todas las categorías estén presentes en el DataFrame
categorias = [
    "Primer Premio Extraordinario", "Segundo Premio Extraordinario", "Tercer Premio Extraordinario", "Cuarto Premio Extraordinario", "Otro Premio Extraordinario",
    "Primer Premio", "Segundo Premio", "Tercer Premio", "Otro Premio"
]

# Crear un DataFrame vacío con todas las categorías
df_categorias = pd.DataFrame(columns=["Fecha", "Premio", "Euros Billete", "Número", "Categoría"])
for categoria in categorias:
    if categoria not in df_premios["Categoría"].values:
        df_categorias = pd.concat([df_categorias, pd.DataFrame([{"Fecha": None, "Premio": None, "Euros Billete": None, "Número": None, "Categoría": categoria}])], ignore_index=True)

# Concatenar los DataFrames y guardar en Excel
df_final = pd.concat([df_premios, df_categorias], ignore_index=True)
df_final.to_excel('premios_mayores_completo-4.1.xlsx', index=False)