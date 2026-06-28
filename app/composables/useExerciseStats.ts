import { cloneDeep, merge } from 'lodash-es'

export type ExerciseStat = {
  successes: number
  fails: number
}

/**
 * Per-exercise success/fail counters, grouped by quiz title and then by exercise key.
 * Shape: `{ [quizTitle]: { [exerciseKey]: { successes, fails } } }`.
 */
export type ExerciseStats = Record<string, Record<string, ExerciseStat>>

const EMPTY_STAT: ExerciseStat = { successes: 0, fails: 0 }

export const useExerciseStats = () => {
  const { storageItem: exerciseStats, setStorageItem } = useStorageHandler<ExerciseStats>({ customKey: 'exerciseStats' })

  /**
   * Returns the stored stat for an exercise, or a zeroed stat when none exists yet.
   */
  const getStat = ({
    quizTitle,
    exerciseKey,
  }: {
    quizTitle: string
    exerciseKey: string
  }): ExerciseStat => {
    return exerciseStats.value[quizTitle]?.[exerciseKey] ?? { ...EMPTY_STAT }
  }

  /**
   * A higher score means the exercise is harder for the user (more fails, fewer successes).
   */
  const getDifficultyScore = ({
    quizTitle,
    exerciseKey,
  }: {
    quizTitle: string
    exerciseKey: string
  }): number => {
    const { successes, fails } = getStat({ quizTitle, exerciseKey })
    return fails - successes
  }

  /**
   * Records a single attempt result for an exercise, incrementing its success or fail counter.
   */
  const recordResult = ({
    quizTitle,
    exerciseKey,
    isCorrect,
  }: {
    quizTitle: string
    exerciseKey: string
    isCorrect: boolean
  }) => {
    const current = getStat({ quizTitle, exerciseKey })
    const updated: ExerciseStat = {
      successes: current.successes + (isCorrect ? 1 : 0),
      fails: current.fails + (isCorrect ? 0 : 1),
    }
    const initialStats = cloneDeep(exerciseStats.value)
    setStorageItem(merge(initialStats, { [quizTitle]: { [exerciseKey]: updated } }))
  }

  return {
    exerciseStats,
    getStat,
    getDifficultyScore,
    recordResult,
  }
}
