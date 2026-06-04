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
 * - Demo trading system with portfolio management
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
const tradingModal = document.getElementById('tradingModal');

// ============================================
// STATE VARIABLES
// ============================================
let isCustom = true;
let currentIndex = 0;
let isAuthenticated = false;
let currentTradeType = 'buy';
let selectedCoinSymbol = '';
let selectedCoinName = '';
let selectedCoinPrice = 0;

// Demo Account System
let demoAccount = {
    balance: 100.00,
    portfolio: {}, // { symbol: quantity }
    history: [] // { type, symbol, amount, quantity, price, date }
};

const cursorTypes = [
    { class: 'cursor-dot', name: 'Dot' },
    { class: 'cursor-scanner', name: 'Scanner' },
    { class: 'cursor-ghost', name: 'Ghost' }
];

// Coin data mapping
const coinDataMap = {
    'SHIB': { name: 'SHIBA INU', symbol: 'SHIBUSDT', pair: 'SHIB', basePrice: 0.0000285 },
    'DOGE': { name: 'DOGECOIN', symbol: 'DOGEUSDT', pair: 'DOGE', basePrice: 0.3842 },
    'PEPE': { name: 'PEPE', symbol: 'PEPEUSDT', pair: 'PEPE', basePrice: 0.0000012 },
    'BONK': { name: 'BONK', symbol: 'BONKUSDT', pair: 'BONK', basePrice: 0.00001234 },
    'FLOKI': { name: 'FLOKI', symbol: 'FLOKIUSDT', pair: 'FLOKI', basePrice: 0.00002156 },
    'WIF': { name: 'DOGWIFHAT', symbol: 'WIFUSDT', pair: 'WIF', basePrice: 2.45 },
    'ORCA': { name: 'ORCA', symbol: 'ORCAUSDT', pair: 'ORCA', basePrice: 0.542 },
    'COPE': { name: 'COPE', symbol: 'COPEUSDT', pair: 'COPE', basePrice: 0.0234 },
    'SAMO': { name: 'SAMOYEDCOIN', symbol: 'SAMOUSDT', pair: 'SAMO', basePrice: 0.0145 },
    'JUP': { name: 'JUPITER', symbol: 'JUPUSDT', pair: 'JUP', basePrice: 0.847 }
};

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('load', () => {
    loadDemoAccount();
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }, 2500);
});

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

generateMatrixChars();

// ============================================
// DEMO ACCOUNT SYSTEM
// ============================================

function loadDemoAccount() {
    const saved = localStorage.getItem('fineAccountData');
    if (saved) {
        demoAccount = JSON.parse(saved);
    } else {
        demoAccount = {
            balance: 100.00,
            portfolio: {},
            history: []
        };
        saveDemoAccount();
    }
}

function saveDemoAccount() {
    localStorage.setItem('fineAccountData', JSON.stringify(demoAccount));
}

function updateBalanceDisplay() {
    document.getElementById('accountBalance').textContent = '$' + demoAccount.balance.toFixed(2);
    document.getElementById('balanceDisplay').textContent = '$' + demoAccount.balance.toFixed(2);
}

// ============================================
// AUTHENTICATION FLOW
// ============================================

function showAuthScreen(type) {
    mainContainer.style.display = 'none';
    ticker.style.display = 'none';
    authScreen.classList.add('show');
    
    const authButton = document.getElementById('authButton');
    authButton.textContent = type === 'Вхід' ? 'AUTHENTICATE' : 'REGISTER';
}

function handleAuth(event) {
    event.preventDefault();
    
    const username = document.getElementById('authUsername').value;
    const password = document.getElementById('authPassword').value;
    
    if (!username || !password) return;

    const loadingBar = document.getElementById('authLoadingBar');
    loadingBar.style.display = 'block';

    setTimeout(() => {
        isAuthenticated = true;
        authScreen.classList.remove('show');
        mainContainer.style.display = 'none';
        ticker.style.display = 'none';
        terminalPage.classList.add('show');
        updateBalanceDisplay();
        
        startPumpDetection();
    }, 2000);
}

function handleLogout() {
    isAuthenticated = false;
    terminalPage.classList.remove('show');
    mainContainer.style.display = 'block';
    ticker.style.display = 'block';
    document.getElementById('authUsername').value = '';
    document.getElementById('authPassword').value = '';
    closeTradeModal();
    stopPumpDetection();
}

// ============================================
// TRADING MODAL
// ============================================

