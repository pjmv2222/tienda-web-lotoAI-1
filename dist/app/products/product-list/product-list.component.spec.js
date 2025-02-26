"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const product_list_component_1 = require("./product-list.component");
describe('ProductListComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            imports: [product_list_component_1.ProductListComponent]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(product_list_component_1.ProductListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
