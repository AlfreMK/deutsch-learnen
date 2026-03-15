export const useShuffledExercises = ({
  quizGroup,
  randomize,
  seed,
}: {
  quizGroup: ComputedRef<QuizGroup>
  randomize: ComputedRef<boolean>
  seed: ComputedRef<number | undefined>
}) => {
  const exercises = computed(() => quizGroup.value.exercises)

  const currentExercises = ref<QuizExercise[]>([])

  const reset = () => {
    currentExercises.value = randomize.value ? shuffleArray(exercises.value, seed.value) : exercises.value
  }

  watch([quizGroup, randomize, seed], () => {
    reset()
  }, { immediate: true })

  return {
    exercises: readonly(currentExercises),
    reset,
  }
}
