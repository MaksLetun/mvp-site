# Деплой сайта

Эта инструкция рассчитана на самый простой и дешевый MVP: GitHub + Cloudflare Pages.

## 1. Подготовить GitHub

Репозиторий:

```text
https://github.com/MaksLetun/mvp-site.git
```

После того как проект будет готов локально:

```bash
git add .
git commit -m "Initial MVP site"
git push -u origin main
```

Если Git попросит авторизацию, используй GitHub login/token или GitHub CLI.

## 2. Зарегистрироваться в Cloudflare

Нужно:

- email;
- пароль;
- подтверждение email.

Для Cloudflare Pages free обычно не нужна банковская карта. Карта понадобится, если покупать домен или включать платные функции.

## 3. Создать проект в Cloudflare Pages

1. Открой Cloudflare Dashboard.
2. Перейди в `Workers & Pages`.
3. Нажми `Create application`.
4. Выбери `Pages`.
5. Выбери `Connect to Git`.
6. Подключи GitHub.
7. Дай доступ к репозиторию `MaksLetun/mvp-site`.
8. Выбери этот репозиторий.

## 4. Указать настройки сборки

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
```

После деплоя Cloudflare выдаст адрес вида:

```text
https://mvp-site.pages.dev
```

## 5. Как обновлять сайт

Обычный цикл:

```bash
npm run dev
git add .
git commit -m "Update site content"
git push
```

После каждого `git push` Cloudflare Pages автоматически пересоберет и обновит сайт.

## 6. Домен позже

Когда понадобится красивый адрес:

1. Купи домен у Cloudflare Registrar, Porkbun, Namecheap или другого регистратора.
2. В Cloudflare Pages открой проект.
3. Перейди в `Custom domains`.
4. Добавь домен.
5. Следуй подсказкам Cloudflare по DNS.
6. Дождись применения DNS и выпуска HTTPS-сертификата.

Важно: при покупке домена смотри не только цену первого года, но и цену продления.
