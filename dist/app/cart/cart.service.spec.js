"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const cart_service_1 = require("./cart.service");
describe('CartService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(cart_service_1.CartService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
