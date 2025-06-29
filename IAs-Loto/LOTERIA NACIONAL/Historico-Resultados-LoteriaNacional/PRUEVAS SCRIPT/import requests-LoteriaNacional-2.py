import os
import pandas as pd
import pdfplumber
import logging

# Configuración de logging
logging.basicConfig(level=logging.ERROR)

# Definir la estructura del DataFrame
columns = ['Fecha del Sorteo', 'Tipo de Sorteo', 'Categoría del Premio', 'Número Premiado', 'Importe Adjudicado']
data = []

# Directorio base donde se encuentran las carpetas por año
base_dir = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional'

# Iterar sobre los años del 2014 al 2024
for year in range(2014, 2025):
    pdf_dir = os.path.join(base_dir, str(year))
    
    # Verificar si el directorio existe antes de intentar listar su contenido
    if os.path.exists(pdf_dir):
        # Recorrer todos los archivos PDF en el directorio del año
        for filename in os.listdir(pdf_dir):
            if filename.endswith('.pdf'):
                pdf_path = os.path.join(pdf_dir, filename)
                
                try:
                    # Abrir el archivo PDF
                    with pdfplumber.open(pdf_path) as pdf:
                        # Iterar sobre las páginas del PDF
                        for page in pdf.pages:
                            # Extraer la tabla con los datos
                            table = page.extract_table()  # Usar extract_table() para obtener los datos de la tabla
                            
                            # Verificar si se encontró alguna tabla
                            if table:
                                # Extraer los datos de la tabla, ignorando el encabezado
                                for row in table[1:]:  # Asumiendo que el primer elemento de 'table' son los encabezados
                                    fecha_sorteo = row[0]
                                    tipo_sorteo = row[1]
                                    categoria_premio = row[2]
                                    numero_premiado = row[3]
                                    importe_adjudicado = row[4]
                                    
                                    # Agregar los datos al DataFrame
                                    data.append([fecha_sorteo, tipo_sorteo, categoria_premio, numero_premiado, importe_adjudicado])
                except Exception as e:
                    logging.error(f"Error al procesar el archivo PDF {pdf_path}: {e}")
    else:
        print(f"El directorio no existe: {pdf_dir}")

# Crear el DataFrame y establecer los nombres de columna
df = pd.DataFrame(data, columns=columns)

# Guardar el DataFrame en un archivo Excel
df.to_excel('datos_loteria-2.xlsx', index=False)