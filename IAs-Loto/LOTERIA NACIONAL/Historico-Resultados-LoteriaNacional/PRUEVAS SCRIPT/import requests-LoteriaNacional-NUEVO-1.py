import pdfplumber
import pandas as pd
import re

# Ruta específica al archivo PDF
pdf_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016\\SM_LISTAOFICIAL.A2016.S052-1.pdf'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresión regular para buscar y extraer los datos necesarios
patron = re.compile(r'(\d) Premio de ([\d.]+) euros para el billete número.*?(\d+)')

# Abrir el PDF y buscar las frases
with pdfplumber.open(pdf_path) as pdf:
    for pagina in pdf.pages:
        texto = pagina.extract_text()
        for linea in texto.split('\n'):
            match = patron.search(linea)
            if match:
                # Extraer los grupos del match: premio, euros y número
                premio, euros, numero = match.groups()
                datos_premios.append({
                    "Premio": premio,
                    "Euros Billete": euros.replace('.', ''),  # Eliminar puntos en la cantidad de euros
                    "Número": numero
                })

# Convertir los datos a un DataFrame
df_premios = pd.DataFrame(datos_premios)
print(df_premios)
# Guardar los datos en un archivo Excel
df_premios.to_excel('premios_mayores.xlsx', index=False)