export type QuizExercise = {
  title: string | number
  expectedAnswer: string
}

export type QuizGroup = {
  title: string
  exercises: QuizExercise[]
}

// PERSONAL PRONOUNS EXERCISES

const personalPronouns = {
  'I am': 'ich bin',
  'you are': 'du bist',
  'he is': 'er ist',
  'she is': 'sie ist',
  'it is': 'es ist',
  'we are': 'wir sind',
  'you are (plural)': 'ihr seid',
  'they are': 'sie sind',
} as const

const personalPronounsExercises = [
  {
    title: 'Personal Pronouns',
    exercises: Object.entries(personalPronouns).map(([key, value]) => ({
      title: key,
      expectedAnswer: value,
    })),
  },
] satisfies QuizGroup[]

// WEEKDAYS EXERCISES
const weekdays = {
  Monday: 'Montag',
  Tuesday: 'Dienstag',
  Wednesday: 'Mittwoch',
  Thursday: 'Donnerstag',
  Friday: 'Freitag',
  Saturday: 'Samstag',
  Sunday: 'Sonntag',
} as const

const weekdaysExercises = [
  {
    title: 'Weekdays',
    exercises: Object.entries(weekdays).map(([key, value]) => ({
      title: key,
      expectedAnswer: value,
    })),
  },
] satisfies QuizGroup[]

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

const fractionNumbers = {
  '1/2': 'ein Halb',
  '1/3': 'ein Drittel',
  '1/4': 'ein Viertel',
  '1/5': 'ein Fünftel',
  '1/6': 'ein Sechstel',
  '1/7': 'ein Siebentel',
  '1/8': 'ein Achtel',
  '1/9': 'ein Neuntel',
  '1/10': 'ein Zehntel',
} as const

const fractionNumbersExercises = Object.entries(fractionNumbers).map(([key, value]) => ({
  title: key,
  expectedAnswer: value,
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
  {
    title: 'Fraction Numbers',
    exercises: fractionNumbersExercises,
  },
] satisfies QuizGroup[]

/**
 * All exercises in the app.
 */
export const allExercises = [
  ...personalPronounsExercises,
  ...weekdaysExercises,
  ...colorsExercises,
  ...familyMembersExercises,
  ...numbersExercises,
] as const satisfies QuizGroup[]
