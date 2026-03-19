const derDieDasBySuffix = {
  '-ei': 'die',
  '-keit': 'die',
  '-heit': 'die',
  '-schaft': 'die',
  '-ung': 'die',
  '-ette': 'die',
  '-ie': 'die',
  '-ik': 'die',
  '-ine': 'die',
  '-ion': 'die',
  '-tät': 'die',
  '-ur': 'die',
  '-ade': 'die',
  '-a': 'die',
  '-sis': 'die',
  '-ive': 'die',
  '-ig': 'der',
  '-ling': 'der',
  '-ent': 'der',
  '-ier': 'der',
  '-ismus': 'der',
  '-ist': 'der',
  '-or': 'der',
  '-ör': 'der',
  '-iker': 'der',
  '-ast': 'der',
  '-eur': 'der',
  '-chen': 'das',
  '-lein': 'das',
  '-tel': 'das',
  '-o': 'das',
  '-ing': 'das',
  '-um': 'das',
  '-ma': 'das',
  '-ment': 'das',
  '-ett': 'das',
  'Ge-': 'das',
} as const

const filterDerDieDasExercisesBySuffix = (suffixes: (keyof typeof derDieDasBySuffix)[]) => {
  const suffixesSet = new Set(suffixes) as Set<string>
  return Object.entries(derDieDasBySuffix).filter(([key]) => suffixesSet.has(key))
}

export const derDieDasExercisesBySuffixGroups = [
  {
    title: 'Der, Die, Das by Suffix',
    exercises: filterDerDieDasExercisesBySuffix(
      [
        '-lein',
        '-ent',
        '-ment',
        '-ett',
        '-ette',
        '-ma',
        '-a',
        '-ast',
        '-tel',
        '-ismus',
        '-ling',
        '-ing',
      ] as const,
    ).map(([key, value]) => ({
      expectedAnswer: value,
      append: key,
      voiceText: `${value} ${key}`,
    })),
    isRandomizeEnforced: true,
  },
] satisfies QuizGroup[]

const derPluralBySuffix = {
  // Masculine ending with -ant, -e, -ent, -ist, or
  'der -ant': '-anten',
  'der -e': '-en',
  'der -ent': '-enten',
  'der -ist': '-isten',
  'der -or': '-ore',
  // Femenine ending with -e, -heit, -in, -on, -ik, -keit, -schaft, -tät, -ung
  'die -e': '-en',
  'die -heit': '-heiten',
  'die -in': '-innen',
  'die -on': '-onen',
  'die -ik': '-iken',
  'die -keit': '-keiten',
  'die -schaft': '-schen',
  'die -tät': '-täten',
  'die -ung': '-ungen',
  // Neutral plural, ending in -ma, -um, -us.
  'das -ma': '-men',
  'das -um': '-en',
  'das -us': '-en',
  // Masculine -eur, -ich, -ier, -ig, -ing, -ör
  'der -eur': '-ere',
  'der -ich': '-ichen',
  'der -ier': '-iere',
  'der -ig': '-igen',
  'der -ing': '-ingen',
  'der -ör': '-öre',
  // Masculine ending with -el, -er
  'der -el': '-el',
  'der -er': '-er',
  // Nouns ending in -a, -i, -o, -u, -y
  'das -a': '-as',
  'das -i': '-is',
  'das -o': '-os',
  'das -u': '-us',
  'das -y': '-ys',
  // Neuter ending with -chen, -lein
  'das -chen': '-chen',
  'das -lein': '-lein',
} as const

const derPluralExercisesBySuffix = Object.entries(derPluralBySuffix).map(([key, value]) => ({
  expectedAnswer: value,
  prepend: key,
  voiceText: `${value} ${key}`,
}))

export const derPluralExercisesBySuffixGroups = [
  {
    title: 'Der Plural by Suffix',
    exercises: derPluralExercisesBySuffix,
    isRandomizeEnforced: true,
  },
] satisfies QuizGroup[]

export const EXTRA_EXERCISES = [
  ...derDieDasExercisesBySuffixGroups,
  ...derPluralExercisesBySuffixGroups,
] as const satisfies QuizGroup[]
