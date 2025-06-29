import fitz  # PyMuPDF
import os
import sys
import re

# Reconfigurar la salida estándar para usar UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

def extract_text_from_pdf(pdf_path):
    # Abrir el documento PDF
    doc = fitz.open(pdf_path)
    text = ""

    # Iterar sobre todas las páginas del documento
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text()

    return text

def find_phrase_in_text(text, phrase_pattern):
    # Buscar la frase en el texto extraído usando una expresión regular
    match = re.search(phrase_pattern, text)
    if match:
        return match.group(0)
    return None

def main():
    # Ruta del archivo PDF
    pdf_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016\\SM_LISTAOFICIAL.A2016.S052-1.pdf'

    # Patrón de la frase a buscar
    phrase_pattern = r"1 Premio de 2\.000\.000 de euros para el billete número\s*\d{5}"

    # Extraer texto del PDF
    text = extract_text_from_pdf(pdf_path)

    # Depurar: Imprimir el texto extraído
    print("Texto extraído del PDF:")
    print(text)

    # Buscar la frase en el texto extraído
    result = find_phrase_in_text(text, phrase_pattern)

    if result:
        print("Frase encontrada:", result)
        # Extraer los números del billete usando una expresión regular
        match = re.search(r'(\d{5})', result)
        if match:
            billete_numero = match.group(1)
            print("Número del billete:", billete_numero)
        else:
            print("Frase encontrada, pero no se encontró el número del billete.")
    else:
        print("La frase no se encontró en el documento.")

if __name__ == "__main__":
    main()
