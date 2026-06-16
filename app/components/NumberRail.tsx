'use client'

import { useState } from 'react'

type NumInfo = { n: number; title: string; desc: string }

// Краткие значения чисел — те же, что в боте и статьях.
// Лежат прямо в разметке, поэтому индексируются поисковиком.
const NUMBERS: NumInfo[] = [
  { n: 1, title: 'Лидер', desc: 'Самостоятельность, инициатива, воля идти первым. Сила — вести за собой; вызов — научиться слышать других.' },
  { n: 2, title: 'Дипломат', desc: 'Чуткость, гармония, партнёрство. Сила — создавать тепло и согласие; вызов — не растворяться в других.' },
  { n: 3, title: 'Вдохновитель', desc: 'Творчество, общение, лёгкость. Сила — заряжать радостью; вызов — доводить начатое до конца.' },
  { n: 4, title: 'Опора', desc: 'Порядок, надёжность, труд. Сила — строить прочное и стабильное; вызов — впускать спонтанность.' },
  { n: 5, title: 'Свобода', desc: 'Перемены, движение, любопытство. Сила — гибкость и драйв; вызов — постоянство и доведение до конца.' },
  { n: 6, title: 'Хранитель', desc: 'Забота, дом, ответственность. Сила — создавать уют и поддержку; вызов — не брать всё на себя.' },
  { n: 7, title: 'Мыслитель', desc: 'Глубина, анализ, поиск смысла. Сила — видеть суть вещей; вызов — выходить из головы к людям.' },
  { n: 8, title: 'Созидатель', desc: 'Масштаб, цель, материальный успех. Сила — добиваться задуманного; вызов — баланс между делом и душой.' },
  { n: 9, title: 'Мудрец', desc: 'Великодушие, идеализм, отдача. Сила — вдохновлять и помогать; вызов — заботиться и о себе тоже.' },
]

export default function NumberRail() {
  const [active, setActive] = useState<number | null>(null)
  const current = NUMBERS.find((x) => x.n === active) ?? null

  return (
    <div className="num-rail-wrap reveal">
      <div className="num-rail" role="group" aria-label="Числа от 1 до 9">
        {NUMBERS.map((item) => (
          <button
            key={item.n}
            type="button"
            className={`num-cell${active === item.n ? ' is-active' : ''}`}
            aria-pressed={active === item.n}
            aria-label={`Число ${item.n} — ${item.title}`}
            onClick={() => setActive((prev) => (prev === item.n ? null : item.n))}
          >
            <span>{item.n}</span>
          </button>
        ))}
      </div>

      {current && (
        <div className="num-panel" aria-live="polite">
          <div className="num-panel-head">
            <span className="num-panel-n">{current.n}</span>
            <h4>{current.title}</h4>
          </div>
          <p>{current.desc}</p>
        </div>
      )}
    </div>
  )
}