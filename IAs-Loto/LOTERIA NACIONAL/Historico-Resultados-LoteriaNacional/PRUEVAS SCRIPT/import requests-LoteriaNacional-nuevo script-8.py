import pdfplumber
import re
import pandas as pd
import os
import glob
import sys

# Reconfigurar la salida estándar para usar UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Ruta base donde están almacenados los archivos PDF del año 2016
base_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016'
# Ruta del archivo Excel de salida
excel_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\resultados_loteria.xlsx'

# Función para extraer texto del PDF usando pdfplumber
def extract_text_from_pdf(pdf_path):
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ''
            for page in pdf.pages:
                text += page.extract_text()
        return text
    except PermissionError:
        raise PermissionError(f'No se tienen permisos para acceder al archivo {pdf_path}.')
    except Exception as e:
        raise Exception(f'Error al leer el archivo PDF: {e}')

# Función para limpiar el texto extraído
def clean_text(text):
    # Reemplazar caracteres especiales y espacios en blanco
    text = text.replace('\n', ' ').replace('\r', ' ')
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'n�mero', 'número', text)  # Corregir caracteres especiales
    text = re.sub(r'[^\x00-\x7F]+', '', text)  # Eliminar caracteres no ASCII
    return text

# Función para extraer datos usando expresiones regulares
def extract_data(text):
    # Patrón para capturar premios
    pattern = re.compile(r'(\d{2}/\d{2}/\d{4}).*?(\d+ Premio de \d+\.\d+ euros para el billete número\s+\d{5})', re.DOTALL)
    matches = pattern.findall(text)
    data = []
    for match in matches:
        date, prize_info = match
        # Patrón para capturar detalles de cada premio
        prize_pattern = re.compile(r'(\d+ Premio de (\d+\.\d+) euros para el billete número\s+(\d{5}))')
        prize_matches = prize_pattern.findall(prize_info)
        for prize_match in prize_matches:
            prize, amount, number = prize_match
            data.append({'Fecha': date, 'Premio': prize, 'Cantidad (euros)': amount, 'Número': number})
    return data

try:
    # Listar todos los archivos PDF en el directorio
    pdf_files = glob.glob(os.path.join(base_path, '*.pdf'))
    
    if not pdf_files:
        raise FileNotFoundError(f'No se encontraron archivos PDF en {base_path}.')

    all_data = []

    for pdf_file in pdf_files:
        print(f'\nProcesando archivo: {pdf_file}')
        # Extraer texto del PDF
        pdf_text = extract_text_from_pdf(pdf_file)
        
        # Limpiar el texto extraído
        cleaned_text = clean_text(pdf_text)
        
        # Imprimir el texto extraído para depuración
        print(f'\nTexto extraído del archivo {pdf_file}:\n{cleaned_text}\n')

        # Extraer datos del texto
        data = extract_data(cleaned_text)
        
        # Imprimir datos extraídos para depuración
        print(f'\nDatos extraídos del archivo {pdf_file}:\n{data}\n')
        
        all_data.extend(data)

    # Verificar si se han extraído datos
    if not all_data:
        print('\nNo se han extraído datos de los archivos PDF.')
    else:
        # Crear un DataFrame de pandas
        df = pd.DataFrame(all_data)

        # Guardar el DataFrame en un archivo Excel
        df.to_excel(excel_path, index=False)

        # Imprimir la información guardada en el documento de Excel
        print(f'\nInformación guardada en el documento de Excel:\n{df}')

        print(f'\nDatos guardados en {excel_path}')
except Exception as e:
    print(f'\nError: {e}')