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
patron_premio = re.compile(r'(\d) Premio de ([\d.]+) euros para el billete n[úu]mero.*?(\d+)')
patron_premio_extraordinario = re.compile(r'Primer Premio de ([\d.]+) euros para el billete n[úu]mero.*?(\d+)')

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
def determinar_categoria(euros):
    categorias = []
    if euros == 2000000:
        categorias.append("Primer Premio")
    elif euros == 600000:
        categorias.append("Primer Premio")
    elif euros == 200000:
        categorias.append("Segundo Premio")
    return categorias

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
                    categorias = determinar_categoria(euros_int)
                    for categoria in categorias:
                        datos_premios.append({
                            "Fecha": fecha_sorteo.strftime('%d/%m/%Y'),
                            "Premio": int(premio),
                            "Euros Billete": euros_int,
                            "Número": int(numero),
                            "Categoría": categoria
                        })

            # Agregar lógica para detectar y extraer los primeros premios de los sorteos extraordinarios de vacaciones
            if es_sorteo_extraordinario:
                match_premio_extraordinario = patron_premio_extraordinario.search(texto)
                if match_premio_extraordinario:
                    euros, numero = match_premio_extraordinario.groups()
                    euros_int = int(euros.replace('.', ''))
                    categorias = ["Primer Premio Extraordinario"]
                    for categoria in categorias:
                        datos_premios.append({
                            "Fecha": fecha_sorteo.strftime('%d/%m/%Y'),
                            "Premio": 1,
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
df_premios.to_excel('premios_mayores_completo-4.1.xlsx', index=False)