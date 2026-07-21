import type { MetadataRoute } from 'next'
import { getArticles } from '../lib/articles'

// Статический экспорт: запекаем карту один раз при сборке.
export const dynamic = 'force-static'

// Базовый адрес сайта — все ссылки в карте абсолютные.
const BASE = 'https://cifromant.ru'

// Карта сайта строится автоматически из списка статей (content/articles/*.md):
// добавили новую статью — она сама попадёт в sitemap при следующей сборке.
// URL со слешем на конце — в соответствии с trailingSlash: true в next.config.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/calc/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/articles/`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/oferta/`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/privacy/`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const articleRoutes: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: `${BASE}/articles/${a.slug}/`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : undefined,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}