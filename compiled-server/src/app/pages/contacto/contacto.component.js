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
exports.ContactoComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const forms_1 = require("@angular/forms");
let ContactoComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-contacto',
            standalone: true,
            imports: [common_1.CommonModule, router_1.RouterLink, forms_1.ReactiveFormsModule],
            templateUrl: './contacto.component.html',
            styleUrl: './contacto.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ContactoComponent = _classThis = class {
        constructor(formBuilder) {
            this.formBuilder = formBuilder;
            this.submitted = false;
            this.submitSuccess = false;
            this.fileName = '';
            this.selectedFile = null;
        }
        ngOnInit() {
            this.contactForm = this.formBuilder.group({
                tema: ['', forms_1.Validators.required],
                nombre: ['', forms_1.Validators.required],
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                mensaje: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(1000)]],
                privacidad: [false, forms_1.Validators.requiredTrue]
            });
        }
        // Getter para acceder fácilmente a los controles del formulario
        get f() { return this.contactForm.controls; }
        onFileSelected(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
                this.fileName = file.name;
            }
        }
        onSubmit() {
            this.submitted = true;
            // Detener si el formulario es inválido
            if (this.contactForm.invalid) {
                return;
            }
            // Aquí iría la lógica para enviar el formulario al servidor
            console.log('Formulario enviado', this.contactForm.value);
            // Simular éxito en el envío
            this.submitSuccess = true;
            // Resetear el formulario después de un tiempo
            setTimeout(() => {
                this.resetForm();
            }, 3000);
        }
        resetForm() {
            this.submitted = false;
            this.submitSuccess = false;
            this.fileName = '';
            this.selectedFile = null;
            this.contactForm.reset();
        }
    };
    __setFunctionName(_classThis, "ContactoComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ContactoComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ContactoComponent = _classThis;
})();
exports.ContactoComponent = ContactoComponent;
