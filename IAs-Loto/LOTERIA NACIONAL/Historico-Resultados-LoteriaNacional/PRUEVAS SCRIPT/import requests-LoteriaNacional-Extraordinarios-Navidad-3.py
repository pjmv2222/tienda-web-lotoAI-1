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

# Lista para almacenar los datos extraídos
data = []

# Patrón para buscar las cantidades
pattern = r'(4\.000\.000|1\.250\.000|500\.000|200\.000|60\.000)\s*(DE)?\s*EUROS'

# Recorrer todos los archivos PDF en el directorio
for pdf_file in glob.glob(os.path.join(pdf_dir, '*.pdf')):
    print(f"Procesando archivo: {pdf_file}")
    with pdfplumber.open(pdf_file) as pdf:
        text = '\n'.join(page.extract_text() for page in pdf.pages)
        
        print("Contenido extraído del PDF:")
        print(text[:1000])  # Imprimir los primeros 1000 caracteres para depuración
        print("..." if len(text) > 1000 else "")
        
        # Buscar la fecha del sorteo
        date_match = re.search(r'\d{1,2}\s+de\s+\w+\s+de\s+\d{4}', text)
        if date_match:
            date_str = date_match.group()
            try:
                date = datetime.strptime(date_str, '%d de %B de %Y').strftime('%d/%m/%Y')
                print(f"Fecha encontrada: {date}")
            except ValueError:
                print(f"Error al procesar la fecha: {date_str}")
                date = None
        else:
            date = None
            print("No se encontró fecha")
        
        # Buscar el número del sorteo (opcional)
        sorteo_match = re.search(r'Sorteo\s+(\d+)', text)
        sorteo = sorteo_match.group(1) if sorteo_match else None
        print(f"Sorteo encontrado: {sorteo}" if sorteo else "No se encontró número de sorteo")
        
        # Dividir el texto en líneas
        lines = text.split('\n')
        
        for i, line in enumerate(lines):
            match = re.search(pattern, line)
            if match:
                euros = match.group(1).replace('.', '')
                
                # Buscar el número en la línea anterior
                if i > 0:
                    numero_match = re.search(r'\b(\d{5})\b', lines[i-1])
                    if numero_match:
                        numero = numero_match.group(1)
                    else:
                        numero = "No encontrado"
                else:
                    numero = "No encontrado"
                
                # Determinar la categoría basada en la cantidad
                if euros == '4000000':
                    categoria = 'Primer Premio'
                elif euros == '1250000':
                    categoria = 'Segundo Premio'
                elif euros == '500000':
                    categoria = 'Tercer Premio'
                elif euros == '200000':
                    categoria = 'Cuarto Premio'
                elif euros == '60000':
                    categoria = 'Quinto Premio'
                
                # Agregar los datos a la lista
                data.append([date, sorteo, euros, numero, categoria])
                print(f"Datos añadidos: {date}, {sorteo}, {euros}, {numero}, {categoria}")

# Crear un DataFrame con los datos extraídos
df = pd.DataFrame(data, columns=['Fecha', 'Sorteo', 'Euros', 'Número', 'Categoria'])

# Guardar el DataFrame en un archivo Excel
df.to_excel(excel_file, index=False)

print(f"Los datos se han guardado en {excel_file}")
print(f"Total de registros capturados: {len(data)}")