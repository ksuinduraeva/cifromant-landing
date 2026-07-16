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
  const url = `/articles/${slug}/`
  return {
    title: `${article.title} — Цифромант`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${article.title} — Цифромант`,
      description: article.description,
      url,
      publishedTime: article.publishedAt || undefined,
      images: article.cover ? [article.cover] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.cover ? `https://cifromant.ru${article.cover}` : undefined,
    datePublished: article.publishedAt || undefined,
    dateModified: article.publishedAt || undefined,
    inLanguage: 'ru-RU',
    mainEntityOfPage: `https://cifromant.ru/articles/${slug}/`,
    author: { '@type': 'Organization', name: 'Цифромант', url: 'https://cifromant.ru' },
    publisher: {
      '@type': 'Organization',
      name: 'Цифромант',
      url: 'https://cifromant.ru',
    },
  }

  return (
    <>
      {/* Schema.org разметка статьи — для расширенных сниппетов в поиске */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="starfield" id="starfield" aria-hidden="true" />

      {article.cover && (
        <div
          className="article-bg"
          style={{ backgroundImage: `url(${article.cover})` }}
          aria-hidden="true"
        />
      )}

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
              <span className="eyebrow dual">Нумерология</span>
              <h1>{article.title}</h1>
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