/**
 * FINE$$E Terminal v2.6
 * Professional Solana Trading Platform
 * 
 * Features:
 * - Custom cursor system (dot, scanner, ghost)
 * - Loading screen with matrix rain effect
 * - Authentication flow with animations
 * - Terminal dashboard with memecoin tracking
 * - Real-time chart integration (TradingView)
 * - Solana smart contract editor
 * - Real-time pump detection system
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

// Coin data mapping
const coinDataMap = {
    'SHIB': { name: 'SHIBA INU', symbol: 'SHIBUSDT', pair: 'SHIB' },
    'DOGE': { name: 'DOGECOIN', symbol: 'DOGEUSDT', pair: 'DOGE' },
    'PEPE': { name: 'PEPE', symbol: 'PEPEUSDT', pair: 'PEPE' },
    'BONK': { name: 'BONK', symbol: 'BONKUSDT', pair: 'BONK' },
    'FLOKI': { name: 'FLOKI', symbol: 'FLOKIUSDT', pair: 'FLOKI' }
};

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
generateMatrixChars();

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
        
        // Start pump detection when authenticated
        startPumpDetection();
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
    
    // Stop pump detection
    stopPumpDetection();
}

// ============================================
// TERMINAL FUNCTIONALITY
// ============================================

/**
 * Select a cryptocurrency and update chart
 * @param {HTMLElement} element - The clicked coin item
 * @param {string} symbol - Cryptocurrency symbol (SHIB, DOGE, etc.)
 * @param {string} coinName - Full coin name (SHIBA INU, DOGECOIN, etc.)
 */
function selectCoin(element, symbol, coinName) {
    // Remove active class from all coins
    document.querySelectorAll('.coin-item').forEach(el => el.classList.remove('active'));
    
    // Add active class to selected coin
    element.classList.add('active');
    
    // Get coin data
    const coinData = coinDataMap[symbol];
    if (!coinData) return;
    
    // Update chart header with dynamic coin name
    const chartHeader = document.getElementById('chartHeader');
    chartHeader.textContent = `📈 ${coinName} (${coinData.pair}/USDT) - LIVE CHART`;
    
    // Update chart iframe with new coin data
    const chartIframe = document.querySelector('.chart-iframe');
    chartIframe.src = `https://s.tradingview.com/widgetembed/?symbol=BINANCE%3A${coinData.symbol}&interval=1&theme=dark&style=1`;
}

// ============================================
// PUMP DETECTION SYSTEM
// ============================================

let pumpDetectionInterval = null;

/**
 * Simulate pump detection and add new coins
 * In production, this would connect to a real API/WebSocket
 */
function startPumpDetection() {
    if (!isAuthenticated) return;
    
    const newPumps = [
        { symbol: 'WIF', name: 'DOGWIFHAT', price: '$2.45', change: '+125%' },
        { symbol: 'ORCA', name: 'ORCA', price: '$0.542', change: '+45%' },
        { symbol: 'COPE', name: 'COPE', price: '$0.0234', change: '+89%' },
        { symbol: 'SAMO', name: 'SAMOYEDCOIN', price: '$0.0145', change: '+67%' },
        { symbol: 'JUP', name: 'JUPITER', price: '$0.847', change: '+34%' }
    ];
    
    pumpDetectionInterval = setInterval(() => {
        if (!isAuthenticated) return;
        
        const randomPump = newPumps[Math.floor(Math.random() * newPumps.length)];
        addNewPumpCoin(randomPump.symbol, randomPump.name, randomPump.price, randomPump.change);
    }, 12000); // Every 12 seconds
}

/**
 * Stop pump detection when logging out
 */
function stopPumpDetection() {
    if (pumpDetectionInterval) {
        clearInterval(pumpDetectionInterval);
        pumpDetectionInterval = null;
    }
}

/**
 * Add new coin from pump detection
 * @param {string} symbol - Coin symbol
 * @param {string} name - Full coin name
 * @param {string} price - Current price
 * @param {string} change - Price change percentage
 */
function addNewPumpCoin(symbol, name, price, change) {
    const newCoinsSection = document.getElementById('newCoinsSection');
    const newCoinsList = document.getElementById('newCoinsList');
    
    // Show new pumps section
    newCoinsSection.style.display = 'block';
    
    // Create new coin element
    const coinElement = document.createElement('div');
    coinElement.className = 'coin-item new-pump';
    coinElement.innerHTML = `
        <div class="coin-name">${name}</div>
        <div class="coin-price">${price}</div>
        <div class="coin-change positive">${change}</div>
    `;
    
    // Add click handler
    coinElement.onclick = () => {
        selectCoin(coinElement, symbol, name);
        coinElement.classList.add('active');
    };
    
    // Add to list
    newCoinsList.insertBefore(coinElement, newCoinsList.firstChild);
    
    // Show notification
    showPumpNotification(symbol, name, change);
    
    // Remove old coins if list gets too long
    const coins = newCoinsList.querySelectorAll('.coin-item');
    if (coins.length > 5) {
        coins[coins.length - 1].remove();
    }
}

/**
 * Show pump notification popup
 * @param {string} symbol - Coin symbol
 * @param {string} name - Coin name
 * @param {string} change - Price change
 */
function showPumpNotification(symbol, name, change) {
    const notification = document.getElementById('pumpNotification');
    const title = document.getElementById('pumpTitle');
    const details = document.getElementById('pumpDetails');
    
    title.textContent = `🚀 ${symbol} PUMP DETECTED`;
    details.textContent = `${name} is up ${change}! Added to your watchlist.`;
    
    notification.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
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
