import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-lottery-ball-3d-new',
  templateUrl: './lottery-ball-3d-new.component.html',
  styleUrls: ['./lottery-ball-3d-new.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LotteryBall3dNewComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  @Input() number: string | number = '';
  @Input() game: string = 'euromillones';
  @Input() type: string = 'regular'; // regular, star, dream, etc.
  @Input() highlight: boolean = false;
  @Input() size: number = 80; // Tamaño del canvas en píxeles
  @Input() animate: boolean = true;
  @Input() staticRendering: boolean = false; // Nueva opción para renderizado estático

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private sphere!: THREE.Mesh;
  private animationFrameId: number = 0;
  private isDestroyed: boolean = false;
  staticImageUrl: string = ''; // URL de la imagen estática

  // Colores para diferentes juegos - Ajustados para coincidir con las bolas reales
  private gameColors: Record<string, string> = {
    'euromillones': '#E30613', // Rojo exacto de las bolas de Euromillones
    'euromillones-star': '#D4C600', // Amarillo exacto de las estrellas de Euromillones
    'primitiva': '#00cc66', // Verde más intenso
    'bonoloto': '#0033cc', // Azul más intenso
    'gordo': '#ff9900', // Naranja más intenso
    'eurodreams': '#9900cc', // Púrpura más intenso
    'eurodreams-dream': '#00ccff', // Azul claro más intenso
    'lototurf': '#00cc33', // Verde oscuro más intenso
    'loteria-nacional': '#e6b800' // Dorado más intenso
  };

  // Gradientes para mejorar el aspecto visual - Ajustados para coincidir con las bolas reales
  private gameGradients: Record<string, {top: string, bottom: string}> = {
    'euromillones': {top: '#E30613', bottom: '#C00000'}, // Rojo exacto de Euromillones
    'euromillones-star': {top: '#D4C600', bottom: '#B8AA00'}, // Amarillo exacto de las estrellas
    'primitiva': {top: '#00cc66', bottom: '#009933'}, // Verde intenso
    'bonoloto': {top: '#0033cc', bottom: '#0000cc'}, // Azul intenso
    'gordo': {top: '#ff9900', bottom: '#cc7a00'}, // Naranja intenso
    'eurodreams': {top: '#9900cc', bottom: '#660099'}, // Púrpura intenso
    'eurodreams-dream': {top: '#00ccff', bottom: '#0099cc'}, // Azul claro intenso
    'lototurf': {top: '#00cc33', bottom: '#009933'}, // Verde oscuro intenso
    'loteria-nacional': {top: '#e6b800', bottom: '#cc9900'} // Dorado intenso
  };

  // Variable para controlar el efecto de pulsación del número central
  private pulseEffect: boolean = false;
  private pulseInterval: any = null;

  ngAfterViewInit(): void {
    // Usar setTimeout para asegurar que el DOM esté completamente cargado
    console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): ngAfterViewInit iniciado`);

    setTimeout(() => {
      if (this.isDestroyed) {
        console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): componente destruido antes de inicializar`);
        return;
      }

      try {
        // Si es renderizado estático, intentar generar o recuperar la imagen estática
        if (this.staticRendering) {
          console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): usando renderizado estático`);
          this.generateStaticImage();
          return;
        }

        console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): iniciando escena`);
        this.initScene();

        if (this.sphere) {
          console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): esfera creada correctamente`);
          // Forzar rotación exactamente frontal
          this.sphere.rotation.set(0, 0, 0);
          // Asegurar que la posición sea correcta
          this.sphere.position.set(0, 0, 0);
        } else {
          console.warn(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): esfera no creada`);
        }

        // Iniciar efecto de pulsación para el número central
        this.startPulseEffect();

        // Renderizar la escena
        console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): renderizando escena`);
        this.renderOnce();

        // Solo iniciar animación si se solicita explícitamente
        if (this.animate) {
          this.startAnimation();
        }

        // Verificar si el canvas sigue existiendo después de un tiempo
        setTimeout(() => {
          if (!this.isDestroyed) {
            const canvas = this.rendererContainer?.nativeElement?.querySelector('canvas');
            if (canvas) {
              console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): canvas sigue presente después de 500ms`);
            } else {
              console.warn(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): canvas NO ENCONTRADO después de 500ms`);
            }
          }
        }, 500);
      } catch (error) {
        console.error(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Error initializing ball:`, error);
      }
    }, 100); // Pequeño retraso para asegurar que el DOM esté listo
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.number || changes.game || changes.type) && this.sphere) {
      this.updateBall();
    }

    if (changes.animate && this.sphere) {
      if (this.animate) {
        this.startAnimation();
      } else {
        this.stopAnimation();
        this.renderOnce();
      }
    }
  }

  ngOnDestroy(): void {
    console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): ngOnDestroy llamado`);
    this.isDestroyed = true;
    this.stopAnimation();
    this.stopPulseEffect();
    this.disposeResources();
  }

  private initScene(): void {
    if (!this.rendererContainer || !this.rendererContainer.nativeElement) {
      console.error(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Renderer container not available`);
      return;
    }

    try {
      const container = this.rendererContainer.nativeElement;
      const width = this.size;
      const height = this.size;

      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Inicializando escena, tamaño ${width}x${height}`);

      // Limpiar el contenedor si ya tiene elementos
      let childrenRemoved = 0;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
        childrenRemoved++;
      }
      if (childrenRemoved > 0) {
        console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Se eliminaron ${childrenRemoved} elementos del contenedor`);
      }

      // Crear escena
      this.scene = new THREE.Scene();
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Escena creada`);

      // Crear cámara con menor campo de visión para un efecto más plano (menos perspectiva)
      this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      // Alejar un poco la cámara para ver mejor toda la esfera
      this.camera.position.z = 2.2;
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Cámara creada`);

      // Crear renderer con mejor calidad
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        precision: 'highp'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limitar para mejor rendimiento
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Renderer creado`);

      // Verificar si el contenedor sigue existiendo antes de añadir el canvas
      if (container.isConnected) {
        container.appendChild(this.renderer.domElement);
        console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Canvas añadido al DOM`);
      } else {
        console.warn(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): El contenedor ya no está conectado al DOM`);
        return; // Salir si el contenedor ya no está en el DOM
      }

      // Crear la bola
      this.createBall();
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Bola creada`);

      // Añadir luces
      this.addLights();
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Luces añadidas`);

      // Renderizar inmediatamente
      this.renderOnce();
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Renderizado inicial completado`);
    } catch (error) {
      console.error(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Error initializing Three.js scene:`, error);
    }
  }

  private createBall(): void {
    // Crear textura con canvas
    const textureCanvas = document.createElement('canvas');
    const textureContext = textureCanvas.getContext('2d');
    if (!textureContext) return;

    const textureSize = 1024; // Mayor resolución para mejor detalle
    textureCanvas.width = textureSize;
    textureCanvas.height = textureSize;

    // Obtener color según el juego
    const ballColor = this.getBallColor();

    // Rellenar el fondo con el color de la bola
    textureContext.fillStyle = ballColor;
    textureContext.fillRect(0, 0, textureSize, textureSize);

    // Configuración para los círculos
    const circleDiameter = textureSize * 0.25; // Diámetro de los círculos
    const circleRadius = circleDiameter / 2;
    const verticalSquash = 0.8; // Factor de achatamiento vertical
    const numberToDisplay = this.number.toString();

    // Función para dibujar un círculo blanco achatado con el número
    const drawNumberCircle = (centerX: number, centerY: number) => {
      textureContext.save();
      textureContext.translate(centerX, centerY);
      textureContext.scale(1, verticalSquash);

      // Dibujar círculo blanco
      textureContext.beginPath();
      textureContext.arc(0, 0, circleRadius, 0, 2 * Math.PI);
      textureContext.fillStyle = '#FFFFFF';
      textureContext.fill();

      // Borde del círculo
      textureContext.lineWidth = 2.0;
      textureContext.strokeStyle = '#AAAAAA';
      textureContext.stroke();

      // Deshacer el achatamiento para el texto
      textureContext.scale(1, 1 / verticalSquash);

      // Configurar texto
      textureContext.font = `bold ${circleRadius * 1.2}px Arial, sans-serif`;
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
    const diagonalOffset = circleDiameter * 0.9; // Ajustar para evitar superposición

    // Dibujar el círculo central
    drawNumberCircle(centerX, centerY);

    // Dibujar los círculos diagonales
    drawNumberCircle(centerX + diagonalOffset * 0.707, centerY + diagonalOffset * 0.707); // Abajo-Derecha
    drawNumberCircle(centerX + diagonalOffset * 0.707, centerY - diagonalOffset * 0.707); // Arriba-Derecha
    drawNumberCircle(centerX - diagonalOffset * 0.707, centerY + diagonalOffset * 0.707); // Abajo-Izquierda
    drawNumberCircle(centerX - diagonalOffset * 0.707, centerY - diagonalOffset * 0.707); // Arriba-Izquierda

    // Crear textura
    const texture = new THREE.CanvasTexture(textureCanvas);

    // Crear geometría
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    // Material con brillo y reflejo
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 50,
      specular: 0xffffff,
    });

    // Crear la esfera
    this.sphere = new THREE.Mesh(geometry, material);

    // Asegurar que la esfera esté orientada correctamente para mostrar el número frontal
    this.sphere.rotation.set(0, 0, 0); // Sin rotación para mostrar el número frontalmente

    this.scene.add(this.sphere);
  }

  private addLights(): void {
    // Luz ambiental - ajustada para no lavar los colores
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    // Luz direccional principal - simula la luz principal del estudio
    // Posicionada directamente frente a la cámara para iluminación frontal
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(0, 0, 5); // Posición frontal
    this.scene.add(directionalLight);

    // Luz puntual frontal para crear brillo en la superficie
    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(0, 0, 8); // Más frontal para iluminar mejor
    this.scene.add(pointLight1);

    // Segunda luz puntual para iluminar desde arriba
    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(0, 8, 3);
    this.scene.add(pointLight2);

    // Tercera luz puntual para iluminar desde la derecha (reducida)
    const pointLight3 = new THREE.PointLight(0xffffff, 0.3);
    pointLight3.position.set(8, 0, 3);
    this.scene.add(pointLight3);

    // Cuarta luz puntual para iluminar desde la izquierda (aumentada)
    const pointLight4 = new THREE.PointLight(0xffffff, 0.7);
    pointLight4.position.set(-8, 0, 3);
    this.scene.add(pointLight4);
  }

  private startAnimation(): void {
    if (this.animationFrameId || this.isDestroyed) return;

    const animate = () => {
      if (this.isDestroyed) return;

      if (this.sphere) {
        // Rotación mínima para mantener el número visible frontalmente
        // Aplicamos una oscilación suave en lugar de una rotación completa
        // para que el número siempre sea visible de frente
        this.sphere.rotation.y = Math.sin(Date.now() * 0.001) * 0.1; // Oscilación suave lateral
        this.sphere.rotation.x = Math.sin(Date.now() * 0.0008) * 0.05; // Oscilación suave vertical (más lenta y menor)
      }

      this.renderer.render(this.scene, this.camera);
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  // Efecto de pulsación para el número central
  private startPulseEffect(): void {
    if (this.pulseInterval || this.isDestroyed) return;

    // Intervalo para alternar el efecto de pulsación
    this.pulseInterval = setInterval(() => {
      if (this.isDestroyed) {
        this.stopPulseEffect();
        return;
      }

      this.pulseEffect = !this.pulseEffect;

      // Actualizar la textura con el efecto de pulsación
      if (this.sphere) {
        this.updateBall();
      }
    }, 1500); // Cambiar cada 1.5 segundos
  }

  private stopPulseEffect(): void {
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }
  }

  private stopAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  private renderOnce(): void {
    if (this.isDestroyed) return; // No renderizar si el componente fue destruido

    if (this.renderer && this.scene && this.camera) {
      try {
        this.renderer.render(this.scene, this.camera);
      } catch (error) {
        console.error('Error rendering scene:', error);
      }
    } else {
      console.warn('Cannot render: renderer, scene or camera not initialized');
    }
  }

  private updateBall(): void {
    if (this.isDestroyed) return; // No actualizar si el componente fue destruido

    if (this.sphere && this.scene) {
      try {
        // Eliminar la esfera anterior
        this.scene.remove(this.sphere);

        // Si la geometría y el material existen, liberarlos
        if (this.sphere.geometry) this.sphere.geometry.dispose();
        if (this.sphere.material) {
          if (Array.isArray(this.sphere.material)) {
            this.sphere.material.forEach(material => material.dispose());
          } else {
            this.sphere.material.dispose();
          }
        }

        // Crear una nueva bola
        this.createBall();

        // Renderizar la escena
        this.renderOnce();

        // Renderizar de nuevo después de un breve retraso para asegurar visibilidad
        setTimeout(() => {
          if (!this.isDestroyed) this.renderOnce();
        }, 100);
      } catch (error) {
        console.error('Error updating ball:', error);
      }
    } else {
      // Si no existe la esfera o la escena, intentar inicializar todo de nuevo
      this.initScene();
    }
  }

  private getGameKey(): string {
    let gameKey = this.game.toLowerCase();

    if (this.type === 'star' && gameKey === 'euromillones') {
      gameKey = 'euromillones-star';
    } else if (this.type === 'dream' && gameKey === 'eurodreams') {
      gameKey = 'eurodreams-dream';
    }

    return gameKey;
  }

  private getBallColor(): string {
    const gameKey = this.getGameKey();
    return this.gameColors[gameKey] || this.gameColors['euromillones'];
  }

  // Función para aclarar un color (para efectos de iluminación)
  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;

    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }

  // Función para oscurecer un color (para efectos de sombra)
  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;

    return '#' + (
      0x1000000 +
      (R > 0 ? R : 0) * 0x10000 +
      (G > 0 ? G : 0) * 0x100 +
      (B > 0 ? B : 0)
    ).toString(16).slice(1);
  }

  // Método para generar una imagen estática de la bola
  private generateStaticImage(): void {
    console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Generando imagen estática`);

    // Verificar si ya tenemos una imagen estática en caché
    const cacheKey = `ball_${this.game}_${this.type}_${this.number}_${this.size}`;
    const cachedImage = localStorage.getItem(cacheKey);

    if (cachedImage) {
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Usando imagen estática de caché`);
      this.staticImageUrl = cachedImage;
      return;
    }

    // Si no hay imagen en caché, crear una escena temporal para renderizar la imagen
    console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Creando escena temporal para imagen estática`);

    // Crear un contenedor temporal fuera del DOM para el renderizado
    const tempContainer = document.createElement('div');
    tempContainer.style.width = `${this.size}px`;
    tempContainer.style.height = `${this.size}px`;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    document.body.appendChild(tempContainer);

    // Crear escena, cámara y renderer temporal
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 2.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      precision: 'highp'
    });
    renderer.setSize(this.size, this.size);
    renderer.setPixelRatio(1); // Usar un pixel ratio fijo para la imagen estática
    tempContainer.appendChild(renderer.domElement);

    // Crear la bola usando la misma lógica que en createBall()
    const textureCanvas = document.createElement('canvas');
    const textureContext = textureCanvas.getContext('2d');
    if (!textureContext) {
      console.error(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): No se pudo crear el contexto de canvas para la textura`);
      document.body.removeChild(tempContainer);
      return;
    }

    const textureSize = 1024;
    textureCanvas.width = textureSize;
    textureCanvas.height = textureSize;

    // Obtener color según el juego
    const gameKey = this.getGameKey();
    const ballColor = this.gameColors[gameKey] || this.gameColors['euromillones'];

    // Rellenar el fondo con el color de la bola
    textureContext.fillStyle = ballColor;
    textureContext.fillRect(0, 0, textureSize, textureSize);

    // Configuración para los círculos
    const circleDiameter = textureSize * 0.25; // Diámetro de los círculos
    const circleRadius = circleDiameter / 2;
    const verticalSquash = 0.8; // Factor de achatamiento vertical
    const numberToDisplay = this.number.toString();

    // Función para dibujar un círculo blanco achatado con el número
    const drawNumberCircle = (centerX: number, centerY: number) => {
      textureContext.save();
      textureContext.translate(centerX, centerY);
      textureContext.scale(1, verticalSquash);

      // Dibujar círculo blanco
      textureContext.beginPath();
      textureContext.arc(0, 0, circleRadius, 0, 2 * Math.PI);
      textureContext.fillStyle = '#FFFFFF';
      textureContext.fill();

      // Borde del círculo
      textureContext.lineWidth = 2.0;
      textureContext.strokeStyle = '#AAAAAA';
      textureContext.stroke();

      // Deshacer el achatamiento para el texto
      textureContext.scale(1, 1 / verticalSquash);

      // Configurar texto
      textureContext.font = `bold ${circleRadius * 1.2}px Arial, sans-serif`;
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
    const diagonalOffset = circleDiameter * 0.9; // Ajustar para evitar superposición

    // Dibujar el círculo central
    drawNumberCircle(centerX, centerY);

    // Dibujar los círculos diagonales
    drawNumberCircle(centerX + diagonalOffset * 0.707, centerY + diagonalOffset * 0.707); // Abajo-Derecha
    drawNumberCircle(centerX + diagonalOffset * 0.707, centerY - diagonalOffset * 0.707); // Arriba-Derecha
    drawNumberCircle(centerX - diagonalOffset * 0.707, centerY + diagonalOffset * 0.707); // Abajo-Izquierda
    drawNumberCircle(centerX - diagonalOffset * 0.707, centerY - diagonalOffset * 0.707); // Arriba-Izquierda

    // Crear textura
    const texture = new THREE.CanvasTexture(textureCanvas);

    // Crear geometría y material
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 80,
      specular: 0xffffff,
      bumpScale: 0.02,
      reflectivity: 0.5,
      emissive: 0x111111,
      emissiveIntensity: 0.1
    });

    // Crear esfera
    const sphere = new THREE.Mesh(geometry, material);
    // Asegurar que la esfera esté orientada correctamente para mostrar el número frontal
    sphere.rotation.set(0, 0, 0); // Sin rotación para mostrar el número frontalmente
    scene.add(sphere);

    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(0, 0, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(0, 0, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(0, 8, 3);
    scene.add(pointLight2);

    // Renderizar la escena
    renderer.render(scene, camera);

    // Convertir el canvas a una imagen data URL
    try {
      const dataUrl = renderer.domElement.toDataURL('image/png');
      this.staticImageUrl = dataUrl;

      // Guardar en caché para uso futuro
      try {
        localStorage.setItem(cacheKey, dataUrl);
        console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Imagen estática guardada en caché`);
      } catch (e) {
        console.warn(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): No se pudo guardar en caché:`, e);
      }
    } catch (e) {
      console.error(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Error al convertir canvas a imagen:`, e);
    }

    // Limpiar recursos
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();

    // Eliminar el contenedor temporal
    document.body.removeChild(tempContainer);

    console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Imagen estática generada correctamente`);
  }

  private disposeResources(): void {
    console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Iniciando liberación de recursos`);

    if (this.renderer) {
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Liberando renderer`);
      if (this.rendererContainer && this.rendererContainer.nativeElement) {
        const canvas = this.rendererContainer.nativeElement.querySelector('canvas');
        if (canvas) {
          console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Eliminando canvas del DOM`);
          this.rendererContainer.nativeElement.removeChild(canvas);
        } else {
          console.warn(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): No se encontró canvas para eliminar`);
        }
      } else {
        console.warn(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Contenedor no disponible para limpiar`);
      }
      this.renderer.dispose();
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Renderer liberado`);
    } else {
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): No hay renderer para liberar`);
    }

    if (this.sphere) {
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Liberando recursos de la esfera`);
      if (this.sphere.geometry) {
        console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Liberando geometría`);
        this.sphere.geometry.dispose();
      }
      if (this.sphere.material) {
        console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Liberando materiales`);
        if (Array.isArray(this.sphere.material)) {
          this.sphere.material.forEach(material => material.dispose());
        } else {
          this.sphere.material.dispose();
        }
      }
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Esfera liberada completamente`);
    } else {
      console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): No hay esfera para liberar`);
    }

    console.log(`[DIAGNÓSTICO] Bola ${this.number} (${this.game}): Recursos liberados completamente`);
  }
}
