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
excel_file = 'Premios-Extraordinarios-Navidad-Combinado.xlsx'

def extract_formatted_text(page):
    words = page.extract_words(keep_blank_chars=True, use_text_flow=True, extra_attrs=['size'])
    return [w for w in words if 8.5 <= w['size'] <= 11.5 and w['text'].isdigit() and len(w['text']) == 5]

def process_pdf(pdf_file):
    with pdfplumber.open(pdf_file) as pdf:
        all_words = []
        text = ''
        for page in pdf.pages:
            all_words.extend(extract_formatted_text(page))
            text += page.extract_text() + '\n'
    
    all_words.sort(key=lambda w: (w['top'], w['x0']))
    
    # Extraer fecha y número de sorteo
    date_match = re.search(r'\d{1,2}\s+de\s+\w+\s+de\s+\d{4}', text, re.IGNORECASE)
    date = datetime.strptime(date_match.group(), '%d de %B de %Y').strftime('%d/%m/%Y') if date_match else None
    
    sorteo_match = re.search(r'SORTEO\s+NÚM.\s*(\d+)', text, re.IGNORECASE)
    sorteo = sorteo_match.group(1) if sorteo_match else None

    # Extraer números premiados
    numeros_premiados = [w['text'] for w in all_words][:13]  # Tomamos solo los primeros 13 números

    # Definir los montos y categorías en el orden correcto
    premios_orden = [
        ('4000000', 'Primer Premio'),
        ('1250000', 'Segundo Premio'),
        ('500000', 'Tercer Premio'),
        ('200000', 'Cuarto Premio'),
        ('200000', 'Cuarto Premio'),
        ('60000', 'Quinto Premio'),
        ('60000', 'Quinto Premio'),
        ('60000', 'Quinto Premio'),
        ('60000', 'Quinto Premio'),
        ('60000', 'Quinto Premio'),
        ('60000', 'Quinto Premio'),
        ('60000', 'Quinto Premio'),
        ('60000', 'Quinto Premio')
    ]

    # Combinar números extraídos con montos y categorías
    premios = list(zip(numeros_premiados, premios_orden))

    print(f"Premios encontrados: {premios}")
    
    data = []
    for i, (numero, (monto, categoria)) in enumerate(premios, 1):
        subcategoria = f"{i}º {categoria}" if categoria == "Quinto Premio" else categoria
        data.append([date, sorteo, monto, numero, subcategoria])
        print(f"Datos añadidos: {date}, {sorteo}, {monto}, {numero}, {subcategoria}")
    
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