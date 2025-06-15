"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const app_routes_1 = require("./app.routes");
const platform_browser_1 = require("@angular/platform-browser");
const http_1 = require("@angular/common/http");
const animations_1 = require("@angular/platform-browser/animations");
const forms_1 = require("@angular/forms");
const router_2 = require("@angular/router");
const carousel_1 = require("ngx-bootstrap/carousel");
exports.appConfig = {
    providers: [
        (0, router_1.provideRouter)(app_routes_1.routes),
        (0, platform_browser_1.provideClientHydration)(),
        (0, http_1.provideHttpClient)((0, http_1.withFetch)()),
        (0, animations_1.provideAnimations)(),
        (0, core_1.importProvidersFrom)(forms_1.FormsModule, forms_1.ReactiveFormsModule, router_2.RouterModule, carousel_1.CarouselModule.forRoot())
    ]
};
