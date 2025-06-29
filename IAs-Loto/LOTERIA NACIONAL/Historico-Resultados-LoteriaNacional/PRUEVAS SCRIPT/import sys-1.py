import pdfplumber
import re
import pandas as pd
import os
import glob
import sys

# Ruta de la carpeta que contiene los archivos PDF
pdf_folder_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016'

# Ruta del archivo Excel de salida
excel_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\resultados_loteria.xlsx'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresiones regulares para buscar los premios específicos
patron_1 = re.compile(r'1 Premio de 2\.000\.000 de euros para el billete número\s+\d{5}')
patron_2 = re.compile(r'1 Premio de 600\.000 euros para el billete número\s+\d{5}')
patron_3 = re.compile(r'1 Premio de 200\.000 euros para el billete número\s+\d{5}')

# Buscar todos los archivos PDF en la carpeta especificada
pdf_files = glob.glob(os.path.join(pdf_folder_path, '*.pdf'))

# Verificar si se encontraron archivos PDF
if not pdf_files:
    print(f"Error: No se encontraron archivos PDF en la ruta especificada: {pdf_folder_path}")
    sys.exit(1)

# Procesar cada archivo PDF encontrado
for pdf_path in pdf_files:
    with pdfplumber.open(pdf_path) as pdf:
        for pagina in pdf.pages:
            texto = pagina.extract_text()
            for linea in texto.split('\n'):
                if patron_1.match(linea) or patron_2.match(linea) or patron_3.match(linea):
                    datos_premios.append(linea)

# Convertir los datos a un DataFrame
df_premios = pd.DataFrame(datos_premios, columns=['Descripción del Premio'])

# Guardar el DataFrame en un archivo Excel
df_premios.to_excel(excel_path, index=False)

# Imprimir el DataFrame para verificar los datos
print(df_premios)
