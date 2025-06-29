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
patron_fecha = re.compile(r'(\d{1,2}) de ([a-z]+) de (\d{4})', re.IGNORECASE)
patron_premio = re.compile(r'1 Premio de ([\d.]+) euros para el billete n[úu]mero\s*\.{0,}\s*(\d+)', re.IGNORECASE)

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
print(f"Archivos PDF encontrados: {archivos_pdf}")

# Función para normalizar el texto
def normalizar_texto(texto):
    try:
        return texto.encode('latin1').decode('utf-8')
    except UnicodeDecodeError:
        return texto.encode('latin1', errors='ignore').decode('utf-8', errors='ignore')

# Función para procesar cada archivo PDF
def procesar_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        fecha_sorteo = None
        for pagina in pdf.pages:
            texto = normalizar_texto(pagina.extract_text())
            print(f"Texto extraído de la página:\n{texto}\n{'-'*80}")
            if not fecha_sorteo:
                match_fecha = patron_fecha.search(texto)
                if match_fecha:
                    dia, mes_texto, año = match_fecha.groups()
                    mes_texto = mes_texto.lower()  # Convertir a minúsculas
                    mes = meses.get(mes_texto)
                    if mes:
                        fecha_sorteo = datetime(day=int(dia), month=mes, year=int(año))
                        print(f"Fecha del sorteo encontrada: {fecha_sorteo}")
                    else:
                        print(f"Mes no encontrado en el diccionario: {mes_texto}")
           
            for linea in texto.split('\n'):
                match_premio = patron_premio.search(linea)
                if match_premio:
                    euros, numero = match_premio.groups()
                    euros_int = int(euros.replace('.', ''))
                    datos_premios.append({
                        "Fecha": fecha_sorteo.strftime('%d/%m/%Y'),
                        "Premio": 1,
                        "Euros Billete": euros_int,
                        "Número": int(numero),
                        "Categoría": "Primer Premio Extraordinario"
                    })
                    print(f"Datos del premio agregados: {datos_premios[-1]}")
                else:
                    print(f"No se encontró el patrón en la línea: {linea}")

# Iterar sobre los archivos PDF en la carpeta de 2016
for pdf_file in archivos_pdf:
    print(f"Procesando archivo: {pdf_file}")
    procesar_pdf(pdf_file)

# Convertir los datos a un DataFrame y guardar en Excel
df_premios = pd.DataFrame(datos_premios)
print(df_premios)
df_premios.to_excel('premios_extraordinarios_2016.xlsx', index=False)