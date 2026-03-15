import { merge, cloneDeep } from 'lodash-es'

type Preferences = {
  seed: number | undefined
  isSpeechEnabled: boolean
  randomize: boolean
}

export const usePreferences = () => {
  const { storageItem: preferences, setStorageItem } = useStorageHandler<Preferences>('preferences')

  const setPreferences = (newPreferences: Partial<Preferences>) => {
    const initialPreferences = cloneDeep(preferences.value)
    setStorageItem(merge(initialPreferences, newPreferences))
  }

  const seed = ref<number | undefined>(preferences.value.seed)
  const isSpeechEnabled = ref<boolean>(preferences.value.isSpeechEnabled ?? true)
  const randomize = ref<boolean>(preferences.value.randomize ?? false)

  watch([seed, isSpeechEnabled, randomize], ([seed, isSpeechEnabled, randomize]) => {
    setPreferences({
      seed,
      isSpeechEnabled,
      randomize,
    })
  })

  return {
    seed,
    isSpeechEnabled,
    randomize,
  }
}
