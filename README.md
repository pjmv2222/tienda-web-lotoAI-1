# TiendaWebLotoAI

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Configuración importante ⚙️
- El proyecto usa HttpClient con fetch para optimizar SSR
- Configuración crítica en app.config.ts:
  ```typescript
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
  ```

## Development server 🚀

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding 🏗️

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build 📦

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests 🧪

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests 🔄

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Procedimiento de inicio/cierre del proyecto 📝

### Al cerrar el proyecto:
1. Detener el servidor (Ctrl + C)
2. Guardar todos los cambios
3. Cerrar el editor

### Al reiniciar el proyecto:
1. Abrir el proyecto en el editor
2. Ejecutar `ng serve`
3. Navegar a `http://localhost:4200/`

## Further help 💡

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
