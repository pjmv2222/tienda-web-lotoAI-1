"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    production: false,
    apiUrl: 'http://localhost:3001',
    frontendUrl: 'http://localhost:4000', // Cambiado a localhost para consistencia
    iaApiUrl: 'http://localhost:5000', // URL directa a la API de IA
    useMockData: true, // Usar datos simulados para desarrollo
    stripe: {
        publishableKey: 'pk_test_51RBei6LtOcaQbzqZSjGanXrEU1SVzItDkHRliCzAMY0NOaU9DqviYJ1OcNIeaAff7CMbsvhuwyCjnuptOnuzhP32006eWSnxrR'
    },
    paypal: {
        clientId: 'AZmPtWE4VJ_VbGy-N_FPYDLgZuc73JjF7AEnkvWEig1GHHg-rWgCfteYVlqtDj-zIHdDW3pZBag_WDn1',
        currency: 'EUR'
    }
};
