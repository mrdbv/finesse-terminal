# 🛠️ Як встановити Finesse Terminal - Простий посібник

Привіт! Давайте разом встановимо цей проект. Я допоможу вам крок за кроком.

## 📋 Навігація

- [Дуже швидко (за 2 хвилини)](#⚡-гарячий-старт)
- [Що потрібно на комп'ютері](#⚙️-системні-вимоги)
- [Встановлення для новачків](#методи-встановлення)
- [Як налаштувати все під себе](#⚙️-налаштування)
- [Як розробляти](#🔨-розробка)
- [Як запустити в мережу](#🌐-запуск)

---

## ⚡ Гарячий старт

Поспішаєте? Дотримуйтеся цих кроків:

### Для Windows
```powershell
# 1. Скачайте ZIP з GitHub
# 2. Розпакуйте його
# 3. Запустіть PowerShell у папці проекту
python -m http.server 8000
# 4. Перейдіть на http://localhost:8000
```

### Для Mac або Linux
```bash
# Клонуємо
git clone https://github.com/mrdbv/finesse-terminal.git
cd finesse-terminal

# Запускаємо сервер
python -m http.server 8000

# Відкриваємо
open http://localhost:8000  # Mac
xdg-open http://localhost:8000  # Linux
```

**Це все! Застосунок готовий.** ✅

---

## ⚙️ Системні вимоги

### Мінімум для роботи
| Що | Вимога |
|---|---|
| **ОС** | Windows 10 / Mac 10.15 / Linux (будь-яка) |
| **Пам'ять** | 2 ГБ (більше краще) |
| **Місце** | 100 МБ для проекту |
| **Браузер** | Chrome / Firefox / Safari / Edge (новіші версії) |
| **Інтернет** | Так, для графіків TradingView |

### Рекомендуємо
| Що | Краще буде |
|---|---|
| **ОС** | Windows 11 / Mac 12+ / Ubuntu 20.04+ |
| **Пам'ять** | 4+ ГБ |
| **Процесор** | Intel i5 / Apple M1 / AMD Ryzen 5+ |
| **Браузер** | Google Chrome (latest) |
| **Інтернет** | 10+ Мбіт/с |

### Програми (опціонально)

#### Python (для локального сервера)
```bash
# Перевірте чи встановлено
python --version

# Якщо ні, завантажте з https://www.python.org/downloads/
```

#### Git (щоб клонувати проект)
```bash
# Перевірте
git --version

# Якщо ні, https://git-scm.com/download
```

#### Node.js (альтернатива Python)
```bash
# Перевірте
node --version

# Якщо ні, https://nodejs.org/
```

---

## Методи встановлення

### ✅ Метод 1: Найпростіший (для новачків)

#### Крок 1 - Завантажте
1. Перейдіть на https://github.com/mrdbv/finesse-terminal
2. Натисніть зелену кнопку **"Code"**
3. Виберіть **"Download ZIP"**
4. Зберегти на комп'ютері

#### Крок 2 - Розпакуйте
**На Windows:** Правий клік → "Розпакувати всі..."
**На Mac:** Двічі клацніть (розпакується само)
**На Linux:** 
```bash
unzip finesse-terminal-main.zip
cd finesse-terminal-main
```

#### Крок 3 - Запустіть
Просто двічі клацніть на **index.html** у папці.

**Готово!** Застосунок запуститься в браузері. 🎉

---

### ✅ Метод 2: Через Git (для розробників)

#### Крок 1 - Відкрийте термінал
**Windows:** Win+X → PowerShell
**Mac:** Cmd+Space → Terminal
**Linux:** Ctrl+Alt+T

#### Крок 2 - Клонуйте проект
```bash
git clone https://github.com/mrdbv/finesse-terminal.git
cd finesse-terminal
```

#### Крок 3 - Запустіть сервер
```bash
# Із Python
python -m http.server 8000

# АБО із Node.js
npx http-server -p 8000

# АБО прямо файл (без сервера)
open index.html  # Mac
start index.html  # Windows
xdg-open index.html  # Linux
```

#### Крок 4 - Перейдіть в браузер
```
http://localhost:8000
```

Готово! 🚀

---

### ✅ Метод 3: Docker (якщо у вас він встановлено)

Створіть файл `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

Потім запустіть:
```bash
# Збираємо
docker build -t finesse-terminal .

# Запускаємо контейнер
docker run -p 8000:80 finesse-terminal

# Відкриваємо
http://localhost:8000
```

---

## ⚙️ Налаштування

### 1️⃣ Змініть кольори

Відкрийте файл `styles.css` та знайдіть верх файлу:

```css
:root {
    --bg-color: #0B0B0B;        /* Фон - чорний */
    --accent-color: #00D1FF;    /* Основний колір */
    --text-white: #FFFFFF;      /* Білий текст */
    --text-dim: #A0A0A0;       /* Сірий текст */
    --positive-color: #00ff88;  /* Зелений (позитив) */
    --negative-color: #ff4444;  /* Червоний (негатив) */
}
```

**Приклади:**
```css
/* Серебристий */
--accent-color: #C0C0C0;

/* Червоний */
--accent-color: #FF0000;

/* Оранжевий */
--accent-color: #FFA500;

/* Зелений */
--accent-color: #00FF00;
```

Збережіть - колір змінився! 🎨

---

### 2️⃣ Додайте нові монети

Відкрийте `index.html`, знайдіть блок `coin-list` та додайте:

```html
<div class="coin-item" onclick="selectCoin(this, 'СИМВОЛ')">
    <div class="coin-name">НАЗВА МОНЕТИ</div>
    <div class="coin-price">$0.00</div>
    <div class="coin-change positive">+0.0%</div>
</div>
```

**Приклад (додаємо Bitcoin):**
```html
<div class="coin-item" onclick="selectCoin(this, 'BTC')">
    <div class="coin-name">BTC</div>
    <div class="coin-price">$45000.00</div>
    <div class="coin-change positive">+2.5%</div>
</div>
```

**Важно!** Також оновіть `script.js`:
```javascript
const coinSymbols = {
    'SHIB': 'BINANCE:SHIBUSDT',
    'DOGE': 'BINANCE:DOGEUSDT',
    'PEPE': 'BINANCE:PEPEUSDT',
    'BONK': 'BINANCE:BONKUSDT',
    'FLOKI': 'BINANCE:FLOKIUSDT',
    'BTC': 'BINANCE:BTCUSDT'  // ← Нова монета
};
```

---

### 3️⃣ Змініть шрифти

У `styles.css` знайдіть цей блок:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

:root {
    --font-main: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
}
```

**Альтернативи (Google Fonts):**
```css
/* Робото - чистий шрифт */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
--font-main: 'Roboto', sans-serif;

/* Fira Code - для коду */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');
--font-mono: 'Fira Code', monospace;

/* Poppins - сучасний */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
--font-main: 'Poppins', sans-serif;
```

---

### 4️⃣ Налаштуйте сайдбар

У `styles.css` знайдіть:

```css
.sidebar {
    width: 350px;              /* Ширина тут */
    background: rgba(0, 0, 0, 0.8);
    border-right: 1px solid rgba(0, 209, 255, 0.2);
}
```

Змініть ширину:
```css
.sidebar {
    width: 300px;  /* Вуже, більше місця для графіків */
    /* або */
    width: 400px;  /* Ширше, більше монет видно */
}
```

---

## 🔨 Розробка

### За допомогою VS Code

1. **Встановіть розширення:** Live Server
2. **Правий клік** на `index.html`
3. **"Open with Live Server"**
4. Будь-які зміни у файлі відразу будуть видно в браузері ✨

### WebStorm

1. Правий клік на `index.html`
2. Клацніть "Run"
3. Браузер відкриється сам

### Sublime Text
```bash
# Встановіть Simple HTTP Server пакет
# View → Show Console
# Запустить локальний сервер
```

---

### DevTools для налагодження

Нажміть у браузері:
```
Windows/Linux: F12 або Ctrl+Shift+I
Mac: Cmd+Option+I
```

**Корисні вкладки:**
| Вкладка | Для чого |
|--------|---------|
| **Elements** | Дивитися та редагувати HTML/CSS |
| **Console** | Виконувати JavaScript команди |
| **Network** | Дивитися запити до TradingView |
| **Application** | Стан LocalStorage і SessionStorage |
| **Performance** | Як швидко все завантажується |

**Команди для тестування:**
```javascript
// Дивитися стан програми
console.log(appState);

// Перемкнути екран
showScreen('terminal');

// Обрати монету
selectCoin(document.querySelector('.coin-item'), 'SHIB');

// Змінити акцент
document.documentElement.style.setProperty('--accent-color', '#FF00FF');

// Дивитися LocalStorage
console.log(localStorage);
```

---

## 🌐 Запуск в мережу

### На Netlify (найпростіше)

**Спосіб 1 - через GitHub:**
1. Завантажте проект на GitHub
2. Перейдіть на https://netlify.com
3. Натисніть "New site from Git"
4. Виберіть ваш репозиторій
5. Натисніть "Deploy"

**Спосіб 2 - просто перетягніть папку:**
1. На https://netlify.com
2. Перетягніть папку проекту
3. За 30 секунд готово!

---

### На Vercel

```bash
# 1. Встановіть Vercel CLI
npm install -g vercel

# 2. Логініться
vercel login

# 3. Дисплоимся
vercel

# 4. Дотримуйтеся інструкцій
```

---

### На GitHub Pages

```bash
# 1. Клонуємо (у вашу папку)
git clone https://github.com/YOUR_USERNAME/finesse-terminal.git
cd finesse-terminal

# 2. Додаємо файли
git add .
git commit -m "Мій проект"
git push origin main

# 3. На GitHub: Settings → Pages
# 4. Source: main branch
# 5. Save

# Готово! Ваш сайт на:
# https://YOUR_USERNAME.github.io
```

---

## ✅ Перевірка

### Чек-лист
- ✅ Усі файли завантажені
- ✅ Локальний сервер запущений
- ✅ Браузер показує `http://localhost:8000`
- ✅ Матричний ефект при завантаженні
- ✅ Головна сторінка завантажується
- ✅ Кнопки "Вхід" та "Реєстрація" працюють
- ✅ Форма входу з'являється
- ✅ Панель з монетами видна
- ✅ Графік TradingView завантажується
- ✅ Курсор змінюється
- ✅ Вихід повертає на початок

### Браузери
| Браузер | Версія | Статус |
|---------|--------|--------|
| Chrome | 120+ | ✅ Чудово |
| Firefox | 121+ | ✅ Чудово |
| Safari | 17+ | ✅ Чудово |
| Edge | 120+ | ✅ Чудово |

---

## 🔧 Якщо щось не працює

### Проблема: Сервер не запускається
```bash
# Може бути, порт 8000 зайнятий. Спробуйте інший:
python -m http.server 3000
# Тепер перейдіть на http://localhost:3000
```

### Проблема: "Сторінку не знайдено"
```bash
# Перевірте, що ви в правильній папці
cd finesse-terminal
ls -la index.html
```

### Проблема: Графіки не загружаються
- Перевірте інтернет
- Очистіть кеш (Ctrl+Shift+Delete)
- Спробуйте приватний режим браузера
- Перезавантажте сторінку (F5)

### Проблема: Монети не оновлюються
- Перезавантажте сторінку (F5)
- Очистіть SessionStorage в DevTools
- Перевірте Network у DevTools

---

## 📞 Потреба в допомозі?

- 🐛 [Повідомити про помилку](https://github.com/mrdbv/finesse-terminal/issues)
- 💬 [Задати питання](https://github.com/mrdbv/finesse-terminal/discussions)
- 📖 Прочитайте README.md для більше інформації

---

**Версія налаштування:** 2.0  
**Оновлено:** 2026-05-12  
**Автор:** mrdbv

Щасти вам! 🚀
