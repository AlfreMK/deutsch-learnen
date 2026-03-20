/**
 * Converts a date string to an ISO date string. It adds a Z if isUTC is true and Z is not in the date
 * @param date - The date string
 * @param isUTC - If true, the date will be converted to UTC
 * @returns The ISO date string
 */
const fromDateToIso = ({ date, isUTC = true }: { date: string, isUTC?: boolean }) => {
  if (isUTC && !date.endsWith('Z')) {
    return `${date}Z`
  }
  return date
}

/**
 * Converts a date string to a locale date string
 * @param date - The date string
 * @returns The locale date string
 * @example
 * ```ts
 * isoToLocaleDateString('2024-01-01T00:00:00.000Z') // 'January 1, 2024'
 * ```
 */
export const isoToLocaleDateString = (date: string) => {
  const LOCALE = import.meta.client ? navigator.language : 'en-US'
  return new Date(fromDateToIso({ date })).toLocaleDateString(LOCALE, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
