import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

// Статьи хранятся как Markdown-файлы в content/articles/.
// Имя файла (без .md) — это slug страницы.
// Frontmatter: title, description, publishedAt.
const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles')

export type ArticleMeta = {
  slug: string
  title: string
  description: string
  publishedAt: string
  icon: string
  cover: string
}

export type Article = ArticleMeta & {
  bodyHtml: string
}

function readSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

function readArticle(slug: string): Article | null {
  const file = path.join(ARTICLES_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : '',
    icon: data.icon ?? '',
    cover: data.cover ?? '',
    bodyHtml: marked.parse(content, { async: false }) as string,
  }
}

// Список статей (без тела), отсортированный по дате — свежие сверху.
export function getArticles(): ArticleMeta[] {
  return readSlugs()
    .map(readArticle)
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map(({ slug, title, description, publishedAt, icon, cover }) => ({ slug, title, description, publishedAt, icon, cover }))
}

// Одна статья целиком (с готовым HTML тела).
export function getArticle(slug: string): Article | null {
  return readArticle(slug)
}