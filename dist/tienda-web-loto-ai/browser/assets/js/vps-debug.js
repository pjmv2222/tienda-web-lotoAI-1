/**
 * Script de diagnóstico para problemas en la VPS
 * Este script recopila información sobre el entorno y la envía a un endpoint para análisis
 */
(function() {
  // Esperar a que el DOM esté completamente cargado
  window.addEventListener('DOMContentLoaded', function() {
    // Recopilar información del entorno
    var debugInfo = {
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth
      },
      timestamp: new Date().toISOString(),
      url: window.location.href,
      problematicElements: []
    };

    // Buscar elementos problemáticos
    var allElements = document.querySelectorAll('*');
    for (var i = 0; i < allElements.length; i++) {
      var el = allElements[i];
      var style = window.getComputedStyle(el);
      var offsetWidth = el.offsetWidth;
      
      if (offsetWidth > window.innerWidth + 5) {
        debugInfo.problematicElements.push({
          tagName: el.tagName,
          id: el.id || '',
          className: el.className || '',
          computedWidth: style.width,
          offsetWidth: offsetWidth,
          position: style.position,
          display: style.display,
          float: style.float
        });
      }
    }

    // Crear un elemento para mostrar la información en la consola
    console.log('VPS Debug Info:', JSON.stringify(debugInfo, null, 2));
    
    // Crear un elemento para mostrar la información en la página
    var debugElement = document.createElement('div');
    debugElement.id = 'vps-debug-info';
    debugElement.style.position = 'fixed';
    debugElement.style.bottom = '10px';
    debugElement.style.left = '10px';
    debugElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    debugElement.style.color = 'white';
    debugElement.style.padding = '10px';
    debugElement.style.fontSize = '12px';
    debugElement.style.zIndex = '9999';
    debugElement.style.maxWidth = '80%';
    debugElement.style.maxHeight = '200px';
    debugElement.style.overflowY = 'auto';
    debugElement.style.display = 'none';
    
    // Crear botón para mostrar/ocultar la información
    var debugButton = document.createElement('button');
    debugButton.textContent = 'VPS Debug';
    debugButton.style.position = 'fixed';
    debugButton.style.bottom = '10px';
    debugButton.style.left = '10px';
    debugButton.style.zIndex = '10000';
    debugButton.style.padding = '5px';
    debugButton.style.backgroundColor = '#ff0000';
    debugButton.style.color = 'white';
    debugButton.style.border = 'none';
    debugButton.style.borderRadius = '5px';
    
    // Añadir elementos al DOM
    document.body.appendChild(debugElement);
    document.body.appendChild(debugButton);
    
    // Evento para mostrar/ocultar la información
    debugButton.addEventListener('click', function() {
      if (debugElement.style.display === 'none') {
        debugElement.style.display = 'block';
        debugElement.textContent = JSON.stringify(debugInfo, null, 2);
      } else {
        debugElement.style.display = 'none';
      }
    });
    
    // Aplicar correcciones automáticas
    document.documentElement.style.width = '100%';
    document.documentElement.style.maxWidth = '100%';
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.width = '100%';
    document.body.style.maxWidth = '100%';
    document.body.style.overflowX = 'hidden';
    
    // Guardar información en localStorage para recuperarla después
    try {
      localStorage.setItem('vpsDebugInfo', JSON.stringify(debugInfo));
    } catch (e) {
      console.error('Error guardando información de depuración:', e);
    }
  });
})();
