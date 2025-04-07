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
    const duration = 3000;
    const end = Date.now() + duration;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FFA500', '#FF8C00']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FFA500', '#FF8C00']
      });
    }, 50);
  }
} 