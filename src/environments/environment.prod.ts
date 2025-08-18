export const environment = {
  production: true,
  apiUrl: 'https://loto-ia.com:3000/api', // Apuntar directamente al backend independiente
  frontendUrl: 'https://loto-ia.com',
  wsUrl: 'wss://loto-ia.com',
  iaApiUrl: '/api', // Cambiar para usar backend Node.js como proxy
  useMockData: false,  // En producción no usamos datos simulados
  stripe: {
    publishableKey: 'pk_live_51RBei6LtOcaQbzqZ0YMABFlZMAKJV11EHMhd1eb6gsZ1kr6Yw64gC7w0sEoFictYGf3RY81R48vapPvMyQ9dMeIv00pvit6jd2'
  },
  paypal: {
    clientId: 'AZmPtWE4VJ_VbGy-N_FPYDLgZuc73JjF7AEnkvWEig1GHHg-rWgCfteYVlqtDj-zIHdDW3pZBag_WDn1',
    currency: 'EUR'
  }
};
