import { cloneDeep } from 'lodash-es'

/**
 * Shuffle an array.
 * @param array - The array to shuffle.
 * @returns The shuffled array.
 * @example
 * shuffleArray([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
 */
export const shuffleArray = <TItem>(array: readonly TItem[]): TItem[] => {
  return Array.from(cloneDeep(array)).sort(() => Math.random() - 0.5)
}
