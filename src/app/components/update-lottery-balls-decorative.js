/**
 * Script para actualizar las bolas de lotería en todos los componentes
 * añadiendo números decorativos alrededor de los números principales
 */

// Ejemplo de cómo actualizar las bolas de lotería
// Antes:
// <div class="lottery-ball euromillones"><span>17</span></div>

// Después:
// <div class="lottery-ball euromillones">
//   <span>17</span>
//   <div class="decorative-number top-left">17</div>
//   <div class="decorative-number top-right">17</div>
//   <div class="decorative-number bottom-left">17</div>
//   <div class="decorative-number bottom-right">17</div>
// </div>

// Lista de componentes a actualizar
const componentsToUpdate = [
  'euromillon',
  'primitiva',
  'bonoloto',
  'gordo-primitiva',
  'eurodreams',
  'loteria-nacional',
  'lototurf'
];

// Función para actualizar un componente
function updateComponent(componentName) {
  // 1. Obtener el archivo HTML del componente
  const htmlFile = `src/app/pages/${componentName}/${componentName}.component.html`;
  
  // 2. Leer el contenido del archivo
  const content = fs.readFileSync(htmlFile, 'utf8');
  
  // 3. Reemplazar las bolas de lotería
  // Buscar todas las ocurrencias de <div class="lottery-ball ..."><span>número</span></div>
  // y reemplazarlas por la versión con números decorativos
  const regex = /<div class="lottery-ball([^"]*)">\s*<span>(\d+)<\/span>\s*<\/div>/g;
  const updatedContent = content.replace(regex, (match, className, number) => {
    return `<div class="lottery-ball${className}">
      <span>${number}</span>
      <div class="decorative-number top-left">${number}</div>
      <div class="decorative-number top-right">${number}</div>
      <div class="decorative-number bottom-left">${number}</div>
      <div class="decorative-number bottom-right">${number}</div>
    </div>`;
  });
  
  // 4. Guardar el archivo actualizado
  fs.writeFileSync(htmlFile, updatedContent, 'utf8');
  
  console.log(`Actualizado: ${htmlFile}`);
}

// Actualizar todos los componentes
componentsToUpdate.forEach(updateComponent);

console.log('Actualización completada.');

/**
 * Instrucciones para actualizar manualmente:
 * 
 * 1. Buscar en cada archivo HTML todas las ocurrencias de:
 *    <div class="lottery-ball ..."><span>número</span></div>
 * 
 * 2. Reemplazarlas por:
 *    <div class="lottery-ball ...">
 *      <span>número</span>
 *      <div class="decorative-number top-left">número</div>
 *      <div class="decorative-number top-right">número</div>
 *      <div class="decorative-number bottom-left">número</div>
 *      <div class="decorative-number bottom-right">número</div>
 *    </div>
 */
