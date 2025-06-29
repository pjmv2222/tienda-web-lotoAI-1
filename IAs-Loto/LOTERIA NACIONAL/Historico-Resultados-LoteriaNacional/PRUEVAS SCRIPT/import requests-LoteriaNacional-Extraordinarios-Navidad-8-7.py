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

def classify_premio(index, monto):
    if monto == '4000000':
        return 'Primer Premio'
    elif monto == '1250000':
        return 'Segundo Premio'
    elif monto == '500000':
        return 'Tercer Premio'
    elif monto == '200000':
        return f"{index}º Cuarto Premio"
    elif monto == '60000':
        return f"{index}º Quinto Premio"
    return 'Desconocido'

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

    # Ordenar premios por la posición del número
    premios.sort(key=lambda p: p[0]['top'])

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
        
        categoria = classify_premio(index, monto_valor)
        clasificados.append((numero['text'], monto_valor, categoria))

    print(f"Premios encontrados: {clasificados}")
    
    data = []
    for numero, monto, categoria in clasificados:
        data.append([date, sorteo, monto, numero, categoria])
        print(f"Datos añadidos: {date}, {sorteo}, {monto}, {numero}, {categoria}")
    
    return data




def determinar_categoria(euros):
    categorias = {
        '4000000': 'Primer Premio',
        '1250000': 'Segundo Premio',
        '500000': 'Tercer Premio',
        '200000': 'Cuarto Premio',
        '60000': 'Quinto Premio'
    }
    return categorias.get(euros, 'Desconocido')

# Procesamiento principal
data = []
for pdf_file in glob.glob(os.path.join(pdf_dir, '*.pdf')):
    print(f"Procesando archivo: {pdf_file}")
    data.extend(process_pdf(pdf_file))

df = pd.DataFrame(data, columns=['Fecha', 'Sorteo', 'Euros', 'Número', 'Categoria'])
df.to_excel(excel_file, index=False)

print(f"Los datos se han guardado en {excel_file}")
print(f"Total de registros capturados: {len(data)}")