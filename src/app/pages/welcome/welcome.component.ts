import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="welcome-container">
      <div class="welcome-content">
        <h1 class="main-title animate-up">¡Bienvenido a tu sitio web de pronósticos de loterías!</h1>

        <div class="message-box animate-up-delay">
          <p class="welcome-message">Tu cuenta ha sido verificada exitosamente</p>
          <p class="sub-message">Estás a un paso de cambiar tu suerte</p>
        </div>

        <div class="cta-section animate-up-delay-2">
          <h2 class="subscription-title">Suscríbete y Cambia tu Suerte</h2>
          <p class="subscription-message">Descubre nuestros planes premium y maximiza tus posibilidades de ganar</p>
          <button class="subscribe-button" routerLink="/planes">Ver Planes de Suscripción</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
      color: white;
      padding: 20px;
    }

    .welcome-content {
      text-align: center;
      max-width: 800px;
      padding: 40px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .main-title {
      font-size: 2.5em;
      margin-bottom: 30px;
      background: linear-gradient(45deg, #FFD700, #FFA500);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: bold;
    }

    .message-box {
      margin: 30px 0;
    }

    .welcome-message {
      font-size: 1.5em;
      margin-bottom: 10px;
      color: #FFD700;
    }

    .sub-message {
      font-size: 1.2em;
      color: #FFA500;
    }

    .cta-section {
      margin-top: 40px;
    }

    .subscription-title {
      font-size: 2em;
      color: #FFD700;
      margin-bottom: 20px;
    }

    .subscription-message {
      font-size: 1.2em;
      margin-bottom: 30px;
      color: #ffffff;
    }

    .subscribe-button {
      padding: 15px 30px;
      font-size: 1.2em;
      background: linear-gradient(45deg, #FFD700, #FFA500);
      border: none;
      border-radius: 25px;
      color: #000;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .subscribe-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-up {
      animation: slideUp 1s ease forwards;
    }

    .animate-up-delay {
      animation: slideUp 1s ease forwards;
      animation-delay: 0.5s;
      opacity: 0;
    }

    .animate-up-delay-2 {
      animation: slideUp 1s ease forwards;
      animation-delay: 1s;
      opacity: 0;
    }
  `]
})
export class WelcomeComponent implements OnInit {
  ngOnInit() {
    this.shootConfetti();
  }

  shootConfetti() {
    const duration = 60000; // Duración de 60 segundos
    const end = Date.now() + duration;

    // Definir colores dorados resplandecientes (solo tonos dorados)
    const goldenColors = [
      '#FFD700', // Oro estándar
      '#FFDF00', // Oro amarillo
      '#FFCC00', // Oro brillante
      '#FFB700', // Oro intenso
      '#FFC430'  // Oro resplandeciente
    ];

    // Configuración común para el espumillón dorado
    const commonConfig = {
      angle: 90, // Ángulo hacia abajo (lluvia)
      gravity: 0.55, // Gravedad reducida para caída más lenta
      drift: 1.5, // Deriva para simular el movimiento del espumillón
      ticks: 800, // Mayor duración de las partículas
      scalar: 3, // Partículas más grandes
      // Eliminamos la propiedad shapes que causa el error
      colors: goldenColors, // Solo colores dorados
      disableForReducedMotion: false, // Asegurar que se muestre incluso con reducción de movimiento
      opacity: 0.9, // Alta opacidad para un brillo más intenso
    };

    // Crear un efecto de brillo inicial más intenso
    const createInitialBurst = () => {
      // Explosión inicial desde varios puntos
      for (let i = 0.1; i <= 0.9; i += 0.2) {
        confetti({
          ...commonConfig,
          particleCount: 15,
          spread: 80,
          origin: { x: i, y: 0 },
          scalar: 3.5,
          gravity: 0.5,
          ticks: 1000
        });
      }
    };

    // Ejecutar la explosión inicial
    createInitialBurst();

    // Configurar el intervalo para la lluvia continua
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      // Distribuir el espumillón por toda la parte superior de la pantalla
      // Generar posiciones aleatorias para un efecto más natural
      const positions = [0.1, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9];

      // Seleccionar 3 posiciones aleatorias para cada iteración
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * positions.length);
        const xPos = positions[randomIndex];

        confetti({
          ...commonConfig,
          particleCount: 5, // Cantidad de partículas
          spread: 40 + Math.random() * 30, // Dispersión variable
          origin: { x: xPos, y: 0 },
          scalar: 2.5 + Math.random(), // Tamaño variable
        });
      }

    }, 40); // Intervalo más corto para mayor densidad
  }
}