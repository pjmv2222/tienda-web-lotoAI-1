import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

// Gestor estático para limitar el número de contextos WebGL activos
class WebGLContextManager {
  private static instance: WebGLContextManager;
  private activeContexts: number = 0;
  private readonly MAX_CONTEXTS: number = 40; // Aumentamos el límite para permitir más bolas simultáneas
  private staticImageCache: Map<string, string> = new Map(); // Cache de imágenes estáticas
  private contextPriorities: Map<string, number> = new Map(); // Prioridades de los contextos
  private lastContextId: number = 0; // Para generar IDs únicos de contextos

  private constructor() {
    // Verificar si el navegador soporta WebGL
    this.checkWebGLSupport();
  }

  private checkWebGLSupport(): void {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('[WebGLContextManager] WebGL no soportado. Usando imágenes estáticas para todas las bolas.');
      }
    } catch (e) {
      console.warn('[WebGLContextManager] Error al verificar soporte WebGL:', e);
    }
  }

  public static getInstance(): WebGLContextManager {
    if (!WebGLContextManager.instance) {
      WebGLContextManager.instance = new WebGLContextManager();
      // Hacer accesible globalmente para debugging y acceso desde otros componentes
      (window as any).WebGLContextManager = WebGLContextManager.instance;
    }
    return WebGLContextManager.instance;
  }

  public canCreateContext(): boolean {
    return this.activeContexts < this.MAX_CONTEXTS;
  }

  public registerContext(priority: number = 0): string {
    const contextId = `ctx_${++this.lastContextId}`;
    this.activeContexts++;
    this.contextPriorities.set(contextId, priority);
    console.log(`[WebGLContextManager] Contexto registrado (${contextId}, prioridad: ${priority}). Total: ${this.activeContexts}`);
    return contextId;
  }

  public unregisterContext(contextId?: string): void {
    if (contextId && this.contextPriorities.has(contextId)) {
      this.contextPriorities.delete(contextId);
    }

    if (this.activeContexts > 0) {
      this.activeContexts--;
      console.log(`[WebGLContextManager] Contexto liberado. Total: ${this.activeContexts}`);
    }
  }

  public getActiveContextCount(): number {
    return this.activeContexts;
  }

  public cacheStaticImage(key: string, imageUrl: string): void {
    this.staticImageCache.set(key, imageUrl);
  }

  public getStaticImage(key: string): string | undefined {
    return this.staticImageCache.get(key);
  }

  public hasStaticImage(key: string): boolean {
    return this.staticImageCache.has(key);
  }

  // Libera contextos de baja prioridad si estamos cerca del límite
  public cleanupLowPriorityContexts(): void {
    if (this.activeContexts >= this.MAX_CONTEXTS - 5) {
      console.warn(`[WebGLContextManager] Liberando contextos de baja prioridad. Activos: ${this.activeContexts}`);
      // Ordenar contextos por prioridad (menor primero)
      const sortedContexts = Array.from(this.contextPriorities.entries())
        .sort((a, b) => a[1] - b[1]);

      // Liberar hasta 5 contextos de baja prioridad
      let freed = 0;
      for (const [contextId, priority] of sortedContexts) {
        if (priority === 0 && freed < 5) {
          this.unregisterContext(contextId);
          freed++;
        }
      }
      console.log(`[WebGLContextManager] Se liberaron ${freed} contextos de baja prioridad. Quedan: ${this.activeContexts}`);
    }
  }

  // Forzar limpieza de contextos independientemente del límite
  public forceCleanupContexts(): void {
    console.warn(`[WebGLContextManager] Forzando limpieza de contextos. Activos: ${this.activeContexts}`);

    // Ordenar contextos por prioridad (menor primero)
    const sortedContexts = Array.from(this.contextPriorities.entries())
      .sort((a, b) => a[1] - b[1]);

    // Liberar contextos de baja y media prioridad para asegurar que haya suficientes disponibles
    let freed = 0;
    for (const [contextId, priority] of sortedContexts) {
      // Liberar primero los de prioridad 0, luego los de prioridad 1 si es necesario
      if (priority === 0 || (freed < 8 && priority === 1)) {
        this.unregisterContext(contextId);
        freed++;

        // Si ya liberamos suficientes, parar
        if (freed >= 12) break;
      }
    }

    console.log(`[WebGLContextManager] Se liberaron ${freed} contextos. Quedan: ${this.activeContexts}`);
  }
}

