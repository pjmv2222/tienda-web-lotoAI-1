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

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

def extract_formatted_text(page):
    words = page.extract_words(keep_blank_chars=True, use_text_flow=True, extra_attrs=['size'])
    return [w for w in words]

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
            (r'(\d{5})\s*\w*\s*\d{1,3}\.\d{2}\s*\w*\s*\d{1,3}\.\d{2}', '4000000'),
            (r'(\d{5})\s*\w*\s*\d{1,3}\.\d{2}\s*\w*\s*\d{1,3}\.\d{2}', '1250000'),
            (r'(\d{5})\s*\w*\s*\d{1,3}\.\d{2}\s*\w*\s*\d{1,3}\.\d{2}', '500000'),
            (r'(\d{5})\s*\w*\s*\d{1,3}\.\d{2}\s*\w*\s*\d{1,3}\.\d{2}', '200000'),
            (r'(\d{5})\s*\w*\s*\d{1,3}\.\d{2}\s*\w*\s*\d{1,3}\.\d{2}', '60000'),
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
        '60000': 'Quinto Premio',
        '10000': 'Sexto Premio',
        '5000': 'Séptimo Premio',
        '1000': 'Octavo Premio',
    }
    return categorias.get(euros, 'Desconocido')

# Ejecutar el script
if __name__ == "__main__":
    pdf_dir = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\NAVIDAD'
    excel_file = 'Premios-Extraordinarios-Navidad-8.xlsx'

    all_data = []
    for pdf_file in glob.glob(os.path.join(pdf_dir, '*.pdf')):
        print(f"Procesando archivo: {pdf_file}")
        data = process_pdf(pdf_file)
        all_data.extend(data)

    if all_data:
        df = pd.DataFrame(all_data, columns=['Fecha', 'Sorteo', 'Euros', 'Número', 'Categoria'])
        df.to_excel(excel_file, index=False)
        print(f"Los datos se han guardado en {excel_file}")
        print(f"Total de registros capturados: {len(all_data)}")
    else:
        print("No se encontraron datos para guardar en el archivo Excel.")