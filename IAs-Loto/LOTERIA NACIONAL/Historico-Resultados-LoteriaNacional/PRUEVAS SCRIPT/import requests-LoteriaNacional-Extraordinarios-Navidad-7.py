import sys
import os
import pdfplumber
import pandas as pd
import re
from datetime import datetime
import glob
import locale

# Configuraciones iniciales (sin cambios)

def extract_text_and_tables(pdf_file):
    with pdfplumber.open(pdf_file) as pdf:
        text = ''
        for page in pdf.pages:
            text += page.extract_text(layout=True) + '\n'
    return text

def process_pdf(pdf_file):
    text = extract_text_and_tables(pdf_file)
    
    print("Contenido extraído del PDF:")
    print(text[:1000])
    print("..." if len(text) > 1000 else "")
    
    # Buscar la fecha del sorteo
    date_match = re.search(r'(\d{1,2}\s+DE\s+\w+\s+DE\s+\d{4})', text, re.IGNORECASE)
    date = None
    if date_match:
        date_str = date_match.group(1)
        try:
            date = datetime.strptime(date_str, '%d DE %B DE %Y').strftime('%d/%m/%Y')
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
    premio_pattern = r'(\d{5}).*?(4\.000\.000|1\.250\.000|500\.000|200\.000|60\.000)'
    matches = re.findall(premio_pattern, text, re.DOTALL)
    
    for numero, monto in matches:
        numero = numero.strip()
        if len(numero) == 5 and numero.isdigit():
            premios.append((numero, monto))
    
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

# Ejecutar el script
if __name__ == "__main__":
    pdf_dir = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\NAVIDAD'
    excel_file = 'Premios-Extraordinarios-Navidad.xlsx'
    
    data = []
    for pdf_file in glob.glob(os.path.join(pdf_dir, '*.pdf')):
        print(f"Procesando archivo: {pdf_file}")
        data.extend(process_pdf(pdf_file))
    
    df = pd.DataFrame(data, columns=['Fecha', 'Sorteo', 'Euros', 'Número', 'Categoria'])
    df.to_excel(excel_file, index=False)
    
    print(f"Los datos se han guardado en {excel_file}")
    print(f"Total de registros capturados: {len(data)}")