// Нумерологические расчёты для браузера (клиентский калькулятор).
// ⚠️ ДУБЛЬ формул из bot/src/numerology/index.js — при правках синхронизировать оба места.
// Всё считается на клиенте: ни сервера, ни базы, ни ключей не нужно.

// Пифагорейская таблица для русского алфавита (1–9)
const LETTER_VALUES: Record<string, number> = {
  А: 1, Б: 2, В: 3, Г: 4, Д: 5, Е: 6, Ё: 7, Ж: 8, З: 9,
  И: 1, Й: 2, К: 3, Л: 4, М: 5, Н: 6, О: 7, П: 8, Р: 9,
  С: 1, Т: 2, У: 3, Ф: 4, Х: 5, Ц: 6, Ч: 7, Ш: 8, Щ: 9,
  Ъ: 1, Ы: 2, Ь: 3, Э: 4, Ю: 5, Я: 6,
}

const VOWELS = new Set(['А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'])
const MASTER_NUMBERS = new Set([11, 22, 33])

// Редукция до одной цифры с сохранением мастер-чисел
export function reduceNumber(n: number): number {
  while (n > 9 && !MASTER_NUMBERS.has(n)) {
    n = String(n)
      .split('')
      .reduce((sum, d) => sum + Number(d), 0)
  }
  return n
}

// Число дня рождения (только день месяца) — birthDate в формате DD.MM.YYYY
export function birthdayNumber(birthDate: string): number {
  const day = parseInt(birthDate.split('.')[0], 10)
  return reduceNumber(day)
}

// Число судьбы (полная дата рождения)
export function lifePathNumber(birthDate: string): number {
  const digits = birthDate.replace(/\./g, '').split('').map(Number)
  const sum = digits.reduce((a, b) => a + b, 0)
  return reduceNumber(sum)
}

// Число самовыражения (все буквы имени)
export function expressionNumber(fullName: string): number | null {
  const letters = fullName.toUpperCase().split('').filter((c) => LETTER_VALUES[c])
  if (letters.length === 0) return null
  const sum = letters.reduce((acc, c) => acc + LETTER_VALUES[c], 0)
  return reduceNumber(sum)
}

// Число души (только гласные)
export function soulNumber(fullName: string): number | null {
  const vowels = fullName.toUpperCase().split('').filter((c) => VOWELS.has(c))
  if (vowels.length === 0) return null
  const sum = vowels.reduce((acc, c) => acc + LETTER_VALUES[c], 0)
  return reduceNumber(sum)
}

// Промежуточные шаги редукции — для анимации «как складывается число».
// Возвращает цепочку сумм: [35, 8] для 17.08.1990.
export function reductionSteps(n: number): number[] {
  const steps = [n]
  while (n > 9 && !MASTER_NUMBERS.has(n)) {
    n = String(n)
      .split('')
      .reduce((sum, d) => sum + Number(d), 0)
    steps.push(n)
  }
  return steps
}

// Валидация даты рождения DD.MM.YYYY
export function validateBirthDate(input: string): boolean {
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(input)) return false
  const [day, month, year] = input.split('.').map(Number)
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false
  if (year < 1900 || year > new Date().getFullYear()) return false
  const d = new Date(year, month - 1, day)
  return d.getDate() === day && d.getMonth() === month - 1
}