import { cloneDeep } from 'lodash-es'

class PseudoRandom {
  private previous: number
  constructor(seed?: number) {
    this.previous = seed ?? Date.now()
  }

  /**
   * @returns A random number between 0 and 1.
   */
  random() {
    const next = (this.previous * 16807) % 2147483647
    this.previous = next
    return next / 2147483647
  }
}

/**
 * Shuffle an array.
 * @param array - The array to shuffle.
 * @param seed - The seed for the random number generator.
 * @returns The shuffled array.
 * @example
 * shuffleArray([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
 */
export const shuffleArray = <TItem>(array: readonly TItem[], seed?: number): TItem[] => {
  const pseudoRandom = new PseudoRandom(seed)
  return Array.from(cloneDeep(array)).sort(() => pseudoRandom.random() - 0.5)
}
