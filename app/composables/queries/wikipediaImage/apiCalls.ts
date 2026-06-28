import type { WikipediaSummaryResponse } from './types'

const WIKIPEDIA_EN_SUMMARY_BASE = 'https://en.wikipedia.org/api/rest_v1/page/summary'

function isNotFoundError(error: unknown): boolean {
  const status = (error as { status?: number, statusCode?: number })?.status
    ?? (error as { status?: number, statusCode?: number })?.statusCode
  return status === 404
}

export const useApiRequests = () => {
  /**
   * Fetches the lead thumbnail URL for an English Wikipedia article title matching `term`.
   * Returns null when there is no article or no thumbnail.
   */
  const getThumbnailForEnglishTerm = async (term: string): Promise<string | null> => {
    const trimmed = term.trim()
    if (!trimmed) {
      return null
    }

    const pathSegment = encodeURIComponent(trimmed.replace(/\s+/g, ' '))

    try {
      const data = await $fetch<WikipediaSummaryResponse>(`${WIKIPEDIA_EN_SUMMARY_BASE}/${pathSegment}`)
      return data.thumbnail?.source ?? null
    }
    catch (error) {
      if (isNotFoundError(error)) {
        return null
      }
      throw error
    }
  }

  return {
    getThumbnailForEnglishTerm,
  }
}
