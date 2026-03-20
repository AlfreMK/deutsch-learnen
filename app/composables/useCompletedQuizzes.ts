import { cloneDeep, merge } from 'lodash-es'

type QuizTitle = string
type DateCompletion = string
type CompletedQuizzes = Record<QuizTitle, DateCompletion>

export const useCompletedQuizzes = () => {
  const { storageItem: completedQuizzes, setStorageItem } = useStorageHandler<CompletedQuizzes>('completedQuizzes')

  const addCompletedQuiz = (quiz: QuizGroup) => {
    const completedQuiz = {
      [quiz.title]: new Date().toISOString(),
    }
    const initialCompletedQuizzes = cloneDeep(completedQuizzes.value)
    setStorageItem(merge(initialCompletedQuizzes, completedQuiz))
  }

  return {
    completedQuizzes,
    addCompletedQuiz,
  }
}
