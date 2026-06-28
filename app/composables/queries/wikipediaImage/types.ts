export interface WikipediaSummaryThumbnail {
  source: string
  width: number
  height: number
}

export interface WikipediaSummaryResponse {
  title: string
  thumbnail?: WikipediaSummaryThumbnail
}
