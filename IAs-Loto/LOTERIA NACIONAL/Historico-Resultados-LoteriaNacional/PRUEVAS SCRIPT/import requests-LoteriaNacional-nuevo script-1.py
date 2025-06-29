import PyPDF2
import pandas as pd
import os
import re
from datetime import datetime

def extraer_texto_pdf(pdf_path):
    texto_paginas = []
    with open(pdf_path, 'rb') as archivo:
        lector_pdf = PyPDF2.PdfReader(archivo)
        for pagina in range(len(lector_pdf.pages)):
            texto = lector_pdf.pages[pagina].extract_text()
            texto_paginas.append(texto)
    return texto_paginas

def buscar_frase(texto_paginas, frase_buscar):
    datos_extraidos = []
    for i, texto in enumerate(texto_paginas):
        texto_unido = " ".join(texto.split())
        print(f"Texto unido de la página {i}: {texto_unido[:200]}...")  # Depuración: muestra los primeros 200 caracteres
        if frase_buscar in texto_unido:
            datos_extraidos.append((i, texto_unido))
    return datos_extraidos

def extraer_datos(frase):
    patron = r"(\d{1,3}(?:\.\d{3})*) de euros para el billete número\s*(\d+)"
    coincidencia = re.search(patron, frase)
    if coincidencia:
        euros_billete = coincidencia.group(1)
        numero = coincidencia.group(2)
        return euros_billete, numero
    return None, None

def determinar_categoria(euros_int, es_sorteo_extraordinario):
    if es_sorteo_extraordinario:
        return "Sorteo Extraordinario"
    else:
        return "Sorteo Regular"

def procesar_pdfs(directorio, frase_buscar):
    datos_finales = []
    for archivo in os.listdir(directorio):
        if archivo.endswith(".pdf"):
            pdf_path = os.path.join(directorio, archivo)
            texto_paginas = extraer_texto_pdf(pdf_path)
            datos_encontrados = buscar_frase(texto_paginas, frase_buscar)
            
            for pagina, texto in datos_encontrados:
                euros_billete, numero = extraer_datos(texto)
                print(f"Datos extraídos: euros_billete={euros_billete}, numero={numero}")  # Depuración
                if euros_billete and numero:
                    fecha = datetime.strptime(archivo.split('.')[0], 'SM_LISTAOFICIAL.A%Y.S%W').strftime('%d/%m/%Y')
                    premio = "1 Premio"
                    categoria = determinar_categoria(int(euros_billete.replace('.', '')), True)
                    datos_finales.append([fecha, premio, int(euros_billete.replace('.', '')), int(numero), categoria])
    
    df = pd.DataFrame(datos_finales, columns=["Fecha", "Premio", "Euros Billete", "Número", "Categoría"])
    df.to_excel("resultados_loteria.xlsx", index=False)

# Uso del script
directorio = "C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016"
frase_buscar = "1 Premio de"
procesar_pdfs(directorio, frase_buscar)