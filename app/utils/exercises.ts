export type QuizExercise = {
  title: string | number
  expectedAnswer: string
}

export type QuizGroup = {
  title: string
  exercises: QuizExercise[]
}

// COLOR EXERCISES

const colors = {
  'red': 'rot',
  'green': 'grün',
  'blue': 'blau',
  'yellow': 'gelb',
  'purple': 'lila',
  'orange': 'orange',
  'pink': 'pink',
  'brown': 'braun',
  'black': 'schwarz',
  'white': 'weiß',
  'gray': 'grau',
  'light blue': 'hellblau',
  'dark blue': 'dunkelblau',
  'light green': 'hellgrün',
  'dark green': 'dunkelgrün',
  'light red': 'hellrot',
  'dark red': 'dunkelrot',
  'light yellow': 'hellgelb',
  'dark yellow': 'dunkelgelb',
  'light purple': 'helllila',

} as const

const colorsExercises = [
  {
    title: 'Colors',
    exercises: Object.entries(colors).map(([key, value]) => ({
      title: key,
      expectedAnswer: value,
    })),
  },
] satisfies QuizGroup[]

// FAMILY EXERCISES
const familyMembers = {
  'cousin': 'neffe',
  'niece': 'nichte',
  'brother-in-law': 'schwager',
  'sister-in-law': 'schwagerin',
  'son-in-law': 'schwiegersohn',
  'daughter-in-law': 'schwiegertochter',
  'sibling': 'geschwister',
  'brothers': 'brüder',
  'sisters': 'schwestern',
} as const

const familyMembersExercises = [
  {
    title: 'Family Members',
    exercises: Object.entries(familyMembers).map(([key, value]) => ({
      title: key,
      expectedAnswer: value,
    })),
  },
] satisfies QuizGroup[]

// NUMBERS EXERCISES
const numbers1to10Exercises = buildNumberList({ start: 1, end: 10 }).map(number => ({
  title: number,
  expectedAnswer: getNumberInDeutsch(number),
}))

const numbers11to20Exercises = buildNumberList({ start: 11, end: 20 }).map(number => ({
  title: number,
  expectedAnswer: getNumberInDeutsch(number),
}))

const numbers21to100Exercises = buildNumberList({ start: 21, end: 100 }).map(number => ({
  title: number,
  expectedAnswer: getNumberInDeutsch(number),
}))

const numbersExercises = [
  {
    title: 'Numbers 1-10',
    exercises: numbers1to10Exercises,
  },
  {
    title: 'Numbers 11-20',
    exercises: numbers11to20Exercises,
  },
  {
    title: 'Numbers 21-100',
    exercises: numbers21to100Exercises,
  },
] satisfies QuizGroup[]

/**
 * All exercises in the app.
 */
export const allExercises = [
  ...colorsExercises,
  ...familyMembersExercises,
  ...numbersExercises,
] as const satisfies QuizGroup[]
