import Link from 'next/link'
import Starfield from '../components/Starfield'
import Reveal from '../components/Reveal'
import Calculator from '../components/Calculator'

export const metadata = {
  title: 'Рассчитать число судьбы, души и характер по дате рождения — Цифромант',
  description:
    'Бесплатный нумерологический калькулятор: рассчитай число судьбы, число дня рождения, число души и самовыражения по дате рождения и имени. С расшифровкой простым языком, без регистрации.',
  alternates: { canonical: '/calc/' },
  openGraph: {
    title: 'Рассчитать свои числа по дате рождения — Цифромант',
    description:
      'Число судьбы, дня рождения, души и самовыражения — с расшифровкой характера. Бесплатно и без регистрации.',
    url: 'https://cifromant.ru/calc/',
    type: 'website',
  },
}

// JSON-LD: калькулятор как веб-приложение (сигнал уникальности для Яндекса)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Нумерологический калькулятор Цифромант',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  url: 'https://cifromant.ru/calc/',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'RUB' },
  description:
    'Рассчитывает число судьбы, число дня рождения, число души и число самовыражения по дате рождения и имени с расшифровкой.',
}

export default function CalcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="starfield" id="starfield" aria-hidden="true" />

      <div className="page">
        {/* NAV */}
        <header className="nav">
          <div className="wrap nav-inner">
            <a href="/" className="brand">
              <span className="moon-mark">☾</span>Цифромант
            </a>
            <nav className="nav-links">
              <Link href="/#about">О сервисе</Link>
              <Link href="/articles">Статьи</Link>
              <Link href="/#cta">Telegram-бот</Link>
            </nav>
            <a href="https://t.me/number_day_bot" className="nav-cta" target="_blank" rel="noopener">
              Открыть бот →
            </a>
          </div>
        </header>

        {/* CALC HEADER */}
        <section className="calc-hero">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow center">Бесплатно и без регистрации</span>
              <h2>Рассчитай свои числа</h2>
              <p>
                Введи дату рождения — и узнай число судьбы и число дня рождения с расшифровкой
                характера. Добавишь имя — раскроются число души и самовыражения.
              </p>
            </div>

            <div className="calc-wrap reveal">
              <Calculator />
            </div>
          </div>
        </section>

        {/* А ЧТО ДАЛЬШЕ */}
        <section className="calc-next">
          <div className="wrap">
            <div className="calc-next-inner reveal">
              <span className="eyebrow center">А что дальше?</span>
              <h2>Это только начало</h2>
              <p>
                Калькулятор показал, <strong>какой ты в целом</strong> — это не меняется. А вот каждый
                день у тебя свой. В Telegram-боте Цифромант оживает и работает как личный нумеролог с
                искусственным интеллектом:
              </p>

              <div className="calc-compare">
                <div className="calc-compare-col here">
                  <span className="calc-compare-cap">Здесь, на сайте</span>
                  <ul>
                    <li>Твои числа — судьбы, дня рождения, души</li>
                    <li>Описание характера</li>
                    <li>Один раз посчитал — и всё</li>
                  </ul>
                </div>
                <div className="calc-compare-col bot">
                  <span className="calc-compare-cap">Только в боте</span>
                  <ul>
                    <li>🔮 Персональный прогноз <strong>каждое утро</strong> под твои числа</li>
                    <li>🌱 Разбор по сферам: дела, отношения, состояние</li>
                    <li>📆 Прогнозы на месяц и год</li>
                    <li>💑 Совместимость с любым человеком</li>
                  </ul>
                </div>
              </div>

              <p className="calc-next-price">
                Личный нумеролог рядом каждый день — 299 ₽/мес вместо 3 000 ₽ за разовый разбор.
              </p>
              <a href="https://t.me/number_day_bot" className="btn-gold" target="_blank" rel="noopener">
                Получить прогноз в боте <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="wrap">
            <div className="foot-top">
              <div className="foot-brand">
                <a href="/" className="brand"><span className="moon-mark">☾</span>Цифромант</a>
                <p>Нумеролог с искусственным интеллектом. Помогаем понять себя и близких через числа — бережно, без мистики и давления.</p>
              </div>
              <div className="foot-cols">
                <div className="foot-col">
                  <h4>Сервис</h4>
                  <Link href="/#about">О Цифроманте</Link>
                  <Link href="/articles">Статьи</Link>
                  <a href="https://t.me/number_day_bot" target="_blank" rel="noopener">Telegram-бот</a>
                </div>
                <div className="foot-col">
                  <h4>Мы в соцсетях</h4>
                  <a href="https://t.me/cifromant_ru" target="_blank" rel="noopener">Канал в Telegram</a>
                  <a href="https://max.ru/channel_cifromant" target="_blank" rel="noopener">Канал в Максе</a>
                </div>
                <div className="foot-col">
                  <h4>Документы</h4>
                  <Link href="/privacy">Политика конфиденциальности</Link>
                  <Link href="/oferta">Публичная оферта</Link>
                </div>
              </div>
            </div>
            <div className="foot-bottom">
              <p>© 2026 Цифромант. Все права защищены.</p>
              <a href="https://t.me/number_day_bot" className="tg-link" target="_blank" rel="noopener">
                <span className="spark">✦</span> @number_day_bot
              </a>
            </div>
          </div>
        </footer>
      </div>

      <Starfield />
      <Reveal />
    </>
  )
}