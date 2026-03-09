export const useShuffledExercises = ({
  quizGroup,
  randomize,
}: {
  quizGroup: ComputedRef<QuizGroup>
  randomize: ComputedRef<boolean>
}) => {
  const exercises = computed(() => quizGroup.value.exercises)

  const currentExercises = ref<QuizExercise[]>([])
  watch([quizGroup, randomize], () => {
    currentExercises.value = randomize.value ? shuffleArray(exercises.value) : exercises.value
  }, { immediate: true })
  const reset = () => {
    currentExercises.value = randomize.value ? shuffleArray(exercises.value) : exercises.value
  }

  return {
    exercises: readonly(currentExercises),
    reset,
  }
}
