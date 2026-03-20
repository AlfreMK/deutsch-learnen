export type QuizExercise = {
  prepend?: string | number
  expectedAnswer: string
  append?: string | number
  voiceText?: string
}

export type QuizGroup = {
  title: string
  exercises: QuizExercise[]
  isRandomizeEnforced?: boolean
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
      prepend: key,
      expectedAnswer: value,
    })),
  },
] satisfies QuizGroup[]

const haveExercises = {
  'I have': 'ich habe',
  'you have': 'du hast',
  'he has': 'er hat',
  'she has': 'sie hat',
  'it has': 'es hat',
  'we have': 'wir haben',
  'you have (plural)': 'ihr habt',
  'they have': 'sie haben',
}

const haveExercisesGroups = [
  {
    title: 'Have',
    exercises: Object.entries(haveExercises).map(([key, value]) => ({
      prepend: key,
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
      prepend: key,
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
      prepend: key,
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
      prepend: key,
      expectedAnswer: value,
    })),
  },
] satisfies QuizGroup[]

// NUMBERS EXERCISES
const numbers1to10Exercises = buildNumberList({ start: 1, end: 10 }).map(number => ({
  prepend: number,
  expectedAnswer: getNumberInDeutsch(number),
}))

const numbers11to20Exercises = buildNumberList({ start: 11, end: 20 }).map(number => ({
  prepend: number,
  expectedAnswer: getNumberInDeutsch(number),
}))

