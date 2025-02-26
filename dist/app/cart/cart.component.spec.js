"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const cart_component_1 = require("./cart.component");
const cart_service_1 = require("./cart.service");
const common_1 = require("@angular/common");
describe('CartComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            imports: [common_1.CommonModule],
            declarations: [cart_component_1.CartComponent],
            providers: [cart_service_1.CartService]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(cart_component_1.CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
