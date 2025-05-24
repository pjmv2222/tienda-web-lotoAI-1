import os
import subprocess
import sys
import time
import signal
import logging

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("servers.log"),
        logging.StreamHandler()
    ]
)

# Configuración de los servidores
servers = [
    {
        "name": "Euromillón",
        "directory": "EuroMillon-CSV",
        "script": "server.py",
        "port": 5001,
        "model_path": "modelo_euromillon.h5"
    },
    {
        "name": "Bonoloto",
        "directory": "Bonoloto",
        "script": "server.py",
        "port": 5002,
        "model_path": "modelo_Bonoloto.h5"
    },
    {
        "name": "EuroDreams",
        "directory": "EuroDreams",
        "script": "server.py",
        "port": 5003,
        "model_path": "modelo_EuroDreams.h5"
    },
    {
        "name": "El Gordo",
        "directory": "ElGordo",
        "script": "server.py",
        "port": 5004,
        "model_path": "modelo_ElGordo.h5"
    },
    {
        "name": "Lotería Nacional",
        "directory": "LOTERIA NACIONAL",
        "script": "server.py",
        "port": 5005,
        "model_path": "modelo_LoteriaNacional.h5"
    },
    {
        "name": "Lototurf",
        "directory": "Lototurf",
        "script": "server.py",
        "port": 5006,
        "model_path": "modelo_Lototurf.h5"
    },
    {
        "name": "La Primitiva",
        "directory": "LaPrimitiva",
        "script": "server.py",
        "port": 5007,
        "model_path": "modelo_primitiva.h5"
    }
]

# Lista para almacenar los procesos
processes = []

def start_server(server):
    """Inicia un servidor de API"""
    try:
        # Construir la ruta al script
        script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), server["directory"], server["script"])
        
        # Verificar si el script existe
        if not os.path.exists(script_path):
            logging.error(f"No se encontró el script {script_path}")
            return None
        
        # Configurar variables de entorno
        env = os.environ.copy()
        env["PORT"] = str(server["port"])
        env["MODEL_PATH"] = os.path.join(os.path.dirname(os.path.abspath(__file__)), server["directory"], server["model_path"])
        env["SKIP_AUTH"] = "true"  # Para desarrollo, omitir autenticación
        
        # Iniciar el proceso
        logging.info(f"Iniciando servidor {server['name']} en el puerto {server['port']}...")
        process = subprocess.Popen(
            [sys.executable, script_path],
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Esperar un momento para asegurarse de que el servidor se inicie
        time.sleep(2)
        
        # Verificar si el proceso sigue en ejecución
        if process.poll() is None:
            logging.info(f"Servidor {server['name']} iniciado correctamente (PID: {process.pid})")
            return process
        else:
            stdout, stderr = process.communicate()
            logging.error(f"Error al iniciar el servidor {server['name']}: {stderr}")
            return None
    except Exception as e:
        logging.error(f"Error al iniciar el servidor {server['name']}: {str(e)}")
        return None

def stop_all_servers():
    """Detiene todos los servidores"""
    for process in processes:
        if process and process.poll() is None:
            logging.info(f"Deteniendo proceso con PID {process.pid}...")
            try:
                process.terminate()
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                process.kill()
            except Exception as e:
                logging.error(f"Error al detener proceso: {str(e)}")

def signal_handler(sig, frame):
    """Manejador de señales para detener los servidores al recibir Ctrl+C"""
    logging.info("Recibida señal de interrupción. Deteniendo servidores...")
    stop_all_servers()
    sys.exit(0)

def main():
    """Función principal"""
    # Registrar manejador de señales
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    # Iniciar todos los servidores
    for server in servers:
        process = start_server(server)
        if process:
            processes.append(process)
    
    # Verificar si se inició al menos un servidor
    if not processes:
        logging.error("No se pudo iniciar ningún servidor. Saliendo...")
        return
    
    # Mantener el script en ejecución
    logging.info(f"Todos los servidores iniciados. Presiona Ctrl+C para detenerlos.")
    try:
        while True:
            # Verificar si algún proceso ha terminado
            for i, process in enumerate(processes):
                if process and process.poll() is not None:
                    stdout, stderr = process.communicate()
                    if stderr:
                        logging.error(f"Servidor {servers[i]['name']} terminado con error: {stderr}")
                    else:
                        logging.info(f"Servidor {servers[i]['name']} terminado.")
                    
                    # Reiniciar el servidor
                    logging.info(f"Reiniciando servidor {servers[i]['name']}...")
                    new_process = start_server(servers[i])
                    if new_process:
                        processes[i] = new_process
            
            # Esperar antes de la siguiente verificación
            time.sleep(10)
    except KeyboardInterrupt:
        logging.info("Interrupción de teclado recibida. Deteniendo servidores...")
    finally:
        stop_all_servers()

if __name__ == "__main__":
    main()
