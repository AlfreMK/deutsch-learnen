import { merge, cloneDeep } from 'lodash-es'

type Preferences = {
  selectedQuizTitle: string
  seed: number | undefined
  isSpeechEnabled: boolean
  randomize: boolean
  isExtraExercisesEnabled: boolean
}

export const usePreferences = () => {
  const { storageItem: preferences, setStorageItem } = useStorageHandler<Partial<Preferences>>('preferences')

  const setPreferences = (newPreferences: Partial<Preferences>) => {
    const initialPreferences = cloneDeep(preferences.value)
    setStorageItem(merge(initialPreferences, newPreferences))
  }

  const selectedQuizTitle = ref<string>(
    isQuizTitleValid(preferences.value.selectedQuizTitle)
      ? preferences.value.selectedQuizTitle
      : DEFAULT_EXERCISES[0]!.title,
  )

  const seed = ref<number | undefined>(preferences.value.seed)
  const isSpeechEnabled = ref<boolean>(preferences.value.isSpeechEnabled ?? true)
  const randomize = ref<boolean>(preferences.value.randomize ?? false)
  const isExtraExercisesEnabled = ref<boolean>(preferences.value.isExtraExercisesEnabled ?? false)

  watch([
    selectedQuizTitle,
    seed,
    isSpeechEnabled,
    randomize,
    isExtraExercisesEnabled,
  ], ([
    selectedQuizTitle,
    seed,
    isSpeechEnabled,
    randomize,
    isExtraExercisesEnabled,
  ]) => {
    setPreferences({
      selectedQuizTitle,
      seed,
      isSpeechEnabled,
      randomize,
      isExtraExercisesEnabled,
    })
  })

  return {
    selectedQuizTitle,
    seed,
    isSpeechEnabled,
    randomize,
    isExtraExercisesEnabled,
  }
}
