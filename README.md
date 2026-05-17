# MVP Site

Базовый фронтенд-проект для быстрого запуска сайта в интернете.

Проект сделан на Vite + React. Сейчас внутри нейтральная заглушка и структура, которую можно быстро наполнить конкретной идеей, текстами, блоками и визуальным стилем.

## Быстрый старт

```bash
npm install
npm run dev
```

Локальный адрес обычно будет таким:

```text
http://localhost:5173
```

Если старый npm на Windows ругается на папку в `AppData`, можно поставить локальные папки npm внутри проекта:

```powershell
$env:npm_config_prefix=(Join-Path (Get-Location) '.npm-global')
$env:npm_config_cache=(Join-Path (Get-Location) '.npm-cache')
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Результат сборки появится в папке `dist`.

## Предпросмотр сборки

```bash
npm run preview
```

## Структура

```text
.
├── docs/
│   ├── content-brief.md
│   └── deployment.md
├── src/
│   ├── data/
│   │   └── siteContent.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Где менять контент

Основные тексты лежат в `src/data/siteContent.js`.

Когда появится идея сайта, можно будет заменить нейтральные блоки на реальные: оффер, описание продукта или услуги, преимущества, цены, отзывы, контакты, FAQ и так далее.

## Cloudflare Pages

Текущий Pages-проект:

```text
https://mvp-site-3a4.pages.dev/
```

Настройки для деплоя:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
```

Ручной деплой через Wrangler:

```bash
npm run build
npx wrangler@latest pages deploy dist --project-name mvp-site --branch main
```

Подробная инструкция лежит в `docs/deployment.md`.
