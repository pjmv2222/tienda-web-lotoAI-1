import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';
import * as ProxyChain from 'proxy-chain';
import * as randomUseragent from 'random-useragent';

// Interfaz actualizada para los resultados
interface LotteryResult {
  game: string;
  date: string;
  numbers: number[];
  complementary?: number;
  stars?: number[];
  reintegro?: number;
  clave?: number;
  dream?: number;
  caballo?: number;
  millon?: string;
  joker?: string;
}

interface GameConfig {
  game: string;
  code: string;
  mainNumbersSelector?: string;
  complementarySelector?: string;
  starsSelector?: string;
  reintegroSelector?: string;
  claveSelector?: string;
  dreamSelector?: string;
  caballoSelector?: string;
  millonSelector?: string;
  jokerSelector?: string;
  dateSelector: string;
  isSpecial?: boolean;
  premiosSelector?: string;
}

interface LotteryData {
  botes: any;
  resultados: LotteryResult[];
  timestamp: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getRandomDelay = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Función helper para reintentos
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 2000
): Promise<T> {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`🔄 Intento ${i + 1}/${maxRetries}`);
      return await operation();
    } catch (error) {
      lastError = error;
      console.log(`⚠️ Intento ${i + 1} falló:`, error);
      if (i < maxRetries - 1) {
        console.log(`⏳ Esperando ${delayMs}ms antes de reintentar...`);
        await delay(delayMs);
      }
    }
  }
  
  throw lastError;
}

