import sys
import os
import pdfplumber
import pandas as pd
import re
from datetime import datetime
import glob
import locale
import tabula

# Configurar el locale a español
locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')
tables = tabula.read_pdf(file_path, pages='all')

for table in tables:
    for index, row in table.iterrows():
        if row[0].strip() == '':  # asumiendo que la primera columna es la que contiene los números de premios
            number = row[1].strip()  # número de premio
            prize = table.iloc[index-1, 1].strip()  # monto del premio (celda de arriba)
            premios.append((number, prize))
def extract_formatted_text(page):
    words = page.extract_words(keep_blank_chars=True, use_text_flow=True)
    return words


def process_pdf(pdf_file):
    with pdfplumber.open(pdf_file) as pdf:
        all_words = []
        for page in pdf.pages:
            all_words.extend(extract_formatted_text(page))

    all_words.sort(key=lambda w: (w['top'], w['x0']))
    text = ' '.join([w['text'] for w in all_words])

    # Buscar la fecha del sorteo
    date_match = re.search(r'\d{1,2}\s+de\s+\w+\s+de\s+\d{4}', text, re.IGNORECASE)
    date = None
    if date_match:
        date_str = date_match.group()
        try:
            date = datetime.strptime(date_str, '%d de %B de %Y').strftime('%d/%m/%Y')
            print(f"Fecha encontrada: {date}")
        except ValueError as e:
            print(f"Error al procesar la fecha: {date_str}. Error: {e}")

    if not date:
        print("No se encontró fecha en ningún formato conocido")

    # Buscar el número del sorteo
    sorteo_match = re.search(r'SORTEO\s+NÚM.\s*(\d+)', text, re.IGNORECASE)
    sorteo = sorteo_match.group(1) if sorteo_match else None
    print(f"Sorteo encontrado: {sorteo}" if sorteo else "No se encontró número de sorteo")

    # Extraer premios
    premios = []
    premio_patterns = [
    (r'Premio\s+Especial\s+(\d{5})', '4000000'),
    (r'Premio\s+Especial\s+de\s+Navidad\s+(\d{5})', '1250000'),
    (r'Premio\s+Especial\s+(\d{5})', '500000'),
    (r'(\d{5}).*?4\.000\.000', '4000000'),
    (r'(\d{5}).*?1\.250\.000', '1250000'),
    (r'(\d{5}).*?500\.000', '500000'),
    (r'(\d{5}).*?200\.000', '200000'),
    (r'(\d{5}).*?60\.000', '60000')
]


    for pattern, monto in premio_patterns:
        matches = re.findall(pattern, text)
        for match in matches:
            premios.append((match, monto))

    print(f"Premios encontrados: {premios}")

    data = []
    for numero, monto in premios:
        categoria = determinar_categoria(monto)
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

# Ejecutar el script
if __name__ == "__main__":
    pdf_dir = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\NAVIDAD'
    excel_file = 'Premios-Extraordinarios-Navidad-8.xlsx'

    all_data = []
    for pdf_file in glob.glob(os.path.join(pdf_dir, '*.pdf')):
        print(f"Procesando archivo: {pdf_file}")
        all_data.extend(process_pdf(pdf_file))

if all:
# Línea corregida
        df = pd.DataFrame(all_data, columns=['Fecha', 'Sorteo', 'Euros', 'Número', 'Categoria'])
        df.to_excel(excel_file, index=False)
        print(f"Los datos se han guardado en {excel_file}")
        print(f"Total de registros capturados: {len(all_data)}")
else:
        print("No se encontraron datos para guardar en el archivo Excel.")
