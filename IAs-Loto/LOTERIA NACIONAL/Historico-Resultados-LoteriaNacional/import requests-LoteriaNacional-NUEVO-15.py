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
base_path = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional-NUEVA-0'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresiones regulares mejoradas
patron_fecha = re.compile(r'(\d{1,2})\s+de\s+([a-zá-ú]+)\s+de\s+(\d{4})', re.IGNORECASE)
patron_premio = re.compile(r'(\d)[\w\s]*Premio\s*(?:de|por)\s*([\d.]+)\s*(?:de\s*)?euros\s*(?:para\s*el\s*billete\s*número|al\s*número)\s*[.\s]*(\d+)', re.IGNORECASE)
patron_sorteo = re.compile(r'SORTEO\s+(?:N\.?º\s+)?(\d{1,3})\.?º?|^(\d{1,3})\.?º?$|^DE (\d{4})$', re.MULTILINE | re.IGNORECASE)

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
        # Nos enfocamos en la segunda página
        if len(pdf.pages) > 1:
            pagina = pdf.pages[1]
            texto_completo = pagina.extract_text()
        else:
            texto_completo = pdf.pages[0].extract_text()
        
        print(f"Texto de la página:\n{texto_completo}\n{'='*50}")

        fecha_sorteo = None
        match_fecha = patron_fecha.search(texto_completo)
        if match_fecha:
            dia, mes_texto, año = match_fecha.groups()
            mes = meses[mes_texto.lower()]
            fecha_sorteo = datetime(day=int(dia), month=mes, year=int(año))
        
        es_extraordinario = "SORTEO EXTRAORDINARIO" in texto_completo.upper() or "SORTEO ESPECIAL" in texto_completo.upper()

        # Buscar el número de sorteo en el formato XX.º
        patron_numero_sorteo = re.compile(r'\b(\d{1,3})\.?º\b', re.IGNORECASE)
        match_numero_sorteo = patron_numero_sorteo.search(texto_completo)
        
        if match_numero_sorteo:
            numero_sorteo = f"{match_numero_sorteo.group(1)}.º"
        else:
            numero_sorteo = "Desconocido"

        # Buscar el año del sorteo
        patron_año_sorteo = re.compile(r'\bDE (\d{4})\b', re.IGNORECASE)
        match_año_sorteo = patron_año_sorteo.search(texto_completo)
        
        if match_año_sorteo:
            año_sorteo = match_año_sorteo.group(1)
            numero_sorteo = f"{numero_sorteo} DE {año_sorteo}"
        elif fecha_sorteo:
            numero_sorteo = f"{numero_sorteo} DE {fecha_sorteo.year}"

        print(f"Número de sorteo extraído: {numero_sorteo}")

        premios_sorteo = []
        premios_unicos = set()
        for match in patron_premio.finditer(texto_completo):
            premio, euros, numero = match.groups()
            euros_int = int(euros.replace('.', ''))
            numero_str = numero.zfill(5)  # Asegura que el número tenga 5 dígitos
            premio_key = (numero_sorteo, euros_int, numero_str)
            if premio_key not in premios_unicos:
                premios_unicos.add(premio_key)
                premios_sorteo.append({
                    "Fecha": fecha_sorteo.strftime('%d/%m/%Y') if fecha_sorteo else "Desconocida",
                    "Sorteo": numero_sorteo,
                    "Euros": euros_int,
                    "Numero": numero_str  # Guardamos el número como string
                })

        determinar_categoria(premios_sorteo, es_extraordinario)
        datos_premios.extend(premios_sorteo)

# Recorrer todas las subcarpetas y procesar los archivos PDF
for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith(".pdf"):
            pdf_path = os.path.join(root, file)
            print(f"Procesando archivo: {pdf_path}")
            procesar_pdf(pdf_path)

# Definir la ruta donde quieres guardar el archivo Excel
ruta_guardado = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional'

# Nombre del archivo Excel
nombre_archivo = 'premios_mayores_completo-1.xlsx'

# Ruta completa del archivo Excel
excel_file = os.path.join(ruta_guardado, nombre_archivo)

# Convertir los datos a un DataFrame
df_premios = pd.DataFrame(datos_premios)

# Guardar como Excel con formato específico
with pd.ExcelWriter(excel_file, engine='openpyxl') as writer:
    df_premios.to_excel(writer, index=False)
    worksheet = writer.sheets['Sheet1']
    for idx, col in enumerate(df_premios.columns):
        if col == 'Numero':
            for cell in worksheet[chr(65 + idx)]:
                cell.number_format = '@'
        elif col == 'Fecha':
            for cell in worksheet[chr(65 + idx)]:
                cell.number_format = 'DD/MM/YYYY'

print(f"Los datos se han guardado en Excel: {excel_file}")
print(f"Total de registros capturados: {len(datos_premios)}")