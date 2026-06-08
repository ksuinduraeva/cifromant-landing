import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '../sanity/client'
import Starfield from './components/Starfield'

export const revalidate = 60

export default async function Home() {
  const articles = await getArticles().catch(() => [])

  return (
    <>
      <div className="starfield" id="starfield" aria-hidden="true" />

      <div className="page">

        {/* NAV */}
        <header className="nav">
          <div className="wrap nav-inner">
            <a href="#top" className="brand">
              <span className="moon-mark">☾</span>Цифромант
            </a>
            <nav className="nav-links">
              <a href="#about">О сервисе</a>
              <a href="#articles">Статьи</a>
              <a href="#cta">Telegram-бот</a>
            </nav>
            <a href="https://t.me/number_day_bot" className="nav-cta" target="_blank" rel="noopener">
              Открыть бот →
            </a>
          </div>
        </header>

        {/* HERO */}
        <section className="hero" id="top">
          <div className="hero-bg" />
          <div className="wrap">
            <div className="hero-copy">
              <span className="eyebrow dual center">Нумерология нового времени</span>
              <h1><span className="grad">Цифромант</span></h1>
              <p className="lede">
                Числа — это не мистика. Это <em>закономерности</em>, которые помогают понять себя.
              </p>
              <div className="hero-actions">
                <a href="https://t.me/number_day_bot" className="btn-gold" target="_blank" rel="noopener">
                  Узнать свои числа <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="scroll-hint">
            <span className="dot" /><span>листайте</span><span className="dot r" />
          </div>
        </section>

        {/* ARTICLES */}
        <section className="articles" id="articles">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow center">Про нумерологию</span>
              <h2>Разбираемся в числах<br />простым языком</h2>
              <p>Статьи о том, как работает нумерология, что значат числа и как применять их в обычной жизни.</p>
            </div>
            <div className="art-grid">
              {articles.length > 0 ? articles.slice(0, 3).map((a: any, i: number) => (
                <Link key={a._id} href={`/articles/${a.slug.current}`} className="acard">
                  <div className="thumb">
                    <span className="ring" />
                    <span className="ring ring2" />
                    <span className="moon-g">☾</span>
                    <span className="bignum">{(i % 9) + 1}</span>
                  </div>
                  <div className="body">
                    <div className="meta">
                      <span>Нумерология</span>
                      <span className="dot" />
                      <span className="date">
                        {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                      </span>
                    </div>
                    <h3>{a.title}</h3>
                    {a.description && <p>{a.description}</p>}
                    <span className="read">Читать статью <span className="arrow">→</span></span>
                  </div>
                </Link>
              )) : (
                <>
                  {[
                    { num: '7', tag: 'Основы', date: '', title: 'Как рассчитать число судьбы по дате рождения', desc: 'Пошаговая инструкция: складываем цифры даты рождения и узнаём ключевое число, которое описывает ваш жизненный путь.' },
                    { num: '3', tag: 'Характер', date: '', title: 'Что значит каждое число от 1 до 9', desc: 'Краткий путеводитель по характерам чисел: сильные стороны, слабые места и подходящие профессии для каждого.' },
                    { num: '2', tag: 'Отношения', date: '', title: 'Нумерология совместимости: миф или закономерность', desc: 'Разбираем, как числа описывают динамику пары и почему «несовместимых» сочетаний на самом деле не бывает.' },
                  ].map((a) => (
                    <div key={a.title} className="acard">
                      <div className="thumb">
                        <span className="ring" /><span className="ring ring2" />
                        <span className="moon-g">☾</span>
                        <span className="bignum">{a.num}</span>
                      </div>
                      <div className="body">
                        <div className="meta"><span>{a.tag}</span></div>
                        <h3>{a.title}</h3>
                        <p>{a.desc}</p>
                        <span className="read">Читать статью <span className="arrow">→</span></span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="art-foot">
              <Link href="/articles" className="btn-ghost">
                Все статьи <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        <div className="divider"><span className="ln" /><span className="moon-glyph">✦</span><span className="ln" /></div>

        {/* NUMBERS BAND */}
        <section className="numbers">
          <div className="wrap">
            <div className="numbers-copy">
              <span className="eyebrow dual">От 1 до 9</span>
              <h2>Девять чисел — девять граней вашего характера</h2>
              <p>В нумерологии любая дата, имя и даже сегодняшний день сводятся к одному из <strong>чисел от 1 до 9</strong>. Каждое несёт свой смысл: лидерство, гармонию, творчество, опору, свободу.</p>
              <p>Цифромант берёт эту систему и считает за вас — точно, бережно и понятным языком.</p>
            </div>
            <div className="num-rail">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <div key={n} className="num-cell"><span>{n}</span></div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider"><span className="ln" /><span className="moon-glyph">☾</span><span className="ln" /></div>

        {/* WHAT IS */}
        <section className="what" id="about">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow center">Что такое Цифромант</span>
              <h2>Личный нумеролог<br />в вашем Telegram</h2>
              <p>Введите дату рождения — и получите расчёт, который объясняет ваши сильные стороны, ритм дней и отношения с близкими.</p>
            </div>
            <div className="feature-grid">
              <div className="fcard">
                <div className="crest">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                    <circle cx="24" cy="24" r="18" />
                    <circle cx="24" cy="24" r="11.5" strokeDasharray="2 3" opacity="0.55" />
                    <text x="24" y="30.5" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="18" fontWeight="600" fill="currentColor" stroke="none">7</text>
                    <circle cx="24" cy="6" r="1.4" fill="currentColor" stroke="none" />
                    <circle cx="42" cy="24" r="1.4" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <h3>Мои числа</h3>
                <p>Число судьбы, число души и характера — рассчитанные по дате рождения и имени. Понятная расшифровка без эзотерического тумана.</p>
              </div>
              <div className="fcard">
                <div className="crest">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M32 7 a18 18 0 1 0 0 34 a14 14 0 1 1 0 -34 z" />
                    <path d="M13 13 l1.5 3.2 3.2 1.5 -3.2 1.5 -1.5 3.2 -1.5 -3.2 -3.2 -1.5 3.2 -1.5 z" fill="currentColor" stroke="none" />
                    <circle cx="16" cy="35" r="1.3" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <h3>Прогноз на каждый день</h3>
                <p>Персональное число дня и мягкая подсказка: где сегодня стоит проявить себя, а где — притормозить и прислушаться.</p>
              </div>
              <div className="fcard">
                <div className="crest">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="24" r="12" />
                    <circle cx="30" cy="24" r="12" />
                    <path d="M24 16.5 l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4 z" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <h3>Совместимость</h3>
                <p>Сравните свои числа с числами партнёра, друга или коллеги. Узнайте, что вас объединяет и в чём вы дополняете друг друга.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="divider"><span className="ln" /><span className="moon-glyph">✦</span><span className="ln" /></div>

        {/* CTA */}
        <section className="cta" id="cta">
          <Image className="cmoon" src="/cta-moon.png" alt="" width={680} height={680} aria-hidden="true" />
          <div className="wrap">
            <div className="cta-inner">
              <span className="eyebrow center">Это бесплатно</span>
              <h2>Узнай свои числа <span className="grad">прямо сейчас</span></h2>
              <p>Ответьте на пару вопросов в Telegram-боте — и получите свой нумерологический разбор за минуту.</p>
              <a href="https://t.me/number_day_bot" className="btn-gold" target="_blank" rel="noopener">
                Открыть Цифромант в Telegram <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="wrap">
            <div className="foot-top">
              <div className="foot-brand">
                <a href="#top" className="brand"><span className="moon-mark">☾</span>Цифромант</a>
                <p>AI-сервис по нумерологии. Помогаем понять себя и близких через числа — бережно, без мистики и давления.</p>
              </div>
              <div className="foot-cols">
                <div className="foot-col">
                  <h4>Сервис</h4>
                  <a href="#about">О Цифроманте</a>
                  <Link href="/articles">Статьи</Link>
                  <a href="https://t.me/number_day_bot" target="_blank" rel="noopener">Telegram-бот</a>
                </div>
                <div className="foot-col">
                  <h4>Документы</h4>
                  <a href="#">Политика конфиденциальности</a>
                  <a href="#">Публичная оферта</a>
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
    </>
  )
}