const wikipediaImageQueryKeys = {
  all: ['wikipediaImage'],
  byEnglishTerm: (term: string) => [...wikipediaImageQueryKeys.all, 'byEnglishTerm', term],
}

export default wikipediaImageQueryKeys
