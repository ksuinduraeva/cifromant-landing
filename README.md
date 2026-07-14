# Цифромант — лендинг (cifromant.ru)

Сайт нумерологического Telegram-бота [**Цифромант**](https://t.me/number_day_bot). Задача сайта — приводить трафик из поиска (SEO-статьи про нумерологию) и конвертировать читателей в пользователей бота.

📖 **Полный контекст проекта — в [`CLAUDE.md`](./CLAUDE.md)**: стек, структура, дизайн, план проекта по фазам (общий для бота и лендинга), правила контента.

## Стек

- **Next.js 16** (App Router), **статический экспорт** (`output: 'export'`) — для SEO
- **TypeScript** + **Tailwind CSS**
- Статьи — Markdown-файлы в `content/articles/*.md`, без CMS

## Разработка

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # статика в out/
```

## Деплой

Пуш в `main` → **GitHub Actions** собирает `out/` и заливает по FTP на **Timeweb** (российский хостинг — сайт открывается без VPN).

⚠️ FTP-шаг может **молча упасть** (например, если слетел пароль — так уже было). После пуша проверить, что прод отвечает:

```bash
curl -I https://cifromant.ru
```

При сомнении — статус сборки в GitHub → Actions.

## Как добавить статью

1. Создать `content/articles/<slug>.md` (имя файла = URL статьи).
2. Frontmatter — строковые значения **обязательно в кавычках**, иначе двоеточие в тексте ломает YAML:
   ```yaml
   ---
   title: "Заголовок статьи"
   description: "Краткое описание для SEO."
   publishedAt: "2026-06-03"
   ---
   ```
3. Текст в Markdown. Тон — на «ты», без мистики. Термин — «число судьбы».
4. Пуш в `main` → сайт обновится автоматически.

Подробные правила (обложки, SEO-требования, перелинковка) — в [`CLAUDE.md`](./CLAUDE.md) и [`docs/seo-wordstat-content-plan.md`](./docs/seo-wordstat-content-plan.md).

## Документация

| Файл | Что внутри |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Главный контекст + план проекта по фазам (зеркало с ботом) |
| [`docs/bot-context.md`](./docs/bot-context.md) | Как устроен бот: числа, прогнозы, подписка |
| [`docs/seo-wordstat-content-plan.md`](./docs/seo-wordstat-content-plan.md) | Контент-план: 20 статей, данные Wordstat |
| [`docs/promotion-plan.md`](./docs/promotion-plan.md) | План раскрутки по каналам (зеркало с ботом) |