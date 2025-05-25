/**
 * Script de diagnóstico para problemas de visualización en dispositivos móviles
 */
(function() {
  // Esperar a que el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', function() {
    // Crear el botón de diagnóstico
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Diagnosticar Móvil';
    debugButton.style.position = 'fixed';
    debugButton.style.bottom = '10px';
    debugButton.style.right = '10px';
    debugButton.style.zIndex = '9999';
    debugButton.style.padding = '10px';
    debugButton.style.backgroundColor = '#ff5722';
    debugButton.style.color = 'white';
    debugButton.style.border = 'none';
    debugButton.style.borderRadius = '5px';
    debugButton.style.fontSize = '12px';
    
    // Crear el panel de información
    const infoPanel = document.createElement('div');
    infoPanel.style.position = 'fixed';
    infoPanel.style.top = '0';
    infoPanel.style.left = '0';
    infoPanel.style.width = '100%';
    infoPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    infoPanel.style.color = 'white';
    infoPanel.style.padding = '10px';
    infoPanel.style.fontFamily = 'monospace';
    infoPanel.style.fontSize = '12px';
    infoPanel.style.zIndex = '10000';
    infoPanel.style.maxHeight = '80%';
    infoPanel.style.overflowY = 'auto';
    infoPanel.style.display = 'none';
    
    // Añadir elementos al DOM
    document.body.appendChild(debugButton);
    document.body.appendChild(infoPanel);
    
    // Función para mostrar información de diagnóstico
    function showDiagnosticInfo() {
      // Información básica del viewport
      let info = `
Ancho de ventana: ${window.innerWidth}px
Ancho de documento: ${document.documentElement.scrollWidth}px
Ancho de body: ${document.body.scrollWidth}px
Ancho de viewport: ${window.visualViewport ? window.visualViewport.width : 'No disponible'}px
Escala de viewport: ${window.visualViewport ? window.visualViewport.scale : 'No disponible'}
      `;
      
      // Buscar elementos problemáticos
      const elements = document.querySelectorAll('*');
      const problematicElements = [];
      
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const style = window.getComputedStyle(el);
        const offsetWidth = el.offsetWidth;
        
        if (offsetWidth > window.innerWidth + 5) {
          problematicElements.push({
            element: el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.replace(/\s+/g, '.') : ''),
            computedWidth: style.width,
            offsetWidth: offsetWidth + 'px',
            overflowX: style.overflowX,
            position: style.position
          });
        }
      }
      
      if (problematicElements.length > 0) {
        info += '\n\nElementos problemáticos encontrados:\n\n' + 
          problematicElements.map(e => `${e.element}\nAncho: ${e.computedWidth} / ${e.offsetWidth}\nOverflow-X: ${e.overflowX}\nPosition: ${e.position}`).join('\n\n');
      } else {
        info += '\n\nNo se encontraron elementos problemáticos.';
      }
      
      // Mostrar información
      infoPanel.textContent = info;
      infoPanel.style.display = 'block';
      
      // Aplicar corrección automática
      document.documentElement.style.width = '100%';
      document.documentElement.style.maxWidth = '100%';
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.width = '100%';
      document.body.style.maxWidth = '100%';
      document.body.style.overflowX = 'hidden';
      
      // Forzar ancho en elementos principales
      const mainElements = document.querySelectorAll('header, .header, main, .main, footer, .footer, .container, .container-fluid, .row, .col, [class*="col-"], .modulo-cabecera, .cabecera-superior, .cabecera-inferior, .juegos-container');
      for (let i = 0; i < mainElements.length; i++) {
        mainElements[i].style.width = '100%';
        mainElements[i].style.maxWidth = '100%';
        mainElements[i].style.overflowX = 'hidden';
      }
    }
    
    // Evento para mostrar/ocultar el panel
    debugButton.addEventListener('click', function() {
      if (infoPanel.style.display === 'none') {
        showDiagnosticInfo();
      } else {
        infoPanel.style.display = 'none';
      }
    });
    
    // Aplicar correcciones automáticas en dispositivos móviles
    if (window.innerWidth <= 768) {
      // Esperar a que la página esté completamente cargada
      setTimeout(function() {
        // Aplicar correcciones sin mostrar el panel
        document.documentElement.style.width = '100%';
        document.documentElement.style.maxWidth = '100%';
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.width = '100%';
        document.body.style.maxWidth = '100%';
        document.body.style.overflowX = 'hidden';
        
        // Forzar ancho en elementos principales
        const mainElements = document.querySelectorAll('header, .header, main, .main, footer, .footer, .container, .container-fluid, .row, .col, [class*="col-"], .modulo-cabecera, .cabecera-superior, .cabecera-inferior, .juegos-container');
        for (let i = 0; i < mainElements.length; i++) {
          mainElements[i].style.width = '100%';
          mainElements[i].style.maxWidth = '100%';
          mainElements[i].style.overflowX = 'hidden';
        }
      }, 1000);
    }
  });
})();
