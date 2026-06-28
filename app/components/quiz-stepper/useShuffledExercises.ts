import { cloneDeep } from 'lodash-es'

export const sortExercisesByDifficulty = ({
  exercises,
  getDifficultyScore,
}: {
  exercises: readonly QuizExercise[]
  getDifficultyScore: (exercise: QuizExercise) => number
}) => {
  return Array.from(cloneDeep(exercises)).sort((a, b) => getDifficultyScore(b) - getDifficultyScore(a))
}

export const useShuffledExercises = ({
  quizGroup,
  randomize,
  seed,
  sortByDifficulty,
  getDifficultyScore,
}: {
  quizGroup: ComputedRef<QuizGroup>
  randomize: ComputedRef<boolean>
  seed: ComputedRef<number | undefined>
  sortByDifficulty: ComputedRef<boolean>
  getDifficultyScore: (exercise: QuizExercise) => number
}) => {
  const exercises = computed(() => quizGroup.value.exercises)

  const currentExercises = ref<QuizExercise[]>([])

  const reset = () => {
    if (sortByDifficulty.value) {
      currentExercises.value = sortExercisesByDifficulty({ exercises: exercises.value, getDifficultyScore })
      return
    }
    currentExercises.value = randomize.value ? shuffleArray({ array: exercises.value, seed: seed.value }) : [...exercises.value]
  }

  watch([quizGroup, randomize, seed, sortByDifficulty], () => {
    reset()
  }, { immediate: true })

  return {
    exercises: readonly(currentExercises),
    reset,
  }
}
