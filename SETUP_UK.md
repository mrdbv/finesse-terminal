# 🛠️ Посібник з налаштування Finesse Terminal v2.6

## 📋 Зміст

- [Швидкий старт](#швидкий-старт)
- [Системні вимоги](#системні-вимоги)
- [Крок за кроком встановлення](#крок-за-кроком-встановлення)
- [Налаштування проекту](#налаштування-проекту)
- [Запуск для розробки](#запуск-для-розробки)
- [Виробничі налаштування](#виробничі-налаштування)
- [Перевірка](#перевірка)

---

## ⚡ Швидкий старт

Хочете почати за 2 хвилини? Дотримуйтеся цих кроків:

### Windows
```powershell
# 1. Завантажте ZIP архів
# https://github.com/mrdbv/finesse-terminal/archive/refs/heads/main.zip

# 2. Розпакуйте на вашу комп'ютер

# 3. Відкрийте PowerShell в папці проекту

# 4. Запустіть сервер
python -m http.server 8000

# 5. Перейдіть на http://localhost:8000
```

### macOS / Linux
```bash
# 1. Клонуємо репозиторій
git clone https://github.com/mrdbv/finesse-terminal.git
cd finesse-terminal

# 2. Запускаємо локальний сервер
python -m http.server 8000

# 3. Відкриваємо в браузері
open http://localhost:8000  # macOS
xdg-open http://localhost:8000  # Linux
```

---

## ⚙️ Системні вимоги

### Мінімальні вимоги
| Компонент | Вимога |
|-----------|--------|
| **OS** | Windows 10 / macOS 10.15 / Linux |
| **RAM** | 2 ГБ мінімум |
| **Місце на диску** | 100 МБ |
| **Браузер** | Chrome 90+ / Firefox 88+ / Safari 14+ / Edge 90+ |
| **Інтернет** | Вимагається для TradingView графіків |

### Рекомендовані вимоги
| Компонент | Рекомендація |
|-----------|-------------|
| **OS** | Windows 11 / macOS 12 / Ubuntu 20.04+ |
| **RAM** | 4+ ГБ |
| **CPU** | Intel i5 / Apple M1 / AMD Ryzen 5+ |
| **Браузер** | Google Chrome Latest |
| **Інтернет** | Швидкість 10+ Мбіт/с |

### Необхідне програмне забезпечення

#### Python (опційно, для локального сервера)
```bash
# Перевірка версії
python --version

# Якщо не встановлено, завантажте з:
# https://www.python.org/downloads/
```

#### Git (опційно, для клонування)
```bash
# Перевірка
git --version

# Якщо не встановлено:
# https://git-scm.com/download
```

#### Node.js (опційно, альтернатива Python)
```bash
# Перевірка
node --version
npm --version

# Якщо не встановлено:
# https://nodejs.org/
```

---

## 🚀 Крок за кроком встановлення

### Метод 1: Проста завантаження (для новачків)

#### Крок 1️⃣: Завантажте файли
1. Перейдіть на https://github.com/mrdbv/finesse-terminal
2. Натисніть кнопку **"Code"** (зелена кнопка)
3. Виберіть **"Download ZIP"**
4. Утримуйте архів в папці на вашому комп'ютері

#### Крок 2️⃣: Розпакуйте архів
**Windows:**
- Правий клік на архів → "Розпакувати всі..."

**macOS:**
- Двічі клацніть на архів (він розпакується автоматично)

**Linux:**
```bash
unzip finesse-terminal-main.zip
cd finesse-terminal-main
```

#### Крок 3️⃣: Откройте проект
Перейдіть в розпаковану папку та двічі клацніть на **index.html**

✅ **Готово!** Застосунок запуститься в вашому браузері.

---

### Метод 2: Встановлення через Git (для розробників)

#### Крок 1️⃣: Відкрийте термінал

**Windows (PowerShell):**
```powershell
# Натисніть Win+X, виберіть "Windows PowerShell (Admin)"
```

**macOS:**
```bash
# Натисніть Cmd+Space, введіть "Terminal"
```

**Linux:**
```bash
# Натисніть Ctrl+Alt+T або знайдіть Terminal в меню
```

#### Крок 2️⃣: Клонуємо репозиторій
```bash
git clone https://github.com/mrdbv/finesse-terminal.git
cd finesse-terminal
```

#### Крок 3️⃣: Запускаємо локальний сервер
```bash
# Із Python
python -m http.server 8000

# ІЛИ із Node.js (якщо встановлено)
npx http-server -p 8000

# ІЛИ прямо відкриваємо файл
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

#### Крок 4️⃣: Відкриваємо в браузері
```
http://localhost:8000
```

---

### Метод 3: Встановлення з Docker

Якщо у вас встановлено Docker:

```dockerfile
# Создаєм файл Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
# Збудуємо образ
docker build -t finesse-terminal .

# Запустимо контейнер
docker run -p 8000:80 finesse-terminal

# Відкриваємо http://localhost:8000
```

---

## ⚙️ Налаштування проекту

### Налаштування 1: Змінення кольорів

#### Основна колірна схема
Відкрийте **styles.css** та знайдіть:

```css
:root {
    --bg-color: #0B0B0B;           /* Фоновий колір */
    --accent-color: #00D1FF;       /* Головний колір */
    --text-white: #FFFFFF;         /* Білий текст */
    --text-dim: #A0A0A0;          /* Сірий текст */
    --positive-color: #00ff88;     /* Позитивні зміни (зелений) */
    --negative-color: #ff4444;     /* Негативні зміни (червоний) */
}
```

#### Приклади змін
```css
/* Сріблястий акцент */
--accent-color: #C0C0C0;

/* Червоний акцент */
--accent-color: #FF0000;

/* Оранжевий акцент */
--accent-color: #FFA500;

/* Зелений акцент */
--accent-color: #00FF00;
```

---

### Налаштування 2: Додання нових монет

Відкрийте **index.html**, знайдіть блок `coin-list`:

```html
<div id="coinList" class="coin-list">
    <!-- Існуючі монети -->
    
    <!-- Додаємо нову монету -->
    <div class="coin-item" onclick="selectCoin(this, 'YOUR_SYMBOL')">
        <div class="coin-name">НАЗВА МОНЕТИ</div>
        <div class="coin-price">$0.00000000</div>
        <div class="coin-change positive">+0.0%</div>
    </div>
</div>
```

#### Приклад: Додавання Bitcoin
```html
<div class="coin-item" onclick="selectCoin(this, 'BTC')">
    <div class="coin-name">BTC</div>
    <div class="coin-price">$45000.00</div>
    <div class="coin-change positive">+2.5%</div>
</div>
```

#### Важливо!
Змініть також у **script.js**:
```javascript
// Додайте у функцію selectCoin
const coinSymbols = {
    'SHIB': 'BINANCE:SHIBUSDT',
    'DOGE': 'BINANCE:DOGEUSDT',
    'PEPE': 'BINANCE:PEPEUSDT',
    'BONK': 'BINANCE:BONKUSDT',
    'FLOKI': 'BINANCE:FLOKIUSDT',
    'BTC': 'BINANCE:BTCUSDT'  // Нова монета
};
```

---

### Налаштування 3: Змінення шрифтів

Відкрийте **styles.css** та знайдіть:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

:root {
    --font-main: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
}
```

#### Альтернативні шрифти Google Fonts
```css
/* Робото */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
--font-main: 'Roboto', sans-serif;

/* Fira Code для коду */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');
--font-mono: 'Fira Code', monospace;

/* Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
--font-main: 'Poppins', sans-serif;
```

---

### Налаштування 4: Налаштування сайдбара

Знайдіть у **styles.css**:

```css
.sidebar {
    width: 350px;              /* Ширина */
    background: rgba(0, 0, 0, 0.8);
    border-right: 1px solid rgba(0, 209, 255, 0.2);
}
```

#### Змінення ширини
```css
.sidebar {
    width: 300px;  /* Вуже */
    /* або */
    width: 400px;  /* Ширше */
}
```

---

## 🔨 Запуск для розробки

### Налаштування IDE

#### VS Code
1. Встановіть розширення: **Live Server**
2. Правий клик на **index.html** → **Open with Live Server**
3. Автоматично оновлюється при збереженні файлу

#### WebStorm
1. Натисніть правою кнопкою мишки на **index.html**
2. Виберіть **Run**
3. Застосунок запуститься в браузері

#### Sublime Text
```bash
# Встановимо пакет Simple HTTP Server
# View → Show Console
# Введемо: import urllib.request,urllib.parse,urllib.error, http.server, socketserver, os
# (це запустить локальний сервер)
```

---

### DevTools для налагодження

#### Відкриття DevTools
```
Windows/Linux: F12 або Ctrl+Shift+I
macOS: Cmd+Option+I
```

#### Корисні вкладки
| Вкладка | Використання |
|--------|-------------|
| **Elements** | Переглядання та редагування HTML/CSS |
| **Console** | Запуск JavaScript команд |
| **Network** | Перегляд запитів TradingView |
| **Application** | Перегляд LocalStorage та SessionStorage |
| **Performance** | Аналіз швидкості |

#### Консольні команди для тестування
```javascript
// Перевірити стан
console.log(appState);

// Переключити екран
showScreen('terminal');

// Обрати монету
selectCoin(document.querySelector('.coin-item'), 'SHIB');

// Змінити колір акцента
document.documentElement.style.setProperty('--accent-color', '#FF00FF');

// Перевірити LocalStorage
console.log(localStorage);
```

---

## 🌐 Виробничі налаштування

### Деплой на Netlify

#### Способ 1: Через GitHub
1. Загруженіте проект на GitHub
2. Перейдіть на https://netlify.com
3. Натисніть "New site from Git"
4. Виберіть GitHub та репозиторій
5. Натисніть "Deploy"

#### Способ 2: Прямо з папки
1. Перейдіть на https://netlify.com
2. Перетягніть папку проекту в зону завантаження
3. Готово за 30 секунд!

---

### Деплой на Vercel

```bash
# 1. Встановлюємо Vercel CLI
npm install -g vercel

# 2. Логіниемося
vercel login

# 3. Дисплоимся
vercel

# 4. Дотримуйтеся інструкцій
```

---

### Деплой на GitHub Pages

```bash
# 1. Створіть репозиторій з ім'ям username.github.io
git clone https://github.com/YOUR_USERNAME/finesse-terminal.git
cd finesse-terminal

# 2. Додаємо файли
git add .
git commit -m "Initial commit"
git push origin main

# 3. Перейдіть в Settings → Pages
# 4. Виберіть Source: main branch
# 5. Зберегти

# Ваш сайт доступний на:
# https://YOUR_USERNAME.github.io
```

---

## ✅ Перевірка

### Чеклист встановлення

- ✅ Звантажено все файлів проекту
- ✅ Локальний сервер запущений
- ✅ Браузер відкрив `http://localhost:8000`
- ✅ Екран завантаження показує матричний ефект
- ✅ Головна сторінка завантажується нормально
- ✅ Кнопки "Вхід" і "Реєстрація" працюють
- ✅ Форма аутентифікації відображається
- ✅ Терміналу показує список монет
- ✅ Графік TradingView завантажується
- ✅ Курсор змінюється при натисканні кнопки
- ✅ Логаут повертає на головну сторінку

### Тестування браузерів

| Браузер | Версія | Статус |
|---------|--------|--------|
| Chrome | 120+ | ✅ |
| Firefox | 121+ | ✅ |
| Safari | 17+ | ✅ |
| Edge | 120+ | ✅ |

---

## 🔧 Вирішення типових проблем

### Проблема: Сервер не запускається
```bash
# Може бути, що порт 8000 зайнятий
# Спробуємо інший порт
python -m http.server 3000
```

### Проблема: Браузер не знаходить сторінку
```bash
# Переконайтеся, що ви в правильній папці
cd finesse-terminal
ls -la index.html  # Перевіряємо, що файл існує
```

### Проблема: Графіки не завантажуються
- Перевірте інтернет-з'єднання
- Очистіть кеш браузера (Ctrl+Shift+Delete)
- Спробуйте приватний режим браузера

### Проблема: Монети не оновлюються
- Перезагрузіть сторінку (F5)
- Очистіть SessionStorage в DevTools
- Перевірте LiveStream у DevTools → Network

---

## 📞 Підтримка

- 🐛 Проблема? [Сповіщення про помилку](https://github.com/mrdbv/finesse-terminal/issues)
- 💬 Питання? [Дискусії](https://github.com/mrdbv/finesse-terminal/discussions)
- 📖 Документація: Дивіться інші файли .md

---

**Версія налаштування**: 1.0  
**Оновлено**: 2026-05-07  
**Автор**: mrdbv

*Готові до трейдингу? 🚀*
