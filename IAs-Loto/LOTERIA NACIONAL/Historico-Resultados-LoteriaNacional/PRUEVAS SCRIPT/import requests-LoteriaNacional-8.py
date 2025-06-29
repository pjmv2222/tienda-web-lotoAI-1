import os
import pandas as pd
import pdfplumber
import logging
import re  # Importar el módulo re para expresiones regulares

# Configuración de logging
logging.basicConfig(level=logging.ERROR)

# Definir la estructura del DataFrame
columns = ['0 Números Euros/Billete', '1 Números Euros/Billete', '2 Números Euros/Billete', '3 Números Euros/Billete', '4 Números Euros/Billete',
           '5 Números Euros/Billete', '6 Números Euros/Billete', '7 Números Euros/Billete', '8 Números Euros/Billete', '9 Números Euros/Billete']
data = []

# Ruta al archivo PDF específico
pdf_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2014\\SM_LISTAOFICIAL.A2014.S001.pdf'

# Definir la función para limpiar y formatear los números
def limpiar_formato_numero(numero):
    if numero is None:
        return ''
    numero_str = str(numero)
    numero_limpio = numero_str.replace('.', '').replace(',', '')
    if not re.match(r'^\d+$', numero_limpio):
        logging.error(f"Valor no numérico encontrado: {numero}")
        return numero_str
    longitud = len(numero_limpio)
    if longitud > 8:
        parte_entera = numero_limpio[:5]
        parte_decimal = numero_limpio[5:]
        try:
            numero_formateado = f"{parte_entera} {int(parte_decimal[:3]):,}.{parte_decimal[3:]}"
        except ValueError as e:
            logging.error(f"Error al formatear el número {numero_limpio}: {e}")
            return numero_limpio
        numero_formateado = numero_formateado.replace(',', '.')
    elif longitud > 5:
        numero_formateado = numero_limpio[:5] + ' ' + numero_limpio[5:]
    else:
        numero_formateado = numero_limpio
    return numero_formateado

try:
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            table = page.extract_table()
            if table:
                for row in table[1:]:
                    row_limpia = [limpiar_formato_numero(str(celda)) for celda in row[:10]]
                    data.append(row_limpia)
except Exception as e:
    logging.error(f"Error al procesar el archivo PDF {pdf_path}: {e}")

df = pd.DataFrame(data, columns=columns)

# Función para verificar si el contenido de una celda es numérico
def es_numerico(valor):
    if re.match(r'^\d+(\.\d+)?$', str(valor)):
        return True
    return False

# Función para verificar si el contenido de una celda es "None"
def es_none(valor):
    return str(valor).strip().lower() == "none"

# Imprimir valores únicos para cada columna
for columna in df.columns:
    print(f"Valores únicos en la columna {columna}: {df[columna].unique()}")

# Identificar y mostrar valores no numéricos o diferentes de "None"
def mostrar_valores_no_esperados(df, columnas_numericas, columnas_none):
    for columna in columnas_numericas:
        valores_no_numericos = df[~df[columna].apply(es_numerico)][columna]
        print(f"Valores no numéricos en la columna {columna}: {valores_no_numericos.unique()}")
    for columna in columnas_none:
        valores_diferentes_de_none = df[~df[columna].apply(es_none)][columna]
        print(f"Valores diferentes de 'None' en la columna {columna}: {valores_diferentes_de_none.unique()}")

columnas_numericas = ['0 Números Euros/Billete', '1 Números Euros/Billete', '2 Números Euros/Billete', '3 Números Euros/Billete', '5 Números Euros/Billete', '7 Números Euros/Billete']
columnas_none = ['4 Números Euros/Billete', '6 Números Euros/Billete', '8 Números Euros/Billete', '9 Números Euros/Billete']

mostrar_valores_no_esperados(df, columnas_numericas, columnas_none)

df.to_excel('datos_loteria-2.xlsx', index=False)