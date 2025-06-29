import sys
import os
import pdfplumber
import pandas as pd
import re
from datetime import datetime

# Reconfigurar la salida estándar para usar UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Ruta específica al archivo PDF
pdf_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016\\SM_LISTAOFICIAL.A2016.S052-1.pdf'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresión regular ajustada para buscar y extraer los datos necesarios
patron = re.compile(r'(\d+) Premio de ([\d.,]+) euros para el billete n[úu]mero.*?(\d{5})', re.IGNORECASE)

# Función para imprimir caracteres en formato hexadecimal
def imprimir_hex(texto):
    return ' '.join(f'{ord(c):02x}' for c in texto)

# Abrir el PDF y buscar las frases
with pdfplumber.open(pdf_path) as pdf:
    for pagina in pdf.pages:
        texto = pagina.extract_text()
        for linea in texto.split('\n'):
            print(f"Procesando línea: {linea}")  # Mensaje de depuración
            print(f"Hexadecimal: {imprimir_hex(linea)}")  # Imprimir caracteres en formato hexadecimal
            # Intentar decodificar la línea si es necesario
            try:
                linea = linea.encode('latin1').decode('utf-8')
            except UnicodeDecodeError:
                pass  # Si falla, continuar con la línea original
            # Ajustar la línea para eliminar puntos suspensivos
            linea = re.sub(r'\.{2,}', ' ', linea)
            match = patron.search(linea)
            if match:
                print(f"Match encontrado: {match.groups()}")  # Mensaje de depuración
                # Extraer los grupos del match: premio, euros y número
                premio, euros, numero = match.groups()
                datos_premios.append({
                    "Premio": int(premio),  # Convertir a entero
                    "Euros Billete": int(euros.replace('.', '').replace(',', '')),  # Eliminar puntos y comas, y convertir a entero
                    "Número": int(numero)  # Convertir a entero
                })
            else:
                print(f"Línea no coincidente: {linea}")  # Imprimir líneas que no coinciden
                print(f"Hexadecimal no coincidente: {imprimir_hex(linea)}")  # Imprimir caracteres en formato hexadecimal para análisis

# Convertir los datos a un DataFrame
df_premios = pd.DataFrame(datos_premios)
print(df_premios)
# Guardar los datos en un archivo Excel
df_premios.to_excel('premios_mayores.xlsx', index=False)