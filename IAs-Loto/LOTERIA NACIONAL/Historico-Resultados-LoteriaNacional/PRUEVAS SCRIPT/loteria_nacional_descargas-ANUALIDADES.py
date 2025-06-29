import os

# Ruta de la carpeta base que contiene los archivos PDF descargados y clasificados por anualidades
base_download_folder = "C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional-NUEVA-1"

# Rango de años
years = range(2013, 2025)

# Umbral de tamaño para considerar un archivo como vacío (en bytes)
empty_file_threshold = 120 * 1024  # 120 KB

# Recorrer las carpetas de anualidades
for year in years:
    year_folder = os.path.join(base_download_folder, str(year))
    
    # Verificar si la carpeta del año existe
    if os.path.exists(year_folder):
        # Crear carpeta "VACIOS" dentro de la carpeta del año si no existe
        vacios_folder = os.path.join(year_folder, f"VACIOS {year}")
        if not os.path.exists(vacios_folder):
            os.makedirs(vacios_folder)
        
        # Recorrer todos los archivos en la carpeta del año
        for filename in os.listdir(year_folder):
            file_path = os.path.join(year_folder, filename)
            
            # Verificar si es un archivo PDF y no es la carpeta "VACIOS"
            if filename.endswith(".pdf") and not os.path.isdir(file_path):
                file_size = os.path.getsize(file_path)
                print(f"Revisando archivo: {filename}, tamaño: {file_size} bytes")
                
                # Verificar si el archivo está vacío (menos de 120 KB)
                if file_size < empty_file_threshold:
                    # Mover archivo vacío a la carpeta "VACIOS"
                    new_path = os.path.join(vacios_folder, filename)
                    print(f"Moviendo archivo: {file_path} a {new_path}")
                    os.rename(file_path, new_path)
                    print(f"Movido a VACIOS: {filename} en {vacios_folder}")
                else:
                    print(f"Archivo no vacío: {filename}, tamaño: {file_size} bytes")
            else:
                print(f"No es un archivo PDF o es una carpeta: {filename}")

print("Revisión completada.")