import os
import re
import shutil

# Ruta de la carpeta de descargas
download_folder = "C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional-NUEVA-0"

# Expresión regular para extraer el año del nombre del archivo
year_pattern = re.compile(r'A(\d{4})')

# Recorrer todos los archivos en la carpeta de descargas
for filename in os.listdir(download_folder):
    file_path = os.path.join(download_folder, filename)
    
    # Verificar si es un archivo PDF
    if filename.endswith(".pdf") and os.path.isfile(file_path):
        # Extraer el año del nombre del archivo
        match = year_pattern.search(filename)
        if match:
            year = match.group(1)
            year_folder = os.path.join(download_folder, year)
            
            # Crear la subcarpeta del año si no existe
            if not os.path.exists(year_folder):
                os.makedirs(year_folder)
            
            # Mover el archivo a la subcarpeta correspondiente
            shutil.move(file_path, os.path.join(year_folder, filename))
            print(f"Movido: {filename} a {year_folder}")

print("Archivos ordenados por anualidades.")