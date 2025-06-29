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
    words = page.extract_words(keep_blank_chars=True, use_text_flow=True)
    return words


def process_pdf(pdf_file):
    with pdfplumber.open(pdf_file) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text() + '\n'


    # Buscar la fecha del sorteo
    date_match = re.search(r'\d{1,2}\s+de\s+\w+\s+de\s+\d{4}', text, re.IGNORECASE)
    date = datetime.strptime(date_match.group(), '%d de %B de %Y').strftime('%d/%m/%Y') if date_match else None

    # Buscar el número del sorteo
    sorteo_match = re.search(r'SORTEO\s+NÚM.\s*(\d+)', text, re.IGNORECASE)
    sorteo = sorteo_match.group(1) if sorteo_match else None

    # Extraer premios
    premios = []
    
    # Primer premio
    primer_premio_match = re.search(r'(\d{5}).*?4\.000\.000', text, re.DOTALL)
    if primer_premio_match:
        premios.append((primer_premio_match.group(1), '4000000'))

    # Segundo premio
    segundo_premio_match = re.search(r'(\d{5}).*?1\.250\.000', text, re.DOTALL)
    if segundo_premio_match:
        premios.append((segundo_premio_match.group(1), '1250000'))

    # Tercer premio
    tercer_premio_match = re.search(r'(\d{5}).*?500\.000', text, re.DOTALL)
    if tercer_premio_match:
        premios.append((tercer_premio_match.group(1), '500000'))

    # Cuartos premios
    cuartos_premios = re.findall(r'(\d{5}).*?200\.000', text, re.DOTALL)
    for numero in cuartos_premios:
        premios.append((numero, '200000'))

    # Quintos premios
    quintos_premios = re.findall(r'(\d{5}).*?60\.000', text, re.DOTALL)
    for numero in quintos_premios:
        premios.append((numero, '60000'))

    print(f"Premios encontrados: {premios}")

    data = []
    for numero, monto in premios:
        categoria = determinar_categoria(monto)
        data.append([date, sorteo, monto, numero, categoria])
        print(f"Datos añadidos: {date}, {sorteo}, {monto}, {numero}, {categoria}")

    return data


# ... (resto del código sin cambios)

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
