import os
import PyPDF2
import tabula
import re
import pandas as pd

# Definir ruta del archivo PDF
file_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\NAVIDAD\\SM_LISTAOFICIAL.A2013.S102.pdf'

# Abrir archivo PDF en modo lectura binaria
with open(file_path, 'rb') as f:
    pdf = PyPDF2.PdfReader(f)


# Inicializar lista de premios
premios = []

# Leer cada página del PDF
for page in pdf.pages:
    text = page.extractText()

    # Convertir texto a minúsculas
    text = text.lower()

    # Quitar caracteres especiales y números
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    # Quitar espacios en blanco adicionales
    text = os.linesep.join([s for s in text.splitlines() if s])

    # Leer tablas del PDF
    tables = tabula.read_pdf(file_path, pages='all')

    # Procesar cada tabla
    for table in tables:
        # Procesar cada fila de la tabla
        for index, row in table.iterrows():
            # ...
            # Buscar números de premio en la primera columna
            if row[0].strip() == '':
                number = row[1].strip()  # número de premio
                prize = table.iloc[index-1, 1].strip()  # monto del premio (celda de arriba)
                premios.append((number, prize))

# Quitar duplicados y ordenar lista de premios
premios = list(set(premios))
premios.sort()

# Crear un DataFrame con la lista de premios
df = pd.DataFrame(premios, columns=['Número de Premio', 'Monto del Premio'])

# Guardar DataFrame en un archivo Excel
df.to_excel('premios.xlsx', index=False)

print('Lista de premios generada con éxito!')
