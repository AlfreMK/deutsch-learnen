import { useQuery } from '@tanstack/vue-query'
import queryKeys from './queryKeys'
import { useApiRequests } from './apiCalls'
import type { WikipediaSummaryResponse, WikipediaSummaryThumbnail } from './types'

export type { WikipediaSummaryResponse, WikipediaSummaryThumbnail }
export { queryKeys as wikipediaImageQueryKeys }

/**
 * Loads a Wikipedia lead image for an English lookup term when `enabled` is true.
 * Results are cached by Vue Query for the configured stale time.
 */
export const useWikipediaEnglishTermImage = ({
  term,
  enabled,
}: {
  term: MaybeRefOrGetter<string>
  enabled: MaybeRefOrGetter<boolean>
}) => {
  const { getThumbnailForEnglishTerm } = useApiRequests()

  const trimmedTerm = computed(() => toValue(term).trim())

  return useQuery({
    queryKey: computed(() => queryKeys.byEnglishTerm(trimmedTerm.value)),
    queryFn: () => getThumbnailForEnglishTerm(trimmedTerm.value),
    enabled: computed(() => toValue(enabled) && !!trimmedTerm.value),
  })
}
