import os
import re
from PyPDF2 import PdfReader
from openpyxl import Workbook

# Ruta al directorio donde se encuentran los archivos PDF
pdf_directory = r'C:\Users\Pedro\Desktop\LotoIA\LOTERIA NACIONAL\Historico-Resultados-LoteriaNacional\NAVIDAD'

# Lista de premios a buscar
premios = [4000000, 1250000, 500000, 200000, 60000]

# Crear un nuevo archivo Excel
wb = Workbook()
ws = wb.active
ws.title = "Premios Extraordinarios Navidad"

# Escribir los encabezados en el archivo Excel
ws.append(["Fecha", "Sorteo", "Euros", "Número", "Categoría"])

# Procesar cada archivo PDF en el directorio
for filename in os.listdir(pdf_directory):
    if filename.endswith(".pdf"):
        file_path = os.path.join(pdf_directory, filename)
        print(f"Procesando archivo: {filename}")
        with open(file_path, 'rb') as file:
            pdf = PdfReader(file)
            for page_num in range(len(pdf.pages)):
                page = pdf.pages[page_num]
                text = page.extract_text()
                if text:
                    print(f"Archivo: {filename}, Página: {page_num + 1}")
                    print(text)
                    for premio in premios:
                        # Buscar el premio y su número asociado
                        match = re.search(rf'{premio}\s*\n*\s*(\d{{5}})', text)
                        if match:
                            numero = match.group(1)
                            print(f"Premio encontrado: {premio}, Número: {numero}")
                            ws.append([filename, page_num + 1, premio, numero, "Extraordinario"])

# Guardar el archivo Excel
wb.save('Premios-Extraordinarios-Navidad.xlsx')
