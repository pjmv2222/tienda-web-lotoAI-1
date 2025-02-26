"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const product_detail_component_1 = require("./product-detail.component");
describe('ProductDetailComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            imports: [product_detail_component_1.ProductDetailComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(product_detail_component_1.ProductDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
