import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
    },
    defaults: {
      VButton: {
        density: 'compact',
        variant: 'outlined',
      },
      VTextField: {
        autocomplete: 'off',
        density: 'compact',
        hideDetails: true,
        variant: 'outlined',
      },
      VNumberInput: {
        density: 'compact',
        variant: 'outlined',
        hideDetails: true,
      },
      VSelect: {
        density: 'compact',
        variant: 'outlined',
        hideDetails: true,
      },
      VAutocomplete: {
        density: 'compact',
        variant: 'outlined',
        hideDetails: true,
      },
      VTooltip: {
        openDelay: 200,
      },
    },
  })
  app.vueApp.use(vuetify)
})
