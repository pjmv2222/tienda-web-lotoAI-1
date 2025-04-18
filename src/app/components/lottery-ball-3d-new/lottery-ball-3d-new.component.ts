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

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private sphere!: THREE.Mesh;
  private animationFrameId: number = 0;
  private isDestroyed: boolean = false;

  // Colores para diferentes juegos - Colores aún más vibrantes y saturados
  private gameColors: Record<string, string> = {
    'euromillones': '#ff0000', // Rojo intenso para Euromillones (como en la imagen de referencia)
    'euromillones-star': '#ffcc00', // Amarillo dorado más intenso
    'primitiva': '#00cc66', // Verde más intenso
    'bonoloto': '#0033cc', // Azul más intenso
    'gordo': '#ff9900', // Naranja más intenso
    'eurodreams': '#9900cc', // Púrpura más intenso
    'eurodreams-dream': '#00ccff', // Azul claro más intenso
    'lototurf': '#00cc33', // Verde oscuro más intenso
    'loteria-nacional': '#e6b800' // Dorado más intenso
  };

  // Gradientes para mejorar el aspecto visual - Colores más intensos
  private gameGradients: Record<string, {top: string, bottom: string}> = {
    'euromillones': {top: '#ff0000', bottom: '#cc0000'}, // Rojo intenso para Euromillones
    'euromillones-star': {top: '#ffcc00', bottom: '#e6b800'}, // Amarillo dorado intenso
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
    setTimeout(() => {
      if (this.isDestroyed) return;

      try {
        this.initScene();

        if (this.sphere) {
          // Forzar rotación exactamente frontal
          this.sphere.rotation.set(0, 0, 0);
          // Asegurar que la posición sea correcta
          this.sphere.position.set(0, 0, 0);
        }

        // Iniciar efecto de pulsación para el número central
        this.startPulseEffect();

        // Renderizar la escena
        this.renderOnce();

        // Solo iniciar animación si se solicita explícitamente
        if (this.animate) {
          this.startAnimation();
        }
      } catch (error) {
        console.error('Error initializing ball:', error);
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
    this.isDestroyed = true;
    this.stopAnimation();
    this.stopPulseEffect();
    this.disposeResources();
  }

  private initScene(): void {
    if (!this.rendererContainer || !this.rendererContainer.nativeElement) {
      console.error('Renderer container not available');
      return;
    }

    try {
      const container = this.rendererContainer.nativeElement;
      const width = this.size;
      const height = this.size;

      // Limpiar el contenedor si ya tiene elementos
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // Crear escena
      this.scene = new THREE.Scene();

      // Crear cámara con menor campo de visión para un efecto más plano (menos perspectiva)
      this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      // Alejar un poco la cámara para ver mejor toda la esfera
      this.camera.position.z = 2.2;

      // Crear renderer con mejor calidad
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        precision: 'highp'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limitar para mejor rendimiento
      container.appendChild(this.renderer.domElement);

      // Crear la bola
      this.createBall();

      // Añadir luces
      this.addLights();

      // Renderizar inmediatamente
      this.renderOnce();
    } catch (error) {
      console.error('Error initializing Three.js scene:', error);
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

    // Crear un gradiente para dar más profundidad a la bola
    const gradient = textureContext.createRadialGradient(
      textureSize/2, textureSize/2, 0,
      textureSize/2, textureSize/2, textureSize/2
    );

    // Obtener colores del gradiente
    const gameKey = this.getGameKey();
    const gradientColors = this.gameGradients[gameKey] || this.gameGradients['euromillones'];

    // Configurar gradiente con brillo intenso en el centro para mayor luminosidad
    // Ajustado para mantener la intensidad del color
    gradient.addColorStop(0, '#FFFFFF'); // Centro completamente blanco para efecto de brillo
    gradient.addColorStop(0.15, this.lightenColor(ballColor, 70)); // Transición más clara y más cercana al centro
    gradient.addColorStop(0.4, ballColor); // Color principal más extendido
    gradient.addColorStop(0.7, gradientColors.top); // Usar el color superior del gradiente
    gradient.addColorStop(0.9, gradientColors.bottom); // Transición al color inferior
    gradient.addColorStop(1, this.darkenColor(gradientColors.bottom, 10)); // Borde ligeramente más claro

    // Rellenar el fondo con el gradiente
    textureContext.fillStyle = gradient;
    textureContext.fillRect(0, 0, textureSize, textureSize);

    // Configuración para los círculos con números
    const circleDiameter = textureSize * 0.22;
    const circleRadius = circleDiameter / 2;
    const numberToDisplay = this.number.toString();

    // Función para dibujar un círculo con número - Simplificada
    const drawNumberCircle = (centerX: number, centerY: number, scale: number = 1.0, isCenter: boolean = false) => {
      textureContext.save();
      textureContext.translate(centerX, centerY);

      // Aplicar efecto de pulsación al círculo central si está activo
      const pulseScale = (isCenter && this.pulseEffect) ? 1.15 : 1.0;

      // Tamaño de círculo
      // Círculo central más grande, círculos periféricos más pequeños
      const circleSize = isCenter ?
                        circleRadius * pulseScale :
                        circleRadius * 0.6; // Círculos periféricos más pequeños

      // Dibujar círculo blanco
      textureContext.beginPath();
      textureContext.arc(0, 0, circleSize, 0, 2 * Math.PI);
      textureContext.fillStyle = '#FFFFFF';
      textureContext.fill();

      // Borde del círculo
      textureContext.lineWidth = 1.0;
      textureContext.strokeStyle = '#DDDDDD';
      textureContext.stroke();

      // Dibujar número con tamaño consistente
      const fontSize = isCenter ?
                     circleSize * 1.2 : // Tamaño para círculo central
                     circleSize * 1.4;  // Tamaño para círculos periféricos
      textureContext.font = `bold ${fontSize}px Arial, sans-serif`;
      textureContext.fillStyle = '#000000';
      textureContext.textAlign = 'center';
      textureContext.textBaseline = 'middle';
      textureContext.fillText(numberToDisplay, 0, 0);

      textureContext.restore();
    };

    // Posiciones para los círculos - Estilo Euromillones real
    const centerX = textureSize / 2;
    const centerY = textureSize / 2;

    // Dibujar solo el círculo central para simplificar y evitar problemas
    // Círculo central - con efecto de pulsación
    drawNumberCircle(centerX, centerY, 1.0, true); // Marcado como círculo central para el efecto de pulsación

    // Dibujar solo 4 círculos adicionales en posiciones cardinales
    // Usar un radio muy pequeño para que estén muy cerca del centro
    const radius = textureSize * 0.15; // Radio muy pequeño

    // Arriba
    drawNumberCircle(centerX, centerY - radius, 1.0, false);
    // Derecha
    drawNumberCircle(centerX + radius, centerY, 1.0, false);
    // Abajo
    drawNumberCircle(centerX, centerY + radius, 1.0, false);
    // Izquierda
    drawNumberCircle(centerX - radius, centerY, 1.0, false);

    // Crear textura Three.js
    const texture = new THREE.CanvasTexture(textureCanvas);

    // Crear geometría y material
    const geometry = new THREE.SphereGeometry(1, 64, 64); // Mayor resolución para la esfera

    // Material con brillo y reflejo mejorados para mayor realismo
    // Ajustado para mantener la intensidad del color
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 80, // Brillo ajustado para no lavar los colores
      specular: 0xffffff, // Reflejo blanco
      bumpScale: 0.02,
      reflectivity: 0.5, // Reflectividad ajustada para mantener la intensidad del color
      emissive: 0x111111, // Ligera emisión para que parezca más brillante (reducida)
      emissiveIntensity: 0.1 // Intensidad de la emisión reducida
    });

    // Crear la esfera
    this.sphere = new THREE.Mesh(geometry, material);
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

      // Ya no rotamos la esfera para mantener el número frontal
      // Solo renderizamos para mantener actualizados los efectos visuales

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

  private disposeResources(): void {
    if (this.renderer) {
      if (this.rendererContainer && this.rendererContainer.nativeElement) {
        const canvas = this.rendererContainer.nativeElement.querySelector('canvas');
        if (canvas) {
          this.rendererContainer.nativeElement.removeChild(canvas);
        }
      }
      this.renderer.dispose();
    }

    if (this.sphere) {
      if (this.sphere.geometry) {
        this.sphere.geometry.dispose();
      }
      if (this.sphere.material) {
        if (Array.isArray(this.sphere.material)) {
          this.sphere.material.forEach(material => material.dispose());
        } else {
          this.sphere.material.dispose();
        }
      }
    }
  }
}
