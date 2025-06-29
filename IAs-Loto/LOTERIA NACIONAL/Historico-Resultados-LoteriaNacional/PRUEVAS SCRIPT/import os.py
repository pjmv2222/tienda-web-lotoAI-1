import os
import re
import PyPDF2

def extraer_caracteres(frase):
    patron = r"[\w\s\.:,]+|\d+"
    caracteres = re.findall(patron, frase)

    return caracteres

def leer_archivo_pdf(ruta_archivo):
    with open(ruta_archivo, "rb") as f:
        pdf_reader = PyPDF2.PdfReader(f)
        contenido_pdf = ""

        for pagina in range(len(pdf_reader.pages)):
            contenido_pdf += pdf_reader.pages[pagina].extract_text()

    return contenido_pdf

def extraer_caracteres_de_pdf(ruta_archivo):
    contenido_pdf = leer_archivo_pdf(ruta_archivo)
    caracteres = extraer_caracteres(contenido_pdf)

    return caracteres

ruta_archivo = "C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016\\SM_LISTAOFICIAL.A2016.S052-1.pdf"
caracteres = extraer_caracteres_de_pdf(ruta_archivo)
print(caracteres)