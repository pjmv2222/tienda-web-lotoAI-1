import os
import pdfplumber
import re
import glob

# Ruta base donde están almacenados los archivos PDF del año 2016
base_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016'

# Expresión regular para buscar el primer premio específicamente
patron_primer_premio = re.compile(r'1\s*[ºo\s]*? Premio de ([\d.,]+) euros para el billete n[úu]mero\s*\.{0,}\s*(\d{5})')

# Expresión regular para buscar cualquier premio
patron_premio = re.compile(r'(\d[ºo]?) Premio de ([\d.]+(?:,\d{3})*) euros para el billete n[úu]mero\s*\.{0,}\s*(\d{5})')

# Obtener la lista de archivos PDF en la carpeta de 2016
archivos_pdf = glob.glob(os.path.join(base_path, '*.pdf'))

# Lista para almacenar los datos encontrados
datos_premios = []

# Función para normalizar el texto
def normalizar_texto(texto):
    texto = texto.replace('\n', ' ')  # Reemplazar saltos de línea por espacios
    texto = re.sub(r'\s+', ' ', texto)  # Reemplazar múltiples espacios por un solo espacio
    texto = texto.strip()  # Eliminar espacios al inicio y al final
    return texto

# Función para procesar cada archivo PDF
def procesar_pdf(pdf_path):
    print(f"Procesando archivo: {pdf_path}")
    with pdfplumber.open(pdf_path) as pdf:
        for pagina in pdf.pages:
            texto = pagina.extract_text()
            if texto:
                texto = normalizar_texto(texto)
                print(f"Texto extraído de la página: {texto[:500]}...")  # Imprimir los primeros 500 caracteres para depuración
                for linea in texto.split('.'):
                    linea = linea.strip()
                    print(f"Procesando línea: {linea}")  # Imprimir cada línea para depuración
                    match_primer_premio = patron_primer_premio.search(linea)
                    print(f"Resultado de match_primer_premio: {match_primer_premio}")  # Imprimir el resultado del match
                    if match_primer_premio:
                        print(f"Match encontrado: {match_primer_premio.group()}")
                        euros, numero = match_primer_premio.groups()
                        datos_premios.append({
                            "Premio": 1,
                            "Euros Billete": int(euros.replace('.', '').replace(',', '')),
                            "Número": int(numero)
                        })
                        print(f"Encontrado: 1 Premio de {euros} euros para el billete número {numero}")
                    else:
                        print(f"No match encontrado para primer premio en línea: {linea}")
                        match_premio = patron_premio.search(linea)
                        if match_premio:
                            premio, euros, numero = match_premio.groups()
                            datos_premios.append({
                                "Premio": int(premio[0]),
                                "Euros Billete": int(euros.replace('.', '').replace(',', '')),
                                "Número": int(numero)
                            })
                            print(f"Encontrado: {premio} Premio de {euros} euros para el billete número {numero}")
                        else:
                            print(f"No match encontrado para premio en línea: {linea}")

# Iterar sobre los archivos PDF en la carpeta de 2016
for pdf_file in archivos_pdf:
    print(f"Procesando archivo PDF: {pdf_file}")  # Imprimir el nombre del archivo PDF
    procesar_pdf(pdf_file)

# Mostrar los datos encontrados
for premio in datos_premios:
    print(f"{premio['Premio']} Premio: {premio['Euros Billete']} euros, Número: {premio['Número']}")