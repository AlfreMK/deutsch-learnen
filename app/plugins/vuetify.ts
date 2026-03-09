import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
    },
    defaults: {
      VTextField: {
        autocomplete: 'off',
      },
    },
  })
  app.vueApp.use(vuetify)
})
