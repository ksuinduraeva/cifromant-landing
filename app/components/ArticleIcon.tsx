// Тематические линейные иконки для карточек статей — в стиле сайта
// (тонкая золотая графика: луна, кольца, орбиты, искры).
// Какую иконку показывать, задаётся в frontmatter статьи полем `icon`.

const S = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const ICONS: Record<string, React.ReactNode> = {
  // Число судьбы / жизненный путь — полумесяц и звезда (путеводная)
  destiny: (
    <svg {...S}>
      <path d="M42 9 a23 23 0 1 0 0 46 a17.5 17.5 0 1 1 0 -46 z" />
      <path d="M17 15 l1.7 3.8 3.8 1.7 -3.8 1.7 -1.7 3.8 -1.7 -3.8 -3.8 -1.7 3.8 -1.7 z" fill="currentColor" stroke="none" />
      <circle cx="19" cy="45" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Совместимость — два пересекающихся круга и искра
  compatibility: (
    <svg {...S}>
      <circle cx="25" cy="34" r="15" />
      <circle cx="39" cy="34" r="15" />
      <path d="M32 19 l1.8 4 4 1.8 -4 1.8 -1.8 4 -1.8 -4 -4 -1.8 4 -1.8 z" fill="currentColor" stroke="none" />
      <circle cx="13" cy="51" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="51" cy="51" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Числа 1–9 / система — концентрические орбиты с центром
  numbers: (
    <svg {...S}>
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="13" strokeDasharray="2 3" opacity="0.6" />
      <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
      <circle cx="32" cy="10" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="54" cy="32" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Число души — круг с внутренним светом
  soul: (
    <svg {...S}>
      <circle cx="32" cy="32" r="20" />
      <path d="M32 14 a18 18 0 0 1 0 36 z" fill="currentColor" opacity="0.18" stroke="none" />
      <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
      <path d="M48 16 l1.3 2.9 2.9 1.3 -2.9 1.3 -1.3 2.9 -1.3 -2.9 -2.9 -1.3 2.9 -1.3 z" fill="currentColor" stroke="none" />
    </svg>
  ),
  // Персональный год / прогноз — циферблат со стрелками
  year: (
    <svg {...S}>
      <circle cx="32" cy="32" r="21" />
      <path d="M32 32 L32 19" />
      <path d="M32 32 L42 37" />
      <path d="M32 13 L32 16" />
      <path d="M51 32 L48 32" />
      <path d="M32 51 L32 48" />
      <path d="M13 32 L16 32" />
    </svg>
  ),
  // По умолчанию — звезда с искрами
  default: (
    <svg {...S}>
      <path d="M32 12 l3.2 12.8 12.8 3.2 -12.8 3.2 -3.2 12.8 -3.2 -12.8 -12.8 -3.2 12.8 -3.2 z" />
      <circle cx="50" cy="16" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="49" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
}

export default function ArticleIcon({ name }: { name?: string }) {
  const icon = (name && ICONS[name]) || ICONS.default
  return <span className="acard-icon">{icon}</span>
}