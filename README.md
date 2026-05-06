# FINE$$E Terminal v2.6 🚀

Professional Solana trading platform with real-time cryptocurrency tracking, smart contract editor, and interactive dashboard.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Components](#components)

## ✨ Features

### 🎨 **User Interface**
- **Custom Cursor System** - Toggle between 3 cursor styles (Dot, Scanner, Ghost)
- **Dark Theme** - Modern glassmorphism design with cyan accent colors
- **Smooth Animations** - All transitions use cubic-bezier easing for professional feel
- **Responsive Design** - Optimized for desktop viewing

### 🔐 **Authentication**
- **Loading Screen** - Matrix rain effect with scanner pulse animation
- **Auth Screen** - Smooth login/registration interface
- **Session Management** - Simple auth flow with state management

### 📊 **Terminal Dashboard**
- **Memcoin Tracker** - Real-time tracking of SHIB, DOGE, PEPE, BONK, FLOKI
- **Live Charts** - TradingView integration for cryptocurrency charts
- **System Info** - Network status, TPS, latency monitoring
- **Code Editor** - Display area for Solana smart contracts

### 🛠️ **Developer Tools**
- **Contract Editor** - Syntax-highlighted Rust code for Solana programs
- **Modular Code** - Separated HTML/CSS/JS for easy maintenance
- **Well-Documented** - Comments throughout codebase

## 📁 Project Structure

```
finesse-terminal/
├── index.html          # Main HTML file with page structure
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and glassmorphism
- **Vanilla JavaScript** - No dependencies, pure JS
- **TradingView API** - Real-time cryptocurrency charts
- **Google Fonts** - Inter (branding), JetBrains Mono (code)

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required

### Steps

1. **Clone or download the project**
```bash
git clone https://github.com/mrdbv/finesse-terminal.git
cd finesse-terminal
```

2. **Open in browser**
```bash
# Simply double-click index.html or use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

## 📖 Usage

### Main Page
- Click **"Вхід"** (Login) or **"Реєстрація"** (Register) to enter terminal
- Use any username/password combination for demo
- Change cursor style with **"Style: Dot"** button
- Toggle custom cursor with **"Mode: Custom"** button

### Terminal Page
1. **Select Cryptocurrency** - Click any memcoin in left sidebar
2. **View Chart** - Right panel updates with selected coin's chart
3. **Monitor System** - Check network status in sidebar
4. **View Code** - Explore Solana contract example
5. **Logout** - Return to main page

## 🏗️ Architecture

### Page Flow
```
Loading Screen (2.5s)
        ↓
Main Page (Landing)
        ↓
Auth Screen (Login/Register)
        ↓
Terminal Page (Dashboard)
        ↓
Logout → Back to Main Page
```

### Component Breakdown

| Component | Purpose |
|-----------|----------|
| **Loading Screen** | Initial system initialization with matrix effect |
| **Auth Screen** | User authentication with animations |
| **Main Page** | Landing page with feature showcase |
| **Terminal Dashboard** | Trading interface with charts and coins |

## 🎯 Components

### 1. **Loading Screen**
- Matrix rain effect (falling katakana characters)
- Scanner pulse animation
- Glitch text animation for logo
- Loading bar with progress
- Automatically hides after 2.5 seconds

### 2. **Authentication Screen**
- Centered form with inputs
- Progress bar during authentication
- Smooth slide-in animation
- Responsive to window size

### 3. **Terminal Page**
- **Sidebar** (350px width)
  - Memcoin list with prices and changes
  - System information display
  
- **Main Area**
  - Top: Solana smart contract editor
  - Bottom: Live TradingView chart

### 4. **Custom Cursor System**
- **Dot** - Simple glowing point
- **Scanner** - Cross with border ring
- **Ghost** - Glowing circle with blur
- Toggle between custom and system cursor

## 🎨 Color Scheme

```css
Primary Colors:
--bg-color: #0B0B0B (Deep black)
--accent-color: #00D1FF (Cyan)
--text-white: #FFFFFF (White)
--text-dim: #A0A0A0 (Gray)

Positive Changes: #00ff88 (Green)
Negative Changes: #ff4444 (Red)
```

## 🎬 Animations

| Animation | Duration | Purpose |
|-----------|----------|----------|
| **fadeIn/fadeOut** | 0.6s | Screen transitions |
| **slideInFromBottom** | 0.8s | Form/content entry |
| **glitchText** | 0.6s | Logo effect |
| **scannerPulse** | 1.5s | Loading indicator |
| **matrixRain** | 5-10s | Background effect |
| **loadingBarFill** | 2s | Progress indicator |

## 🔧 Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --accent-color: #00D1FF; /* Change this */
}
```

### Add More Coins
Edit coin items in `index.html`:
```html
<div class="coin-item" onclick="selectCoin(this, 'YOUR_SYMBOL')">
    <div class="coin-name">COIN NAME</div>
    <div class="coin-price">$0.00000000</div>
    <div class="coin-change positive">+X.X%</div>
</div>
```

### Update Charts
Modify TradingView URL in `script.js`:
```javascript
chartIframe.src = `https://s.tradingview.com/widgetembed/?symbol=BINANCE%3A${symbol}&interval=1&theme=dark`;
```

## 📊 Stats

- **File Size**: ~50KB (uncompressed)
- **Load Time**: <1s on modern connection
- **Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile**: Not optimized (desktop-only experience)

## 🎓 Learning Resources

This project demonstrates:
- CSS animations and transitions
- JavaScript DOM manipulation
- State management basics
- API integration (TradingView)
- Responsive flexbox/grid layouts
- Semantic HTML structure

## 📝 License

Created for educational purposes. Feel free to use and modify.

## 👨‍💻 Author

**mrdbv** - 2026

## 🤝 Support

For issues or suggestions, feel free to create an issue or contact directly.

---

**Made with ❤️ for Solana traders and developers**