@Component({
  selector: 'app-euromillones-ball',
  templateUrl: './euromillones-ball.component.html',
  styleUrls: ['./euromillones-ball.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EuromillonesBallComponent implements OnInit, AfterViewInit, OnDestroy {
  // Versión de cache para forzar regeneración cuando cambie el aspecto visual
  private static readonly CACHE_VERSION = 'v5-custom-colors';
  @ViewChild('ballContainer') ballContainer!: ElementRef;
  @Input() number: string | number = '';
  @Input() type: string = 'regular'; // regular o star
  @Input() size: number = 80;
  @Input() priority: number = 0; // 0 = baja, 1 = media, 2 = alta
  @Input() staticRendering: boolean = false; // Renderizado estático para evitar problemas de contexto WebGL
  @Input() customColor: string = ''; // Color personalizado para diferentes juegos de lotería

  // Propiedades para el modo estático
  public useStaticImage: boolean = false;
  public staticImageUrl: string | undefined;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private sphere!: THREE.Mesh;
  private animationFrameId: number = 0;
  private contextManager = WebGLContextManager.getInstance();
  private cacheKey: string = '';
  private contextId: string | undefined;

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Establecer el tamaño como variable CSS para usarlo en los estilos
    this.elementRef.nativeElement.style.setProperty('--ball-size', `${this.size}px`);

    // Generar clave única para esta bola
    const colorSuffix = this.customColor ? `-${this.customColor.replace('#', '')}` : '';
    this.cacheKey = `ball-${this.type}-${this.number}${colorSuffix}`;

    // Si se solicita renderizado estático, buscar en localStorage primero
    if (this.staticRendering) {
      const colorSuffix = this.customColor ? `_${this.customColor.replace('#', '')}` : '';
      const cacheKey = `euromillones_ball_${EuromillonesBallComponent.CACHE_VERSION}_${this.type}_${this.number}_${this.size}${colorSuffix}`;
      const cachedImage = localStorage.getItem(cacheKey);

      if (cachedImage) {
        // Usar imagen cacheada de localStorage
        console.log(`[EuromillonesBall] Usando imagen estática de localStorage para ${this.cacheKey}`);
        this.useStaticImage = true;
        this.staticImageUrl = cachedImage;
        return;
      } else {
        // Generar imagen estática y guardarla en localStorage
        this.useStaticImage = true;
        this.generateStaticImage(cacheKey);
        return;
      }
    }

    // Limpiar contextos de baja prioridad si estamos cerca del límite
    this.contextManager.cleanupLowPriorityContexts();

    // Para prioridad baja (0), usar WebGL brevemente y luego convertir a imagen estática
    if (this.priority === 0) {
      // Verificar si ya tenemos una imagen en cache para esta bola
      if (this.contextManager.hasStaticImage(this.cacheKey)) {
        // Si ya tenemos una imagen en cache, usarla directamente
        this.useStaticImage = true;
        this.staticImageUrl = this.contextManager.getStaticImage(this.cacheKey);
        return;
      }

      // Si no hay imagen en cache, usar WebGL temporalmente para generar una
      // pero solo si hay suficientes recursos disponibles
      if (this.contextManager.getActiveContextCount() < 20) {
        this.useStaticImage = false;
      } else {
        this.useStaticImage = true;
        this.createStaticImageImmediately();
        return;
      }
    }

    // Comprobar si ya tenemos una imagen estática en cache
    if (this.contextManager.hasStaticImage(this.cacheKey)) {
      this.useStaticImage = true;
      this.staticImageUrl = this.contextManager.getStaticImage(this.cacheKey);
      console.log(`[EuromillonesBall] Usando imagen estática en cache para ${this.cacheKey}`);
    } else {
      // Decidir si usar WebGL o imagen estática basado en la prioridad y disponibilidad
      this.useStaticImage = !this.shouldUseWebGL();

      // Si vamos a usar imagen estática, crearla inmediatamente en ngOnInit
      // para evitar ExpressionChangedAfterItHasBeenCheckedError
      if (this.useStaticImage) {
        this.createStaticImage();
      }
    }
  }

  // Método para crear una imagen estática inmediatamente sin depender de cache
  private createStaticImageImmediately(): void {
    // Crear un canvas temporal con mayor tamaño para mejor calidad
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener contexto 2D para crear imagen estática');
      return;
    }

    // Configurar tamaño mayor para mejor calidad
    const canvasSize = 400; // Doble tamaño para mejor calidad
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Activar suavizado
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Radio del círculo principal
    const ballRadius = canvasSize * 0.45;
    const center = canvasSize / 2;

    // Dibujar círculo principal con gradiente
    ctx.beginPath();
    ctx.arc(center, center, ballRadius, 0, 2 * Math.PI);

    // Crear gradiente radial para dar efecto 3D
    const gradient = ctx.createRadialGradient(
      center - ballRadius * 0.3, center - ballRadius * 0.3, 0,
      center, center, ballRadius
    );

    // Color según el tipo con gradiente para efecto 3D
    if (this.customColor) {
      // Usar color personalizado si se proporciona
      const baseColor = this.customColor;

      // Generar colores para el gradiente basados en el color personalizado
      const lighterColor = this.lightenColor(baseColor, 30);
      const darkerColor = this.darkenColor(baseColor, 20);

      gradient.addColorStop(0, lighterColor);
      gradient.addColorStop(0.3, baseColor);
      gradient.addColorStop(1, darkerColor);
    } else if (this.type === 'star') {
      // Gradiente para estrellas (amarillo)
      gradient.addColorStop(0, '#FFEE88');
      gradient.addColorStop(0.3, '#FFCC00');
      gradient.addColorStop(1, '#CC9900');
    } else {
      // Gradiente para números regulares (rojo)
      gradient.addColorStop(0, '#FF5555');
      gradient.addColorStop(0.3, '#E30613');
      gradient.addColorStop(1, '#AA0000');
    }

    ctx.fillStyle = gradient;
    ctx.fill();

    // Añadir borde sutil para mejor definición
    ctx.lineWidth = 1.0;
    ctx.strokeStyle = this.type === 'star' ? '#CC9900' : '#AA0000';
    ctx.stroke();

    // Dibujar círculo blanco central con gradiente
    const whiteCircleRadius = canvasSize * 0.2;
    ctx.beginPath();
    ctx.arc(center, center, whiteCircleRadius, 0, 2 * Math.PI);

    // Gradiente para el círculo blanco
    const whiteGradient = ctx.createRadialGradient(
      center - whiteCircleRadius * 0.2, center - whiteCircleRadius * 0.2, 0,
      center, center, whiteCircleRadius
    );
    whiteGradient.addColorStop(0, '#FFFFFF');
    whiteGradient.addColorStop(1, '#F0F0F0');

    ctx.fillStyle = whiteGradient;
    ctx.fill();

    // Borde sutil para el círculo blanco
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = '#DDDDDD';
    ctx.stroke();

    // Dibujar número con mejor tipografía y tamaño
    const numberToDisplay = this.number.toString();
    const fontSize = whiteCircleRadius * (numberToDisplay.length > 1 ? 0.9 : 1.1);

    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Añadir sombra sutil al texto para mejor legibilidad
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText(numberToDisplay, center, center);

    // Convertir a URL de datos
    try {
      this.staticImageUrl = canvas.toDataURL('image/png');

      // Guardar en cache
      this.contextManager.cacheStaticImage(this.cacheKey, this.staticImageUrl);

      // Guardar en localStorage también para persistencia
      const colorSuffix = this.customColor ? `_${this.customColor.replace('#', '')}` : '';
      const localStorageKey = `euromillones_ball_${EuromillonesBallComponent.CACHE_VERSION}_${this.type}_${this.number}_${this.size}${colorSuffix}`;
      try {
        localStorage.setItem(localStorageKey, this.staticImageUrl);
      } catch (e) {
        console.warn('No se pudo guardar en localStorage:', e);
      }

      // Forzar detección de cambios
      this.cdr.detectChanges();
    } catch (e) {
      console.error('Error al generar imagen estática:', e);
    }
  }

  ngAfterViewInit(): void {
    // Solo inicializar Three.js si no estamos usando imagen estática
    if (!this.useStaticImage) {
      // Usar setTimeout para evitar ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        if (this.ballContainer && this.ballContainer.nativeElement) {
          this.initThreeJS();
        } else {
          console.warn(`[EuromillonesBall] Contenedor no disponible para ${this.cacheKey}, usando imagen estática`);
          this.useStaticImage = true;
          this.createStaticImage();
        }
      }, 0);
    }
  }

  // Método para generar una imagen estática usando WebGL y guardarla en localStorage
  private generateStaticImage(cacheKey: string): void {
    console.log(`[EuromillonesBall] Generando imagen estática WebGL para ${this.cacheKey}`);

    // Crear un contenedor temporal fuera del DOM para renderizar la bola
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    // Usar un tamaño mayor para el renderizado para mejorar la calidad
    const renderSize = Math.max(this.size * 2, 200); // Al menos 200px para mejor calidad
    tempContainer.style.width = `${renderSize}px`;
    tempContainer.style.height = `${renderSize}px`;
    document.body.appendChild(tempContainer);

    try {
      // Crear una escena Three.js temporal
      const scene = new THREE.Scene();
      scene.background = null; // Fondo transparente

      // Crear cámara
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = 2;

      // Crear renderer con opciones optimizadas para alta calidad
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
        precision: 'highp' // Alta precisión para mejor calidad
      });

      // Configurar tamaño mayor para mejor calidad
      renderer.setSize(renderSize, renderSize);
      // Usar un pixel ratio alto para mejorar la nitidez
      renderer.setPixelRatio(Math.max(window.devicePixelRatio || 1, 3)); // Forzar al menos 3x para mejor calidad
      tempContainer.appendChild(renderer.domElement);

      // Crear la bola con geometría de alta resolución
      const geometry = new THREE.SphereGeometry(0.9, 128, 128); // Mayor detalle (128 segmentos)

      // Crear un canvas para la textura con resolución muy alta
      const textureCanvas = document.createElement('canvas');
      const textureContext = textureCanvas.getContext('2d');
      if (!textureContext) {
        throw new Error('No se pudo obtener contexto 2D para la textura');
      }

      // Usar una textura de muy alta resolución
      const textureSize = 2048; // Doble resolución para mayor detalle
      textureCanvas.width = textureSize;
      textureCanvas.height = textureSize;

      // Crear un gradiente radial para la textura
      const gradient = textureContext.createRadialGradient(
        textureSize * 0.3,
        textureSize * 0.3,
        textureSize * 0.1,
        textureSize * 0.5,
        textureSize * 0.5,
        textureSize * 0.9
      );

      // Configurar colores según el tipo con mayor saturación y contraste
      if (this.customColor) {
        // Usar color personalizado si se proporciona
        const baseColor = this.customColor;

        // Generar colores para el gradiente basados en el color personalizado
        const lighterColor = this.lightenColor(baseColor, 30);
        const darkerColor = this.darkenColor(baseColor, 20);

        gradient.addColorStop(0, lighterColor);
        gradient.addColorStop(0.3, baseColor);
        gradient.addColorStop(1, darkerColor);
      } else if (this.type === 'star') {
        // Gradiente para estrellas (amarillo)
        gradient.addColorStop(0, '#FFEE88');
        gradient.addColorStop(0.3, '#FFCC00');
        gradient.addColorStop(1, '#CC9900');
      } else {
        // Gradiente para números regulares (rojo)
        gradient.addColorStop(0, '#FF5555');
        gradient.addColorStop(0.3, '#E30613');
        gradient.addColorStop(1, '#AA0000');
      }

      // Rellenar el fondo con el gradiente
      textureContext.fillStyle = gradient;
      textureContext.fillRect(0, 0, textureSize, textureSize);

      // Configuración para los círculos
      const circleDiameter = textureSize * 0.22;
      const circleRadius = circleDiameter / 2;
      const verticalSquash = 0.95; // Menos achatamiento para mejor apariencia
      const numberToDisplay = this.number.toString();

      // Función para dibujar un círculo con número
      const drawNumberCircle = (x: number, y: number) => {
        // Dibujar círculo blanco
        textureContext.save();
        textureContext.beginPath();
        textureContext.ellipse(
          x, y,
          circleRadius,
          circleRadius * verticalSquash,
          0, 0, Math.PI * 2
        );

        // Usar un gradiente para el círculo blanco para dar más realismo
        const circleGradient = textureContext.createRadialGradient(
          x - circleRadius * 0.2, y - circleRadius * 0.2, 0,
          x, y, circleRadius
        );
        circleGradient.addColorStop(0, '#FFFFFF');
        circleGradient.addColorStop(1, '#F0F0F0');

        textureContext.fillStyle = circleGradient;
        textureContext.fill();

        // Añadir un borde sutil para mejor definición
        textureContext.lineWidth = 1.0;
        textureContext.strokeStyle = '#DDDDDD';
        textureContext.stroke();

        // Dibujar número con mejor tipografía y tamaño
        const fontSize = circleRadius * (numberToDisplay.length > 1 ? 0.9 : 1.1);
        textureContext.font = `bold ${fontSize}px Arial, sans-serif`;
        textureContext.fillStyle = '#000000';
        textureContext.textAlign = 'center';
        textureContext.textBaseline = 'middle';

        // Añadir sombra sutil al texto para mejor legibilidad
        textureContext.shadowColor = 'rgba(0, 0, 0, 0.2)';
        textureContext.shadowBlur = 2;
        textureContext.shadowOffsetX = 1;
        textureContext.shadowOffsetY = 1;

        textureContext.fillText(numberToDisplay, x, y);

        // Restaurar contexto
        textureContext.restore();
      };

      // Dibujar círculo central más grande
      const mainCircleRadius = circleRadius * 1.2;

      // Dibujar el círculo central con gradiente
      textureContext.save();
      textureContext.beginPath();
      textureContext.ellipse(
        textureSize / 2, textureSize / 2,
        mainCircleRadius,
        mainCircleRadius * verticalSquash,
        0, 0, Math.PI * 2
      );

      // Gradiente para el círculo central
      const mainCircleGradient = textureContext.createRadialGradient(
        textureSize / 2 - mainCircleRadius * 0.2,
        textureSize / 2 - mainCircleRadius * 0.2,
        0,
        textureSize / 2,
        textureSize / 2,
        mainCircleRadius
      );
      mainCircleGradient.addColorStop(0, '#FFFFFF');
      mainCircleGradient.addColorStop(1, '#F0F0F0');

      textureContext.fillStyle = mainCircleGradient;
      textureContext.fill();

      // Borde sutil
      textureContext.lineWidth = 1.0;
      textureContext.strokeStyle = '#DDDDDD';
      textureContext.stroke();

      // Dibujar número central
      const mainFontSize = mainCircleRadius * (numberToDisplay.length > 1 ? 0.9 : 1.1);
      textureContext.font = `bold ${mainFontSize}px Arial, sans-serif`;
      textureContext.fillStyle = '#000000';
      textureContext.textAlign = 'center';
      textureContext.textBaseline = 'middle';

      // Sombra sutil para el texto central
      textureContext.shadowColor = 'rgba(0, 0, 0, 0.2)';
      textureContext.shadowBlur = 2;
      textureContext.shadowOffsetX = 1;
      textureContext.shadowOffsetY = 1;

      textureContext.fillText(numberToDisplay, textureSize / 2, textureSize / 2);
      textureContext.restore();

      // Calcular offset para los círculos adicionales (más cercanos para mejor visibilidad)
      const offset = textureSize * 0.25;
      const centerX = textureSize / 2;
      const centerY = textureSize / 2;

      // Dibujar los círculos periféricos
      drawNumberCircle(centerX, centerY - offset); // Arriba
      drawNumberCircle(centerX + offset, centerY); // Derecha
      drawNumberCircle(centerX, centerY + offset); // Abajo
      drawNumberCircle(centerX - offset, centerY); // Izquierda

      // Crear textura con configuración de alta calidad
      const texture = new THREE.CanvasTexture(textureCanvas);
      texture.anisotropy = 16; // Mejora la nitidez
      texture.minFilter = THREE.LinearMipmapLinearFilter; // Mejor filtrado
      texture.magFilter = THREE.LinearFilter;

      // Crear material con propiedades físicas realistas mejoradas
      const material = new THREE.MeshPhysicalMaterial({
        map: texture,
        clearcoat: 0.4, // Más capa de barniz
        clearcoatRoughness: 0.1, // Más suave
        metalness: 0.0,
        roughness: 0.1, // Más suave para mejor brillo
        reflectivity: 0.7, // Más reflectividad
        envMapIntensity: 1.0, // Más intensidad de reflejos
        ior: 1.5,
        transmission: 0.0,
        specularIntensity: 1.2, // Más intensidad especular
        specularColor: 0xffffff,
        flatShading: false
      });

      // Crear esfera
      const sphere = new THREE.Mesh(geometry, material);
      sphere.rotation.set(0, 0, 0);
      sphere.position.set(0, 0, 0);
      scene.add(sphere);

      // Añadir luces mejoradas
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Más intensa
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Más intensa
      directionalLight.position.set(-1, 1, 2);
      scene.add(directionalLight);

      // Luz de relleno para mejorar la iluminación
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
      fillLight.position.set(1, -1, 1);
      scene.add(fillLight);

      // Renderizar la escena
      renderer.render(scene, camera);

      // Capturar la imagen renderizada en alta calidad
      try {
        const dataUrl = renderer.domElement.toDataURL('image/png');
        this.staticImageUrl = dataUrl;

        // Guardar en localStorage
        try {
          localStorage.setItem(cacheKey, dataUrl);
          console.log(`[EuromillonesBall] Imagen WebGL guardada en localStorage para ${this.cacheKey}`);
        } catch (e) {
          console.warn(`[EuromillonesBall] No se pudo guardar en localStorage:`, e);
        }

        // Guardar también en el cache del manager
        this.contextManager.cacheStaticImage(this.cacheKey, dataUrl);

        // Forzar detección de cambios
        this.cdr.detectChanges();
      } catch (e) {
        console.error('Error al capturar imagen WebGL:', e);
        this.createStaticImageImmediately(); // Usar método alternativo
      }

      // Limpiar recursos
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    } catch (e) {
      console.error('Error al generar imagen WebGL:', e);
      this.createStaticImageImmediately(); // Usar método alternativo
    } finally {
      // Eliminar el contenedor temporal
      if (tempContainer.parentNode) {
        tempContainer.parentNode.removeChild(tempContainer);
      }
    }
  }

  ngOnDestroy(): void {
    this.stopAnimation();

    // Forzar limpieza de contextos si hay demasiados activos
    if (this.contextManager.getActiveContextCount() > 35) {
      this.contextManager.forceCleanupContexts();
    }

    this.disposeResources();
  }

  // Determina si debemos usar WebGL basado en la prioridad y disponibilidad
  private shouldUseWebGL(): boolean {
    // Verificar si podemos crear más contextos WebGL
    if (!this.contextManager.canCreateContext()) {
      return false;
    }

    // Estrategia balanceada para permitir que todas las bolas se muestren
    const activeContexts = this.contextManager.getActiveContextCount();

    // Para prioridad alta, siempre usar WebGL a menos que sea imposible
    if (this.priority >= 2) {
      return activeContexts < 30; // Permitir hasta 30 contextos para prioridad alta
    }

    // Para prioridad media, usar WebGL si hay menos de 25 contextos activos
    if (this.priority === 1) {
      return activeContexts < 25;
    }

    // Para prioridad baja, preferimos usar imágenes estáticas si ya están en cache
    // pero permitimos WebGL temporalmente para generar esas imágenes
    if (this.priority === 0 && this.contextManager.hasStaticImage(this.cacheKey)) {
      return false; // Si ya tenemos imagen en cache, no usar WebGL
    }

    // Para prioridad baja sin imagen en cache, usar WebGL brevemente si hay menos de 15 contextos
    return activeContexts < 15;
  }

  // Crea una imagen estática de la bola
  private createStaticImage(): void {
    try {
      // Crear un canvas temporal
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('No se pudo obtener contexto 2D para crear imagen estática');
        this.createFallbackImage();
        return;
      }

      // Configurar tamaño
      canvas.width = 200;
      canvas.height = 200;

      // Dibujar círculo
      ctx.beginPath();
      ctx.arc(100, 100, 90, 0, 2 * Math.PI);

      // Color según el tipo
      const ballColor = this.type === 'star' ? '#FFCC00' : '#E30613';
      ctx.fillStyle = ballColor;
      ctx.fill();

      // Dibujar círculo blanco central
      ctx.beginPath();
      ctx.arc(100, 100, 40, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Dibujar número
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.number.toString(), 100, 100);

      // Convertir a URL de datos
      try {
        this.staticImageUrl = canvas.toDataURL('image/png');

        // Verificar que la URL sea válida
        if (!this.staticImageUrl || this.staticImageUrl === 'data:,' || !this.staticImageUrl.startsWith('data:image/png')) {
          console.warn(`URL de imagen inválida para ${this.cacheKey}, usando imagen de respaldo`);
          this.createFallbackImage();
          return;
        }

        // Guardar en cache
        this.contextManager.cacheStaticImage(this.cacheKey, this.staticImageUrl);

        // Forzar detección de cambios para evitar ExpressionChangedAfterItHasBeenCheckedError
        this.cdr.detectChanges();
      } catch (e) {
        console.error('Error al generar URL de datos para imagen estática:', e);
        this.createFallbackImage();
      }
    } catch (e) {
      console.error('Error general al crear imagen estática:', e);
      this.createFallbackImage();
    }
  }

  // Método de respaldo para crear una imagen simple pero de buena calidad en caso de error
  private createFallbackImage(): void {
    try {
      // Crear un canvas con tamaño adecuado
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('No se pudo crear ni siquiera la imagen de respaldo');
        return;
      }

      // Usar un tamaño mayor para mejor calidad
      const canvasSize = 200;
      canvas.width = canvasSize;
      canvas.height = canvasSize;

      // Activar suavizado
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const center = canvasSize / 2;
      const radius = canvasSize * 0.4;

      // Dibujar círculo con el color correspondiente
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);

      // Determinar el color a usar
      let ballColor, borderColor;

      if (this.customColor) {
        // Usar color personalizado
        ballColor = this.customColor;
        borderColor = this.darkenColor(this.customColor, 20);
      } else {
        // Usar colores predeterminados
        ballColor = this.type === 'star' ? '#FFCC00' : '#E30613';
        borderColor = this.type === 'star' ? '#CC9900' : '#AA0000';
      }

      ctx.fillStyle = ballColor;
      ctx.fill();

      // Añadir borde sutil
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = borderColor;
      ctx.stroke();

      // Círculo blanco para el número
      const whiteRadius = radius * 0.6;
      ctx.beginPath();
      ctx.arc(center, center, whiteRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Borde sutil para el círculo blanco
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = '#DDDDDD';
      ctx.stroke();

      // Número con mejor tipografía
      const numberToDisplay = this.number.toString();
      const fontSize = whiteRadius * (numberToDisplay.length > 1 ? 0.9 : 1.1);

      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Sombra sutil para mejor legibilidad
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 1;
      ctx.shadowOffsetX = 0.5;
      ctx.shadowOffsetY = 0.5;

      ctx.fillText(numberToDisplay, center, center);

      // Intentar generar URL
      try {
        this.staticImageUrl = canvas.toDataURL('image/png');
        this.contextManager.cacheStaticImage(this.cacheKey, this.staticImageUrl);

        // Guardar en localStorage también
        const colorSuffix = this.customColor ? `_${this.customColor.replace('#', '')}` : '';
        const localStorageKey = `euromillones_ball_${EuromillonesBallComponent.CACHE_VERSION}_${this.type}_${this.number}_${this.size}${colorSuffix}`;
        try {
          localStorage.setItem(localStorageKey, this.staticImageUrl);
        } catch (e) {
          console.warn('No se pudo guardar imagen de respaldo en localStorage:', e);
        }

        this.cdr.detectChanges();
      } catch (e) {
        console.error('Error fatal al crear imagen de respaldo:', e);
      }
    } catch (e) {
      console.error('Error catastrófico en createFallbackImage:', e);
    }
  }

  private initThreeJS(): void {
    try {
      // Verificar si podemos crear un nuevo contexto WebGL
      if (!this.contextManager.canCreateContext()) {
        console.warn(`[EuromillonesBall] Límite de contextos WebGL alcanzado. Usando imagen estática para ${this.cacheKey}`);
        // Forzar limpieza de contextos para liberar recursos
        this.contextManager.forceCleanupContexts();

        // Verificar nuevamente si podemos crear un contexto
        if (!this.contextManager.canCreateContext()) {
          this.useStaticImage = true;
          this.createStaticImage();
          return;
        }
      }

      // Obtener el contenedor
      const container = this.ballContainer.nativeElement;
      const width = this.size;
      const height = this.size;

      // Crear escena
      this.scene = new THREE.Scene();

      // Fondo transparente
      this.scene.background = null;

      // Crear cámara
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.position.z = 2;

      // Crear renderer con opciones optimizadas
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,           // Suavizado de bordes
        alpha: true,               // Fondo transparente
        preserveDrawingBuffer: true, // Necesario para capturas
        powerPreference: 'high-performance', // Mejor rendimiento
        precision: 'mediump'       // Precisión media para mejor rendimiento
      });

      // Configurar renderer con opciones más ligeras
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(1); // Usar pixel ratio 1 para mejor rendimiento

      // Configuración más ligera para todas las bolas
      this.renderer.shadowMap.enabled = false;

      // Verificar si el contexto WebGL se ha creado correctamente
      if (!this.renderer.getContext()) {
        console.warn(`[EuromillonesBall] No se pudo crear contexto WebGL para ${this.cacheKey}. Usando imagen estática.`);
        this.useStaticImage = true;
        this.createStaticImage();
        return;
      }

      // Registrar el nuevo contexto WebGL solo si se creó correctamente
      this.contextId = this.contextManager.registerContext(this.priority);

      // Configurar evento para detectar pérdida de contexto
      const canvas = this.renderer.domElement;
      canvas.addEventListener('webglcontextlost', (event: Event) => {
        event.preventDefault();
        console.warn(`[EuromillonesBall] Contexto WebGL perdido para ${this.cacheKey}. Cambiando a imagen estática.`);
        this.useStaticImage = true;
        this.createStaticImage();
        this.cdr.detectChanges();
      }, false);

      container.appendChild(canvas);

      // Crear la bola
      this.createBall();

      // Añadir luces (simplificadas para mejor rendimiento)
      this.addLights();

      // Renderizar una vez y capturar como imagen estática
      this.renderer.render(this.scene, this.camera);

      // Guardar la imagen renderizada en cache para futuras instancias
      try {
        const imageUrl = this.renderer.domElement.toDataURL('image/png');
        this.contextManager.cacheStaticImage(this.cacheKey, imageUrl);
      } catch (e) {
        console.error('Error al capturar imagen estática:', e);
      }

      // Iniciar animación suave solo si la prioridad es alta
      if (this.priority >= 2) { // Solo animar bolas de alta prioridad
        this.animate();
      } else {
        // Para bolas de menor prioridad, renderizar una vez y no animar
        this.renderer.render(this.scene, this.camera);

        // Para bolas de baja prioridad, convertir a imagen estática después de renderizar
        // Esto evita que desaparezcan cuando se crean nuevos contextos WebGL
        if (this.priority === 0) {
          // Capturar la imagen estática para tenerla en cache
          try {
            const imageUrl = this.renderer.domElement.toDataURL('image/png');
            this.contextManager.cacheStaticImage(this.cacheKey, imageUrl);
            this.staticImageUrl = imageUrl;

            // Cambiar a imagen estática después de un breve retraso
            // para asegurar que la imagen se haya capturado correctamente
            setTimeout(() => {
              console.log(`[EuromillonesBall] Convirtiendo bola ${this.number} a imagen estática para conservar recursos`);
              this.useStaticImage = true;
              this.disposeResources();
              this.cdr.detectChanges();
            }, 300);
          } catch (e) {
            console.error('Error al capturar imagen estática de respaldo:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error al inicializar Three.js:', error);
      // En caso de error, intentar usar imagen estática
      this.useStaticImage = true;
      this.createStaticImage();
      this.cdr.detectChanges();
    }
  }

  private createBall(): void {
    // Crear un canvas para la textura
    const textureCanvas = document.createElement('canvas');
    const textureContext = textureCanvas.getContext('2d');
    if (!textureContext) return;

    const textureSize = 1024; // Mayor resolución para mejor detalle
    textureCanvas.width = textureSize;
    textureCanvas.height = textureSize;

    // Determinar color de fondo según el tipo
    // Colores exactos de las bolas reales de Euromillones
    // Usamos directamente los colores en el gradiente

    // Crear un gradiente radial para dar efecto de brillo y profundidad
    const gradient = textureContext.createRadialGradient(
      textureSize * 0.3, // x0 - punto inicial x (desplazado para efecto de luz)
      textureSize * 0.3, // y0 - punto inicial y
      textureSize * 0.1, // r0 - radio inicial pequeño
      textureSize * 0.5, // x1 - punto final x (centro)
      textureSize * 0.5, // y1 - punto final y (centro)
      textureSize * 0.9  // r1 - radio final grande
    );

    // Configurar paradas de color para el gradiente
    if (this.customColor) {
      // Usar color personalizado si se proporciona
      const baseColor = this.customColor;

      // Generar colores para el gradiente basados en el color personalizado
      const lighterColor = this.lightenColor(baseColor, 30);
      const darkerColor = this.darkenColor(baseColor, 20);

      gradient.addColorStop(0, lighterColor); // Más claro en el punto de luz
      gradient.addColorStop(0.3, baseColor); // Color principal
      gradient.addColorStop(1, darkerColor); // Más oscuro en los bordes
    } else if (this.type === 'star') {
      // Gradiente para estrellas (amarillo)
      gradient.addColorStop(0, '#FFEE88'); // Más claro en el punto de luz
      gradient.addColorStop(0.3, '#FFCC00'); // Color principal
      gradient.addColorStop(1, '#CC9900'); // Más oscuro en los bordes
    } else {
      // Gradiente para números regulares (rojo)
      gradient.addColorStop(0, '#FF5555'); // Más claro en el punto de luz
      gradient.addColorStop(0.3, '#E30613'); // Color principal exacto de Euromillones
      gradient.addColorStop(1, '#AA0000'); // Más oscuro en los bordes
    }

    // Rellenar el fondo con el gradiente
    textureContext.fillStyle = gradient;
    textureContext.fillRect(0, 0, textureSize, textureSize);

    // Configuración para los círculos
    const circleDiameter = textureSize * 0.22; // Diámetro de los círculos (ligeramente más pequeños)
    const circleRadius = circleDiameter / 2;
    const verticalSquash = 0.9; // Factor de achatamiento vertical (menos achatados)
    const numberToDisplay = this.number.toString();

    // Función para dibujar un círculo blanco achatado con el número
    const drawNumberCircle = (centerX: number, centerY: number) => {
      textureContext.save();
      textureContext.translate(centerX, centerY);
      textureContext.scale(1, verticalSquash);

      // Dibujar círculo blanco
      textureContext.beginPath();
      textureContext.arc(0, 0, circleRadius, 0, 2 * Math.PI);

      // Gradiente para el círculo blanco para dar más realismo
      const circleGradient = textureContext.createRadialGradient(
        -circleRadius * 0.2, -circleRadius * 0.2, 0,
        0, 0, circleRadius
      );
      circleGradient.addColorStop(0, '#FFFFFF');
      circleGradient.addColorStop(1, '#F0F0F0');

      textureContext.fillStyle = circleGradient;
      textureContext.fill();

      // Borde del círculo más sutil
      textureContext.lineWidth = 1.0;
      textureContext.strokeStyle = '#DDDDDD';
      textureContext.stroke();

      // Deshacer el achatamiento para el texto
      textureContext.scale(1, 1 / verticalSquash);

      // Configurar texto
      const fontSize = circleRadius * (numberToDisplay.length > 1 ? 1.0 : 1.2);
      textureContext.font = `bold ${fontSize}px Arial, sans-serif`;
      textureContext.fillStyle = '#000000';
      textureContext.textAlign = 'center';
      textureContext.textBaseline = 'middle';

      // Dibujar número
      textureContext.fillText(numberToDisplay, 0, 0);

      textureContext.restore();
    };

    // Calcular posiciones de los círculos
    const centerX = textureSize / 2;
    const centerY = textureSize / 2;

    // Ajustar la distribución de los círculos para que se parezcan más a las bolas reales
    // Círculo central más grande
    const mainCircleRadius = circleRadius * 1.2;

    // Dibujar el círculo central (más grande)
    textureContext.save();
    textureContext.translate(centerX, centerY);
    textureContext.scale(1, verticalSquash);
    textureContext.beginPath();
    textureContext.arc(0, 0, mainCircleRadius, 0, 2 * Math.PI);
    textureContext.fillStyle = '#FFFFFF';
    textureContext.fill();
    textureContext.lineWidth = 1.0;
    textureContext.strokeStyle = '#DDDDDD';
    textureContext.stroke();
    textureContext.scale(1, 1 / verticalSquash);

    // Configurar texto para el círculo central (más grande)
    const mainFontSize = mainCircleRadius * (numberToDisplay.length > 1 ? 0.9 : 1.1);
    textureContext.font = `bold ${mainFontSize}px Arial, sans-serif`;
    textureContext.fillStyle = '#000000';
    textureContext.textAlign = 'center';
    textureContext.textBaseline = 'middle';
    textureContext.fillText(numberToDisplay, 0, 0);
    textureContext.restore();

    // Calcular offset para los círculos periféricos (más cercanos al centro)
    const offset = textureSize * 0.25; // Distancia adecuada para visibilidad

    // Dibujar los círculos periféricos (más pequeños y más cercanos)
    // Arriba
    drawNumberCircle(centerX, centerY - offset);
    // Derecha
    drawNumberCircle(centerX + offset, centerY);
    // Abajo
    drawNumberCircle(centerX, centerY + offset);
    // Izquierda
    drawNumberCircle(centerX - offset, centerY);

    // Crear textura
    const texture = new THREE.CanvasTexture(textureCanvas);

    // Mejorar la calidad de la textura
    texture.anisotropy = 16; // Mejora la nitidez de la textura
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    // Crear geometría con segmentos optimizados según la prioridad
    // Usar menos segmentos para bolas de menor prioridad para mejorar rendimiento
    const segments = this.priority >= 2 ? 64 : (this.priority === 1 ? 48 : 32);
    const geometry = new THREE.SphereGeometry(1, segments, segments);

    // Crear material con propiedades físicas realistas
    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      clearcoat: 0.3,           // Capa de barniz para efecto brillante
      clearcoatRoughness: 0.2,  // Rugosidad de la capa de barniz
      metalness: 0.0,           // No es metálico
      roughness: 0.2,           // Superficie bastante lisa
      reflectivity: 0.5,        // Reflectividad moderada
      envMapIntensity: 0.8,     // Intensidad de reflejos del entorno
      ior: 1.5,                 // Índice de refracción similar al plástico
      transmission: 0.0,        // No es transparente
      specularIntensity: 1.0,   // Intensidad de brillo especular
      specularColor: 0xffffff,  // Color del brillo especular
      flatShading: false        // Sombreado suave
    });

    // Crear esfera
    this.sphere = new THREE.Mesh(geometry, material);

    // Asegurar que la esfera esté orientada correctamente para mostrar el número frontal
    this.sphere.rotation.set(0, 0, 0);

    // Ajustar la posición para que el número esté perfectamente centrado
    this.sphere.position.set(0, 0, 0);

    // Desactivar sombras para mejorar rendimiento
    this.sphere.castShadow = false;
    this.sphere.receiveShadow = false;

    this.scene.add(this.sphere);
  }

  private addLights(): void {
    try {
      // Configuración de luces basada en la prioridad
      if (this.priority >= 2) {
        // Configuración simplificada de luces para todas las bolas de alta prioridad
        // Reducimos la complejidad para mejorar el rendimiento

        // Luz ambiental más intensa para compensar menos luces
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // Luz direccional principal (simula la luz principal del estudio)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(1, 1, 5); // Ligeramente desde arriba y a la derecha

        // Desactivar sombras para mejorar rendimiento
        directionalLight.castShadow = false;

        this.scene.add(directionalLight);

        // Luz de relleno desde abajo para iluminar la parte inferior
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(0, -3, 2);
        this.scene.add(fillLight);
      } else if (this.priority === 1) {
        // Configuración mínima de luces para bolas de prioridad media
        // Usar la misma configuración para todas las bolas para simplificar

        // Luz ambiental más intensa para compensar menos luces
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // Luz direccional principal simplificada
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(1, 1, 5);
        this.scene.add(directionalLight);
      } else {
        // Configuración mínima de luces para bolas de baja prioridad
        // Usar la misma configuración para todas las bolas para simplificar

        // Solo luz ambiental y una direccional para rendimiento máximo
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        // Una sola luz direccional
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(1, 1, 5);
        this.scene.add(directionalLight);
      }
    } catch (error) {
      console.error('Error al añadir luces:', error);
    }
  }

  private animate(): void {
    if (this.sphere) {
      // Efecto de pulso suave (cambio de tamaño) en lugar de rotación
      // para mantener el número siempre visible frontalmente
      const pulseScale = 1.0 + Math.sin(Date.now() * 0.002) * 0.02; // Pulso sutil
      this.sphere.scale.set(pulseScale, pulseScale, pulseScale);

      // Mantener la rotación fija para que el número siempre esté al frente
      this.sphere.rotation.set(0, 0, 0);

      // Asegurar que la posición se mantenga centrada en cada frame
      this.sphere.position.set(0, 0, 0);
    }

    // Renderizar la escena
    this.renderer.render(this.scene, this.camera);

    // Continuar la animación
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  private stopAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private disposeResources(): void {
    // Si estamos usando imagen estática, no hay recursos WebGL que liberar
    if (this.useStaticImage) {
      return;
    }

    // Liberar recursos WebGL
    if (this.renderer) {
      if (this.ballContainer && this.ballContainer.nativeElement) {
        const canvas = this.ballContainer.nativeElement.querySelector('canvas');
        if (canvas) {
          this.ballContainer.nativeElement.removeChild(canvas);
        }
      }

      // Liberar recursos del renderer
      this.renderer.dispose();

      // Notificar al gestor que hemos liberado un contexto
      this.contextManager.unregisterContext(this.contextId);
      this.contextId = undefined;
    }

    // Liberar recursos de geometría y materiales
    if (this.sphere) {
      if (this.sphere.geometry) {
        this.sphere.geometry.dispose();
      }
      if (this.sphere.material) {
        if (Array.isArray(this.sphere.material)) {
          this.sphere.material.forEach((material: any) => material.dispose());
        } else {
          this.sphere.material.dispose();
        }
      }
    }

    // Liberar recursos de la escena
    if (this.scene) {
      this.scene.clear();
    }

    // Liberar referencias
    this.scene = null as any;
    this.camera = null as any;
    this.renderer = null as any;
    this.sphere = null as any;
  }

  // Función para aclarar un color hex
  private lightenColor(color: string, percent: number): string {
    // Eliminar el # si existe
    let hex = color.replace('#', '');

    // Convertir a RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Aclarar cada componente
    r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

    // Convertir de nuevo a hex
    return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`;
  }

  // Función para oscurecer un color hex
  private darkenColor(color: string, percent: number): string {
    // Eliminar el # si existe
    let hex = color.replace('#', '');

    // Convertir a RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Oscurecer cada componente
    r = Math.max(0, Math.floor(r * (1 - percent / 100)));
    g = Math.max(0, Math.floor(g * (1 - percent / 100)));
    b = Math.max(0, Math.floor(b * (1 - percent / 100)));

    // Convertir de nuevo a hex
    return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`;
  }

  // Función auxiliar para convertir un componente decimal a hex
  private componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
}
