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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const environment_1 = require("../../environments/environment");
let PredictionService = (() => {
    let _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var PredictionService = _classThis = class {
        constructor(http, authService) {
            this.http = http;
            this.authService = authService;
            this.apiUrl = environment_1.environment.apiUrl;
            this.iaApiUrl = environment_1.environment.iaApiUrl;
        }
        /**
         * Genera una predicción para un juego específico
         * @param gameId Identificador del juego (euromillones, primitiva, bonoloto, etc.)
         * @returns Observable con la respuesta de la predicción
         */
        generatePrediction(gameId) {
            const headers = this.getAuthHeaders();
            // Mapeo de IDs de juego a los nombres correctos para la API
            const gameMapping = {
                'euromillon': 'euromillon',
                'euromillones': 'euromillon',
                'primitiva': 'primitiva',
                'bonoloto': 'bonoloto',
                'gordo': 'gordo-primitiva',
                'gordo-primitiva': 'gordo-primitiva',
                'eurodreams': 'eurodreams',
                'loterianacional': 'loteria-nacional',
                'loteria-nacional': 'loteria-nacional',
                'lototurf': 'lototurf'
            };
            // Normalizar el ID del juego
            const normalizedGameId = gameMapping[gameId] || gameId;
            // En producción, usamos la API directa o el backend como proxy
            // En desarrollo, usamos el proxy del backend o una simulación
            let url = '';
            if (environment_1.environment.production) {
                // En producción, intentamos usar directamente la API de IA
                url = `${environment_1.environment.iaApiUrl}/${normalizedGameId}/predict`;
                console.log(`Usando API directa: ${url}`);
            }
            else {
                // Para desarrollo, podemos usar una simulación o el backend
                if (environment_1.environment.useMockData) {
                    return this.generateMockPrediction(gameId);
                }
                url = `${this.apiUrl}/predictions/${normalizedGameId}`;
            }
            console.log(`Solicitando predicción a: ${url}`);
            // Datos de entrada para la IA (podrían ser personalizados)
            const inputData = {
                input: [1, 2, 3, 4, 5, 6, 7]
            };
            // Realizar la petición HTTP
            return this.http.post(url, inputData, { headers }).pipe((0, operators_1.map)((response) => {
                console.log('Respuesta del servidor:', response);
                // Si no hay respuesta o no tiene la estructura esperada, devolver un error
                if (!response || typeof response !== 'object') {
                    return {
                        success: false,
                        error: 'Respuesta del servidor inválida'
                    };
                }
                return response;
            }), (0, operators_1.catchError)(error => {
                console.error('Error al generar la predicción:', error);
                // Devolver un objeto de error en caso de fallo
                return (0, rxjs_1.of)({
                    success: false,
                    error: error.message || 'Error al comunicarse con el servidor'
                });
            }));
        }
        /**
         * Genera una predicción simulada para pruebas (modo desarrollo)
         * @param gameId Identificador del juego
         * @returns Observable con una predicción simulada
         */
        generateMockPrediction(gameId) {
            // Simulación de tiempo de respuesta del servidor
            return new rxjs_1.Observable(observer => {
                setTimeout(() => {
                    let prediction;
                    switch (gameId) {
                        case 'euromillones':
                            prediction = {
                                success: true,
                                prediction: {
                                    numeros: this.generateRandomNumbers(5, 1, 50),
                                    estrellas: this.generateRandomNumbers(2, 1, 12)
                                }
                            };
                            break;
                        case 'primitiva':
                            prediction = {
                                success: true,
                                prediction: {
                                    numeros: this.generateRandomNumbers(6, 1, 49),
                                    complementario: this.generateRandomNumber(1, 49)
                                }
                            };
                            break;
                        case 'bonoloto':
                            prediction = {
                                success: true,
                                prediction: {
                                    numeros: this.generateRandomNumbers(6, 1, 49),
                                    complementario: this.generateRandomNumber(1, 49),
                                    reintegro: this.generateRandomNumber(0, 9)
                                }
                            };
                            break;
                        case 'gordo':
                            prediction = {
                                success: true,
                                prediction: {
                                    numeros: this.generateRandomNumbers(5, 1, 54),
                                    clave: this.generateRandomNumber(0, 9)
                                }
                            };
                            break;
                        case 'eurodreams':
                            prediction = {
                                success: true,
                                prediction: {
                                    numeros: this.generateRandomNumbers(6, 1, 40),
                                    dream: this.generateRandomNumber(1, 5)
                                }
                            };
                            break;
                        case 'loterianacional':
                            // Generar un número de 5 dígitos
                            const numeroLoteria = this.generateRandomNumber(0, 99999).toString().padStart(5, '0');
                            prediction = {
                                success: true,
                                prediction: {
                                    numero: numeroLoteria.split('').map(n => parseInt(n, 10))
                                }
                            };
                            break;
                        case 'lototurf':
                            prediction = {
                                success: true,
                                prediction: {
                                    numeros: this.generateRandomNumbers(6, 1, 31),
                                    caballo: this.generateRandomNumber(1, 12)
                                }
                            };
                            break;
                        default:
                            prediction = {
                                success: false,
                                error: 'Juego no soportado'
                            };
                    }
                    observer.next(prediction);
                    observer.complete();
                }, 1500); // Simular 1.5 segundos de tiempo de respuesta
            });
        }
        /**
         * Genera un array de números aleatorios únicos
         * @param count Cantidad de números a generar
         * @param min Valor mínimo (inclusive)
         * @param max Valor máximo (inclusive)
         * @returns Array de números aleatorios
         */
        generateRandomNumbers(count, min, max) {
            const numbers = [];
            while (numbers.length < count) {
                const num = this.generateRandomNumber(min, max);
                if (!numbers.includes(num)) {
                    numbers.push(num);
                }
            }
            return numbers.sort((a, b) => a - b); // Ordenar de menor a mayor
        }
        /**
         * Genera un número aleatorio entre min y max (inclusive)
         * @param min Valor mínimo
         * @param max Valor máximo
         * @returns Número aleatorio
         */
        generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        /**
         * Obtiene los headers de autenticación
         */
        getAuthHeaders() {
            const token = this.authService.currentUserValue?.token;
            return new http_1.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            });
        }
    };
    __setFunctionName(_classThis, "PredictionService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PredictionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PredictionService = _classThis;
})();
exports.PredictionService = PredictionService;
