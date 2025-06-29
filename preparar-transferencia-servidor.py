#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para preparar la transferencia de archivos al servidor
Identifica todos los modelos (.h5) y datasets DataFrame necesarios
"""

import os
import shutil
from pathlib import Path

# Configuración de archivos necesarios (debe coincidir con server-ia-unificado.py)
ARCHIVOS_NECESARIOS = {
    'euromillon': {
        'modelo': 'IAs-Loto/EuroMillon-CSV/modelo_euromillon.h5',
        'dataset': 'IAs-Loto/EuroMillon-CSV/DataFrame_Euromillones.csv',
        'descripcion': 'EuroMillon - 5 números + 2 estrellas'
    },
    'bonoloto': {
        'modelo': 'IAs-Loto/Bonoloto/modelo_Bonoloto.h5',
        'dataset': 'IAs-Loto/Bonoloto/DataFrame_Bonoloto.csv',
        'descripcion': 'Bonoloto - 6 números + reintegro'
    },
    'primitiva': {
        'modelo': 'IAs-Loto/LaPrimitiva/modelo_primitiva.h5',
        'dataset': 'IAs-Loto/LaPrimitiva/DataFrame_primitiva_guardado.csv',
        'descripcion': 'La Primitiva - 6 números + reintegro'
    },
    'elgordo': {
        'modelo': 'IAs-Loto/ElGordo/modelo_ElGordo.h5',
        'dataset': 'IAs-Loto/ElGordo/DataFrame_ElGordo.csv',
        'descripcion': 'El Gordo - 5 números + clave'
    },
    'eurodreams': {
        'modelo': 'IAs-Loto/EuroDreams/modelo_EuroDreams.h5',
        'dataset': 'IAs-Loto/EuroDreams/DataFrame_EuroDreams.csv',
        'descripcion': 'EuroDreams - 6 números + Dream'
    },
    'loterianacional': {
        'modelo': 'IAs-Loto/LOTERIA NACIONAL/modelo_LoteriaNacional.h5',
        'dataset': 'IAs-Loto/LOTERIA NACIONAL/DataFrame_LOTERIA NACIONAL.csv',
        'descripcion': 'Lotería Nacional - número de 5 dígitos'
    },
    'lototurf': {
        'modelo': 'IAs-Loto/Lototurf/modelo_Lototurf.h5',
        'dataset': 'IAs-Loto/Lototurf/DataFrame_Lototurf.csv',
        'descripcion': 'Lototurf - 6 números + caballo'
    }
}

def verificar_archivos():
    """Verifica que todos los archivos necesarios existan"""
    print("🔍 VERIFICANDO ARCHIVOS NECESARIOS...")
    print("=" * 60)
    
    archivos_encontrados = {}
    archivos_faltantes = []
    
    for juego, archivos in ARCHIVOS_NECESARIOS.items():
        print(f"\n📋 {juego.upper()} - {archivos['descripcion']}")
        
        modelo_path = Path(archivos['modelo'])
        dataset_path = Path(archivos['dataset'])
        
        # Verificar modelo
        if modelo_path.exists():
            size_mb = modelo_path.stat().st_size / (1024 * 1024)
            print(f"✅ Modelo: {modelo_path} ({size_mb:.1f} MB)")
            archivos_encontrados[f"{juego}_modelo"] = modelo_path
        else:
            print(f"❌ Modelo: {modelo_path} (NO ENCONTRADO)")
            archivos_faltantes.append(f"{juego} - modelo")
        
        # Verificar dataset
        if dataset_path.exists():
            size_mb = dataset_path.stat().st_size / (1024 * 1024)
            print(f"✅ Dataset: {dataset_path} ({size_mb:.1f} MB)")
            archivos_encontrados[f"{juego}_dataset"] = dataset_path
        else:
            print(f"❌ Dataset: {dataset_path} (NO ENCONTRADO)")
            archivos_faltantes.append(f"{juego} - dataset")
    
    print("\n" + "=" * 60)
    print(f"📊 RESUMEN:")
    print(f"   ✅ Archivos encontrados: {len(archivos_encontrados)}")
    print(f"   ❌ Archivos faltantes: {len(archivos_faltantes)}")
    
    if archivos_faltantes:
        print(f"\n⚠️  ARCHIVOS FALTANTES:")
        for archivo in archivos_faltantes:
            print(f"   - {archivo}")
        return False, archivos_encontrados
    else:
        print(f"\n🎉 ¡Todos los archivos están disponibles!")
        return True, archivos_encontrados

def crear_directorio_transferencia():
    """Crea el directorio de transferencia y copia archivos"""
    print("\n📦 PREPARANDO DIRECTORIO DE TRANSFERENCIA...")
    print("=" * 60)
    
    # Crear directorio de transferencia
    transfer_dir = Path("archivos-para-servidor")
    if transfer_dir.exists():
        shutil.rmtree(transfer_dir)
    transfer_dir.mkdir(exist_ok=True)
    
    # Crear estructura de directorios
    (transfer_dir / "modelos").mkdir(exist_ok=True)
    (transfer_dir / "datasets").mkdir(exist_ok=True)
    
    todos_existen, archivos = verificar_archivos()
    
    if not todos_existen:
        print("❌ No se pueden copiar archivos porque faltan algunos")
        return False
    
    print(f"\n📁 Copiando archivos a {transfer_dir}/...")
    
    total_size = 0
    
    for juego, config in ARCHIVOS_NECESARIOS.items():
        modelo_src = Path(config['modelo'])
        dataset_src = Path(config['dataset'])
        
        # Copiar modelo
        modelo_dst = transfer_dir / "modelos" / f"modelo_{juego}.h5"
        shutil.copy2(modelo_src, modelo_dst)
        modelo_size = modelo_dst.stat().st_size
        total_size += modelo_size
        print(f"✅ Copiado: {modelo_dst.name} ({modelo_size / (1024*1024):.1f} MB)")
        
        # Copiar dataset
        dataset_dst = transfer_dir / "datasets" / f"DataFrame_{juego}.csv"
        shutil.copy2(dataset_src, dataset_dst)
        dataset_size = dataset_dst.stat().st_size
        total_size += dataset_size
        print(f"✅ Copiado: {dataset_dst.name} ({dataset_size / (1024*1024):.1f} MB)")
    
    # Copiar servidor
    servidor_src = Path("server-ia-unificado.py")
    if servidor_src.exists():
        servidor_dst = transfer_dir / "server-ia-unificado.py"
        shutil.copy2(servidor_src, servidor_dst)
        print(f"✅ Copiado: server-ia-unificado.py")
    
    print(f"\n📊 TOTAL COPIADO: {total_size / (1024*1024):.1f} MB")
    print(f"📂 Directorio: {transfer_dir.absolute()}")
    
    return True

def generar_comandos_scp():
    """Genera comandos SCP para transferir al servidor"""
    print("\n🚀 COMANDOS PARA TRANSFERIR AL SERVIDOR:")
    print("=" * 60)
    
    transfer_dir = Path("archivos-para-servidor")
    if not transfer_dir.exists():
        print("❌ El directorio de transferencia no existe. Ejecuta primero la preparación.")
        return
    
    servidor_remoto = "usuario@tu-servidor.com"  # Cambiar por datos reales
    directorio_remoto = "/var/www/tienda-web-lotoAI-1"
    
    print("📋 COMANDOS A EJECUTAR (actualiza con tus datos de servidor):")
    print()
    
    # Comando para crear directorios en servidor
    print("# 1. Crear estructura de directorios en servidor:")
    print(f'ssh {servidor_remoto} "mkdir -p {directorio_remoto}/IAs-Loto/{{EuroMillon-CSV,Bonoloto,LaPrimitiva,ElGordo,EuroDreams,\\"LOTERIA NACIONAL\\",Lototurf}}"')
    print()
    
    # Comandos SCP para cada archivo
    print("# 2. Transferir modelos:")
    for juego in ARCHIVOS_NECESARIOS.keys():
        print(f"scp archivos-para-servidor/modelos/modelo_{juego}.h5 {servidor_remoto}:{directorio_remoto}/IAs-Loto/{ARCHIVOS_NECESARIOS[juego]['modelo'].split('/')[-2]}/")
    
    print("\n# 3. Transferir datasets:")
    for juego in ARCHIVOS_NECESARIOS.keys():
        dataset_path = ARCHIVOS_NECESARIOS[juego]['dataset']
        dataset_name = dataset_path.split('/')[-1]
        directorio_juego = dataset_path.split('/')[1]
        print(f"scp archivos-para-servidor/datasets/DataFrame_{juego}.csv {servidor_remoto}:{directorio_remoto}/IAs-Loto/\"{directorio_juego}\"/{dataset_name}")
    
    print("\n# 4. Transferir servidor:")
    print(f"scp archivos-para-servidor/server-ia-unificado.py {servidor_remoto}:{directorio_remoto}/")
    
    print("\n# 5. Instalar dependencias en servidor:")
    print(f'ssh {servidor_remoto} "cd {directorio_remoto} && pip3 install flask flask-cors numpy pandas tensorflow scikit-learn pyjwt"')
    
    print("\n# 6. Ejecutar servidor:")
    print(f'ssh {servidor_remoto} "cd {directorio_remoto} && python3 server-ia-unificado.py"')

def mostrar_resumen_archivos():
    """Muestra un resumen de los archivos que se van a transferir"""
    print("\n📋 RESUMEN DE ARCHIVOS PARA TRANSFERENCIA:")
    print("=" * 60)
    
    for juego, config in ARCHIVOS_NECESARIOS.items():
        print(f"\n🎲 {juego.upper()}:")
        print(f"   📊 Dataset: {config['dataset']}")
        print(f"   🤖 Modelo:  {config['modelo']}")
        print(f"   📝 Desc:    {config['descripcion']}")

if __name__ == "__main__":
    print("🎯 PREPARADOR DE TRANSFERENCIA AL SERVIDOR IA")
    print("=" * 60)
    print("Este script identifica y prepara todos los archivos necesarios")
    print("para transferir el sistema de IA al servidor de producción.")
    print()
    
    # Mostrar resumen
    mostrar_resumen_archivos()
    
    # Verificar archivos
    todos_ok, _ = verificar_archivos()
    
    if todos_ok:
        # Crear directorio de transferencia
        if crear_directorio_transferencia():
            # Generar comandos SCP
            generar_comandos_scp()
            print("\n🎉 ¡PREPARACIÓN COMPLETADA!")
            print("\n⚠️  RECORDATORIOS:")
            print("   1. Actualiza los datos del servidor en los comandos SCP")
            print("   2. Asegúrate de tener acceso SSH al servidor")
            print("   3. Verifica que el servidor tenga Python 3 y pip3")
            print("   4. Los archivos DataFrame se actualizan periódicamente con nuevos sorteos")
    else:
        print("\n❌ No se puede continuar. Revisa los archivos faltantes.") 