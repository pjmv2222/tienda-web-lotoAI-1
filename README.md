# LotoIA - Plataforma de Loterías con IA

Plataforma web para la gestión y análisis de loterías utilizando inteligencia artificial.

## Requisitos

- Node.js 18.x o superior
- Angular CLI 18.x
- PostgreSQL

## Instalación

```bash
# Instalar dependencias del proyecto principal
npm install

# Instalar dependencias del backend
cd src/backend
npm install
cd ../..
```

## Configuración

### Variables de Entorno

1. **Backend**: Copia el archivo `.env.example` a `.env` en la carpeta `src/backend` y configura las variables según tu entorno.

2. **Producción**: Para el entorno de producción, asegúrate de que el archivo `.env.production` esté correctamente configurado.

## Ejecución del Proyecto

### Desarrollo

Puedes ejecutar el proyecto en modo desarrollo de dos formas:

#### Opción 1: Usando terminales separadas en VS Code

**Terminal 1 (Backend):**
```bash
cd src/backend
npm run dev
```

**Terminal 2 (Frontend con SSR):**
```bash
npm run dev:ssr
```

#### Opción 2: Usando un solo comando

```bash
npm run start:dev
```

### Producción Local

Para probar la configuración de producción en entorno local:

```bash
npm run start:prod:local
```

### Frontend sin SSR

Si necesitas ejecutar solo el frontend sin SSR:

```bash
npm run dev
```

O con el backend:

```bash
npm run start:all
```

## Acceso

- **Frontend**: http://localhost:4000
- **Backend API**: http://localhost:3001/api
- **Endpoint de salud**: http://localhost:3001/api/health

## Despliegue

El despliegue se realiza automáticamente mediante GitHub Actions cuando se hace push a la rama `main`.

1. Realiza tus cambios localmente
2. Haz commit y push a la rama main
3. GitHub Actions se encargará del despliegue en la VPS

## Solución de problemas

### Problema de CORS

Si encuentras problemas de CORS al registrar usuarios o realizar otras operaciones, verifica:

1. La configuración CORS en `src/backend/src/index.ts`
2. Las URLs configuradas en `src/environments/environment.prod.ts`
3. Que el archivo `.env` en la VPS tenga la variable `FRONTEND_URL` correctamente configurada
