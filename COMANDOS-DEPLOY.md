# Comandos de Deploy para PowerShell

## Comandos Completos para Commit y Push

Ejecuta estos comandos en PowerShell desde la raíz del proyecto para aplicar todos los cambios y activar el workflow de GitHub Actions:

```powershell
# Agregar todos los archivos modificados al staging area
git add .

# Crear commit con mensaje abreviado
git commit -m "fix: Corregido botón Generar deshabilitado - Solucionados templates HTML hardcodeados"

# Push al repositorio remoto para activar GitHub Actions
git push origin main
```

## Comando Concatenado para PowerShell (Una Sola Línea)

```powershell
git add .; git commit -m "fix: Corregido botón Generar deshabilitado - Solucionados templates HTML hardcodeados"; git push origin main
```

## Verificación del Estado

Antes de hacer commit, puedes verificar el estado con:

```powershell
# Ver archivos modificados
git status

# Ver diferencias de los cambios
git diff --name-only
```

## Archivos que Serán Incluidos en el Commit

- `tienda-web-lotoAI-1/src/app/services/subscription.service.ts`
- `tienda-web-lotoAI-1/src/app/pages/euromillon/euromillon.component.ts`
- `tienda-web-lotoAI-1/src/app/pages/primitiva/primitiva.component.ts`
- `tienda-web-lotoAI-1/src/app/pages/bonoloto/bonoloto.component.ts`
- `tienda-web-lotoAI-1/src/app/pages/gordo-primitiva/gordo-primitiva.component.ts`
- `tienda-web-lotoAI-1/src/app/pages/eurodreams/eurodreams.component.ts`
- `tienda-web-lotoAI-1/src/app/pages/lototurf/lototurf.component.ts`
- `tienda-web-lotoAI-1/src/app/pages/loteria-nacional/loteria-nacional.component.ts`
- `SOLUCION-BOTON-GENERAR.md`
- `COMANDOS-DEPLOY.md`

## Resultado Esperado

Después de ejecutar estos comandos:

1. ✅ Los cambios se subirán al repositorio
2. ✅ Se activará automáticamente el workflow de GitHub Actions
3. ✅ El sistema se desplegará en el servidor con las correcciones
4. ✅ El botón "Generar" funcionará correctamente para usuarios con suscripción activa

## Monitoreo del Deploy

Puedes monitorear el progreso del deploy en:
- GitHub Actions tab en tu repositorio
- Logs del servidor para verificar que los cambios se aplicaron correctamente