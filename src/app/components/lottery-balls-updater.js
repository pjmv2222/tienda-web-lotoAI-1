/**
 * Script para actualizar los componentes de lotería para usar las nuevas bolas
 * 
 * Este script muestra cómo actualizar los componentes de lotería para usar las nuevas bolas.
 * No es un script ejecutable, sino una guía para realizar los cambios manualmente.
 */

/**
 * Pasos para actualizar los componentes de lotería:
 * 
 * 1. Reemplazar las clases .ball por .lottery-ball con la clase específica del juego
 * 2. Reemplazar las clases .star-ball, .complementary-ball, etc. por .lottery-ball con la clase específica
 * 3. Reemplazar .number-balls por .lottery-balls-container
 * 4. Agregar separadores entre grupos de bolas cuando sea necesario
 */

// Ejemplo para Euromillones
// Antes:
`<div class="number-balls">
  <div class="ball">17</div>
  <div class="ball">23</div>
  <div class="ball">44</div>
  <div class="ball">19</div>
  <div class="ball">4</div>
</div>`

// Después:
`<div class="lottery-balls-container">
  <div class="lottery-ball euromillones">17</div>
  <div class="lottery-ball euromillones">23</div>
  <div class="lottery-ball euromillones">44</div>
  <div class="lottery-ball euromillones">19</div>
  <div class="lottery-ball euromillones">4</div>
</div>`

// Ejemplo para estrellas de Euromillones
// Antes:
`<div class="number-balls stars">
  <div class="star-ball">2</div>
  <div class="star-ball">3</div>
  <div class="star-ball">8</div>
</div>`

// Después:
`<div class="lottery-balls-container">
  <div class="lottery-ball euromillones-star">2</div>
  <div class="lottery-ball euromillones-star">3</div>
  <div class="lottery-ball euromillones-star">8</div>
</div>`

// Ejemplo para resultados de Euromillones
// Antes:
`<div class="result-numbers">
  <div class="number-balls">
    <div class="ball">12</div>
    <div class="ball">20</div>
    <div class="ball">25</div>
    <div class="ball">31</div>
    <div class="ball">48</div>
  </div>
  <div class="number-balls stars">
    <div class="star-ball">4</div>
    <div class="star-ball">12</div>
  </div>
</div>`

// Después:
`<div class="result-numbers">
  <div class="lottery-balls-container">
    <div class="lottery-ball euromillones">12</div>
    <div class="lottery-ball euromillones">20</div>
    <div class="lottery-ball euromillones">25</div>
    <div class="lottery-ball euromillones">31</div>
    <div class="lottery-ball euromillones">48</div>
    <span class="lottery-balls-separator">+</span>
    <div class="lottery-ball euromillones-star">4</div>
    <div class="lottery-ball euromillones-star">12</div>
  </div>
</div>`

// Mapeo de clases para cada juego
const classMappings = {
  // Euromillones
  'euromillon': {
    'ball': 'lottery-ball euromillones',
    'star-ball': 'lottery-ball euromillones-star',
    'number-balls': 'lottery-balls-container'
  },
  // Primitiva
  'primitiva': {
    'ball': 'lottery-ball primitiva',
    'complementary-ball': 'lottery-ball primitiva',
    'number-balls': 'lottery-balls-container'
  },
  // Bonoloto
  'bonoloto': {
    'ball': 'lottery-ball bonoloto',
    'complementary-ball': 'lottery-ball bonoloto',
    'number-balls': 'lottery-balls-container'
  },
  // El Gordo de la Primitiva
  'gordo-primitiva': {
    'ball': 'lottery-ball gordo',
    'key-ball': 'lottery-ball gordo',
    'number-balls': 'lottery-balls-container'
  },
  // EuroDreams
  'eurodreams': {
    'ball': 'lottery-ball eurodreams',
    'dream-ball': 'lottery-ball eurodreams-dream',
    'number-balls': 'lottery-balls-container'
  },
  // Lotería Nacional
  'loteria-nacional': {
    'termination': 'lottery-ball loteria-nacional',
    'number-balls': 'lottery-balls-container'
  },
  // Lototurf
  'lototurf': {
    'ball': 'lottery-ball lototurf',
    'horse-ball': 'lottery-ball lototurf',
    'number-balls': 'lottery-balls-container'
  }
};

// Componentes a actualizar
const componentsToUpdate = [
  'euromillon',
  'primitiva',
  'bonoloto',
  'gordo-primitiva',
  'eurodreams',
  'loteria-nacional',
  'lototurf'
];

// Ejemplo de cómo actualizar un componente
function updateComponent(componentName) {
  // 1. Obtener el archivo HTML del componente
  const htmlFile = `src/app/pages/${componentName}/${componentName}.component.html`;
  
  // 2. Leer el contenido del archivo
  const content = fs.readFileSync(htmlFile, 'utf8');
  
  // 3. Reemplazar las clases
  let updatedContent = content;
  const mappings = classMappings[componentName];
  
  for (const [oldClass, newClass] of Object.entries(mappings)) {
    const regex = new RegExp(`class="(.*?)${oldClass}(.*?)"`, 'g');
    updatedContent = updatedContent.replace(regex, `class="$1${newClass}$2"`);
  }
  
  // 4. Guardar el archivo actualizado
  fs.writeFileSync(htmlFile, updatedContent, 'utf8');
}

// Nota: Este script es solo una guía, no es ejecutable directamente
// Para actualizar los componentes, es mejor hacerlo manualmente siguiendo estos ejemplos
