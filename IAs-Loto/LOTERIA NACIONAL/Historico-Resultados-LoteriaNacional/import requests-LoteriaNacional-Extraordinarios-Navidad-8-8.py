import sys
import os
import pdfplumber
import pandas as pd
import re
from datetime import datetime
import glob
import locale

# Configuraciones iniciales
locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

pdf_dir = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\NAVIDAD'
excel_file = os.path.join(pdf_dir, 'Premios-Extraordinarios-Navidad-Combinado-1.xlsx')

def extract_formatted_text(page):
    words = page.extract_words(keep_blank_chars=True, use_text_flow=True, extra_attrs=['size'])
    return words

def classify_premio(monto, index):
    if monto == '4000000':
        return 'Primer Premio', 1
    elif monto == '1250000':
        return 'Segundo Premio', 2
    elif monto == '500000':
        return 'Tercer Premio', 3
    elif monto == '200000':
        return f'{index}º Cuarto Premio', 4
    elif monto == '60000':
        return f'{index}º Quinto Premio', 5
    return 'Desconocido', 6

def process_pdf(pdf_file):
    with pdfplumber.open(pdf_file) as pdf:
        all_words = []
        text = ''
        for page in pdf.pages:
            all_words.extend(extract_formatted_text(page))
            text += page.extract_text() + '\n'
    
    # Extraer fecha y número de sorteo
    date_match = re.search(r'\d{1,2}\s+de\s+\w+\s+de\s+\d{4}', text, re.IGNORECASE)
    date = datetime.strptime(date_match.group(), '%d de %B de %Y').strftime('%d/%m/%Y') if date_match else None
    
    sorteo_match = re.search(r'SORTEO\s+NÚM.\s*(\d+)', text, re.IGNORECASE)
    sorteo = sorteo_match.group(1) if sorteo_match else None

    # Separar números y montos
    numeros = [w for w in all_words if w['text'].isdigit() and len(w['text']) == 5]
    montos = [w for w in all_words if re.match(r'(4\.000\.000|1\.250\.000|500\.000|200\.000|60\.000)', w['text'])]

    # Ordenar por posición vertical
    numeros.sort(key=lambda w: w['top'])
    montos.sort(key=lambda w: w['top'])

    # Combinar números y montos
    premios = list(zip(numeros, montos))

    # Clasificar premios
    clasificados = []
    cuartos_count = 0
    quintos_count = 0

    for numero, monto in premios:
        monto_valor = monto['text'].replace('.', '')
        if monto_valor == '200000':
            cuartos_count += 1
            index = cuartos_count
        elif monto_valor == '60000':
            quintos_count += 1
            index = quintos_count
        else:
            index = 1
        
        categoria, orden = classify_premio(monto_valor, index)
        clasificados.append((date, sorteo, monto_valor, numero['text'], categoria, orden))

    # Ordenar los premios
    clasificados.sort(key=lambda x: (x[0], x[5]))  # Ordenar por fecha y orden de premio

    print(f"Premios encontrados y ordenados: {clasificados}")
    
    return clasificados

# Procesamiento principal
data = []
for pdf_file in glob.glob(os.path.join(pdf_dir, '*.pdf')):
    print(f"Procesando archivo: {pdf_file}")
    data.extend(process_pdf(pdf_file))

df = pd.DataFrame(data, columns=['Fecha', 'Sorteo', 'Euros', 'Número', 'Categoria', 'Orden'])
df = df.drop(columns=['Orden'])  # Eliminar columna de ordenación

# Líneas de depuración adicionales
print(f"Intentando guardar el archivo Excel en: {excel_file}")
print(f"Contenido del DataFrame:")
print(df.head())

df.to_excel(excel_file, index=False)

if os.path.exists(excel_file):
    print(f"El archivo Excel se ha guardado correctamente en: {excel_file}")
else:
    print(f"Error: No se pudo guardar el archivo Excel en: {excel_file}")

print(f"Los datos se han guardado en {excel_file}")
print(f"Total de registros capturados: {len(data)}")