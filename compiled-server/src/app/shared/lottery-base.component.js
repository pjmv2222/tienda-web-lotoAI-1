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
exports.LotteryBaseComponent = void 0;
const core_1 = require("@angular/core");
/**
 * Componente base para todas las páginas de lotería
 * Proporciona funcionalidad común como carga de botes y fechas de sorteo
 */
let LotteryBaseComponent = (() => {
    let _classDecorators = [(0, core_1.Directive)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var LotteryBaseComponent = _classThis = class {
        constructor(http, predictionService) {
            this.http = http;
            this.predictionService = predictionService;
            // Variables para información del bote y próximo sorteo
            this.boteActual = 'Cargando...';
            this.proximoSorteo = 'Cargando...';
            // Mapeo de días de sorteo para cada juego
            this.sorteosDias = {
                'euromillones': [2, 5], // Martes y Viernes
                'primitiva': [4, 6], // Jueves y Sábado
                'bonoloto': [1, 2, 3, 4, 5, 6], // Lunes a Sábado
                'gordo': [0], // Domingo
                'eurodreams': [1, 4], // Lunes y Jueves
                'loterianacional': [4, 6], // Jueves y Sábado
                'lototurf': [0] // Domingo
            };
        }
        ngOnInit() {
            this.cargarInformacionBote();
        }
        /**
         * Carga la información del bote y próximo sorteo desde el archivo botes.json
         */
        cargarInformacionBote() {
            const timestamp = new Date().getTime();
            this.http.get(`/assets/botes.json?t=${timestamp}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            }).subscribe({
                next: (data) => {
                    if (data && data[this.gameId]) {
                        this.boteActual = data[this.gameId];
                        this.proximoSorteo = this.calcularProximoSorteo();
                    }
                },
                error: (error) => {
                    console.error(`Error al cargar información del bote para ${this.gameId}:`, error);
                }
            });
        }
        /**
         * Calcula la fecha del próximo sorteo basado en los días configurados para cada juego
         * Considera si es día de sorteo y si ya pasó la hora del sorteo (21:00h)
         */
        calcularProximoSorteo() {
            const hoy = new Date();
            let proximoSorteo = new Date(hoy);
            // Obtener los días de sorteo para este juego
            const diasSorteo = this.sorteosDias[this.gameId] || [1]; // Por defecto, lunes
            // Día actual de la semana (0 = domingo, 1 = lunes, ...)
            const diaSemana = hoy.getDay();
            // Encontrar el próximo día de sorteo
            let diasHastaProximo = 7;
            
            for (const diaSorteo of diasSorteo) {
                const diff = (diaSorteo + 7 - diaSemana) % 7;
                
                // Si es hoy (diff = 0), verificar si ya pasó la hora del sorteo
                if (diff === 0) {
                    if (hoy.getHours() < 21) {
                        // Es hoy y aún no han sido las 21:00, usar hoy
                        diasHastaProximo = 0;
                        break;
                    }
                    // Si ya pasaron las 21:00, buscar el siguiente día de sorteo
                    continue;
                }
                
                // Si es un día futuro
                if (diff > 0 && diff < diasHastaProximo) {
                    diasHastaProximo = diff;
                }
            }
            
            // Si no encontramos un día válido, buscar el primer día de sorteo de la próxima semana
            if (diasHastaProximo === 7) {
                diasHastaProximo = (7 - diaSemana + diasSorteo[0]) % 7;
                if (diasHastaProximo === 0) {
                    diasHastaProximo = 7;
                }
            }
            
            // Establecer la fecha del próximo sorteo
            proximoSorteo.setDate(hoy.getDate() + diasHastaProximo);
            // Formatear la fecha
            const opciones = {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
            };
            let fechaFormateada = proximoSorteo.toLocaleDateString('es-ES', opciones);
            // Capitalizar primera letra
            fechaFormateada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
            return fechaFormateada;
        }
    };
    __setFunctionName(_classThis, "LotteryBaseComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LotteryBaseComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LotteryBaseComponent = _classThis;
})();
exports.LotteryBaseComponent = LotteryBaseComponent;
