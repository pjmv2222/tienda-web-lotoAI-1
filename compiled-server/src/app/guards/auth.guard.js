"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const auth_service_1 = require("../services/auth.service");
const authGuard = (route, state) => {
    const authService = (0, core_1.inject)(auth_service_1.AuthService);
    const router = (0, core_1.inject)(router_1.Router);
    if (authService.currentUserValue) {
        return true;
    }
    router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
};
exports.authGuard = authGuard;
