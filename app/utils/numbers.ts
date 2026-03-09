/**
 * Build a list of numbers from start to end.
 * @param start - The start number.
 * @param end - The end number.
 * @param randomize - Whether to randomize the list.
 * @returns A list of numbers from start to end, inclusive.
 * @example
 * buildNumberList({ start: 1, end: 10 }) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export const buildNumberList = ({
  start,
  end,
  randomize = false,
}: {
  start: number
  end: number
  randomize?: boolean
}): number[] => {
  const numbers = Array.from({ length: end - start + 1 }, (_, i) => start + i)
  if (randomize) {
    return numbers.sort(() => Math.random() - 0.5)
  }
  return numbers
}
