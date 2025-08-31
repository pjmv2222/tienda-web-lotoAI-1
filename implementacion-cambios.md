# Instrucciones para Implementar Cambios en Loto-IA

Este documento proporciona instrucciones detalladas para implementar los cambios necesarios en el proyecto Loto-IA, específicamente para mejorar la extracción de números especiales y la visualización de "El Millón" en Euromillones.

## 1. Actualización del Scraper

### Modificaciones en `tienda-web-lotoAI-1/scraper/scraper.ts`

#### 1.1. Actualizar los Selectores para La Primitiva

Localiza la configuración para La Primitiva (alrededor de la línea 244) y actualiza los selectores:

```typescript
{
    game: 'primitiva', 
    code: 'LAPR',
    mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-LAPR .c-ultimo-resultado__combinacion-li--primitiva',
    // Actualizar estos selectores
    complementarySelector: '#qa_ultResult-LAPR-complementario',
    reintegroSelector: '#qa_ultResult-LAPR-reintegro',
    dateSelector: '#qa_ultResult-LAPR-fecha',
    jokerSelector: '.c-ultimo-resultado__joker-ganador'
}
```

#### 1.2. Actualizar los Selectores para Bonoloto

Localiza la configuración para Bonoloto (alrededor de la línea 252) y actualiza los selectores:

```typescript
{
    game: 'bonoloto',
    code: 'BONO', 
    mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-BONO .c-ultimo-resultado__combinacion-li--bonoloto',
    // Actualizar estos selectores
    complementarySelector: '#qa_ultResult-BONO-complementario',
    reintegroSelector: '#qa_ultResult-BONO-reintegro',
    dateSelector: '#qa_ultResult-BONO-fecha'
}
```

#### 1.3. Actualizar los Selectores para Lototurf

Localiza la configuración para Lototurf (alrededor de la línea 274) y actualiza los selectores:

```typescript
{
    game: 'lototurf',
    code: 'LOTU',
    mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-LOTU .c-ultimo-resultado__combinacion-li--lototurf',
    // Actualizar estos selectores
    reintegroSelector: '#qa_ultResult-LOTU-reintegro',
    caballoSelector: '#qa_ultResult-LOTU-caballo',
    dateSelector: '#qa_ultResult-LOTU-fecha'
}
```

#### 1.4. Actualizar los Selectores para EuroDreams

Localiza la configuración para EuroDreams (alrededor de la línea 267) y actualiza los selectores:

```typescript
{
    game: 'eurodreams',
    code: 'EDMS',
    mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-EDMS .c-ultimo-resultado__combinacion-li--eurodreams',
    // Actualizar este selector
    dreamSelector: '#qa_ultResult-EDMS-dream',
    dateSelector: '#qa_ultResult-EDMS-fecha'
}
```

#### 1.5. Actualizar la Interfaz LotteryResult

Verifica que la interfaz LotteryResult (alrededor de la línea 13) tenga el campo complementary como un número único, no como un array:

```typescript
interface LotteryResult {
    game: string;
    date: string;
    numbers: number[];
    complementary?: number; // Asegúrate de que sea number, no number[]
    stars?: number[];
    reintegro?: number;
    clave?: number;
    dream?: number;
    caballo?: number;
}
```

#### 1.6. Agregar Logging Mejorado

Agrega el siguiente código después de la línea 217 (después de cargar la página de resultados y antes de extraer los números):

```typescript
// Verificar selectores específicos
console.log('🔍 Verificando selectores específicos...');
const selectorsCheck = await page.evaluate(() => {
    const result: any = {};
    
    // Verificar selectores para complementarios y reintegros
    const selectors = [
        '#qa_ultResult-LAPR-complementario',
        '#qa_ultResult-LAPR-reintegro',
        '#qa_ultResult-BONO-complementario',
        '#qa_ultResult-BONO-reintegro',
        '#qa_ultResult-LOTU-reintegro',
        '#qa_ultResult-LOTU-caballo',
        '#qa_ultResult-EDMS-dream'
    ];
    
    selectors.forEach(selector => {
        const element = document.querySelector(selector);
        result[selector] = {
            exists: !!element,
            text: element ? element.textContent?.trim() : null
        };
    });
    
    return result;
});

console.log('🔍 Resultado de verificación de selectores:', JSON.stringify(selectorsCheck, null, 2));
```

#### 1.7. Modificar las Funciones de Extracción

Actualiza la función para obtener el número complementario (alrededor de la línea 404):

```typescript
// Obtener número complementario
if (config.complementarySelector) {
    const compElement = document.querySelector(config.complementarySelector);
    if (compElement) {
        const compText = compElement.textContent?.trim() || '';
        const comp = parseInt(compText);
        if (!isNaN(comp)) {
            result.complementary = comp; // Ahora es un número, no un array
            console.log(`✅ Complementario encontrado para ${config.game}: ${comp}`);
        } else {
            console.log(`⚠️ Texto de complementario no válido para ${config.game}: "${compText}"`);
        }
    } else {
        console.log(`⚠️ No se encontró elemento complementario para ${config.game}`);
    }
}
```

## 2. Actualización de la Visualización de "El Millón"

### Modificaciones en el Componente de Euromillones

Busca el componente que muestra los resultados de Euromillones (probablemente en `tienda-web-lotoAI-1/src/app/pages/euromillon/` o similar) y actualiza la visualización de "El Millón":

#### 2.1. Actualizar el HTML

Reemplaza cualquier visualización existente de "El Millón" con:

```html
<div class="millon-container">
  <span class="millon-text">EL MILLÓN</span>
  <span class="millon-code">{{resultado.millon}}</span>
</div>
```

#### 2.2. Agregar CSS

Agrega estos estilos al archivo CSS correspondiente:

```css
.millon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

.millon-text {
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #505050;
  text-transform: uppercase;
}

.millon-code {
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #e63946;
  margin-top: 5px;
}
```

## 3. Pruebas y Verificación

Después de implementar estos cambios:

1. Ejecuta el scraper actualizado:
   ```
   cd tienda-web-lotoAI-1/scraper
   ts-node scraper.ts
   ```

2. Verifica el archivo `lottery-data.json` generado para asegurarte de que todos los números especiales se extraen correctamente.

3. Inicia la aplicación y verifica que "El Millón" se muestra correctamente como texto en mayúsculas.

## Notas Adicionales

- Si encuentras problemas con los selectores, revisa el HTML guardado en `resultados-page.html` para verificar la estructura actual del sitio web.
- Considera implementar una estrategia de reintentos para la extracción de datos, como se mencionó en recomendaciones anteriores.
- Mantén actualizada la documentación sobre los selectores utilizados, ya que el sitio web de loterías podría cambiar su estructura HTML en el futuro.