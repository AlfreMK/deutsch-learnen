import type { ThemeDefinition } from 'vuetify'
import colors from '~/assets/colors'

export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    success: colors.success.base,
    fail: colors.fail.base,
  },
}
