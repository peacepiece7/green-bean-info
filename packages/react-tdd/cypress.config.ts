import { defineConfig } from 'cypress'
import '@testing-library/cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      return config
    },
  },
})
