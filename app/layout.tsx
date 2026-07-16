import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'
import YandexMetrica from './components/YandexMetrica'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cifromant.ru'),
  title: 'Цифромант — нумерология, которая помогает понять себя',
  description: 'Цифромант — AI-сервис по нумерологии. Узнай свои числа, прогноз на каждый день и совместимость. Статьи о нумерологии простым языком.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Цифромант',
    locale: 'ru_RU',
    title: 'Цифромант — нумерология, которая помогает понять себя',
    description: 'Цифромант — AI-сервис по нумерологии. Узнай свои числа, прогноз на каждый день и совместимость. Статьи о нумерологии простым языком.',
    url: 'https://cifromant.ru',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        {children}
        <YandexMetrica />
      </body>
    </html>
  )
}