const numbers21to100Exercises = buildNumberList({ start: 21, end: 100 }).map(number => ({
  prepend: number,
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
  prepend: key,
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

// DER, DIE, DAS EXERCISES
const femenineWords = {
  // -ei suffix
  Bäckerei: 'die', // bakery
  Bücherei: 'die', // library
  // -in suffix
  Lehrerin: 'die', // teacher
  Schülerin: 'die', // student
  // -keit suffix
  Ähnlichkeit: 'die', // similarity
  Möglichkeit: 'die', // possibility
  // -heit suffix
  Gesundheit: 'die', // health
  Freiheit: 'die', // freedom
  // -schaft suffix
  Wirtschaft: 'die', // economy
  Landschaft: 'die', // landscape
  // -ung suffix
  Heizung: 'die', // heating
  Meinung: 'die', // opinion
  Wohnung: 'die', // apartment
  // -ette suffix
  Toilette: 'die', // toilet
  Zigarette: 'die', // cigarette
  // -ie suffix
  Theorie: 'die', // theory
  Serie: 'die', // series
  // -ik suffix
  Musik: 'die', // music
  Physik: 'die', // physics
  // -ine suffix
  Maschine: 'die', // machine
  Blondine: 'die', // blonde
  // -ion suffix
  Kommunikation: 'die', // communication
  Produktion: 'die', // production
  // -tät
  Spezialität: 'die', // specialty
  Qualität: 'die', // quality
  // -ur suffix
  Natur: 'die', // nature
  Literatur: 'die', // literature
  // -ade suffix
  Parade: 'die', // parade
  Schokolade: 'die', // chocolate
  // -a suffix
  Kamera: 'die', // camera
  Liga: 'die', // league
  // -sis suffix
  Dosis: 'die', // dose
  Skepsis: 'die', // skepticism
  // -ive suffix
  Alternative: 'die', // alternative
  Perspektive: 'die', // perspective
} as const

const masculineWords = {
  // -ig suffix
  Honig: 'der', // honey
  König: 'der', // king
  // -ling suffix
  Zwilling: 'der', // twin
  Frühling: 'der', // spring
  // -ent suffix
  Student: 'der', // student
  Agent: 'der', // agent
  // -ier suffix
  Indoniesier: 'der', // indonesian
  Juwelier: 'der', // jeweler
  // -ismus suffix
  Kapitalismus: 'der', // capitalism
  Optimismus: 'der', // optimism
  Kommunismus: 'der', // communism
  // -ist suffix
  Buddhist: 'der', // budhist
  Pianist: 'der', // pianist
  // -or suffix
  Motor: 'der', // motor
  Chor: 'der', // choir
  // -ör suffix
  Frisör: 'der', // barber
  Likör: 'der', // liqueur
  // -iker suffix
  Romantiker: 'der', // romanticist
  Chemiker: 'der', // chemist
  // -ast suffix
  Gast: 'der', // guest
  Palast: 'der', // palace
  // -eur suffix
  Redakteur: 'der', // editor
  Ingenieur: 'der', // engineer
} as const

const neuterWords = {
  // -chen suffix
  Mädchen: 'das', // girl
  Fläschen: 'das', // stream
  // -lein
  Fräulein: 'das', // young lady
  Bächlein: 'das', // brook
  // -tel
  Hotel: 'das', // hotel
  Viertel: 'das', // quarter
  // -tum
  Eigentum: 'das', // property
  Datum: 'das', // date
  // -in
  Benzin: 'das', // gasoline
  Bewusstsein: 'das', // consciousness
  // -o
  Radio: 'das', // radio
  Auto: 'das', // car
  // Infinitiv
  Lernen: 'das', // learn
  Spielen: 'das', // play
  Arbeiten: 'das', // work
  Lesen: 'das', // read
  // -ing
  Ding: 'das', // thing
  Meeting: 'das', // meeting
  // -um
  Zentrum: 'das', // center
  Museum: 'das', // museum
  // -ma
  Klima: 'das', // climate
  Drama: 'das', // drama
  // -ment
  Element: 'das', // element
  Experiment: 'das', // experiment
  Medikament: 'das', // medication
  // -ett
  Bett: 'das', // bed
  Omelett: 'das', // omelette
  // Ge- prefix
  Geschlecht: 'das', // gender
  Gewitter: 'das', // weather
} as const

const derDieDasExercises = Object.entries({
  ...femenineWords,
  ...masculineWords,
  ...neuterWords,
}).map(([key, value]) => ({
  expectedAnswer: value,
  append: key,
  voiceText: `${value} ${key}`,
}))

const derDieDasExercisesGroups = [
  {
    title: 'Der, Die, Das',
    exercises: derDieDasExercises,
    isRandomizeEnforced: true,
  },
] satisfies QuizGroup[]

const derPlural = {
  // Masculine ending with -ant, -e, -ent, -ist, or
  'der Praktikant': 'die Praktikanten',
  'der Kollege': 'die Kollegen',
  'der Dirigent': 'die Dirigenten',
  'der Pianist': 'die Pianisten',
  'der Direktor': 'die Direktoren',
  // Femenine ending with -e, -heit, -in, -on, -ik, -keit, -schaft, -tät, -ung
  'die Tante': 'die Tanten',
  'die Patientin': 'die Patientinnen',
  'die Region': 'die Regionen',
  'die Grafik': 'die Grafiken',
  'die Kapazität': 'die Kapazitäten',
  'die Unfähigkeit': 'die Unfähigkeiten',
  'die Landschaft': 'die Landschaften',
  'die Übung': 'die Übungen',
  'die Wahrheit': 'die Wahrheiten',
  // Irregular plural, ending in -ma, -um, -us.
  'das Aroma': 'die Aromen',
  'das Zentrum': 'die Zentren',
  'der Organismus': 'die Organismen',
  // Masculine -eur, -ich, -ier, -ig, -ing, -ör
  'der Masseur': 'die Masseure',
  'der Ingenieur': 'die Ingenieure',
  'der Wellensittich': 'die Wellensittiche',
  'der Pionier': 'die Pioniere',
  'der König': 'die Könige',
  'der Ring': 'die Ringe',
  'der Likör': 'die Liköre',
  // Femenine monosyllabic words + umlaut
  'die Maus': 'die Mäuse',
  'die Hande': 'die Hände',
  // Neuter monosyllabic words
  'das Brot': 'die Brote',
  'das Buch': 'die Bücher',
  'das Glas': 'die Gläser',
  'das Haar': 'die Haare',
  // Nouns ending in -a, -i, -o, -u, -y
  'das Sofa': 'die Sofas',
  'der Bikini': 'die Bikinis',
  'das Video': 'die Videos',
  'das Niveau': 'die Niveaus',
  'das Baby': 'die Babys',
  // Masculine ending with -el, -er
  'der Spanier': 'die Spanier',
  'der Büffel': 'die Büffel',
  // Neuter ending with -chen, -lein
  'das Fläschen': 'die Fläschen',
  'das Fräulein': 'die Fräulein',
}

const derPluralExercises = Object.entries(derPlural).map(([key, value]) => ({
  expectedAnswer: value,
  prepend: key,
  voiceText: `${value} ${key}`,
}))

const derPluralExercisesGroups = [
  {
    title: 'Der Plural',
    exercises: derPluralExercises,
    isRandomizeEnforced: true,
  },
] satisfies QuizGroup[]

// CASTLES / HISTORY VOCABULARY
const castlesAndHistoryVocabulary = {
  'castle / lock': 'das Schloss',
  'king': 'der König',
  'Bavaria': 'Bayern',
  'splendor': 'die Pracht',
  'majestic': 'majestätisch',
  'Cinderella': 'das Aschenputtel',
  'fairy tale': 'das Märchen',
  'legacy': 'das Vermächtnis',
  'monarchy': 'die Monarchie',
  'power': 'die Macht',
  'Prussia': 'Preußen',
  'era': 'die Ära',
  'memory': 'die Erinnerung',
  'deformity': 'die Deformität',
  'insecurity': 'die Unsicherheit',
  'birth': 'die Geburt',
  'bold': 'kühn',
  'weakness': 'die Schwäche',
  'passion': 'die Leidenschaft',
  'tension': 'die Spannung',
  'chancellor': 'der Kanzler',
  'World War I': 'der Erste Weltkrieg',
  'alliance': 'die Allianz',
  'mental health': 'die geistige Gesundheit',
  'worry': 'die Sorge',
  'behavior': 'das Verhalten',
  'narcissism': 'der Narzissmus',
  'exile': 'das Exil',
  'pressure': 'der Druck',
  'throne': 'der Thron',
  'Netherlands': 'die Niederlande',
  'poetry': 'die Poesie',
  'Austria': 'Österreich',
  'Middle Ages': 'das Mittelalter',
  'Alps': 'die Alpen',
  'history': 'die Geschichte',
  'panorama': 'das Panorama',
  'Switzerland': 'die Schweiz',
  'lake': 'der See',
  'prison': 'das Gefängnis',
  'enchanting': 'bezaubernd',
  'travel destination': 'das Reiseziel',
  'shore': 'das Ufer',
} as const

const castlesAndHistoryVocabularyExercises = Object.entries(castlesAndHistoryVocabulary).map(([key, value]) => ({
  expectedAnswer: value,
  prepend: key,
  voiceText: value,
}))

const castlesAndHistoryVocabularyExercisesGroups = [
  {
    title: 'Castles and History Vocabulary',
    exercises: castlesAndHistoryVocabularyExercises,
  },
] satisfies QuizGroup[]

// HUMAN EXERCISES
const humanVocabulary = {
  'human': 'der Mensch',
  'man': 'der Mann',
  'woman': 'die Frau',
  'boy': 'der Junge',
  'girl': 'die Mädchen',
  'child': 'das Kind',
  'adult': 'der Erwachsene',
  'elderly': 'der Alte',
  'baby': 'das Baby',
  'hair': 'das Haar',
  'head': 'der Kopf',
  'ear': 'das Ohr',
  'forehead': 'die Stirn',
  'eye': 'das Auge',
  'eyebrow': 'die Augenbraue',
  'nose': 'der Nase',
  'brain': 'der Gehirn',
  'lip': 'die Lippe',
  'mouth': 'der Mund',
  'arm': 'der Arm',
  'elbow': 'der Ellbogen',
  'hand': 'die Hand',
  'chest': 'der Brust',
  'waist': 'die Taille',
  '': 'der Bauch',
  'hip': 'die Hüfte',
  '': 'der Bauchnabel',
  '': 'die Schulter',
  'back': 'der Rücken',
  '': 'der Po',
  'leg': 'das Bein',
  'knee': 'das Knie',
  'foot': 'der Fuß',
  'toes': 'die Zehen',
  'teeth': 'der Zahn',
  'skeleton': 'der Skelett',
  'bones': 'der Knochen',
} as const

const humanVocabularyExercises = Object.entries(humanVocabulary).map(([key, value]) => ({
  expectedAnswer: value,
  prepend: key,
  voiceText: value,
}))

const humanVocabularyExercisesGroups = [
  {
    title: 'Human Vocabulary',
    exercises: humanVocabularyExercises,
  },
] satisfies QuizGroup[]

/**
 * All exercises in the app.
 */
export const DEFAULT_EXERCISES = [
  ...personalPronounsExercises,
  ...haveExercisesGroups,
  ...weekdaysExercises,
  ...colorsExercises,
  ...familyMembersExercises,
  ...numbersExercises,
  ...derDieDasExercisesGroups,
  ...derPluralExercisesGroups,
  ...castlesAndHistoryVocabularyExercisesGroups,
  ...humanVocabularyExercisesGroups,
] as const satisfies QuizGroup[]

const ALL_EXERCISE_NAMES = new Set(
  [...DEFAULT_EXERCISES.map(exercise => exercise.title), ...EXTRA_EXERCISES.map(exercise => exercise.title)],
)

/**
 * Checks if the quiz title is valid.
 * @param title - The quiz title to check.
 * @returns True if the quiz title is valid, false otherwise.
 */
export const isQuizTitleValid = (title?: string): title is string => {
  if (!title) {
    return false
  }
  return ALL_EXERCISE_NAMES.has(title)
}
