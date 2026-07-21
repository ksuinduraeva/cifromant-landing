'use client'

import { useState } from 'react'
import {
  lifePathNumber,
  birthdayNumber,
  soulNumber,
  expressionNumber,
  reductionSteps,
  validateBirthDate,
} from '../../lib/numerology'
import {
  lifePathTexts,
  birthdayTexts,
  soulTexts,
  expressionTexts,
  NumberTexts,
} from '../../lib/number-texts'

type Result = {
  key: string
  label: string
  hint: string
  value: number
  text: string
  steps: number[]
}

// Маска ввода даты: оставляем цифры, расставляем точки DD.MM.YYYY
function formatDateInput(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 8)
  const parts = [d.slice(0, 2), d.slice(2, 4), d.slice(4, 8)].filter(Boolean)
  return parts.join('.')
}

function pick(table: NumberTexts, n: number | null): string {
  if (n === null) return ''
  return table[n] ?? ''
}

export default function Calculator() {
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [error, setError] = useState('')
  const [nameOpen, setNameOpen] = useState(false)

  const dateValid = validateBirthDate(date)

  function calcDate() {
    if (!validateBirthDate(date)) {
      setError('Проверь дату — формат ДД.ММ.ГГГГ, например 17.08.1990')
      return
    }
    setError('')
    const lp = lifePathNumber(date)
    const bd = birthdayNumber(date)
    const digits = date.replace(/\./g, '').split('').map(Number).reduce((a, b) => a + b, 0)
    const next: Result[] = [
      {
        key: 'lifePath',
        label: 'Число судьбы',
        hint: 'главное число — характер и путь',
        value: lp,
        text: pick(lifePathTexts, lp),
        steps: reductionSteps(digits),
      },
      {
        key: 'birthday',
        label: 'Число дня рождения',
        hint: 'врождённые задатки',
        value: bd,
        text: pick(birthdayTexts, bd),
        steps: reductionSteps(parseInt(date.split('.')[0], 10)),
      },
    ]
    // Сохраняем ранее посчитанные числа имени, если были
    const nameRes = results.filter((r) => r.key === 'soul' || r.key === 'expression')
    setResults([...next, ...nameRes])
  }

  function calcName() {
    const trimmed = name.trim()
    if (trimmed.length < 2) {
      setError('Введи имя (можно полное ФИО) русскими буквами')
      return
    }
    setError('')
    const soul = soulNumber(trimmed)
    const expr = expressionNumber(trimmed)
    const nameRes: Result[] = []
    if (soul !== null) {
      nameRes.push({
        key: 'soul',
        label: 'Число души',
        hint: 'чего хочешь в глубине',
        value: soul,
        text: pick(soulTexts, soul),
        steps: [],
      })
    }
    if (expr !== null) {
      nameRes.push({
        key: 'expression',
        label: 'Число самовыражения',
        hint: 'как проявляешься вовне',
        value: expr,
        text: pick(expressionTexts, expr),
        steps: [],
      })
    }
    const dateRes = results.filter((r) => r.key === 'lifePath' || r.key === 'birthday')
    setResults([...dateRes, ...nameRes])
  }

  const hasResults = results.length > 0

  return (
    <div className="calc">
      {/* Шаг 1 — дата */}
      <div className="calc-field">
        <label htmlFor="calc-date">Дата рождения</label>
        <div className="calc-row">
          <input
            id="calc-date"
            inputMode="numeric"
            placeholder="ДД.ММ.ГГГГ"
            value={date}
            onChange={(e) => setDate(formatDateInput(e.target.value))}
            onKeyDown={(e) => e.key === 'Enter' && calcDate()}
            maxLength={10}
          />
          <button className="btn-gold" onClick={calcDate} disabled={!dateValid}>
            Рассчитать
          </button>
        </div>
      </div>

      {error && <p className="calc-error">{error}</p>}

      {/* Результаты */}
      {hasResults && (
        <div className="calc-results">
          {results.map((r) => (
            <NumberCard key={r.key} r={r} />
          ))}

          {/* Шаг 2 — имя (раскрывается после первого расчёта) */}
          {!nameOpen && !results.some((r) => r.key === 'soul' || r.key === 'expression') && (
            <button className="calc-more" onClick={() => setNameOpen(true)}>
              + Добавить имя — раскрыть число души и самовыражения
            </button>
          )}

          {nameOpen && !results.some((r) => r.key === 'soul') && (
            <div className="calc-field calc-name">
              <label htmlFor="calc-name">Имя или полное ФИО</label>
              <div className="calc-row">
                <input
                  id="calc-name"
                  placeholder="Например: Ксения"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && calcName()}
                />
                <button className="btn-gold" onClick={calcName} disabled={name.trim().length < 2}>
                  Раскрыть
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Разметка текстов бота: *жирный* → <strong>, строки-списки «— …» → пункты.
function renderInline(line: string) {
  return line.split(/(\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <strong key={i}>{part.slice(1, -1)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

function NumberCard({ r }: { r: Result }) {
  const [open, setOpen] = useState(false)
  const lines = r.text.split('\n').filter((p) => p.trim())
  const showSteps = r.steps.length > 1

  return (
    <div className={`ncard${open ? ' is-open' : ''}`}>
      <button className="ncard-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="ncard-badge">{r.value}</span>
        <span className="ncard-meta">
          <span className="ncard-label">{r.label}</span>
          <span className="ncard-hint">{r.hint}</span>
          {showSteps && (
            <span className="ncard-steps">{r.steps.join(' → ')}</span>
          )}
        </span>
        <span className="ncard-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="ncard-body">
          {lines.map((line, i) => {
            const t = line.trim()
            // Строка-пункт списка («— …») — оформляем как элемент с золотым маркером
            if (t.startsWith('—')) {
              return (
                <p key={i} className="ncard-li">{renderInline(t.slice(1).trim())}</p>
              )
            }
            return <p key={i}>{renderInline(t)}</p>
          })}
          {r.key === 'lifePath' && (
            <a
              className="ncard-bridge"
              href="https://t.me/number_day_bot"
              target="_blank"
              rel="noopener"
            >
              ✨ А как твоё число проявится именно сегодня — смотри в Числе дня в боте →
            </a>
          )}
        </div>
      )}
    </div>
  )
}