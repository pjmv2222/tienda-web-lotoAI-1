"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const core_1 = require("@angular/core");
const platform_server_1 = require("@angular/platform-server");
const app_config_1 = require("./app.config");
const platform_browser_1 = require("@angular/platform-browser");
const universal_fixes_1 = require("./universal-fixes");
const ngx_bootstrap_server_1 = require("./ngx-bootstrap-server");
// Configurar el entorno del servidor
(0, universal_fixes_1.suppressCssErrors)();
(0, ngx_bootstrap_server_1.configureNgxBootstrapForServer)();
const serverConfig = {
    providers: [
        (0, platform_server_1.provideServerRendering)(),
        (0, platform_browser_1.provideClientHydration)()
    ]
};
exports.config = (0, core_1.mergeApplicationConfig)(app_config_1.appConfig, serverConfig);
