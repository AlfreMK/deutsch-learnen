const UNITS = [
  '',
  'eins',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sechs',
  'sieben',
  'acht',
  'neun',
] as const

/** Used in compounds: 21 = einundzwanzig, 16 = sechzehn, 17 = siebzehn */
const UNITS_COMPOUND = [
  '',
  'ein',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sech',
  'sieb',
  'acht',
  'neun',
] as const

const TEENS = [
  'zehn',
  'elf',
  'zwölf',
  'dreizehn',
  'vierzehn',
  'fünfzehn',
  'sechzehn',
  'siebzehn',
  'achtzehn',
  'neunzehn',
] as const

const TENS = [
  '',
  '',
  'zwanzig',
  'dreißig',
  'vierzig',
  'fünfzig',
  'sechzig',
  'siebzig',
  'achtzig',
  'neunzig',
] as const

function oneTo99(n: number): string {
  if (n < 1 || n > 99) return ''

  if (n < 10) return UNITS[n] ?? ''
  if (n < 20) return TEENS[n - 10] ?? ''

  const ones = n % 10
  const ten = Math.floor(n / 10)
  if (ones === 0) return TENS[ten] ?? ''
  return `${UNITS_COMPOUND[ones]}und${TENS[ten]}`
}

export const getNumberInDeutsch = (number: number): string => {
  if (number < 1 || number > 1000) {
    return number.toString()
  }

  if (number === 1000) return 'eintausend'

  if (number >= 100) {
    const hundreds = Math.floor(number / 100)
    const rest = number % 100
    const hundredPart = hundreds === 1 ? 'hundert' : `${UNITS[hundreds]}hundert`
    return rest === 0 ? hundredPart : `${hundredPart}${oneTo99(rest)}`
  }

  return oneTo99(number)
}
