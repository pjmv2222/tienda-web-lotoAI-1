import pdfplumber
import pandas as pd
import os
import pdfminer.six  # Aunque esta importación es redundante para el funcionamiento de pdfplumber, se incluye para claridad

# El resto del código permanece igual...

try:
    # Abrir el archivo PDF
    with pdfplumber.open(ruta_completa) as pdf:
        # Iterar sobre cada página del PDF
        for numero_pagina, pagina in enumerate(pdf.pages):
            # Extraer el texto de la página
            texto = pagina.extract_text()
            if texto:  # Verificar si se extrajo texto
                columnas_datos = procesar_pagina(texto)
                # Para cada columna, crear un DataFrame y escribirlo en una hoja separada
                for i, columna_datos in enumerate(columnas_datos):
                    df = pd.DataFrame(columna_datos, columns=['Números', 'Euros/Billete'])
                    # Usar el nombre del archivo y el número de columna como nombre de la hoja
                    nombre_base_hoja = f'{os.path.splitext(archivo)[0]}_p{numero_pagina}_col{i}'
                    nombre_hoja = (nombre_base_hoja[:31-len(str(i))-5] if len(nombre_base_hoja) > 31 else nombre_base_hoja)
                    df.to_excel(writer, sheet_name=nombre_hoja, index=False)
except pdfminer.pdfparser.PDFSyntaxError:
    print(f"El archivo {archivo} no es un PDF válido o está dañado.")
except pdfminer.six.exceptions.PDFException as e:  # Capturar errores específicos de pdfminer.six
    print(f"Error de pdfminer al procesar el archivo {archivo}: {e}")
except Exception as e:
    print(f"Error al procesar el archivo {archivo}: {e}")