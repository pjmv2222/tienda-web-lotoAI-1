import pdfplumber
import pandas as pd
import re
from datetime import datetime

# Definir la función para capturar el primer premio
def capturar_primer_premio(pdf_path):
    datos_primer_premio = []
    patron_fecha = re.compile(r'(\d{1,2}) de ([a-z]+) de (\d{4})')
    regex_primer_premio = re.compile(r'1\s*Premio\s*de\s*([\d\.]+)\s*de\s*euros\s*para\s*el\s*billete\s*número\s*[\.\s]*(\d+)', re.IGNORECASE)
    fecha_sorteo = None
    meses = {
        "enero": 1, "febrero": 2, "marzo": 3, "abril": 4,
        "mayo": 5, "junio": 6, "julio": 7, "agosto": 8,
        "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
    }
    with pdfplumber.open(pdf_path) as pdf:
        for pagina in pdf.pages:
            texto = pagina.extract_text()
            print(f"Texto completo de la página:\n{texto}\n{'-'*40}")
            if not fecha_sorteo:
                match_fecha = patron_fecha.search(texto)
                if match_fecha:
                    dia, mes_texto, año = match_fecha.groups()
                    mes = meses[mes_texto]
                    fecha_sorteo = datetime(day=int(dia), month=mes, year=int(año))
                    print(f"Fecha del sorteo encontrada: {fecha_sorteo.strftime('%d/%m/%Y')}")
            primer_premio = regex_primer_premio.search(texto)
            if primer_premio:
                euros, numero = primer_premio.groups()
                datos_primer_premio.append({
                    "Fecha": fecha_sorteo.strftime('%d/%m/%Y'),
                    "Premio": 1,
                    "Euros Billete": int(euros.replace('.', '')),
                    "Número": int(numero)
                })
                print(f"Primer Premio encontrado: {euros} euros, Número: {numero}")
                break
    return datos_primer_premio

# Definir la función para capturar el segundo y tercer premio
def capturar_segundo_tercer_premio(pdf_path):
    datos_premios = []
    patron_fecha = re.compile(r'(\d{1,2}) de ([a-z]+) de (\d{4})')
    patron_premio = re.compile(r'(\d)\s*Premio\s*de\s*([\d\.]+)\s*euros\s*para\s*el\s*billete\s*número\s*([\d\.]+)', re.IGNORECASE)
    fecha_sorteo = None
    meses = {
        "enero": 1, "febrero": 2, "marzo": 3, "abril": 4,
        "mayo": 5, "junio": 6, "julio": 7, "agosto": 8,
        "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
    }
    with pdfplumber.open(pdf_path) as pdf:
        for pagina in pdf.pages:
            texto = pagina.extract_text()
            print(f"Texto completo de la página:\n{texto}\n{'-'*40}")
            if not fecha_sorteo:
                match_fecha = patron_fecha.search(texto)
                if match_fecha:
                    dia, mes_texto, año = match_fecha.groups()
                    mes = meses[mes_texto]
                    fecha_sorteo = datetime(day=int(dia), month=mes, year=int(año))
                    print(f"Fecha del sorteo encontrada: {fecha_sorteo.strftime('%d/%m/%Y')}")
            premios = patron_premio.findall(texto)
            for premio in premios:
                tipo_premio, euros, numero = premio
                if tipo_premio in ['2', '3']:
                    datos_premios.append({
                        "Fecha": fecha_sorteo.strftime('%d/%m/%Y'),
                        "Premio": int(tipo_premio),
                        "Euros Billete": int(euros.replace('.', '')),
                        "Número": int(numero.replace('.', ''))
                    })
                    print(f"{tipo_premio} Premio encontrado: {euros} euros, Número: {numero}")
    return datos_premios

# Ruta específica al archivo PDF
pdf_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2016\\SM_LISTAOFICIAL.A2016.S052-1.pdf'

# Capturar los premios
datos_primer_premio = capturar_primer_premio(pdf_path)
datos_segundo_tercer_premio = capturar_segundo_tercer_premio(pdf_path)

# Unificar los resultados
datos_premios = datos_primer_premio + datos_segundo_tercer_premio

# Convertir los datos a un DataFrame
df_premios = pd.DataFrame(datos_premios)
print(df_premios)

# Guardar los datos en un archivo Excel
df_premios.to_excel('premios_mayores.xlsx', index=False)