import requests

base_url = "https://files.eduardolosilla.es/redus/loteria/pdf_listado_premios/2024/"
num_archivos = 1817

for i in range(1, num_archivos + 1):
    url = base_url + f"SM_LISTAOFICIAL.A2024.S0{i:02d}.pdf"
    response = requests.get(url)
    
    if response.status_code == 200 and response.headers['Content-Type'] == 'application/pdf':
        with open(f"SM_LISTAOFICIAL.A2024.S0{i:02d}.pdf", "wb") as file:
            file.write(response.content)
        print(f"Descargado: {url}")
    else:
        print(f"Error al descargar: {url}")