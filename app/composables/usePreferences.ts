import { merge, cloneDeep } from 'lodash-es'

type Preferences = {
  seed: number | undefined
  isSpeechEnabled: boolean
}

export const usePreferences = () => {
  const { storageItem: preferences, setStorageItem } = useStorageHandler<Preferences>('preferences')

  const setPreferences = (newPreferences: Partial<Preferences>) => {
    const initialPreferences = cloneDeep(preferences.value)
    setStorageItem(merge(initialPreferences, newPreferences))
  }

  const seed = ref<number | undefined>(preferences.value.seed)
  const isSpeechEnabled = ref<boolean>(preferences.value.isSpeechEnabled ?? true)

  watch([seed, isSpeechEnabled], ([seed, isSpeechEnabled]) => {
    setPreferences({ seed, isSpeechEnabled })
  })

  return {
    seed,
    isSpeechEnabled,
  }
}
