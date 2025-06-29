import os
import requests

# Ruta de guardado para los archivos PDF descargados
download_folder = "C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional-NUEVA-0"

# Nueva URL base
base_url = "https://www.loteriasyapuestas.es/f/loterias/documentos/Loter%C3%ADa%20Nacional/listas%20de%20premios/"

# Rango de años y sorteos
years = range(2013, 2025)
sorteos = range(1, 103)  # S001 a S102

# Crear la ruta de guardado si no existe
if not os.path.exists(download_folder):
    os.makedirs(download_folder)

# Generar URLs y descargar archivos
for year in years:
    for sorteo in sorteos:
        # Formatos posibles
        filenames = [
            f"SM_LISTAOFICIAL A{year} S{sorteo:03d}.pdf",
            f"SM_LISTAOFICIAL A{year}.S{sorteo:03d}.pdf",
            f"SM_LISTAOFICIAL.A{year} S{sorteo:03d}.pdf",
            f"SM_LISTAOFICIAL.A{year}.S{sorteo:03d}.pdf"
        ]
        
        for filename in filenames:
            url = base_url + filename
            response = requests.get(url)
            
            # Intentar descargar el archivo
            if response.status_code == 200:
                with open(os.path.join(download_folder, filename), "wb") as f:
                    f.write(response.content)
                print(f"Descargado: {filename}")
                break  # Salir del bucle si se encuentra el archivo
            else:
                print(f"No encontrado: {filename}")

print("Descarga completada.")