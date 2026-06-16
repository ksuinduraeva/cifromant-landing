import Link from 'next/link'
import { getArticle, getArticles } from '../../../lib/articles'
import { notFound } from 'next/navigation'
import Starfield from '../../components/Starfield'
import Reveal from '../../components/Reveal'

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} — Цифромант`,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

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

        <article className="article">
          <div className="wrap-narrow">
            <Link href="/articles" className="back-link">
              <span className="arrow">←</span> Все статьи
            </Link>

            <div className="article-head reveal">
              <span className="eyebrow">Нумерология</span>
              <h1>{article.title}</h1>
              {date && <p className="article-date">{date}</p>}
            </div>

            {/* Содержимое — наши собственные Markdown-файлы из репозитория (не пользовательский ввод), XSS-риска нет */}
            <div
              className="article-body reveal"
              dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
            />

            <div className="article-cta reveal">
              <p>Хочешь узнать свои числа?</p>
              <a href="https://t.me/number_day_bot" className="btn-gold" target="_blank" rel="noopener">
                Открыть Цифромант в Telegram <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <Starfield />
      <Reveal />
    </>
  )
}