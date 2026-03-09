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
      VSelect: {
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
