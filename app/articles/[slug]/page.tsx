import Link from 'next/link'
import { getArticle, getArticles } from '../../../lib/articles'
import { notFound } from 'next/navigation'

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

  return (
    <main className="min-h-screen bg-[#0f0a1e] text-white">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-purple-400 hover:text-purple-300 text-sm mb-10 block">
          ← Все статьи
        </Link>

        {article.publishedAt && (
          <p className="text-gray-500 text-sm mb-4">
            {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
          </p>
        )}

        <h1 className="text-4xl font-bold mb-10 leading-tight">{article.title}</h1>

        {/* Содержимое — наши собственные Markdown-файлы из репозитория (не пользовательский ввод), XSS-риска нет */}
        <div
          className="prose prose-invert prose-purple max-w-none text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />

        <div className="mt-16 pt-10 border-t border-white/10 text-center">
          <p className="text-gray-400 mb-6">Хочешь узнать свои числа?</p>
          <a
            href="https://t.me/number_day_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Открыть Цифромант в Telegram →
          </a>
        </div>
      </div>
    </main>
  )
}