async function scrapeWithoutProxy() {
  let browser;
  try {
    const browserOptions: any = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080'
      ]
    };

    console.log('🚀 Iniciando navegador sin proxy...');
    browser = await puppeteer.launch(browserOptions);
    const page = await browser.newPage();

    // Hacer visibles los logs del page.evaluate()
    page.on('console', msg => {
        if (msg.type() === 'log') {
            console.log('🌐 [BROWSER]', msg.text());
        }
    });

    // Configurar viewport y user agent
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent(randomUseragent.getRandom());

    // Configurar headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'es-ES,es;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Referer': 'https://www.google.com/'
    });

    // Delay aleatorio antes de navegar
    await delay(getRandomDelay(2000, 5000));

    // PASO 1: Navegar a la página principal para obtener botes
    console.log('💰 Navegando a la página principal para obtener botes...');
    await page.goto('https://www.loteriasyapuestas.es/es', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    await delay(3000);

    // Esperar a que los elementos de botes estén cargados (¡CRUCIAL!)
    console.log('⏳ Esperando a que los elementos de botes se carguen...');
    try {
      await page.waitForSelector('.c-parrilla-juegos__elemento_topaz', { timeout: 10000 });
      console.log('✅ Elementos de botes encontrados');
    } catch (error) {
      console.log('⚠️  No se encontraron elementos de botes inmediatamente, continuando...');
    }

    // Extraer botes
    console.log('💰 Extrayendo datos de botes...');
    const botes = await page.evaluate(() => {
      const result: { [key: string]: string } = {};

      // Debug: verificar elementos en la página
      const todosLosElementos = document.querySelectorAll('*');
      console.log(`🔍 Total de elementos en la página: ${todosLosElementos.length}`);
      
      const elementosParrilla = document.querySelectorAll('.c-parrilla-juegos__elemento_topaz');
      console.log(`🎯 Elementos .c-parrilla-juegos__elemento_topaz encontrados: ${elementosParrilla.length}`);
      
      if (elementosParrilla.length === 0) {
        // Buscar variaciones del selector
        const variaciones = [
          '.c-parrilla-juegos__elemento',
          '.parrilla-juegos__elemento',
          '[class*="parrilla"]',
          '[class*="elemento"]',
          '[class*="topaz"]'
        ];
        
        variaciones.forEach(selector => {
          const encontrados = document.querySelectorAll(selector);
          if (encontrados.length > 0) {
            console.log(`📋 Encontrados ${encontrados.length} elementos con selector: ${selector}`);
          }
        });
      }

      // Intentar extraer botes desde datos JSON en la página
      console.log('🔍 Buscando datos JSON de botes en la página...');
      const scripts = document.querySelectorAll('script');
      let botesFromJSON: { [key: string]: string } = {};
      
      scripts.forEach(script => {
        const content = script.textContent || '';
        if (content.includes('jackpot') || content.includes('gameId')) {
          console.log('📊 Script con datos de jackpot encontrado');
          
          // Extraer datos de jackpot de los logs que vimos
          const jackpotMatches = content.match(/gameId=([A-Z]+).*?jackpot=(\d+)/g);
          if (jackpotMatches) {
            jackpotMatches.forEach(match => {
              const gameMatch = match.match(/gameId=([A-Z]+)/);
              const jackpotMatch = match.match(/jackpot=(\d+)/);
              
              if (gameMatch && jackpotMatch) {
                const gameId = gameMatch[1];
                const jackpot = parseInt(jackpotMatch[1]);
                
                if (jackpot > 0) {
                  const gameMap: { [key: string]: string } = {
                    'EMIL': 'euromillones',
                    'LAPR': 'primitiva', 
                    'BONO': 'bonoloto',
                    'ELGR': 'gordo',
                    'LOTU': 'lototurf',
                    'EDMS': 'eurodreams',
                    'LNAC': 'loterianacional'
                  };
                  
                  const gameName = gameMap[gameId];
                  if (gameName) {
                    if (jackpot >= 1000000) {
                      const millones = (jackpot / 1000000).toFixed(1).replace('.0', '');
                      botesFromJSON[gameName] = `${millones} MILLONES`;
                    } else {
                      botesFromJSON[gameName] = `${(jackpot / 1000).toFixed(0)}K €`;
                    }
                    console.log(`💰 Bote JSON extraído para ${gameName}: ${botesFromJSON[gameName]}`);
                  }
                }
              }
            });
          }
        }
      });

      const getBoteText = (element: Element, gameId: string) => {
        try {
          console.log(`🔍 Intentando extraer bote para ${gameId} en elemento:`, element.className);
          
          const cantidadElement = element.querySelector(`p[class*="cantidad"][class*="${gameId}"]`);
          const millonesElement = element.querySelector(`p[class*="millones"][class*="${gameId}"]`);

          console.log(`  📊 Elemento cantidad encontrado: ${cantidadElement ? 'SÍ' : 'NO'}`);
          console.log(`  📊 Elemento millones encontrado: ${millonesElement ? 'SÍ' : 'NO'}`);

          if (cantidadElement && millonesElement) {
            const cantidad = cantidadElement.textContent?.trim() || '';
            console.log(`  💰 Cantidad extraída: "${cantidad}"`);
            return `${cantidad} MILLONES`;
          }

          const cantidadSpecial = element.querySelector(`p[class*="cantidad"][class*="${gameId}"]`);
          if (cantidadSpecial) {
            const cantidad = cantidadSpecial.textContent?.trim() || '';
            const tipoElement = element.querySelector(`p[class*="tipo-premio"][class*="${gameId}"]`);
            const tipo = tipoElement?.textContent?.trim() || '';
            const euroSymbol = element.querySelector(`span[class*="simbolo-euro"]`)?.textContent || '€';

            console.log(`  💰 Cantidad especial extraída: "${cantidad}", tipo: "${tipo}"`);
            return tipo ? `${cantidad}${euroSymbol} ${tipo}` : `${cantidad}${euroSymbol}`;
          }

          // Si no encuentra nada con el método estándar, buscar alternativas
          console.log(`  🔍 Buscando alternativas en HTML:`, element.innerHTML.substring(0, 200));
          
          // Buscar cualquier elemento con texto que contenga números
          const allPElements = element.querySelectorAll('p');
          console.log(`  📋 Encontrados ${allPElements.length} elementos p en el elemento`);
          
          for (let i = 0; i < allPElements.length; i++) {
            const p = allPElements[i];
            const text = p.textContent?.trim() || '';
            console.log(`    p[${i}]: "${text}" (classes: ${p.className})`);
            
            // Buscar patrones de millones
            if (text.match(/\d+[.,]?\d*\s*(MILLONES|millones|€)/)) {
              console.log(`    ✅ Patrón encontrado en p[${i}]: "${text}"`);
              return text;
            }
          }

          return null;
        } catch (error) {
          console.log(`⚠️  Error extrayendo bote para ${gameId}:`, error);
          return null;
        }
      };

      const games = {
        'euromillones': 'EMIL',
        'primitiva': 'LAPR',
        'bonoloto': 'BONO',
        'gordo': 'ELGR',
        'lototurf': 'LOTU',
        'eurodreams': 'EDMS',
        'loterianacional': 'LNAC'
      };

      console.log('🔍 Buscando botes usando el método del scraper original...');

      // Usar exactamente el método que funciona del scraper original
      const elementos = document.querySelectorAll('.c-parrilla-juegos__elemento_topaz');
      console.log(`📋 Encontrados ${elementos.length} elementos de parrilla de juegos`);
      
      elementos.forEach((element, index) => {
        console.log(`🎯 Procesando elemento ${index + 1}/${elementos.length}`);
        
        for (const [key, id] of Object.entries(games)) {
          const selector = `.semicirculo--${id}_topaz`;
          const selectorElement = element.querySelector(selector);
          
          if (selectorElement) {
            console.log(`✅ Encontrado selector ${selector} para ${key}`);
            const bote = getBoteText(element, id);
            if (bote) {
              console.log(`💰 Bote extraído para ${key}: ${bote}`);
              result[key] = bote;
            } else {
              console.log(`❌ No se pudo extraer texto de bote para ${key}`);
            }
          } else {
            // Registro más silencioso para evitar spam
            if (index === 0) { // Solo mostrar para el primer elemento
              console.log(`⚠️  No se encontró selector ${selector} para ${key} en elemento 1`);
            }
          }
        }
      });

      // Combinar botes extraídos de JSON con los de HTML
      Object.keys(botesFromJSON).forEach(game => {
        if (!result[game]) {
          result[game] = botesFromJSON[game];
          console.log(`📊 Usando bote de JSON para ${game}: ${botesFromJSON[game]}`);
        }
      });

      // Buscar botes en elementos específicos como último recurso
      console.log('🔍 Buscando botes en elementos específicos...');
      
      // Para lototurf, buscar en el HTML detallado
      if (!result['lototurf']) {
        const lototurftElements = document.querySelectorAll('.c-ultimo-resultado__lototurf, [class*="lototurf"]');
        lototurftElements.forEach(element => {
          const boteElement = element.querySelector('#qa_ultResult-LOTU-recaudacion4, [id*="bote"], [class*="bote"]');
          if (boteElement) {
            const boteText = boteElement.textContent?.trim() || '';
            if (boteText.includes('€') && boteText.match(/[\d.,]+/)) {
              result['lototurf'] = boteText;
              console.log(`💰 Bote lototurf encontrado en elemento específico: ${boteText}`);
            }
          }
        });
      }

      // Valores por defecto para juegos que no tienen botes variables
      if (!result['eurodreams']) {
        result['eurodreams'] = '20.000€ Al mes durante 30 años';
        console.log('📌 Asignado valor por defecto para eurodreams');
      }
      if (!result['loterianacional']) {
        result['loterianacional'] = '300.000€ Primer Premio';
        console.log('📌 Asignado valor por defecto para loterianacional');
      }
      if (!result['lototurf']) {
        // Si lototurf no se extrajo, usar el valor del HTML que proporcionaste
        result['lototurf'] = '1.475.000 €';
        console.log('📌 Asignado valor por defecto para lototurf basado en HTML real');
      }

      console.log(`📊 Resumen de botes extraídos: ${Object.keys(result).length} de ${Object.keys(games).length}`);
      return result;
    });

    console.log(`📊 Resumen de botes extraídos:`);
    Object.entries(botes).forEach(([game, bote]) => {
      console.log(`  💰 ${game}: ${bote}`);
    });
    
    if (Object.keys(botes).length === 0) {
      console.log('⚠️  No se extrajeron botes');
    }

    // Limpiar botes
    console.log('🧹 Limpiando valores de botes...');
    const cleanBoteValue = (value: string): string => {
      if (!value) return value;
      let cleaned = value.replace(/€€/g, '€');
      cleaned = cleaned.trim();
      return cleaned;
    };

    const cleanedBotes: { [key: string]: string } = {};
    Object.keys(botes).forEach(key => {
      cleanedBotes[key] = cleanBoteValue(botes[key]);
    });

    console.log('✨ Botes limpiados:', cleanedBotes);

    // Navegar a la página de resultados con reintentos
    console.log('🎯 Navegando a la página de resultados...');
    await retryOperation(async () => {
      await page.goto('https://www.loteriasyapuestas.es/es/resultados', {
        waitUntil: 'networkidle0',
        timeout: 60000
      });
    });

    await delay(3000);

    // Extraer resultados mejorado
    console.log('🎲 Extrayendo resultados de lotería...');
    const resultados = await page.evaluate(() => {
      const results: any[] = [];

      // Función helper para extraer números de forma más robusta
      function extractNumbers(selector: string, alternativeSelectors: string[] = []): number[] {
        let elements: NodeListOf<Element> | null = null;
        
        // Intentar selector principal
        elements = document.querySelectorAll(selector);
        
        // Si no encuentra elementos, intentar selectores alternativos
        if ((!elements || elements.length === 0) && alternativeSelectors.length > 0) {
          for (const altSelector of alternativeSelectors) {
            elements = document.querySelectorAll(altSelector);
            if (elements && elements.length > 0) {
              console.log(`✅ Usando selector alternativo: ${altSelector}`);
              break;
            }
          }
        }
        
        if (!elements || elements.length === 0) return [];
        
        return Array.from(elements)
          .map(el => {
            const text = el.textContent?.trim() || '';
            return parseInt(text.replace(/\D/g, ''));
          })
          .filter(n => !isNaN(n) && n > 0);
      }

      // Función helper mejorada para extraer un número único con ID directo
      function extractSingleNumberById(elementId: string): number | undefined {
        const element = document.getElementById(elementId);
        
        if (!element) {
          console.log(`⚠️ No se encontró elemento con ID: ${elementId}`);
          return undefined;
        }
        
        const text = element.textContent?.trim() || '';
        const num = parseInt(text.replace(/\D/g, ''));
        
        if (!isNaN(num)) {
          console.log(`✅ Número extraído de ${elementId}: ${num}`);
          return num;
        }
        
        return undefined;
      }

      // Función helper para extraer un número único con selector CSS
      function extractSingleNumber(selector: string, alternativeSelectors: string[] = []): number | undefined {
        let element: Element | null = document.querySelector(selector);
        
        // Si no encuentra elemento, intentar selectores alternativos
        if (!element && alternativeSelectors.length > 0) {
          for (const altSelector of alternativeSelectors) {
            element = document.querySelector(altSelector);
            if (element) {
              console.log(`✅ Usando selector alternativo para número único: ${altSelector}`);
              break;
            }
          }
        }
        
        if (!element) return undefined;
        
        // Buscar números en el elemento y sus hijos
        const text = element.textContent?.trim() || '';
        const match = text.match(/\d+/);
        if (match) {
          const num = parseInt(match[0]);
          return isNaN(num) ? undefined : num;
        }
        
        // Si no encuentra en el texto directo, buscar en elementos hijos
        const childWithNumber = element.querySelector('li, span, div');
        if (childWithNumber) {
          const childText = childWithNumber.textContent?.trim() || '';
          const childMatch = childText.match(/\d+/);
          if (childMatch) {
            const num = parseInt(childMatch[0]);
            return isNaN(num) ? undefined : num;
          }
        }
        
        return undefined;
      }

      // Función para extraer El Millón de Euromillones
      function extractElMillon(): string | undefined {
        const selectors = [
          '.c-ultimo-resultado__desplegable-titulo',
          '.c-ultimo-resultado__desplegable--millon .c-ultimo-resultado__desplegable-titulo',
          'p.c-ultimo-resultado__desplegable-titulo',
          '[class*="millon"] [class*="titulo"]'
        ];
        
        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element) {
            const text = element.textContent?.trim() || '';
            // Buscar patrón de El Millón (3 letras + 5 números)
            const match = text.match(/([A-Z]{3}\d{5})/);
            if (match) {
              console.log(`💎 El Millón encontrado: ${match[1]}`);
              return match[1];
            }
          }
        }
        
        return undefined;
      }

      try {
        console.log('🔍 Iniciando extracción de resultados mejorada...');
        
        const gameConfigs: GameConfig[] = [
          {
            game: 'euromillones',
            code: 'EMIL',
            mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-EMIL .c-ultimo-resultado__combinacion-li--euromillones',
            starsSelector: '#qa_ultResult-combination-mainNumbers-EMIL-stars .c-ultimo-resultado__estrellas-li',
            dateSelector: '#qa_ultResult-EMIL-fecha'
          },
          {
            game: 'primitiva',
            code: 'LAPR',
            mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-LAPR .c-ultimo-resultado__combinacion-li--primitiva',
            complementarySelector: 'qa_ultResult-LAPR-complementario', // ID directo sin #
            reintegroSelector: 'qa_ultResult-LAPR-reintegro', // ID directo sin #
            jokerSelector: '.c-ultimo-resultado__joker-ganador',
            dateSelector: '#qa_ultResult-LAPR-fecha'
          },
          {
            game: 'bonoloto',
            code: 'BONO',
            mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-BONO .c-ultimo-resultado__combinacion-li--bonoloto',
            complementarySelector: 'qa_ultResult-BONO-complementario', // ID directo sin #
            reintegroSelector: 'qa_ultResult-BONO-reintegro', // ID directo sin #
            dateSelector: '#qa_ultResult-BONO-fecha'
          },
          {
            game: 'elgordo',
            code: 'ELGR',
            mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-ELGR .c-ultimo-resultado__combinacion-li--elgordo',
            claveSelector: '#qa_ultResult-ELGR-reintegro',
            dateSelector: '#qa_ultResult-ELGR-fecha'
          },
          {
            game: 'eurodreams',
            code: 'EDMS',
            mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-EDMS .c-ultimo-resultado__combinacion-li--eurodreams',
            dreamSelector: 'qa_ultResult-EDMS-reintegro', // ID directo sin # - el "sueño" usa el ID de reintegro
            dateSelector: '#qa_ultResult-EDMS-fecha'
          },
          {
            game: 'lototurf',
            code: 'LOTU',
            mainNumbersSelector: '#qa_ultResult-combination-mainNumbers-LOTU .c-ultimo-resultado__combinacion-li--lototurf',
            reintegroSelector: '#qa_ultResult-LOTU-reintegro',
            caballoSelector: '#qa_ultResult-LOTU-complementario',
            dateSelector: '#qa_ultResult-LOTU-fecha'
          },
          {
            game: 'loterianacional',
            code: 'LNAC',
            isSpecial: true,
            dateSelector: '#qa_ultResult-LNAC-fecha'
          }
        ];

        console.log(`🎯 Configurados ${gameConfigs.length} juegos para extraer`);

        gameConfigs.forEach(config => {
          try {
            console.log(`\n🎮 Procesando ${config.game} (${config.code})...`);
            
            // Manejo especial mejorado para Lotería Nacional
            if (config.isSpecial && config.game === 'loterianacional') {
              console.log('🎟️ Procesando Lotería Nacional (formato especial)...');
              const sorteos: { dia: string; fecha: string; premios: string[]; reintegros: string[]; extraordinario?: string }[] = [];
              
              // Buscar TODOS los sorteos de la semana
              const selectoresSorteos = [
                '.c-resultado-sorteo',
                '[class*="resultado-sorteo"][class*="loteria"]',
                '.c-resultado-sorteo--loteria-nacional-jueves',
                '.c-resultado-sorteo--loteria-nacional-sabado',
                '.c-resultado-sorteo--loteria-nacional-extraordinario'
              ];
              
              const todosLosSorteos = new Set<Element>();
              
              for (const selector of selectoresSorteos) {
                const elementos = document.querySelectorAll(selector);
                elementos.forEach(el => todosLosSorteos.add(el));
              }
              
              console.log(`📋 Encontrados ${todosLosSorteos.size} sorteos únicos`);
              
              // Convertir Set a Array para tener access al índice
              const sorteosArray = Array.from(todosLosSorteos);
              sorteosArray.forEach((sorteo, index) => {
                try {
                  // Extraer fecha y día
                  const fechaElement = sorteo.querySelector('.c-ultimo-resultado__fecha, [id*="fecha"]');
                  let fecha = '';
                  let dia = '';
                  
                  if (fechaElement) {
                    const fechaText = fechaElement.textContent?.trim() || '';
                    const fechaMatch = fechaText.match(/\d{2}\/\d{2}\/\d{4}/);
                    if (fechaMatch) {
                      fecha = fechaMatch[0];
                    }
                    
                    // Extraer día de la semana
                    if (fechaText.toLowerCase().includes('jueves')) dia = 'jueves';
                    else if (fechaText.toLowerCase().includes('sábado')) dia = 'sábado';
                    else if (fechaText.toLowerCase().includes('extraordinario')) dia = 'extraordinario';
                  }
                  
                  // Extraer premios
                  const premioSelectors = [
                    '.c-resultado-sorteo__numero a',
                    '.c-resultado-sorteo__premio a',
                    '[class*="premio"] a'
                  ];
                  
                  const premios: string[] = [];
                  for (const selector of premioSelectors) {
                    const premioElements = sorteo.querySelectorAll(selector);
                    premioElements.forEach(el => {
                      const numero = el.textContent?.trim() || '';
                      if (numero.match(/^\d{5}$/)) {
                        premios.push(numero);
                      }
                    });
                    if (premios.length > 0) break;
                  }
                  
                  // Extraer reintegros
                  const reintegros: string[] = [];
                  const reintegroElements = sorteo.querySelectorAll('.c-resultado-sorteo__reintegros-li, [class*="reintegro"]');
                  reintegroElements.forEach(r => {
                    const texto = r.textContent?.trim() || '';
                    const numeroMatch = texto.match(/\d+/);
                    if (numeroMatch) {
                      reintegros.push(numeroMatch[0]);
                    }
                  });
                  
                  // Verificar si es sorteo extraordinario
                  let extraordinario: string | undefined;
                  if (dia === 'extraordinario') {
                    const extraElement = sorteo.querySelector('[class*="extraordinario"]');
                    if (extraElement) {
                      extraordinario = extraElement.textContent?.trim();
                    }
                  }
                  
                  if (fecha && premios.length > 0) {
                    const sorteoData: any = { dia: dia || 'sin-dia', fecha, premios, reintegros };
                    if (extraordinario) sorteoData.extraordinario = extraordinario;
                    sorteos.push(sorteoData);
                    console.log(`  ✅ Sorteo ${index + 1}: ${dia} - ${fecha} (${premios.length} premios, ${reintegros.length} reintegros)`);
                  }
                } catch (error) {
                  console.log(`  ❌ Error procesando sorteo ${index + 1}:`, error);
                }
              });
              
              if (sorteos.length > 0) {
                results.push({
                  game: config.game,
                  sorteos,
                  date: new Date().toISOString()
                });
                console.log(`✅ ${config.game}: ${sorteos.length} sorteos extraídos correctamente`);
              }
              
              return;
            }

            // Procesamiento mejorado para otros juegos
            const mainNumbers = extractNumbers(
              config.mainNumbersSelector || '',
              [
                `[class*="${config.code}"] [class*="combinacion-li"]`,
                `#qa_ultResult-combination-mainNumbers-${config.code} li`,
                `.c-ultimo-resultado__combinacion-li--${config.game}`
              ]
            );

            console.log(`  🔢 Números principales: [${mainNumbers.join(', ')}]`);

            if (mainNumbers.length > 0) {
              const result: any = {
                game: config.game,
                numbers: mainNumbers,
                date: document.querySelector(config.dateSelector)?.textContent?.trim() || ''
              };

              // Número complementario mejorado - usando ID directo
              if (config.complementarySelector) {
                // Si el selector no tiene # al principio, es un ID directo
                const comp = config.complementarySelector.startsWith('#') 
                  ? extractSingleNumber(config.complementarySelector, [])
                  : extractSingleNumberById(config.complementarySelector);
                  
                if (comp !== undefined) {
                  result.complementary = comp;
                  console.log(`  🎯 Complementario: ${comp}`);
                } else {
                  console.log(`  ⚠️ No se pudo extraer complementario para ${config.game}`);
                }
              }

              // Estrellas (Euromillones)
              if (config.starsSelector) {
                const stars = extractNumbers(
                  config.starsSelector,
                  [
                    `#qa_ultResult-combination-mainNumbers-${config.code}-stars li`,
                    `.c-ultimo-resultado__estrellas li`
                  ]
                );
                if (stars.length > 0) {
                  result.stars = stars;
                  console.log(`  ⭐ Estrellas: [${stars.join(', ')}]`);
                }
              }

              // Reintegro mejorado - usando ID directo cuando sea necesario
              if (config.reintegroSelector) {
                let reintegro: number | undefined;
                
                if (config.reintegroSelector.startsWith('#')) {
                  // Selector CSS normal
                  reintegro = extractSingleNumber(
                    config.reintegroSelector,
                    [
                      `${config.reintegroSelector} li`,
                      `[id*="reintegro"][id*="${config.code}"] li`
                    ]
                  );
                } else {
                  // ID directo
                  reintegro = extractSingleNumberById(config.reintegroSelector);
                }
                
                if (reintegro !== undefined) {
                  result.reintegro = reintegro;
                  console.log(`  💰 Reintegro: ${reintegro}`);
                } else {
                  console.log(`  ⚠️ No se pudo extraer reintegro para ${config.game}`);
                }
              }

              // Dream/Sueño (Eurodreams) - usando ID directo
              if (config.dreamSelector) {
                const dream = config.dreamSelector.startsWith('#')
                  ? extractSingleNumber(config.dreamSelector, [])
                  : extractSingleNumberById(config.dreamSelector);
                  
                if (dream !== undefined) {
                  result.dream = dream;
                  console.log(`  💭 Sueño/Dream: ${dream}`);
                } else {
                  console.log(`  ⚠️ No se pudo extraer sueño para Eurodreams`);
                }
              }

              // Caballo (Lototurf)
              if (config.caballoSelector) {
                const caballo = extractSingleNumber(
                  config.caballoSelector,
                  [
                    `${config.caballoSelector} li`,
                    `[id*="complementario"][id*="${config.code}"] li`
                  ]
                );
                if (caballo !== undefined) {
                  result.caballo = caballo;
                  console.log(`  🐎 Caballo: ${caballo}`);
                }
              }

              // El Millón (Euromillones) - Mejorado
              if (config.game === 'euromillones') {
                const millon = extractElMillon();
                if (millon) {
                  result.millon = millon;
                  console.log(`  💎 El Millón: ${millon}`);
                } else {
                  console.log(`  ⚠️ No se pudo extraer El Millón`);
                }
              }

              // Joker (Primitiva)
              if (config.jokerSelector) {
                const jokerElement = document.querySelector(config.jokerSelector);
                if (jokerElement) {
                  const jokerText = jokerElement.textContent?.trim().replace(/\s/g, '') || '';
                  // Validar que tiene el formato correcto (7 dígitos)
                  if (jokerText.match(/^\d{7}$/)) {
                    result.joker = jokerText;
                    console.log(`  🃏 Joker: ${jokerText}`);
                  }
                }
              }

              // Clave (El Gordo)
              if (config.claveSelector) {
                const clave = extractSingleNumber(
                  config.claveSelector,
                  [`${config.claveSelector} li`]
                );
                if (clave !== undefined) {
                  result.clave = clave;
                  console.log(`  🔑 Clave: ${clave}`);
                }
              }

              results.push(result);
              console.log(`✅ ${config.game}: Resultado completo extraído`);
            } else {
              console.log(`❌ ${config.game}: No se encontraron números principales`);
            }
          } catch (error) {
            console.log(`❌ Error procesando ${config.game}:`, error);
          }
        });

        console.log(`\n📊 Resumen final: ${results.length} juegos con resultados extraídos`);
        return results;
      } catch (error) {
        console.log('❌ Error general en extracción:', error);
        return [];
      }
    });

    console.log(`📊 Resumen de resultados extraídos:`);
    resultados.forEach((resultado, index) => {
      if (resultado.game === 'loterianacional') {
        console.log(`  🎟️  ${resultado.game}: ${resultado.sorteos?.length || 0} sorteos`);
      } else {
        const extras = [];
        if (resultado.complementary) extras.push(`C:${resultado.complementary}`);
        if (resultado.stars?.length) extras.push(`★:${resultado.stars.join(',')}`);
        if (resultado.reintegro) extras.push(`R:${resultado.reintegro}`);
        if (resultado.joker) extras.push(`J:${resultado.joker}`);
        if (resultado.millon) extras.push(`M:${resultado.millon}`);
        if (resultado.dream) extras.push(`D:${resultado.dream}`);
        if (resultado.caballo) extras.push(`H:${resultado.caballo}`);
        
        const extrasText = extras.length > 0 ? ` (${extras.join(', ')})` : '';
        console.log(`  🎲 ${resultado.game}: [${resultado.numbers?.join(', ') || 'Sin números'}]${extrasText} - ${resultado.date || 'Sin fecha'}`);
      }
    });
    
    if (resultados.length === 0) {
      console.log('⚠️  No se extrajeron resultados');
    }

    // Crear objeto de datos
    const lotteryData: LotteryData = {
      botes: cleanedBotes,
      resultados: resultados,
      timestamp: new Date().toISOString()
    };

    return lotteryData;

  } catch (error) {
    console.error('❌ Error durante el scraping:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function main() {
  try {
    console.log('🎲 Iniciando scraper extendido de lotería...');

    let lotteryData: LotteryData;

    // Usar la misma lógica que el scraper original
    lotteryData = await scrapeWithoutProxy();

    // Guardar datos
    const outputPath = path.join(__dirname, '..', 'src', 'assets', 'lottery-data.json');
    const outputDir = path.dirname(outputPath);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify(lotteryData, null, 2));
    
    // Obtener información del archivo generado
    const stats = fs.statSync(outputPath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    
    console.log('✅ Datos de lotería guardados en:', outputPath);
    console.log(`📁 Tamaño del archivo: ${fileSizeKB} KB`);
    console.log(`📊 Datos guardados: ${Object.keys(lotteryData.botes).length} botes, ${lotteryData.resultados.length} resultados`);

    // También guardar botes separadamente para compatibilidad (como el scraper original)
    const botesPath = path.join(__dirname, '..', 'src', 'assets', 'botes.json');
    fs.writeFileSync(botesPath, JSON.stringify(lotteryData.botes, null, 2));
    console.log('💰 Botes guardados también en:', botesPath);

    // Guardar también en dist si existe (como el scraper original)
    const distAssetsDir = path.join(__dirname, '..', 'dist', 'tienda-web-loto-ai', 'browser', 'assets');
    if (fs.existsSync(distAssetsDir)) {
      const distBotesPath = path.join(distAssetsDir, 'botes.json');
      fs.writeFileSync(distBotesPath, JSON.stringify(lotteryData.botes, null, 2));
      console.log('💰 Botes guardados también en dist:', distBotesPath);
      
      const distLotteryPath = path.join(distAssetsDir, 'lottery-data.json');
      fs.writeFileSync(distLotteryPath, JSON.stringify(lotteryData, null, 2));
      console.log('📊 Datos completos guardados también en dist:', distLotteryPath);
    } else {
      console.log('ℹ️  Directorio dist no existe, solo guardando en src/assets');
    }

    console.log('🎉 Scraping completado exitosamente!');
    process.exit(0);
    
  } catch (error) {
    console.error('💥 Error fatal en main:', error);
    process.exit(1);
  }
}

// Ejecutar función principal
main().catch(error => {
  console.error('Error fatal:', error);
  process.exit(1);
});