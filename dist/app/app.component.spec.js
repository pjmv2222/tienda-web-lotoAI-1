"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const app_component_1 = require("./app.component");
describe('AppComponent', () => {
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            imports: [app_component_1.AppComponent],
        }).compileComponents();
    });
    it('should create the app', () => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    it(`should have the 'tienda-web-lotoAI' title`, () => {
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('tienda-web-lotoAI');
    });
    it('should render title', () => {
        var _a;
        const fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect((_a = compiled.querySelector('h1')) === null || _a === void 0 ? void 0 : _a.textContent).toContain('Hello, tienda-web-lotoAI');
    });
});
