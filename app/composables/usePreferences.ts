import { merge, cloneDeep } from 'lodash-es'

type Preferences = {
  selectedQuizTitle: string
  seed: number | undefined
  isSpeechEnabled: boolean
  randomize: boolean
}

const isQuizTitleValid = (title?: string): title is string => {
  if (!title) {
    return false
  }
  return allExercises.some(exercise => exercise.title === title)
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
      : allExercises[0]!.title,
  )

  const seed = ref<number | undefined>(preferences.value.seed)
  const isSpeechEnabled = ref<boolean>(preferences.value.isSpeechEnabled ?? true)
  const randomize = ref<boolean>(preferences.value.randomize ?? false)

  watch([
    selectedQuizTitle,
    seed,
    isSpeechEnabled,
    randomize,
  ], ([
    selectedQuizTitle,
    seed,
    isSpeechEnabled,
    randomize,
  ]) => {
    setPreferences({
      selectedQuizTitle,
      seed,
      isSpeechEnabled,
      randomize,
    })
  })

  return {
    selectedQuizTitle,
    seed,
    isSpeechEnabled,
    randomize,
  }
}
