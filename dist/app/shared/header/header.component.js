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
exports.HeaderComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const common_2 = require("@angular/common");
let HeaderComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-header',
            standalone: true,
            imports: [common_1.CommonModule],
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var HeaderComponent = _classThis = class {
        constructor(botesService, platformId, cdr) {
            this.botesService = botesService;
            this.platformId = platformId;
            this.cdr = cdr;
            this.botes = {};
        }
        ngOnInit() {
            if ((0, common_2.isPlatformBrowser)(this.platformId)) {
                this.botesService.getBotes().subscribe({
                    next: (data) => {
                        this.botes = data;
                        this.cdr.detectChanges();
                    },
                    error: (error) => {
                        console.error('Error al cargar botes:', error);
                    }
                });
            }
        }
        actualizarBotes() {
            console.log('Actualizando botes...');
            this.botesService.getBotes().subscribe({
                next: (data) => {
                    console.log('Datos recibidos:', data);
                    if (data && typeof data === 'object') {
                        this.botes = data;
                        console.log('Botes actualizados:', JSON.stringify(this.botes, null, 2));
                        this.cdr.detectChanges();
                    }
                    else {
                        console.error('Datos de botes inválidos', data);
                        this.botes = {};
                    }
                },
                error: (error) => {
                    console.error('Error al obtener los botes', error);
                    this.botes = {};
                }
            });
        }
        formatearBote(bote) {
            if (bote === undefined || bote === null) {
                return 'Pendiente';
            }
            return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(bote);
        }
        getImageUrl(juego) {
            const imageNames = {
                'euromillones': 'cabecera_EuromillonesAJ_topaz.png',
                'primitiva': 'cabecera_PrimitivaAJ_topaz.png',
                'bonoloto': 'cabecera_BonolotoAJ_topaz.png',
                'gordoPrimitiva': 'cabecera_ElGordoAJ_topaz.png',
                'euroDreams': 'cabecera_EurodreamsAJ_topaz.png',
                'loteriaNacional': 'cabecera_LoteriaNacionalAJ_topaz.png'
            };
            return `/assets/img/${imageNames[juego] || juego + '.png'}`;
        }
    };
    __setFunctionName(_classThis, "HeaderComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HeaderComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HeaderComponent = _classThis;
})();
exports.HeaderComponent = HeaderComponent;
