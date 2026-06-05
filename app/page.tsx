import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0a1e] text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <p className="text-purple-400 text-sm tracking-widest uppercase mb-4">Нумерология нового поколения</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Цифро<span className="text-purple-400">мант</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-xl mb-10">
          Числа — это не мистика. Это закономерности, которые помогают понять себя,
          свои сильные стороны и текущий период жизни.
        </p>
        <a
          href="https://t.me/number_day_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-500 text-white text-lg font-semibold px-10 py-4 rounded-full transition-colors"
        >
          Узнать свои числа →
        </a>
      </section>

      {/* Что умеет бот */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Что делает Цифромант</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { emoji: '🔢', title: 'Считает твои числа', text: 'Число дня рождения, число жизненного пути, самовыражения и души — по дате рождения и имени.' },
            { emoji: '📅', title: 'Прогноз на каждый день', text: 'Персональный AI-прогноз каждое утро в 8:00. Учитывает именно твои числа, а не просто дату.' },
            { emoji: '💑', title: 'Совместимость', text: 'Анализ пары по числам обоих партнёров — характеры, притяжение, трения и над чем работать.' },
          ].map(({ emoji, title, text }) => (
            <div key={title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-4xl mb-4">{emoji}</div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 py-24 bg-purple-900/20">
        <h2 className="text-3xl font-bold mb-6">Готова узнать свои числа?</h2>
        <p className="text-gray-300 mb-10 max-w-md mx-auto">
          Подписка от 29 ₽ в день. Первый расчёт — бесплатно.
        </p>
        <a
          href="https://t.me/number_day_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-500 text-white text-lg font-semibold px-10 py-4 rounded-full transition-colors"
        >
          Открыть в Telegram →
        </a>
      </section>

      {/* Статьи */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Про нумерологию</h2>
          <Link href="/articles" className="text-purple-400 hover:text-purple-300 transition-colors">
            Все статьи →
          </Link>
        </div>
        <p className="text-gray-400">Статьи появятся здесь после публикации в редакторе.</p>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-10 border-t border-white/10">
        © 2026 Цифромант ·{' '}
        <a href="https://t.me/number_day_bot" className="hover:text-purple-400 transition-colors">
          Telegram
        </a>
      </footer>
    </main>
  )
}