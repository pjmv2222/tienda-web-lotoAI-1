"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const canvas_confetti_1 = __importDefault(require("canvas-confetti"));
let WelcomeComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-welcome',
            standalone: true,
            imports: [common_1.CommonModule, router_1.RouterModule],
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
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var WelcomeComponent = _classThis = class {
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
                '#FFC430' // Oro resplandeciente
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
                    (0, canvas_confetti_1.default)({
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
            const interval = setInterval(() => {
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
                    (0, canvas_confetti_1.default)({
                        ...commonConfig,
                        particleCount: 5, // Cantidad de partículas
                        spread: 40 + Math.random() * 30, // Dispersión variable
                        origin: { x: xPos, y: 0 },
                        scalar: 2.5 + Math.random(), // Tamaño variable
                    });
                }
            }, 40); // Intervalo más corto para mayor densidad
        }
    };
    __setFunctionName(_classThis, "WelcomeComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WelcomeComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WelcomeComponent = _classThis;
})();
exports.WelcomeComponent = WelcomeComponent;
