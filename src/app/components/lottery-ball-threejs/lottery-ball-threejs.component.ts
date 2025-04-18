import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-lottery-ball-threejs',
  templateUrl: './lottery-ball-threejs.component.html',
  styleUrls: ['./lottery-ball-threejs.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LotteryBallThreejsComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  @Input() number: string | number = '';
  @Input() game: string = 'euromillones';
  @Input() type: string = 'regular'; // regular, star, dream, etc.
  @Input() highlight: boolean = false;
  @Input() size: number = 80; // Tamaño del canvas en píxeles

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private sphere!: THREE.Mesh;
  private textMeshes: THREE.Mesh[] = [];
  private frameId: number = 0;
  private isDestroyed: boolean = false;

  // Colores para diferentes juegos
  private gameColors = {
    euromillones: {
      colors: [0x4a90e2, 0x2a70c2, 0x0a4b9f],
      emissive: 0x0a4b9f
    },
    'euromillones-star': {
      colors: [0xffeb3b, 0xffd700, 0xffc107],
      emissive: 0xffc107
    },
    primitiva: {
      colors: [0x00e676, 0x00c853, 0x00a651],
      emissive: 0x00a651
    },
    bonoloto: {
      colors: [0xff5252, 0xff1744, 0xe30613],
      emissive: 0xe30613
    },
    gordo: {
      colors: [0xffab40, 0xff9100, 0xf39200],
      emissive: 0xf39200
    },
    eurodreams: {
      colors: [0x9c4dff, 0x7c3aed, 0x662d91],
      emissive: 0x662d91
    },
    'eurodreams-dream': {
      colors: [0x40c4ff, 0x00b0ff, 0x00b0ea],
      emissive: 0x00b0ea
    },
    lototurf: {
      colors: [0x00e676, 0x00c853, 0x009640],
      emissive: 0x009640
    },
    'loteria-nacional': {
      colors: [0xffd54f, 0xffca28, 0xc6a023],
      emissive: 0xc6a023
    }
  };

  ngAfterViewInit(): void {
    this.initThree();
    this.createScene();
    this.startRenderingLoop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sphere && (changes.game || changes.type)) {
      this.updateBallColor();
    }
    if (this.textMeshes.length > 0 && changes.number) {
      this.updateNumber();
    }
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
    this.disposeThreeObjects();
  }

  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(this.size, this.size);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  private createScene(): void {
    // Escena
    this.scene = new THREE.Scene();

    // Cámara
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    this.camera.position.z = 5;

    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Luz puntual para brillo
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(-5, 5, 3);
    this.scene.add(pointLight);

    // Crear la esfera
    this.createBall();

    // Crear los números
    this.createNumbers();
  }

  private createBall(): void {
    // Geometría de la esfera
    const geometry = new THREE.SphereGeometry(2, 32, 32);

    // Material de la esfera
    const colorInfo = this.getGameColorInfo();
    const material = new THREE.MeshPhongMaterial({
      color: colorInfo.colors[0],
      emissive: colorInfo.emissive,
      emissiveIntensity: 0.2,
      shininess: 100,
      specular: 0xffffff
    });

    // Crear la malla
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);
  }

  private createNumbers(): void {
    // Limpiar números existentes
    this.textMeshes.forEach(mesh => {
      this.scene.remove(mesh);
    });
    this.textMeshes = [];

    // Crear círculos blancos con números
    this.createNumberCircle(0, 0, 0, 1.2); // Centro
    this.createNumberCircle(0, 1.5, 0, 0.8); // Arriba
    this.createNumberCircle(1.3, 0.7, 0, 0.8); // Derecha arriba
    this.createNumberCircle(1.3, -0.7, 0, 0.8); // Derecha abajo
    this.createNumberCircle(0, -1.5, 0, 0.8); // Abajo
    this.createNumberCircle(-1.3, -0.7, 0, 0.8); // Izquierda abajo
    this.createNumberCircle(-1.3, 0.7, 0, 0.8); // Izquierda arriba
  }

  private createNumberCircle(x: number, y: number, z: number, scale: number): void {
    // Crear un círculo blanco
    const circleGeometry = new THREE.CircleGeometry(0.8, 32);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);

    // Posicionar el círculo
    circle.position.set(x, y, z + 0.01);
    circle.scale.set(scale, scale, scale);

    // Crear el texto del número
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = 'black';
      context.font = 'bold 80px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(this.number.toString(), 64, 64);
    }

    // Crear textura a partir del canvas
    const texture = new THREE.CanvasTexture(canvas);

    // Crear material con la textura
    const textMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true
    });

    // Crear plano para el texto
    const textGeometry = new THREE.PlaneGeometry(0.7 * scale, 0.7 * scale);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(x, y, z + 0.02);

    // Añadir a la escena
    this.scene.add(circle);
    this.scene.add(textMesh);

    // Guardar referencia
    this.textMeshes.push(circle);
    this.textMeshes.push(textMesh);
  }

  private updateBallColor(): void {
    if (this.sphere) {
      const colorInfo = this.getGameColorInfo();
      (this.sphere.material as THREE.MeshPhongMaterial).color.setHex(colorInfo.colors[0]);
      (this.sphere.material as THREE.MeshPhongMaterial).emissive.setHex(colorInfo.emissive);
    }
  }

  private updateNumber(): void {
    // Recrear los números con el nuevo valor
    this.createNumbers();
  }

  private getGameColorInfo(): { colors: number[], emissive: number } {
    let gameKey = this.game.toLowerCase();

    if (this.type === 'star' && gameKey === 'euromillones') {
      gameKey = 'euromillones-star';
    } else if (this.type === 'dream' && gameKey === 'eurodreams') {
      gameKey = 'eurodreams-dream';
    }

    return this.gameColors[gameKey as keyof typeof this.gameColors] || this.gameColors.euromillones;
  }

  private startRenderingLoop(): void {
    const animate = () => {
      if (this.isDestroyed) return;

      // Rotación suave
      if (this.sphere) {
        this.sphere.rotation.y += 0.005;

        // Hacer que los círculos de texto siempre miren a la cámara
        this.textMeshes.forEach(mesh => {
          mesh.quaternion.copy(this.camera.quaternion);
        });
      }

      this.renderer.render(this.scene, this.camera);
      this.frameId = requestAnimationFrame(animate);
    };

    animate();
  }

  private disposeThreeObjects(): void {
    if (this.sphere) {
      this.scene.remove(this.sphere);
      (this.sphere.geometry as THREE.BufferGeometry).dispose();
      (this.sphere.material as THREE.Material).dispose();
    }

    this.textMeshes.forEach(mesh => {
      this.scene.remove(mesh);
      (mesh.geometry as THREE.BufferGeometry).dispose();
      if (mesh.material instanceof THREE.Material) {
        mesh.material.dispose();
      } else if (Array.isArray(mesh.material)) {
        mesh.material.forEach(material => material.dispose());
      }
    });

    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
