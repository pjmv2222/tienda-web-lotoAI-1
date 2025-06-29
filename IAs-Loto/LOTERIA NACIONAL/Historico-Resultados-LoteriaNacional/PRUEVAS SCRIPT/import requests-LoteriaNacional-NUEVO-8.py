import sys
import os
import pdfplumber
import re

# Reconfigurar la salida estándar para usar UTF-8
sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

# Ruta específica al archivo PDF
pdf_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016\\SM_LISTAOFICIAL.A2016.S052-1.pdf'

# Expresión regular generalizada para el primer premio
regex_premio = re.compile(r'(\d)\s*Premio\s*de\s*([\d\.]+)\s*de\s*euros\s*para\s*el\s*billete\s*número\s*([\d]+)', re.IGNORECASE)

# Abrir el PDF y buscar el primer premio
with pdfplumber.open(pdf_path) as pdf:
    for i, pagina in enumerate(pdf.pages):
        texto = pagina.extract_text()
        if texto:
            print(f"Texto completo de la página {i+1}:\n{texto}\n{'-'*40}")
            # Buscar el primer premio en el texto
            premios = regex_premio.findall(texto)
            for premio in premios:
                print(f"Premio encontrado: {premio}")