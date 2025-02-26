"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const product_list_component_1 = require("./products/product-list/product-list.component");
const product_detail_component_1 = require("./products/product-detail/product-detail.component");
const cart_component_1 = require("./cart/cart.component");
exports.routes = [
    { path: '', component: product_list_component_1.ProductListComponent },
    { path: 'producto/:id', component: product_detail_component_1.ProductDetailComponent },
    { path: 'carrito', component: cart_component_1.CartComponent },
];
