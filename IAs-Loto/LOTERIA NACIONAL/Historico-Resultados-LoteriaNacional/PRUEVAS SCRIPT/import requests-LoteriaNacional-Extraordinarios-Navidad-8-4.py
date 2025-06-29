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

def extract_text_from_area(page, bbox):
    crop = page.crop(bbox)
    return crop.extract_text().strip()

def process_pdf(pdf_file):
    with pdfplumber.open(pdf_file) as pdf:
        text = ''
        tables = []
        for page in pdf.pages:
            text += page.extract_text() + '\n'
            tables.extend(page.extract_tables())

        # Extraer fecha y número de sorteo
        date_match = re.search(r'\d{1,2}\s+de\s+\w+\s+de\s+\d{4}', text, re.IGNORECASE)
        date = datetime.strptime(date_match.group(), '%d de %B de %Y').strftime('%d/%m/%Y') if date_match else None
        sorteo_match = re.search(r'SORTEO\s+NÚM.\s*(\d+)', text, re.IGNORECASE)
        sorteo = sorteo_match.group(1) if sorteo_match else None

        premios = []
        for table in tables:
            for row in table:
                # Convertir todos los elementos de la fila a strings
                row = [str(cell).strip() if cell is not None else '' for cell in row]
                
                # Buscar números de 5 dígitos en la fila
                numeros = [cell for cell in row if re.match(r'^\d{5}$', cell)]
                
                # Buscar montos de premios en la fila
                montos = [cell for cell in row if re.search(r'(4\.000\.000|1\.250\.000|500\.000|200\.000|60\.000)', cell)]
                
                if numeros and montos:
                    numero = numeros[0]
                    monto = re.search(r'(4\.000\.000|1\.250\.000|500\.000|200\.000|60\.000)', montos[0]).group(1)
                    monto = monto.replace('.', '')
                    premios.append((numero, monto))

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
