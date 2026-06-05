import Link from 'next/link'
import { getArticles } from '../../sanity/client'

export const revalidate = 60

export default async function ArticlesPage() {
  const articles = await getArticles().catch(() => [])

  return (
    <main className="min-h-screen bg-[#0f0a1e] text-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm mb-10 block">
          ← На главную
        </Link>
        <h1 className="text-4xl font-bold mb-16">Про нумерологию</h1>

        {articles.length === 0 ? (
          <p className="text-gray-400">Статьи скоро появятся.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {articles.map((a: any) => (
              <Link
                key={a._id}
                href={`/articles/${a.slug.current}`}
                className="group border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <p className="text-gray-500 text-sm mb-2">
                  {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('ru-RU') : ''}
                </p>
                <h2 className="text-xl font-semibold group-hover:text-purple-400 transition-colors mb-2">
                  {a.title}
                </h2>
                {a.description && (
                  <p className="text-gray-400 text-sm leading-relaxed">{a.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}