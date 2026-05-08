/**
 * FINE$$E Terminal v2.6
 * Professional Solana Trading Platform
 * 
 * Features:
 * - Custom cursor system (dot, scanner, ghost)
 * - Loading screen with matrix rain effect
 * - Authentication flow with animations
 * - Terminal dashboard with memcoin tracking
 * - Real-time chart integration (TradingView)
 * - Solana smart contract editor
 */


// DOM ELEMENTS

const cursor = document.getElementById('cursor');
const modeBtn = document.getElementById('modeBtn');
const styleBtn = document.getElementById('styleBtn');
const html = document.documentElement;
const loadingScreen = document.getElementById('loadingScreen');
const authScreen = document.getElementById('authScreen');
const terminalPage = document.getElementById('terminalPage');
const mainContainer = document.querySelector('.container');
const ticker = document.querySelector('.ticker');

// ============================================
// STATE VARIABLES
// ============================================
let isCustom = true;
let currentIndex = 0;
let isAuthenticated = false;

const cursorTypes = [
    { class: 'cursor-dot', name: 'Dot' },
    { class: 'cursor-scanner', name: 'Scanner' },
    { class: 'cursor-ghost', name: 'Ghost' }
];

// ============================================
// INITIALIZATION
// ============================================

/**
 * Handle page load event
 * Shows loading screen for 2.5 seconds then hides it
 */
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }, 2500);
});

/**
 * Generate random matrix characters for loading screen
 * Creates falling katakana characters effect
 */
function generateMatrixChars() {
    const matrixBg = document.getElementById('matrixBg');
    matrixBg.innerHTML = '';
    const chars = 'ｦｧｨｩｪｫｬｭｮｯﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
    
    for (let i = 0; i < 15; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDelay = Math.random() * 3 + 's';
        char.style.animation = `matrixRain ${5 + Math.random() * 5}s linear infinite`;
        matrixBg.appendChild(char);
    }
}

// Initialize matrix effect on page load
generatMatrixChars();

// ============================================
// AUTHENTICATION FLOW
// ============================================

/**
 * Show authentication screen
 * @param {string} type - 'Вхід' (Login) or 'Реєстрація' (Register)
 */
function showAuthScreen(type) {
    mainContainer.style.display = 'none';
    ticker.style.display = 'none';
    authScreen.classList.add('show');
    
    const authButton = document.getElementById('authButton');
    authButton.textContent = type === 'Вхід' ? 'AUTHENTICATE' : 'REGISTER';
}

/**
 * Handle authentication form submission
 * Shows loading bar and transitions to terminal after 2 seconds
 * @param {Event} event - Form submit event
 */
function handleAuth(event) {
    event.preventDefault();
    
    const username = document.getElementById('authUsername').value;
    const password = document.getElementById('authPassword').value;
    
    if (!username || !password) return;

    const loadingBar = document.getElementById('authLoadingBar');
    loadingBar.style.display = 'block';

    // Simulate authentication process (2 seconds)
    setTimeout(() => {
        isAuthenticated = true;
        authScreen.classList.remove('show');
        mainContainer.style.display = 'none';
        ticker.style.display = 'none';
        terminalPage.classList.add('show');
    }, 2000);
}

/**
 * Handle logout
 * Returns to main page and clears auth form
 */
function handleLogout() {
    isAuthenticated = false;
    terminalPage.classList.remove('show');
    mainContainer.style.display = 'block';
    ticker.style.display = 'block';
    document.getElementById('authUsername').value = '';
    document.getElementById('authPassword').value = '';
}

// ============================================
// TERMINAL FUNCTIONALITY
// ============================================

/**
 * Select a cryptocurrency and update chart
 * @param {HTMLElement} element - The clicked coin item
 * @param {string} symbol - Cryptocurrency symbol (SHIB, DOGE, etc.)
 */
function selectCoin(element, symbol) {
    // Remove active class from all coins
    document.querySelectorAll('.coin-item').forEach(el => el.classList.remove('active'));
    
    // Add active class to selected coin
    element.classList.add('active');
    
    // Map symbols to TradingView symbols
    const coinSymbols = {
        'SHIB': 'SHIBUSDT',
        'DOGE': 'DOGEUSDT',
        'PEPE': 'PEPEUSDT',
        'BONK': 'BONKUSDT',
        'FLOKI': 'FLOKIUSDT'
    };
    
    // Update chart iframe with new coin data
    const chartIframe = document.querySelector('.chart-iframe');
    chartIframe.src = `https://s.tradingview.com/widgetembed/?symbol=BINANCE%3A${coinSymbols[symbol]}&interval=1&theme=dark&style=1`;
}

// ============================================
// CURSOR SYSTEM
// ============================================

/**
 * Track mouse movement and update custom cursor position
 */
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

/**
 * Toggle between custom cursor and system cursor
 */
function toggleCursorMode() {
    isCustom = !isCustom;
    
    if (isCustom) {
        html.classList.remove('system-cursor');
        modeBtn.innerText = "Mode: Custom";
        styleBtn.style.opacity = "1";
    } else {
        html.classList.add('system-cursor');
        modeBtn.innerText = "Mode: System";
        styleBtn.style.opacity = "0.5";
    }
}

/**
 * Switch between different cursor styles
 * Cycles through: Dot → Scanner → Ghost → Dot
 */
function nextCursor() {
    if (!isCustom) return;
    
    // Remove previous cursor class
    cursor.classList.remove(cursorTypes[currentIndex].class);
    
    // Move to next cursor type
    currentIndex = (currentIndex + 1) % cursorTypes.length;
    
    // Add new cursor class
    cursor.classList.add(cursorTypes[currentIndex].class);
    
    // Update button text
    styleBtn.innerText = "Style: " + cursorTypes[currentIndex].name;
}
