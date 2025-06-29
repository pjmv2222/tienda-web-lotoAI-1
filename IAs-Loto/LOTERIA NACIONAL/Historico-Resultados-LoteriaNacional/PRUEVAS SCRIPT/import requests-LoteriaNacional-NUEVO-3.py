import pdfplumber
import pandas as pd
import re
from datetime import datetime

# Ruta específica al archivo PDF
pdf_path = 'C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional\\2014\\SM_LISTAOFICIAL.A2014.S001.pdf'

# Lista para almacenar los datos encontrados
datos_premios = []

# Expresión regular para buscar y extraer las fechas
patron_fecha = re.compile(r'(\d{1,2}) de ([a-z]+) de (\d{4})')

# Expresión regular para buscar y extraer los datos de los premios
patron_premio = re.compile(r'(\d) Premio de ([\d.]+) euros para el billete número.*?(\d+)')

# Variable para almacenar la fecha del sorteo y si es un sorteo extraordinario
fecha_sorteo = None
es_sorteo_extraordinario = False

# Diccionario para convertir el mes de texto a número
meses = {
    "enero": 1, "febrero": 2, "marzo": 3, "abril": 4,
    "mayo": 5, "junio": 6, "julio": 7, "agosto": 8,
    "septiembre": 9, "octubre": 10, "noviembre": 11, "diciembre": 12
}

# Función para determinar la categoría del premio
def determinar_categoria(euros, es_sorteo_extraordinario):
    if es_sorteo_extraordinario:
        if euros == 1000000:
            return "Segundo Premio Extraordinario"
        elif 300000 <= euros <= 1300000:
            return "Primer Premio"
        else:
            return "Otro Premio"
    else:
        if 300000 <= euros <= 1300000:
            return "Primer Premio"
        elif euros <= 250000:
            return "Segundo Premio"
        else:
            return "Otro Premio"

# Abrir el PDF y buscar las frases
with pdfplumber.open(pdf_path) as pdf:
    for pagina in pdf.pages:
        texto = pagina.extract_text()
        # Buscar la fecha del sorteo si aún no se ha encontrado
        if not fecha_sorteo:
            match_fecha = patron_fecha.search(texto)
            if match_fecha:
                dia, mes_texto, año = match_fecha.groups()
                mes = meses[mes_texto]
                fecha_sorteo = datetime(day=int(dia), month=mes, year=int(año))
        # Determinar si es un sorteo extraordinario
        if "SORTEO EXTRAORDINARIO DE VACACIONES" in texto.upper():
            es_sorteo_extraordinario = True
        # Procesar cada línea en busca de premios
        for linea in texto.split('\n'):
            match_premio = patron_premio.search(linea)
            if match_premio:
                premio, euros, numero = match_premio.groups()
                euros_int = int(euros.replace('.', ''))
                categoria = determinar_categoria(euros_int, es_sorteo_extraordinario)
                datos_premios.append({
                    "Fecha": fecha_sorteo.strftime('%d/%m/%Y'),
                    "Premio": int(premio),
                    "Euros Billete": euros_int,
                    "Número": int(numero),
                    "Categoría": categoria
                })

# Convertir los datos a un DataFrame
df_premios = pd.DataFrame(datos_premios)

# Guardar los datos en un archivo Excel
df_premios.to_excel('premios_mayores.xlsx', index=False)