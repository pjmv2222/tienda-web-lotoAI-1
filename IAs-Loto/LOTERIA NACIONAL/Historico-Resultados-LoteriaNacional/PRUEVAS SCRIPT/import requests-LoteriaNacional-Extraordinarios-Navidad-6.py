import sys
import os
import pdfplumber
import pandas as pd
import re
from datetime import datetime
import glob
import locale

# Configurar el locale a español
locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
# Reconfigurar la salida estándar para usar UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Directorio de los archivos PDF
pdf_dir = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\NAVIDAD'

# Nombre del archivo Excel de salida
excel_file = 'Premios-Extraordinarios-Navidad.xlsx'

def extract_formatted_text(page):
    words = page.extract_words(keep_blank_chars=True, use_text_flow=True, extra_attrs=['size'])
    return [w for w in words if 8.5 <= w['size'] <= 11.5 and w['text'].isdigit() and len(w['text']) == 5]

def process_pdf(pdf_file):
    with pdfplumber.open(pdf_file) as pdf:
        all_words = []
        for page in pdf.pages:
            all_words.extend(extract_formatted_text(page))
    
    # Ordenar palabras por posición vertical (top) y luego horizontal (x0)
    all_words.sort(key=lambda w: (w['top'], w['x0']))
    
    print("Palabras extraídas (primeras 20):")
    for word in all_words[:20]:
        print(f"Texto: {word['text']}, Tamaño: {word['size']}")

    # Buscar la fecha del sorteo
    date_text = ' '.join([w['text'] for w in all_words if w['text'].lower() in ['de', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']])
    date_match = re.search(r'\d{1,2}\s+de\s+\w+\s+de\s+\d{4}', date_text)
    date = date_match.group() if date_match else None
    if date:
        try:
            date = datetime.strptime(date, '%d de %B de %Y').strftime('%d/%m/%Y')
            print(f"Fecha encontrada: {date}")
        except ValueError:
            print(f"Error al procesar la fecha: {date}")
            date = None
    else:
        print("No se encontró fecha")
    
    # Buscar el número del sorteo (opcional)
    sorteo_text = ' '.join([w['text'] for w in all_words if 'sorteo' in w['text'].lower()])
    sorteo_match = re.search(r'Sorteo\s+(\d+)', sorteo_text)
    sorteo = sorteo_match.group(1) if sorteo_match else None
    print(f"Sorteo encontrado: {sorteo}" if sorteo else "No se encontró número de sorteo")
    
    # Identificar números premiados basados en el formato
    premios = []
    for i, word in enumerate(all_words):
        if 8.5 <= word['size'] <= 11.5:  # Rango para capturar 9 y 11.1 pt
            monto = next((w['text'] for w in all_words[i+1:i+10] if re.match(r'(4\.000\.000|1\.250\.000|500\.000|200\.000|60\.000)', w['text'])), None)
            if monto:
                premios.append((word['text'], monto))

    print(f"Premios encontrados: {premios}")
    
    data = []
    for numero, monto in premios:
        euros = monto.replace('.', '')
        categoria = determinar_categoria(euros)
        data.append([date, sorteo, euros, numero, categoria])
        print(f"Datos añadidos: {date}, {sorteo}, {euros}, {numero}, {categoria}")
    
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

# Lista para almacenar los datos extraídos
data = []

# Recorrer todos los archivos PDF en el directorio
for pdf_file in glob.glob(os.path.join(pdf_dir, '*.pdf')):
    print(f"Procesando archivo: {pdf_file}")
    data.extend(process_pdf(pdf_file))

# Crear un DataFrame con los datos extraídos
df = pd.DataFrame(data, columns=['Fecha', 'Sorteo', 'Euros', 'Número', 'Categoria'])

# Guardar el DataFrame en un archivo Excel
df.to_excel(excel_file, index=False)

print(f"Los datos se han guardado en {excel_file}")
print(f"Total de registros capturados: {len(data)}")