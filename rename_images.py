import os

# Directorio donde están las imágenes
directory = "src/assets/img"

# Mapeo de nombres antiguos a nuevos
name_mapping = {
    "facebook.jpg": "facebook.png",
    "juego_autorizado- 1 .png": "juego-autorizado.png",
    "jugar_bien.png": "jugar-bien.png",
    "lotolA-LOGO.jpg": "lotola-logo.png",
    "majorl 8.jpg": "mayor-18.png",
    "mastercard.png": "mastercard.png",  # se mantiene igual
    "PIE.jpg": "pie.png",
    "tcibelae.png": "cibelae.png",
    "traspaso.png": "traspaso.png",  # se mantiene igual
    "twebsegura.png": "web-segura.png",
    "visa.png": "visa.png",  # se mantiene igual
    "warning.jpg": "warning.png",
    "websegura.jpg": "web-segura.png",
    "WhatsApp Image 2024-04-11 at 16.18.30.jpeg": "contacto.png",
    "WhatsApp Image 2024-04-11 at 16.19.18.jpeg": "soporte.png",
    "WhatsApp Image 2024-04-11 at 16.20.02.jpeg": "email.png"
}

def rename_files():
    for old_name, new_name in name_mapping.items():
        try:
            old_path = os.path.join(directory, old_name)
            new_path = os.path.join(directory, new_name)
            
            if os.path.exists(old_path):
                os.rename(old_path, new_path)
                print(f"Renombrado: {old_name} → {new_name}")
            else:
                print(f"Archivo no encontrado: {old_name}")
                
        except Exception as e:
            print(f"Error al renombrar {old_name}: {str(e)}")

if __name__ == "__main__":
    # Confirmar antes de proceder
    print("Este script renombrará los archivos en", directory)
    response = input("¿Deseas continuar? (s/n): ")
    
    if response.lower() == 's':
        rename_files()
    else:
        print("Operación cancelada")
