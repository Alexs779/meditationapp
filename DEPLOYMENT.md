# Деплой Telegram Mini App

## Шаг 1: Подготовка Git репозитория

```bash
git init
git add .
git commit -m "Initial commit: Meditation App"
git branch -M main
```

Создайте репозиторий на GitHub и выполните:
```bash
git remote add origin https://github.com/YOUR_USERNAME/meditation-app.git
git push -u origin main
```

## Шаг 2: Деплой на Vercel

### Вариант A: Через Vercel CLI (рекомендуется)

1. Установите Vercel CLI:
```bash
npm install -g vercel
```

2. Логин:
```bash
vercel login
```

3. Деплой:
```bash
npx expo export:web
vercel
```

Следуйте инструкциям:
- Link to existing project? **No**
- Project name? **meditation-app**
- Directory? **./dist**

### Вариант B: Через Vercel Dashboard

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "Add New" → "Project"
3. Импортируйте ваш GitHub репозиторий
4. Настройки:
   - **Build Command**: `npx expo export:web`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Шаг 3: Создание Telegram бота

1. Найдите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте `/newbot`
3. Введите название: `Meditation App Bot`
4. Введите username: `meditation_app_bot` (или любой доступный)
5. Сохраните токен бота

## Шаг 4: Настройка Mini App

В чате с BotFather:

```
/newapp
```

Выберите вашего бота и заполните:
- **Title**: Meditation App
- **Description**: Приложение для медитации с AI-аффирмациями
- **Photo**: Загрузите иконку 640x360 (можно использовать meditation.jpg)
- **Demo GIF/Video**: Пропустите (Send /empty)
- **Web App URL**: `https://your-app.vercel.app` (URL из Vercel)
- **Short name**: `meditation`

## Шаг 5: Получение ссылки

После настройки вы получите ссылку вида:
```
https://t.me/your_bot_name/meditation
```

Эту ссылку можно отправить заказчику для тестирования!

## Дополнительно: Кнопка в боте

Чтобы добавить кнопку запуска в меню бота:

```
/mybots
# Выберите вашего бота
# Bot Settings → Menu Button → Configure menu button
# Введите текст: "Открыть приложение"
# Введите URL: https://t.me/your_bot_name/meditation
```

## Проверка

1. Откройте ссылку в Telegram на телефоне
2. Приложение должно открыться в полноэкранном режиме
3. Все функции должны работать (свайп, музыка, навигация)

## Troubleshooting

**Проблема**: Белый экран после деплоя
**Решение**: Проверьте, что `output: "single"` в app.json

**Проблема**: Музыка не играет
**Решение**: В Telegram WebApp есть ограничения на автоплей. Добавьте кнопку "Включить музыку"

**Проблема**: Приложение не разворачивается на весь экран
**Решение**: Убедитесь, что `tg.expand()` вызывается в _layout.tsx
