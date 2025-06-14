/**
 * Script para actualizar las bolas de lotería en todos los componentes
 * 
 * Este script muestra cómo actualizar los componentes para usar el nuevo formato
 * de bolas de lotería con el número dentro de un span.
 */

// Ejemplo de cómo actualizar las bolas de lotería
// Antes:
// <div class="lottery-ball euromillones">17</div>

// Después:
// <div class="lottery-ball euromillones"><span>17</span></div>

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
  // Buscar todas las ocurrencias de <div class="lottery-ball ...">número</div>
  // y reemplazarlas por <div class="lottery-ball ..."><span>número</span></div>
  const regex = /<div class="lottery-ball([^"]*)">([\d]+)<\/div>/g;
  const updatedContent = content.replace(regex, '<div class="lottery-ball$1"><span>$2</span></div>');
  
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
 *    <div class="lottery-ball ...">número</div>
 * 
 * 2. Reemplazarlas por:
 *    <div class="lottery-ball ..."><span>número</span></div>
 * 
 * 3. Asegurarse de que el CSS lottery-balls.css tenga los estilos adecuados:
 *    - .lottery-ball::before para el círculo blanco
 *    - .lottery-ball span para el número
 */
