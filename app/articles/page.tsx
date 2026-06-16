import Link from 'next/link'
import { getArticles } from '../../lib/articles'
import Starfield from '../components/Starfield'
import Reveal from '../components/Reveal'
import ArticleIcon from '../components/ArticleIcon'

export const metadata = {
  title: 'Статьи о нумерологии — Цифромант',
  description: 'Статьи о том, как работает нумерология, что значат числа и как применять их в обычной жизни — простым языком.',
}

export default function ArticlesPage() {
  const articles = getArticles()

  return (
    <>
      <div className="starfield" id="starfield" aria-hidden="true" />

      <div className="page">
        <header className="nav">
          <div className="wrap nav-inner">
            <a href="/" className="brand">
              <span className="moon-mark">☾</span>Цифромант
            </a>
            <a href="https://t.me/number_day_bot" className="nav-cta" target="_blank" rel="noopener">
              Открыть бот →
            </a>
          </div>
        </header>

        <section className="article">
          <div className="wrap">
            <div className="article-head reveal" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 64px' }}>
              <span className="eyebrow center">Про нумерологию</span>
              <h1>Статьи о числах<br />простым языком</h1>
            </div>

            {articles.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-dim)' }}>Статьи скоро появятся.</p>
            ) : (
              <div className="art-grid">
                {articles.map((a) => (
                  <Link key={a.slug} href={`/articles/${a.slug}`} className="acard reveal">
                    <div className="thumb">
                      <span className="ring" />
                      <span className="ring ring2" />
                      <span className="moon-g">☾</span>
                      <ArticleIcon name={a.icon} />
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
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <Starfield />
      <Reveal />
    </>
  )
}