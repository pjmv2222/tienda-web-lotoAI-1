import pdfplumber
import pandas as pd
import re

# Ruta específica al archivo PDF
pdf_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016\\SM_LISTAOFICIAL.A2016.S052-1.pdf'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresión regular para buscar frases que comienzan con "1 Premio de"
patron = re.compile(r'1 Premio de.*')

# Abrir el PDF y buscar las frases
with pdfplumber.open(pdf_path) as pdf:
    for pagina in pdf.pages:
        texto = pagina.extract_text()
        for linea in texto.split('\n'):
            if patron.match(linea):
                datos_premios.append(linea)

# Convertir los datos a un DataFrame
df_premios = pd.DataFrame(datos_premios, columns=['Descripción del Premio'])
print(df_premios)
# Guardar los datos en un archivo Excel
df_premios.to_excel('premios_mayores-NUEVO.xlsx', index=False)