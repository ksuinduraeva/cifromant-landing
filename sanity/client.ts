import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'bgot2t5a',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function getArticles() {
  return client.fetch(`*[_type == "article"] | order(publishedAt desc) {
    _id, title, slug, description, publishedAt
  }`)
}

export async function getArticle(slug: string) {
  return client.fetch(`*[_type == "article" && slug.current == $slug][0] {
    _id, title, slug, description, publishedAt, body
  }`, { slug })
}