function openTradeModal(element, symbol, name, price) {
    selectedCoinSymbol = symbol;
    selectedCoinName = name;
    selectedCoinPrice = price * (0.8 + Math.random() * 0.4); // Simulate price variation
    
    document.getElementById('modalCoinName').textContent = name;
    document.getElementById('currentPrice').textContent = '$' + selectedCoinPrice.toExponential(8);
    document.getElementById('tradeAmount').value = '';
    document.getElementById('tradeQuantity').textContent = '0';
    currentTradeType = 'buy';
    
    updateTradeButtons();
    updatePortfolioDisplay();
    updateHistoryDisplay();
    
    tradingModal.style.display = 'flex';
    tradingModal.style.animation = 'fadeIn 0.3s ease-out';
}

function closeTradeModal() {
    tradingModal.style.display = 'none';
}

function switchTradeTab(type) {
    currentTradeType = type;
    document.querySelectorAll('.trade-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    updateTradeButtons();
}

function updateTradeButtons() {
    const btn = document.getElementById('tradeButton');
    if (currentTradeType === 'buy') {
        btn.textContent = 'BUY NOW';
        btn.className = 'trade-btn buy-btn';
    } else {
        btn.textContent = 'SELL NOW';
        btn.className = 'trade-btn sell-btn';
    }
}

// Update quantity when amount changes
document.addEventListener('input', (e) => {
    if (e.target.id === 'tradeAmount') {
        const amount = parseFloat(e.target.value) || 0;
        const quantity = amount / selectedCoinPrice;
        document.getElementById('tradeQuantity').textContent = quantity.toFixed(8);
    }
});

function executeTrade() {
    const amount = parseFloat(document.getElementById('tradeAmount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    if (currentTradeType === 'buy') {
        if (amount > demoAccount.balance) {
            alert('Insufficient balance!');
            return;
        }
        
        const quantity = amount / selectedCoinPrice;
        demoAccount.balance -= amount;
        demoAccount.portfolio[selectedCoinSymbol] = (demoAccount.portfolio[selectedCoinSymbol] || 0) + quantity;
        
        demoAccount.history.push({
            type: 'BUY',
            symbol: selectedCoinSymbol,
            name: selectedCoinName,
            amount: amount,
            quantity: quantity,
            price: selectedCoinPrice,
            date: new Date().toLocaleString('uk-UA')
        });
    } else {
        // SELL
        const availableQty = demoAccount.portfolio[selectedCoinSymbol] || 0;
        const quantity = amount / selectedCoinPrice;
        
        if (quantity > availableQty) {
            alert('Insufficient coins to sell!');
            document.getElementById('sellWarning').style.display = 'block';
            return;
        }
        
        demoAccount.portfolio[selectedCoinSymbol] -= quantity;
        if (demoAccount.portfolio[selectedCoinSymbol] < 0.00000001) {
            delete demoAccount.portfolio[selectedCoinSymbol];
        }
        
        demoAccount.balance += amount;
        
        demoAccount.history.push({
            type: 'SELL',
            symbol: selectedCoinSymbol,
            name: selectedCoinName,
            amount: amount,
            quantity: quantity,
            price: selectedCoinPrice,
            date: new Date().toLocaleString('uk-UA')
        });
    }
    
    saveDemoAccount();
    updateBalanceDisplay();
    updatePortfolioDisplay();
    updateHistoryDisplay();
    document.getElementById('tradeAmount').value = '';
    document.getElementById('tradeQuantity').textContent = '0';
    document.getElementById('sellWarning').style.display = 'none';
}

function updatePortfolioDisplay() {
    const portfolioList = document.getElementById('portfolioList');
    portfolioList.innerHTML = '';
    
    let hasCoins = false;
    for (const [symbol, quantity] of Object.entries(demoAccount.portfolio)) {
        if (quantity > 0) {
            hasCoins = true;
            const coinData = coinDataMap[symbol];
            const price = coinData ? coinData.basePrice * (0.8 + Math.random() * 0.4) : 0;
            const value = quantity * price;
            
            const item = document.createElement('div');
            item.className = 'portfolio-item';
            item.innerHTML = `
                <div style="display: flex; justify-content: space-between;">
                    <span>${symbol}</span>
                    <span>${quantity.toFixed(8)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-dim);">
                    <span>@$${price.toExponential(4)}</span>
                    <span>= $${value.toFixed(2)}</span>
                </div>
            `;
            portfolioList.appendChild(item);
        }
    }
    
    if (!hasCoins) {
        portfolioList.innerHTML = '<div style="color: var(--text-dim); font-size: 10px;">Empty</div>';
    }
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    const recent = demoAccount.history.slice(-5).reverse();
    if (recent.length === 0) {
        historyList.innerHTML = '<div style="color: var(--text-dim); font-size: 10px;">No transactions</div>';
        return;
    }
    
    recent.forEach(trade => {
        const item = document.createElement('div');
        item.className = `history-item ${trade.type.toLowerCase()}`;
        const color = trade.type === 'BUY' ? '#00ff88' : '#ff4444';
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between;">
                <span style="color: ${color}; font-weight: bold;">${trade.type}</span>
                <span>${trade.quantity.toFixed(8)} ${trade.symbol}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: var(--text-dim);">
                <span>${trade.date}</span>
                <span>$${trade.amount.toFixed(2)}</span>
            </div>
        `;
        historyList.appendChild(item);
    });
}

// ============================================
// TERMINAL FUNCTIONALITY
// ============================================

function selectCoin(element, symbol, coinName) {
    document.querySelectorAll('.coin-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    
    let coinData = coinDataMap[symbol];
    if (!coinData) {
        coinData = {
            name: coinName,
            symbol: symbol.toUpperCase() + 'USDT',
            pair: symbol.toUpperCase()
        };
        coinDataMap[symbol] = coinData;
    }
    
    const chartHeader = document.getElementById('chartHeader');
    chartHeader.textContent = `📈 ${coinName} (${coinData.pair}/USDT) - LIVE CHART`;
    
    const chartContainer = document.querySelector('.chart-container');
    const chartIframe = document.querySelector('.chart-iframe');
    
    const newIframe = document.createElement('iframe');
    newIframe.className = 'chart-iframe';
    newIframe.src = `https://s.tradingview.com/widgetembed/?symbol=BINANCE%3A${coinData.symbol}&interval=1&theme=dark&style=1`;
    newIframe.frameBorder = '0';
    
    chartIframe.parentNode.replaceChild(newIframe, chartIframe);
    
    newIframe.style.opacity = '0';
    newIframe.style.transition = 'opacity 0.3s ease-in';
    setTimeout(() => {
        newIframe.style.opacity = '1';
    }, 10);
}

// ============================================
// PUMP DETECTION SYSTEM
// ============================================

let pumpDetectionInterval = null;

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
    }, 12000);
}

function stopPumpDetection() {
    if (pumpDetectionInterval) {
        clearInterval(pumpDetectionInterval);
        pumpDetectionInterval = null;
    }
}

function addNewPumpCoin(symbol, name, price, change) {
    const newCoinsSection = document.getElementById('newCoinsSection');
    const newCoinsList = document.getElementById('newCoinsList');
    
    newCoinsSection.style.display = 'block';
    
    const existingCoins = newCoinsList.querySelectorAll('.coin-item');
    for (let coin of existingCoins) {
        if (coin.textContent.includes(name)) {
            return;
        }
    }
    
    const coinElement = document.createElement('div');
    coinElement.className = 'coin-item new-pump';
    const basePrice = parseFloat(price.replace('$', ''));
    coinElement.innerHTML = `
        <div class="coin-name">${name}</div>
        <div class="coin-price" data-price="${basePrice}">${price}</div>
        <div class="coin-change positive">${change}</div>
    `;
    
    coinElement.onclick = () => {
        openTradeModal(coinElement, symbol, name, basePrice);
        selectCoin(coinElement, symbol, name);
    };
    
    newCoinsList.insertBefore(coinElement, newCoinsList.firstChild);
    showPumpNotification(symbol, name, change);
    
    const coins = newCoinsList.querySelectorAll('.coin-item');
    if (coins.length > 5) {
        coins[coins.length - 1].remove();
    }
}

function showPumpNotification(symbol, name, change) {
    const notification = document.getElementById('pumpNotification');
    const title = document.getElementById('pumpTitle');
    const details = document.getElementById('pumpDetails');
    
    title.textContent = `🚀 ${symbol} PUMP DETECTED`;
    details.textContent = `${name} is up ${change}! Added to your watchlist.`;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// ============================================
// CURSOR SYSTEM
// ============================================

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

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

function nextCursor() {
    if (!isCustom) return;
    
    cursor.classList.remove(cursorTypes[currentIndex].class);
    
    currentIndex = (currentIndex + 1) % cursorTypes.length;
    
    cursor.classList.add(cursorTypes[currentIndex].class);
    
    styleBtn.innerText = "Style: " + cursorTypes[currentIndex].name;
}
