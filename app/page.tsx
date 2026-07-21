import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '../lib/articles'
import Starfield from './components/Starfield'
import Reveal from './components/Reveal'
import NumberRail from './components/NumberRail'
import ArticleIcon from './components/ArticleIcon'

export default function Home() {
  const articles = getArticles()

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
              <Link href="/calc">Калькулятор</Link>
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
            <div className="hero-copy reveal">
              <span className="eyebrow dual center">Нумеролог с искусственным интеллектом</span>
              <h1><span className="grad">Цифромант</span></h1>
              <p className="lede">
                Числа — это не мистика. Это <em>закономерности</em>, которые помогают понять себя.
              </p>
              <div className="hero-actions">
                <Link href="/calc" className="btn-gold">
                  Рассчитать свои числа <span className="arrow">→</span>
                </Link>
                <a href="https://t.me/number_day_bot" className="btn-ghost" target="_blank" rel="noopener">
                  Открыть бот
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLES */}
        <section className="articles" id="articles">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow center">Про нумерологию</span>
              <h2>Разбираемся в числах<br />простым языком</h2>
              <p>Статьи о том, как работает нумерология, что значат числа и как применять их в обычной жизни.</p>
            </div>
            <div className="art-grid">
              {articles.length > 0 ? articles.slice(0, 3).map((a: any) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="acard reveal">
                  <div className={`thumb${a.cover ? ' has-cover' : ''}`}>
                    {a.cover ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="cover" src={a.cover} alt="" loading="lazy" />
                        <span className="cover-veil" />
                        <span className="moon-g">☾</span>
                      </>
                    ) : (
                      <>
                        <span className="ring" />
                        <span className="ring ring2" />
                        <span className="moon-g">☾</span>
                        <ArticleIcon name={a.icon} />
                      </>
                    )}
                  </div>
                  <div className="body">
                    <div className="meta">
                      <span>Нумерология</span>
                    </div>
                    <h3>{a.title}</h3>
                    {a.description && <p>{a.description}</p>}
                    <span className="read">Читать статью <span className="arrow">→</span></span>
                  </div>
                </Link>
              )) : (
                <>
                  {[
                    { num: '7', tag: 'Основы', date: '', title: 'Как рассчитать число судьбы по дате рождения', desc: 'Пошаговая инструкция: складываем цифры даты рождения и узнаём ключевое число, которое описывает твой характер.' },
                    { num: '3', tag: 'Характер', date: '', title: 'Что значит каждое число от 1 до 9', desc: 'Краткий путеводитель по характерам чисел: сильные стороны, слабые места и подходящие профессии для каждого.' },
                    { num: '2', tag: 'Отношения', date: '', title: 'Нумерология совместимости: миф или закономерность', desc: 'Разбираем, как числа описывают динамику пары и почему «несовместимых» сочетаний на самом деле не бывает.' },
                  ].map((a) => (
                    <div key={a.title} className="acard reveal">
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
            <div className="art-foot reveal">
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
            <div className="numbers-copy reveal">
              <span className="eyebrow dual">От 1 до 9</span>
              <h2>Девять чисел — девять граней твоего характера</h2>
              <p>В нумерологии любая дата, имя и даже сегодняшний день сводятся к одному из <strong>чисел от 1 до 9</strong>. Каждое несёт свой смысл: лидерство, гармонию, творчество, опору, свободу.</p>
              <p>Цифромант берёт эту систему и считает за тебя — точно, бережно и понятным языком.</p>
            </div>
            <NumberRail />
          </div>
        </section>

        <div className="divider"><span className="ln" /><span className="moon-glyph">☾</span><span className="ln" /></div>

        {/* WHAT IS */}
        <section className="what" id="about">
          <div className="wrap">
            <div className="section-head reveal">
              <span className="eyebrow center">Что такое Цифромант</span>
              <h2>Личный нумеролог<br />в твоём Telegram</h2>
              <p>Введи дату рождения — и получи расчёт, который объясняет твои сильные стороны, ритм дней и отношения с близкими.</p>
            </div>
            <div className="feature-grid">
              <div className="fcard reveal">
                <div className="fcard-cover">
                  <img src="/features/moi-chisla.jpg" alt="" loading="lazy" />
                  <span className="fcard-veil" />
                </div>
                <h3>Мои числа</h3>
                <p>Число судьбы (оно же число жизненного пути), число души и число самовыражения — рассчитанные по дате рождения и имени. Понятная расшифровка без эзотерического тумана.</p>
              </div>
              <div className="fcard reveal">
                <div className="fcard-cover">
                  <img src="/features/prognoz.jpg" alt="" loading="lazy" />
                  <span className="fcard-veil" />
                </div>
                <h3>Прогноз на каждый день</h3>
                <p>Каждое утро — персональный прогноз под твои числа: где сегодня проявить себя, а где притормозить, плюс разбор по сферам — дела, отношения, состояние. Как личный нумеролог рядом каждый день — за 299 ₽/мес вместо 3 000 ₽ за разовый разбор.</p>
              </div>
              <div className="fcard reveal">
                <div className="fcard-cover">
                  <img src="/features/sovmestimost.jpg" alt="" loading="lazy" />
                  <span className="fcard-veil" />
                </div>
                <h3>Совместимость</h3>
                <p>Сравни свои числа с числами партнёра, друга или коллеги. Узнай, что вас объединяет и в чём вы дополняете друг друга.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="divider"><span className="ln" /><span className="moon-glyph">✦</span><span className="ln" /></div>

        {/* CTA */}
        <section className="cta" id="cta">
          <Image className="cmoon" src="/cta-moon.png" alt="" width={680} height={680} aria-hidden="true" />
          <div className="wrap">
            <div className="cta-inner reveal">
              <span className="eyebrow center">Это бесплатно</span>
              <h2>Узнай свои числа <span className="grad">прямо сейчас</span></h2>
              <p>Ответь на пару вопросов в Telegram-боте — и получи свой нумерологический разбор за минуту.</p>
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
                <p>Нумеролог с искусственным интеллектом. Помогаем понять себя и близких через числа — бережно, без мистики и давления.</p>
              </div>
              <div className="foot-cols">
                <div className="foot-col">
                  <h4>Сервис</h4>
                  <a href="#about">О Цифроманте</a>
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