import type { MetadataRoute } from 'next'

// Статический экспорт: запекаем robots.txt один раз при сборке.
export const dynamic = 'force-static'

// robots.txt: разрешаем индексировать весь сайт и указываем карту сайта,
// чтобы Яндекс и Google быстрее находили все статьи.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://cifromant.ru/sitemap.xml',
  }
}
