export const environment = {
  production: false,
  apiUrl: 'http://localhost:3001/api',
  frontendUrl: 'http://localhost:4000',   // Cambiado a localhost para consistencia
  stripe: {
    publishableKey: 'pk_test_51RBei6LtOcaQbzqZSjGanXrEU1SVzItDkHRliCzAMY0NOaU9DqviYJ1OcNIeaAff7CMbsvhuwyCjnuptOnuzhP32006eWSnxrR'
  },
  paypal: {
    clientId: 'AZmPtWE4VJ_VbGy-N_FPYDLgZuc73JjF7AEnkvWEig1GHHg-rWgCfteYVlqtDj-zIHdDW3pZBag_WDn1',
    currency: 'EUR'
  }
};

