import os
import fitz  # PyMuPDF
import pandas as pd
import re
from datetime import datetime
import glob

# Ruta base donde están almacenados los archivos PDF del año 2016
base_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016'

# Ruta donde se guardará el archivo Excel
output_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\premios_extraordinarios_2016.xlsx'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresiones regulares para buscar y extraer las fechas y los datos de los premios
patron_fecha = re.compile(r'(\d{1,2}) de ([a-z]+) de (\d{4})', re.IGNORECASE)
patron_premio = re.compile(r'(\d) Premio de ([\d.]+) euros para el billete número.*?(\d+)', re.IGNORECASE)

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

# Función para procesar cada archivo PDF
def procesar_pdf(pdf_path):
    print(f"Procesando archivo: {pdf_path}")
    documento = fitz.open(pdf_path)
    fecha_sorteo = None
    sorteo_extraordinario_encontrado = False

    for pagina in documento:
        texto = pagina.get_text()
        if texto:
            # Imprimir el texto de la página para depuración
            print(f"Texto extraído de la página:\n{texto[:1000]}")  # Limitar a los primeros 1000 caracteres para no saturar la salida
            
            # Buscar la fecha del sorteo en el texto de la página
            if not fecha_sorteo:
                match_fecha = patron_fecha.search(texto)
                if match_fecha:
                    dia, mes_texto, año = match_fecha.groups()
                    mes = meses[mes_texto.lower()]
                    fecha_sorteo = datetime(day=int(dia), month=mes, year=int(año))
                    print(f"Fecha del sorteo encontrada: {fecha_sorteo}")
            
            # Verificar si es un sorteo extraordinario de vacaciones
            if "SORTEO EXTRAORDINARIO DE VACACIONES" in texto.upper():
                sorteo_extraordinario_encontrado = True
                print("Sorteo extraordinario de vacaciones encontrado en esta página")
                for linea in texto.split('\n'):
                    print(f"Procesando línea: {linea}")  # Añadido para depuración
                    match_premio = patron_premio.search(linea)
                    if match_premio:
                        premio, euros, numero = match_premio.groups()
                        euros_int = int(euros.replace('.', ''))
                        datos_premios.append({
                            "Fecha": fecha_sorteo.strftime('%d/%m/%Y'),
                            "Premio": int(premio),
                            "Euros Billete": euros_int,
                            "Número": int(numero),
                            "Categoría": "Sorteo Extraordinario"
                        })
                        print(f"Datos del premio encontrados: {premio}, {euros_int}, {numero}")
                    else:
                        print("No se encontró un premio en esta línea.")  # Añadido para depuración
        else:
            print("No se pudo extraer texto de la página.")
    
    if not sorteo_extraordinario_encontrado:
        print("No se encontró 'SORTEO EXTRAORDINARIO DE VACACIONES' en el texto.")

# Iterar sobre los archivos PDF en la carpeta de 2016
for pdf_file in archivos_pdf:
    procesar_pdf(pdf_file)

# Convertir los datos a un DataFrame y guardar en Excel
df_premios = pd.DataFrame(datos_premios)
print(f"Datos extraídos: {df_premios}")
df_premios.to_excel(output_path, index=False)
print(f"Archivo Excel guardado en: {output_path}")