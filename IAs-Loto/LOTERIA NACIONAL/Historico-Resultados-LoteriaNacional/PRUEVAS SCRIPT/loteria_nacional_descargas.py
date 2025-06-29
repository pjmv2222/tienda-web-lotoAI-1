import os
import requests
from bs4 import BeautifulSoup

# Ruta de guardado para los archivos PDF descargados
download_folder = "C:\\Users\\Pedro\\Desktop\\LotoIA\\LOTERIA NACIONAL\\Historico-Resultados-LoteriaNacional-NUEVA"

# Nueva URL proporcionada
url = "https://www.selae.es/f/loterias/documentos/Lotería Nacional/listas de premios/"

# Obtener el contenido de la página
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# Encuentra todos los enlaces a los archivos PDF en la página
links = soup.find_all("a", href=True)
pdf_links = [link["href"] for link in links if link["href"].endswith(".pdf")]

# Descarga todos los archivos PDF encontrados y guarda en la ruta especificada
for link in pdf_links:
    # Verificar si el enlace es relativo y completarlo si es necesario
    if not link.startswith("http"):
        link = requests.compat.urljoin(url, link)
    
    filename = link.split("/")[-1]
    response = requests.get(link)

    # Crear la ruta de guardado si no existe
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)

    # Guardar el archivo en la ruta especificada
    with open(os.path.join(download_folder, filename), "wb") as f:
        f.write(response.content)

print("Descarga completada.")