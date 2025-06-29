export const environment = {
  production: true,
  apiUrl: '/api', // URL relativa para evitar problemas con dominios
  frontendUrl: 'https://loto-ia.com',
  wsUrl: 'wss://loto-ia.com',
  iaApiUrl: '/api', // Cambiar para usar backend Node.js como proxy
  useMockData: false,  // En producción no usamos datos simulados
  stripe: {
    publishableKey: 'pk_live_51RBei6LtOcaQbzqZAthZkp98WlLfW4G7KXfUhABtLnVZzKLFPvR8BqgYZuDC6LdIvRTt3Q4vlnyAwAyVgHDyZ5kN00JDj3QVnt'
  },
  paypal: {
    clientId: 'AZmPtWE4VJ_VbGy-N_FPYDLgZuc73JjF7AEnkvWEig1GHHg-rWgCfteYVlqtDj-zIHdDW3pZBag_WDn1',
    currency: 'EUR'
  }
};
