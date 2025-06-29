import requests
import os

base_url = "https://files.eduardolosilla.es/redus/loteria/pdf_listado_premios/"
num_archivos_por_ano = 106  # Asumiendo 106 sorteos por año

# Crear directorios para los años
for i in range(2014, 2024):
    directorio = os.path.join(".", str(i))
    if not os.path.exists(directorio):
        os.makedirs(directorio)

# Descargar archivos PDF de años anteriores al 2024
for i in range(2014, 2024):
    for j in range(1, num_archivos_por_ano + 1):
        url = base_url + f"{i}/SM_LISTAOFICIAL.A{i}.S0{j:02d}.pdf"
        response = requests.get(url)
        
        if response.status_code == 200 and response.headers['Content-Type'] == 'application/pdf':
            with open(os.path.join(".", str(i), f"SM_LISTAOFICIAL.A{i}.S0{j:02d}.pdf"), "wb") as file:
                file.write(response.content)
            print(f"Descargado: {url}")
        else:
            print(f"Error al descargar: {url}")