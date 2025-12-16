// Food Budget Pro - Professional Food Planner with Real-time Pricing
// Main Application State
const AppState = {
    users: {},
    loggedIn: false,
    currentUser: "",
    selectedItems: [],
    foodPrices: {},
    lastPriceUpdate: null,
    isLoading: false,
    pricingMode: 'auto', // 'auto' or 'custom'
    currency: 'USD',
    conversionType: 1, // 1: 1 INR = 1 INR, 2: 1 USD = 1 USD, 3: 1 INR = X USD, 4: 1 USD = Y INR
    inrToUsdRate: 0.012,
    usdToInrRate: 83.50,
    customPrices: {},
    quantities: {}
};

// Comprehensive Food Database with Realistic Prices (USD per unit)
const FoodDatabase = {
    vegetables: [
        { name: 'Tomato', icon: '🍅', category: 'vegetables', unit: 'lb', basePrice: 1.99, seasonality: [5, 6, 7, 8, 9] },
        { name: 'Potato', icon: '🥔', category: 'vegetables', unit: 'lb', basePrice: 0.89, seasonality: [8, 9, 10, 11] },
        { name: 'Onion', icon: '🧅', category: 'vegetables', unit: 'lb', basePrice: 0.99, seasonality: [7, 8, 9, 10] },
        { name: 'Carrot', icon: '🥕', category: 'vegetables', unit: 'lb', basePrice: 1.29, seasonality: [6, 7, 8, 9, 10] },
        { name: 'Broccoli', icon: '🥦', category: 'vegetables', unit: 'lb', basePrice: 1.79, seasonality: [3, 4, 5, 10, 11] },
        { name: 'Cabbage', icon: '🥬', category: 'vegetables', unit: 'lb', basePrice: 0.69, seasonality: [10, 11, 12, 1, 2] },
        { name: 'Spinach', icon: '🥬', category: 'vegetables', unit: 'lb', basePrice: 3.49, seasonality: [4, 5, 9, 10] },
        { name: 'Bell Pepper', icon: '🫑', category: 'vegetables', unit: 'lb', basePrice: 2.99, seasonality: [7, 8, 9] },
        { name: 'Cucumber', icon: '🥒', category: 'vegetables', unit: 'lb', basePrice: 0.99, seasonality: [6, 7, 8] },
        { name: 'Lettuce', icon: '🥬', category: 'vegetables', unit: 'head', basePrice: 1.49, seasonality: [4, 5, 6, 9, 10] },
        { name: 'Mushroom', icon: '🍄', category: 'vegetables', unit: 'lb', basePrice: 3.99, seasonality: [9, 10, 11, 12] },
        { name: 'Corn', icon: '🌽', category: 'vegetables', unit: 'each', basePrice: 0.50, seasonality: [7, 8, 9] },
        { name: 'Eggplant', icon: '🍆', category: 'vegetables', unit: 'lb', basePrice: 1.89, seasonality: [7, 8, 9] },
        { name: 'Zucchini', icon: '🥒', category: 'vegetables', unit: 'lb', basePrice: 1.29, seasonality: [6, 7, 8] },
        { name: 'Sweet Potato', icon: '🍠', category: 'vegetables', unit: 'lb', basePrice: 1.19, seasonality: [9, 10, 11] },
        { name: 'Cauliflower', icon: '🥦', category: 'vegetables', unit: 'head', basePrice: 2.99, seasonality: [9, 10, 11, 12] },
        { name: 'Green Beans', icon: '🫛', category: 'vegetables', unit: 'lb', basePrice: 2.49, seasonality: [6, 7, 8, 9] },
        { name: 'Peas', icon: '🫛', category: 'vegetables', unit: 'lb', basePrice: 2.99, seasonality: [5, 6, 11, 12] },
        { name: 'Garlic', icon: '🧄', category: 'vegetables', unit: 'head', basePrice: 1.49, seasonality: [7, 8, 9] },
        { name: 'Ginger', icon: '🫚', category: 'vegetables', unit: 'lb', basePrice: 4.99, seasonality: [] },
        { name: 'Lemon', icon: '🍋', category: 'vegetables', unit: 'lb', basePrice: 1.99, seasonality: [12, 1, 2, 3, 4] },
        { name: 'Avocado', icon: '🥑', category: 'vegetables', unit: 'each', basePrice: 1.29, seasonality: [4, 5, 6, 7, 8] }
    ],
    
    staples: [
        { name: 'Rice', icon: '🍚', category: 'staples', unit: 'lb', basePrice: 0.89 },
        { name: 'Wheat Flour', icon: '🌾', category: 'staples', unit: 'lb', basePrice: 0.59 },
        { name: 'Pasta', icon: '🍝', category: 'staples', unit: 'lb', basePrice: 1.29 },
        { name: 'Bread', icon: '🍞', category: 'staples', unit: 'loaf', basePrice: 2.99 },
        { name: 'Oats', icon: '🥣', category: 'staples', unit: 'lb', basePrice: 1.49 },
        { name: 'Cereal', icon: '🥣', category: 'staples', unit: 'box', basePrice: 3.99 },
        { name: 'Lentils', icon: '🥣', category: 'staples', unit: 'lb', basePrice: 1.79 },
        { name: 'Beans', icon: '🫘', category: 'staples', unit: 'lb', basePrice: 1.49 },
        { name: 'Chickpeas', icon: '🫘', category: 'staples', unit: 'lb', basePrice: 1.69 }
    ],
    
    dairy: [
        { name: 'Milk', icon: '🥛', category: 'dairy', unit: 'gallon', basePrice: 3.49 },
        { name: 'Eggs', icon: '🥚', category: 'dairy', unit: 'dozen', basePrice: 2.99 },
        { name: 'Butter', icon: '🧈', category: 'dairy', unit: 'lb', basePrice: 4.49 },
        { name: 'Cheese', icon: '🧀', category: 'dairy', unit: 'lb', basePrice: 5.99 },
        { name: 'Yogurt', icon: '🥛', category: 'dairy', unit: '32oz', basePrice: 3.99 },
        { name: 'Cream', icon: '🥛', category: 'dairy', unit: 'pint', basePrice: 2.49 }
    ],
    
    meat: [
        { name: 'Chicken Breast', icon: '🍗', category: 'meat', unit: 'lb', basePrice: 3.99 },
        { name: 'Chicken Thighs', icon: '🍗', category: 'meat', unit: 'lb', basePrice: 2.99 },
        { name: 'Ground Beef', icon: '🥩', category: 'meat', unit: 'lb', basePrice: 5.99 },
        { name: 'Steak', icon: '🥩', category: 'meat', unit: 'lb', basePrice: 8.99 },
        { name: 'Pork Chops', icon: '🍖', category: 'meat', unit: 'lb', basePrice: 4.49 },
        { name: 'Bacon', icon: '🥓', category: 'meat', unit: 'lb', basePrice: 6.99 },
        { name: 'Sausage', icon: '🌭', category: 'meat', unit: 'lb', basePrice: 4.99 },
        { name: 'Fish Fillet', icon: '🐟', category: 'meat', unit: 'lb', basePrice: 7.99 },
        { name: 'Salmon', icon: '🐟', category: 'meat', unit: 'lb', basePrice: 9.99 },
        { name: 'Shrimp', icon: '🦐', category: 'meat', unit: 'lb', basePrice: 12.99 },
        { name: 'Tuna', icon: '🐟', category: 'meat', unit: 'can', basePrice: 1.29 }
    ],
    
    essentials: [
        { name: 'Cooking Oil', icon: '🫙', category: 'essentials', unit: 'liter', basePrice: 3.99 },
        { name: 'Olive Oil', icon: '🫙', category: 'essentials', unit: 'liter', basePrice: 8.99 },
        { name: 'Salt', icon: '🧂', category: 'essentials', unit: 'lb', basePrice: 1.29 },
        { name: 'Pepper', icon: '🧂', category: 'essentials', unit: 'oz', basePrice: 4.99 },
        { name: 'Sugar', icon: '🍚', category: 'essentials', unit: 'lb', basePrice: 0.89 },
        { name: 'Coffee', icon: '☕', category: 'essentials', unit: 'lb', basePrice: 6.99 },
        { name: 'Tea', icon: '🍵', category: 'essentials', unit: 'box', basePrice: 3.49 },
        { name: 'Spices', icon: '🌶️', category: 'essentials', unit: 'oz', basePrice: 3.99 }
    ]
};

// Demo user for testing
AppState.users['user'] = 'pass123';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initApp();
    updateCurrentDate();
    setInterval(updateCurrentDate, 60000); // Update time every minute
});

// Initialize application
function initApp() {
    console.log('Initializing app...');
    
    // Hide loading screen first
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        console.log('Loading screen hidden');
    }
    
    showTab('login');
    setupEventListeners();
    
    // Initialize custom prices with defaults
    initializeCustomPrices();
    
    console.log('App initialized successfully');
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Budget slider
    const budgetSlider = document.getElementById('budgetSlider');
    const budgetInput = document.getElementById('budget');
    
    if (budgetSlider && budgetInput) {
        budgetSlider.addEventListener('input', (e) => {
            budgetInput.value = e.target.value;
            updateEstimatedCost();
        });
        
        budgetInput.addEventListener('input', (e) => {
            budgetSlider.value = e.target.value;
            updateEstimatedCost();
        });
    }
    
    // People input
    const peopleInput = document.getElementById('people');
    if (peopleInput) {
        peopleInput.addEventListener('input', updateEstimatedCost);
    }
    
    // Period buttons
    const periodButtons = document.querySelectorAll('.period-btn');
    periodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectPeriod(btn.dataset.period);
        });
    });
    
    // Food search
    const foodSearch = document.getElementById('foodSearch');
    if (foodSearch) {
        foodSearch.addEventListener('input', filterFoods);
    }
    
    // Enter key for login/signup
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') login();
        });
    }
    
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') signup();
        });
    }
    
    // Prevent form submission
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => e.preventDefault());
    });
    
    console.log('Event listeners setup complete');
}

// ----------- PRICING OPTION FUNCTIONS -----------
function selectPricingOption(option) {
    console.log('Selecting pricing option:', option);
    AppState.pricingMode = option;
    
    if (option === 'auto') {
        // Go directly to dashboard for auto pricing
        document.getElementById('pricingOptionPage').classList.add('hidden');
        document.getElementById('dashboardPage').classList.remove('hidden');
        document.getElementById('userNameLabel').textContent = AppState.currentUser;
        document.getElementById('pricingModeText').textContent = 'Auto Pricing';
        document.getElementById('pricingInfo').textContent = 'Prices update daily from multiple grocery APIs';
        const customPriceNote = document.getElementById('customPriceNote');
        if (customPriceNote) customPriceNote.classList.add('hidden');
        
        updateCurrencyDisplay();
        resetPlanner();
        loadFoodPrices();
        showNotification('Auto pricing enabled. Prices will update automatically.', 'success');
    } else {
        // Show custom pricing page
        document.getElementById('pricingOptionPage').classList.add('hidden');
        document.getElementById('customPricingPage').classList.remove('hidden');
        loadCustomPricingCategory('vegetables');
        updateCustomTotalEstimate();
    }
}

function goBackToLogin() {
    document.getElementById('pricingOptionPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}

function goBackToPricingOptions() {
    document.getElementById('customPricingPage').classList.add('hidden');
    document.getElementById('pricingOptionPage').classList.remove('hidden');
}

// ----------- CURRENCY AND CONVERSION FUNCTIONS -----------
function changeCurrency() {
    const currencySelect = document.getElementById('currency');
    if (!currencySelect) return;
    
    AppState.currency = currencySelect.value;
    
    // Update UI based on conversion type
    updateConversionUI();
    updateCustomPriceDisplays();
    updateCustomTotalEstimate();
}

function changeConversionType(type) {
    AppState.conversionType = parseInt(type);
    
    // Enable/disable rate inputs based on selection
    const inrToUsdInput = document.getElementById('inrToUsdRate');
    const usdToInrInput = document.getElementById('usdToInrRate');
    
    if (inrToUsdInput) {
        inrToUsdInput.disabled = type !== '3';
    }
    if (usdToInrInput) {
        usdToInrInput.disabled = type !== '4';
    }
    
    // Update UI
    updateConversionUI();
    updateCustomPriceDisplays();
    updateCustomTotalEstimate();
}

function updateCustomRate(type, value) {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
        if (type === 'inrToUsd') {
            AppState.inrToUsdRate = numValue;
            // Auto-update the other rate
            AppState.usdToInrRate = 1 / numValue;
            const usdToInrInput = document.getElementById('usdToInrRate');
            if (usdToInrInput) {
                usdToInrInput.value = AppState.usdToInrRate.toFixed(4);
            }
        } else {
            AppState.usdToInrRate = numValue;
            // Auto-update the other rate
            AppState.inrToUsdRate = 1 / numValue;
            const inrToUsdInput = document.getElementById('inrToUsdRate');
            if (inrToUsdInput) {
                inrToUsdInput.value = AppState.inrToUsdRate.toFixed(4);
            }
        }
        
        updateCustomPriceDisplays();
        updateCustomTotalEstimate();
    }
}

function updateConversionUI() {
    // Update rate input values based on current conversion type
    const inrToUsdInput = document.getElementById('inrToUsdRate');
    const usdToInrInput = document.getElementById('usdToInrRate');
    
    if (inrToUsdInput) {
        inrToUsdInput.value = AppState.inrToUsdRate.toFixed(4);
        inrToUsdInput.disabled = AppState.conversionType !== 3;
    }
    if (usdToInrInput) {
        usdToInrInput.value = AppState.usdToInrRate.toFixed(2);
        usdToInrInput.disabled = AppState.conversionType !== 4;
    }
    
    // Update radio buttons
    document.querySelectorAll('input[name="conversionRate"]').forEach(radio => {
        radio.checked = parseInt(radio.value) === AppState.conversionType;
    });
}

function getExchangeRate() {
    switch (AppState.conversionType) {
        case 1: // 1 INR = 1 INR
            return AppState.currency === 'USD' ? 0 : 1;
        case 2: // 1 USD = 1 USD
            return AppState.currency === 'USD' ? 1 : 83.50; // Default fallback
        case 3: // 1 INR = X USD
            return AppState.currency === 'USD' ? AppState.inrToUsdRate : 1 / AppState.inrToUsdRate;
        case 4: // 1 USD = Y INR
            return AppState.currency === 'USD' ? 1 : AppState.usdToInrRate;
        default:
            return AppState.currency === 'USD' ? 1 : 83.50;
    }
}

function convertPrice(price) {
    if (AppState.currency === 'USD') {
        // Convert to USD if needed
        if (AppState.conversionType === 1) {
            // 1 INR = 1 INR, so price is already in INR, convert to USD using default rate
            return price * 0.012;
        } else if (AppState.conversionType === 2) {
            // 1 USD = 1 USD, price is already in USD
            return price;
        } else if (AppState.conversionType === 3) {
            // 1 INR = X USD
            return price * AppState.inrToUsdRate;
        } else {
            // 1 USD = Y INR, price is in USD
            return price;
        }
    } else {
        // Convert to INR if needed
        if (AppState.conversionType === 1) {
            // 1 INR = 1 INR, price is in INR
            return price;
        } else if (AppState.conversionType === 2) {
            // 1 USD = 1 USD, convert to INR using default rate
            return price * 83.50;
        } else if (AppState.conversionType === 3) {
            // 1 INR = X USD, price is in USD, convert to INR
            return price / AppState.inrToUsdRate;
        } else {
            // 1 USD = Y INR
            return price * AppState.usdToInrRate;
        }
    }
}

// ----------- CUSTOM PRICING FUNCTIONS -----------
function initializeCustomPrices() {
    // Initialize with default prices
    Object.keys(FoodDatabase).forEach(category => {
        FoodDatabase[category].forEach(item => {
            const key = `${item.category}_${item.name}`;
            AppState.customPrices[key] = item.basePrice;
            AppState.quantities[key] = 1; // Default quantity
        });
    });
}

function showCategory(category) {
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.category-tab').forEach(tab => {
        if (tab.textContent.includes(category.charAt(0).toUpperCase() + category.slice(1))) {
            tab.classList.add('active');
        }
    });
    
    // Update category title
    const currentCategoryElement = document.getElementById('currentCategory');
    if (currentCategoryElement) {
        currentCategoryElement.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    // Load items for this category
    loadCustomPricingCategory(category);
}

function loadCustomPricingCategory(category) {
    const itemsGrid = document.getElementById('customItemsGrid');
    if (!itemsGrid) return;
    
    const items = FoodDatabase[category] || [];
    
    itemsGrid.innerHTML = '';
    
    items.forEach(item => {
        const key = `${item.category}_${item.name}`;
        const customPrice = AppState.customPrices[key] || item.basePrice;
        const quantity = AppState.quantities[key] || 1;
        const convertedPrice = convertPrice(customPrice);
        const total = convertedPrice * quantity;
        
        const itemCard = document.createElement('div');
        itemCard.className = 'custom-item-card';
        
        itemCard.innerHTML = `
            <div class="custom-item-header">
                <div class="item-icon-large">${item.icon}</div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="item-unit">${item.unit}</div>
                </div>
            </div>
            
            <div class="custom-item-controls">
                <div class="price-input-group">
                    <label><i class="fas fa-tag"></i> Price per ${item.unit} (in ${AppState.currency})</label>
                    <div class="price-input-wrapper">
                        <span class="currency-symbol">${getCurrencySymbol()}</span>
                        <input type="number" 
                               min="0.01" 
                               step="0.01" 
                               value="${convertedPrice.toFixed(2)}"
                               onchange="updateCustomPrice('${key}', this.value)"
                               oninput="updateCustomTotalEstimate()">
                    </div>
                </div>
                
                <div class="quantity-controls">
                    <label><i class="fas fa-weight"></i> Quantity (0-20)</label>
                    <div class="quantity-input">
                        <button class="quantity-btn" onclick="adjustQuantity('${key}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <div class="quantity-display">${quantity}</div>
                        <button class="quantity-btn" onclick="adjustQuantity('${key}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <div class="quantity-slider">
                            <input type="range" 
                                   min="0" 
                                   max="20" 
                                   value="${quantity}"
                                   oninput="updateQuantityFromSlider('${key}', this.value)">
                        </div>
                    </div>
                </div>
                
                <div class="item-total">
                    <span>Item Total:</span>
                    <span class="total-amount">${getCurrencySymbol()}${total.toFixed(2)}</span>
                </div>
            </div>
        `;
        
        itemsGrid.appendChild(itemCard);
    });
}

function updateCustomPrice(itemKey, price) {
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice) && numPrice >= 0) {
        // Convert back to USD for storage
        let basePrice;
        if (AppState.currency === 'USD') {
            basePrice = numPrice;
        } else {
            // Convert from INR to USD for storage
            if (AppState.conversionType === 1) {
                basePrice = numPrice * 0.012; // Default conversion
            } else if (AppState.conversionType === 2) {
                basePrice = numPrice / 83.50; // Default conversion
            } else if (AppState.conversionType === 3) {
                basePrice = numPrice * AppState.inrToUsdRate;
            } else {
                basePrice = numPrice / AppState.usdToInrRate;
            }
        }
        
        AppState.customPrices[itemKey] = basePrice;
        updateCustomTotalEstimate();
    }
}

function adjustQuantity(itemKey, change) {
    const currentQuantity = AppState.quantities[itemKey] || 1;
    let newQuantity = currentQuantity + change;
    
    // Limit between 0 and 20
    newQuantity = Math.max(0, Math.min(20, newQuantity));
    
    AppState.quantities[itemKey] = newQuantity;
    
    // Update UI
    updateCustomQuantityDisplay(itemKey, newQuantity);
    updateCustomTotalEstimate();
}

function updateQuantityFromSlider(itemKey, value) {
    const quantity = parseInt(value);
    AppState.quantities[itemKey] = quantity;
    
    // Update UI
    updateCustomQuantityDisplay(itemKey, quantity);
    updateCustomTotalEstimate();
}

function updateCustomQuantityDisplay(itemKey, quantity) {
    // Find and update the quantity display for this item
    const items = document.querySelectorAll('.custom-item-card');
    items.forEach(item => {
        const input = item.querySelector('input[type="number"]');
        if (input && input.onchange && input.onchange.toString().includes(itemKey)) {
            const quantityDisplay = item.querySelector('.quantity-display');
            const slider = item.querySelector('input[type="range"]');
            const totalElement = item.querySelector('.total-amount');
            
            if (quantityDisplay) quantityDisplay.textContent = quantity;
            if (slider) slider.value = quantity;
            
            // Update total
            const basePrice = AppState.customPrices[itemKey] || 0;
            const convertedPrice = convertPrice(basePrice);
            const total = convertedPrice * quantity;
            if (totalElement) {
                totalElement.textContent = `${getCurrencySymbol()}${total.toFixed(2)}`;
            }
        }
    });
}

function updateCustomPriceDisplays() {
    // Update all price input displays with current currency
    const priceInputs = document.querySelectorAll('.price-input-wrapper input');
    priceInputs.forEach(input => {
        const match = input.onchange?.toString().match(/updateCustomPrice\('(.+?)'/);
        if (match) {
            const itemKey = match[1];
            const basePrice = AppState.customPrices[itemKey] || 0;
            const convertedPrice = convertPrice(basePrice);
            input.value = convertedPrice.toFixed(2);
        }
    });
    
    // Update currency symbols
    const currencySymbols = document.querySelectorAll('.currency-symbol');
    const symbol = getCurrencySymbol();
    currencySymbols.forEach(span => {
        span.textContent = symbol;
    });
    
    // Update totals
    updateCustomTotalEstimate();
}

function updateCustomTotalEstimate() {
    let total = 0;
    
    Object.keys(AppState.customPrices).forEach(key => {
        const basePrice = AppState.customPrices[key] || 0;
        const convertedPrice = convertPrice(basePrice);
        const quantity = AppState.quantities[key] || 1;
        total += convertedPrice * quantity;
    });
    
    const totalElement = document.getElementById('customTotalEstimate');
    if (totalElement) {
        totalElement.textContent = `${getCurrencySymbol()}${total.toFixed(2)}`;
    }
}

function applyDefaultPrices() {
    // Get current category
    const currentCategoryElement = document.getElementById('currentCategory');
    if (!currentCategoryElement) return;
    
    const currentCategory = currentCategoryElement.textContent.toLowerCase();
    const items = FoodDatabase[currentCategory] || [];
    
    items.forEach(item => {
        const key = `${item.category}_${item.name}`;
        AppState.customPrices[key] = item.basePrice;
        AppState.quantities[key] = 1;
    });
    
    // Reload the category
    loadCustomPricingCategory(currentCategory);
    updateCustomTotalEstimate();
    
    showNotification('Default prices applied to current category', 'success');
}

function resetCustomPrices() {
    if (confirm('Are you sure you want to reset all custom prices to default?')) {
        initializeCustomPrices();
        loadCustomPricingCategory('vegetables');
        updateCustomTotalEstimate();
        showNotification('All custom prices reset to default', 'info');
    }
}

function saveCustomPrices() {
    // Update AppState with custom pricing mode
    AppState.pricingMode = 'custom';
    
    // Go to dashboard
    document.getElementById('customPricingPage').classList.add('hidden');
    document.getElementById('dashboardPage').classList.remove('hidden');
    const userNameLabel = document.getElementById('userNameLabel');
    if (userNameLabel) userNameLabel.textContent = AppState.currentUser;
    
    const pricingModeText = document.getElementById('pricingModeText');
    if (pricingModeText) pricingModeText.textContent = 'Custom Pricing';
    
    const pricingInfo = document.getElementById('pricingInfo');
    if (pricingInfo) pricingInfo.textContent = 'Using custom prices entered by you';
    
    const customPriceNote = document.getElementById('customPriceNote');
    if (customPriceNote) customPriceNote.classList.remove('hidden');
    
    updateCurrencyDisplay();
    resetPlanner();
    showNotification('Custom pricing saved. You can now plan with your custom prices.', 'success');
}

// ----------- AUTHENTICATION -----------
function showTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginTabBtn = document.getElementById('loginTabBtn');
    const signupTabBtn = document.getElementById('signupTabBtn');
    
    if (!loginTab || !signupTab || !loginTabBtn || !signupTabBtn) return;
    
    loginTab.classList.toggle('hidden', tab !== 'login');
    signupTab.classList.toggle('hidden', tab !== 'signup');
    
    loginTabBtn.classList.toggle('active', tab === 'login');
    signupTabBtn.classList.toggle('active', tab === 'signup');
    
    const loginError = document.getElementById('loginError');
    const signupError = document.getElementById('signupError');
    if (loginError) loginError.textContent = '';
    if (signupError) signupError.textContent = '';
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const button = input.parentNode.querySelector('.show-password');
    if (!button) return;
    
    const icon = button.querySelector('i');
    if (!icon) return;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (!usernameInput || !passwordInput) {
        showNotification('Login form elements not found', 'error');
        return;
    }
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    if (!username || !password) {
        showNotification('Please enter both username and password', 'error');
        return;
    }
    
    if (AppState.users[username] === password) {
        AppState.loggedIn = true;
        AppState.currentUser = username;
        
        // Show pricing option page after successful login
        const loginPage = document.getElementById('loginPage');
        const pricingOptionPage = document.getElementById('pricingOptionPage');
        
        if (loginPage) loginPage.classList.add('hidden');
        if (pricingOptionPage) pricingOptionPage.classList.remove('hidden');
        
        showNotification(`Welcome back, ${username}!`, 'success');
    } else {
        showNotification('Invalid username or password', 'error');
    }
}

function signup() {
    const usernameInput = document.getElementById('newUsername');
    const passwordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (!usernameInput || !passwordInput || !confirmPasswordInput) {
        showNotification('Signup form elements not found', 'error');
        return;
    }
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (!username || !password) {
        showNotification('Please enter both username and password', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (username.length < 3) {
        showNotification('Username must be at least 3 characters', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (AppState.users[username]) {
        showNotification('Username already exists', 'error');
        return;
    }
    
    AppState.users[username] = password;
    showNotification('Account created successfully! Please login.', 'success');
    
    // Clear form
    usernameInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    
    setTimeout(() => showTab('login'), 1500);
}

function logout() {
    AppState.loggedIn = false;
    AppState.currentUser = "";
    AppState.selectedItems = [];
    
    const dashboardPage = document.getElementById('dashboardPage');
    const loginPage = document.getElementById('loginPage');
    
    if (dashboardPage) dashboardPage.classList.add('hidden');
    if (loginPage) loginPage.classList.remove('hidden');
    
    // Clear login form
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';
    
    showNotification('Logged out successfully', 'info');
}

// ----------- DASHBOARD FUNCTIONS -----------
function changePricingMode() {
    if (confirm('Changing pricing mode will reset your current selections. Continue?')) {
        const dashboardPage = document.getElementById('dashboardPage');
        const pricingOptionPage = document.getElementById('pricingOptionPage');
        
        if (dashboardPage) dashboardPage.classList.add('hidden');
        if (pricingOptionPage) pricingOptionPage.classList.remove('hidden');
        resetPlanner();
    }
}

function getCurrencySymbol() {
    return AppState.currency === 'USD' ? '$' : '₹';
}

function formatPrice(price) {
    return `${getCurrencySymbol()}${price.toFixed(2)}`;
}

function updateCurrencyDisplay() {
    const currencyDisplay = document.getElementById('currencyDisplay');
    const budgetCurrency = document.getElementById('budgetCurrency');
    const minBudget = document.getElementById('minBudget');
    const maxBudget = document.getElementById('maxBudget');
    
    if (currencyDisplay) {
        currencyDisplay.innerHTML = AppState.currency === 'USD' 
            ? '<i class="fas fa-dollar-sign"></i> USD'
            : '<i class="fas fa-rupee-sign"></i> INR';
    }
    
    if (budgetCurrency) {
        budgetCurrency.textContent = getCurrencySymbol();
    }
    
    if (minBudget && maxBudget) {
        if (AppState.currency === 'USD') {
            minBudget.textContent = '$50';
            maxBudget.textContent = '$1000';
        } else {
            const exchangeRate = getExchangeRate();
            minBudget.textContent = '₹' + Math.round(50 * exchangeRate);
            maxBudget.textContent = '₹' + Math.round(1000 * exchangeRate);
        }
    }
    
    // Update budget slider limits
    const budgetSlider = document.getElementById('budgetSlider');
    const budgetInput = document.getElementById('budget');
    if (budgetSlider && budgetInput) {
        if (AppState.currency === 'INR') {
            const exchangeRate = getExchangeRate();
            budgetSlider.min = Math.round(50 * exchangeRate / 50) * 50;
            budgetSlider.max = Math.round(1000 * exchangeRate / 500) * 500;
            budgetSlider.step = 500;
            budgetInput.min = Math.round(50 * exchangeRate / 10) * 10;
            budgetInput.max = 10000 * exchangeRate;
            budgetInput.step = 500;
        } else {
            budgetSlider.min = 50;
            budgetSlider.max = 1000;
            budgetSlider.step = 50;
            budgetInput.min = 10;
            budgetInput.max = 10000;
            budgetInput.step = 10;
        }
    }
    
    // Update all price displays
    renderFoodGrid();
    updateSelectedPanel();
    updateEstimatedCost();
}

// ----------- UI HELPERS -----------
function updateCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    if (!currentDateElement) return;
    
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    
    // Update last price update time
    if (AppState.lastPriceUpdate) {
        const updateElement = document.getElementById('lastUpdate');
        if (updateElement) {
            const diff = Math.floor((new Date() - AppState.lastPriceUpdate) / 60000); // minutes
            if (diff < 60) {
                updateElement.textContent = `Updated ${diff} minute${diff === 1 ? '' : 's'} ago`;
            } else {
                updateElement.textContent = `Updated today at ${AppState.lastPriceUpdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
            }
        }
    }
}

function showNotification(message, type = 'info') {
    const toast = document.getElementById('notificationToast');
    if (!toast) return;
    
    const types = {
        success: { icon: 'fas fa-check-circle', title: 'Success' },
        error: { icon: 'fas fa-exclamation-circle', title: 'Error' },
        info: { icon: 'fas fa-info-circle', title: 'Info' }
    };
    
    toast.className = `notification-toast toast-${type}`;
    toast.innerHTML = `
        <i class="${types[type].icon} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${types[type].title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.classList.remove('show')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toast.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// ----------- PLANNER FUNCTIONS -----------
function resetPlanner() {
    AppState.selectedItems = [];
    
    // Reset form values
    const exchangeRate = getExchangeRate();
    const baseBudget = AppState.currency === 'USD' ? 200 : Math.round(200 * exchangeRate);
    
    const budgetInput = document.getElementById('budget');
    const budgetSlider = document.getElementById('budgetSlider');
    const peopleInput = document.getElementById('people');
    const periodInput = document.getElementById('period');
    const foodSearch = document.getElementById('foodSearch');
    const vegCheck = document.getElementById('vegCheck');
    const nonvegCheck = document.getElementById('nonvegCheck');
    
    if (budgetInput) budgetInput.value = baseBudget;
    if (budgetSlider) budgetSlider.value = baseBudget;
    if (peopleInput) peopleInput.value = 4;
    if (periodInput) periodInput.value = 'week';
    if (foodSearch) foodSearch.value = '';
    if (vegCheck) vegCheck.checked = true;
    if (nonvegCheck) nonvegCheck.checked = true;
    
    // Reset UI
    updateSelectedPanel();
    renderFoodGrid();
    
    const resultElement = document.getElementById('result');
    if (resultElement) {
        resultElement.innerHTML = `
            <div class="empty-result">
                <i class="fas fa-shopping-basket"></i>
                <p>Your personalized shopping list will appear here</p>
                <p class="hint">Fill in your budget and select ingredients to generate</p>
            </div>
        `;
    }
    
    // Update period buttons
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.period === 'week');
    });
    
    updateEstimatedCost();
}

function selectPeriod(period) {
    const periodInput = document.getElementById('period');
    if (periodInput) periodInput.value = period;
    
    // Update button states
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.period === period);
    });
    
    updateEstimatedCost();
}

function clearSearch() {
    const foodSearch = document.getElementById('foodSearch');
    if (foodSearch) foodSearch.value = '';
    filterFoods();
}

function clearAllSelected() {
    if (AppState.selectedItems.length === 0) return;
    
    if (confirm('Are you sure you want to clear all selected items?')) {
        AppState.selectedItems = [];
        updateSelectedPanel();
        renderFoodGrid();
        updateEstimatedCost();
        showNotification('All items cleared', 'info');
    }
}

// ----------- FOOD MANAGEMENT -----------
function getAllFoodItems() {
    const vegCheck = document.getElementById('vegCheck');
    const nonvegCheck = document.getElementById('nonvegCheck');
    
    const veg = vegCheck ? vegCheck.checked : true;
    const nonveg = nonvegCheck ? nonvegCheck.checked : true;
    
    let allItems = [];
    
    // Always include staples, dairy, and essentials
    allItems = allItems.concat(
        FoodDatabase.staples,
        FoodDatabase.dairy,
        FoodDatabase.essentials
    );
    
    // Include vegetables if selected
    if (veg) {
        allItems = allItems.concat(FoodDatabase.vegetables);
    }
    
    // Include meat if selected
    if (nonveg) {
        allItems = allItems.concat(FoodDatabase.meat);
    }
    
    return allItems;
}

function renderFoodGrid() {
    const grid = document.getElementById('foodGrid');
    if (!grid) return;
    
    const items = getAllFoodItems();
    grid.innerHTML = '';
    
    items.forEach(item => {
        const isSelected = AppState.selectedItems.some(selected => selected.name === item.name);
        const currentPrice = getCurrentPrice(item);
        const convertedPrice = convertPrice(currentPrice);
        
        const div = document.createElement('div');
        div.className = `food-item ${isSelected ? 'selected' : ''}`;
        div.onclick = () => toggleFoodItem(item);
        
        div.innerHTML = `
            <div class="icon">${item.icon}</div>
            <div class="name">${item.name}</div>
            <div class="price">${formatPrice(convertedPrice)}</div>
            <div class="unit">per ${item.unit}</div>
            ${isSelected ? '<div class="selected-badge"><i class="fas fa-check"></i></div>' : ''}
        `;
        
        grid.appendChild(div);
    });
}

function filterFoods() {
    const searchTermInput = document.getElementById('foodSearch');
    if (!searchTermInput) return;
    
    const searchTerm = searchTermInput.value.toLowerCase().trim();
    const items = document.querySelectorAll('.food-item');
    
    items.forEach(item => {
        const nameElement = item.querySelector('.name');
        if (!nameElement) return;
        
        const name = nameElement.textContent.toLowerCase();
        const shouldShow = searchTerm === '' || name.includes(searchTerm);
        item.style.display = shouldShow ? 'block' : 'none';
    });
}

function toggleFoodItem(item) {
    const index = AppState.selectedItems.findIndex(i => i.name === item.name);
    
    if (index > -1) {
        // Remove if already selected
        AppState.selectedItems.splice(index, 1);
    } else {
        // Add if not selected and under limit
        if (AppState.selectedItems.length >= 35) {
            showNotification('Maximum 35 items allowed. Please remove some items first.', 'error');
            return;
        }
        
        const key = `${item.category}_${item.name}`;
        const quantity = AppState.quantities[key] || 1;
        const currentPrice = getCurrentPrice(item);
        const convertedPrice = convertPrice(currentPrice);
        
        AppState.selectedItems.push({
            ...item,
            quantity: quantity,
            price: convertedPrice,
            basePrice: currentPrice
        });
    }
    
    updateSelectedPanel();
    renderFoodGrid();
    updateEstimatedCost();
}

function updateSelectedItemQuantity(index, change) {
    if (index < 0 || index >= AppState.selectedItems.length) return;
    
    let newQuantity = AppState.selectedItems[index].quantity + change;
    newQuantity = Math.max(0, Math.min(20, newQuantity));
    
    AppState.selectedItems[index].quantity = newQuantity;
    
    // If quantity becomes 0, remove the item
    if (newQuantity === 0) {
        AppState.selectedItems.splice(index, 1);
    }
    
    updateSelectedPanel();
    renderFoodGrid();
    updateEstimatedCost();
}

function removeSelectedItem(index) {
    AppState.selectedItems.splice(index, 1);
    updateSelectedPanel();
    renderFoodGrid();
    updateEstimatedCost();
}

function updateSelectedPanel() {
    const selectedList = document.getElementById('selectedList');
    const selCount = document.getElementById('selCount');
    
    if (!selectedList) return;
    
    if (selCount) {
        selCount.textContent = AppState.selectedItems.length;
    }
    
    if (AppState.selectedItems.length === 0) {
        selectedList.innerHTML = '<p class="empty-message">No items selected yet</p>';
        return;
    }
    
    selectedList.innerHTML = '';
    AppState.selectedItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        
        const div = document.createElement('div');
        div.className = 'selected-item';
        
        div.innerHTML = `
            <div class="item-info">
                <div class="item-icon">${item.icon}</div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="quantity-control">
                        <button class="quantity-btn-small" onclick="updateSelectedItemQuantity(${index}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn-small" onclick="updateSelectedItemQuantity(${index}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <span style="margin-left: 10px; font-size: 0.8rem; color: var(--text-muted);">${item.unit}</span>
                    </div>
                </div>
            </div>
            <div style="text-align: right;">
                <div class="item-price">${formatPrice(itemTotal)}</div>
                <div class="item-total-price">${formatPrice(item.price)}/${item.unit}</div>
            </div>
            <button class="remove-item" onclick="removeSelectedItem(${index})" title="Remove">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        selectedList.appendChild(div);
    });
}

function updateFoodGrid() {
    renderFoodGrid();
    filterFoods();
}

// ----------- PRICING FUNCTIONS -----------
async function loadFoodPrices() {
    if (AppState.pricingMode === 'custom') return;
    
    showLoading(true);
    
    try {
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate fetching prices
        await simulatePriceFetch();
        
        // Update all prices based on season and market factors
        updateAllPrices();
        
        AppState.lastPriceUpdate = new Date();
        updateCurrentDate();
        
        showNotification('Food prices updated successfully', 'success');
    } catch (error) {
        console.error('Failed to load prices:', error);
        showNotification('Using cached prices. Some data may be outdated.', 'warning');
    } finally {
        showLoading(false);
    }
}

async function simulatePriceFetch() {
    // Simulate API delay
    return new Promise(resolve => setTimeout(resolve, 800));
}

function getCurrentPrice(item) {
    if (AppState.pricingMode === 'custom') {
        const key = `${item.category}_${item.name}`;
        return AppState.customPrices[key] || item.basePrice;
    }
    
    let price = item.basePrice;
    const now = new Date();
    const month = now.getMonth() + 1; // 1-12
    
    // Apply seasonality adjustment
    if (item.seasonality && item.seasonality.length > 0) {
        const isInSeason = item.seasonality.includes(month);
        if (!isInSeason) {
            price *= 1.3; // 30% more expensive out of season
        } else {
            price *= 0.9; // 10% cheaper in season
        }
    }
    
    // Apply weekend premium
    const day = now.getDay(); // 0-6
    if (day === 0 || day === 6) { // Weekend
        price *= 1.05; // 5% weekend premium
    }
    
    // Apply small random variation (±5%)
    const variation = 0.95 + Math.random() * 0.1;
    price *= variation;
    
    // Round to 2 decimal places
    return Math.round(price * 100) / 100;
}

function updateAllPrices() {
    if (AppState.pricingMode === 'custom') return;
    
    // Update prices for all items in the database
    const allItems = getAllFoodItems();
    allItems.forEach(item => {
        item.currentPrice = getCurrentPrice(item);
    });
    
    // Update selected items' prices
    AppState.selectedItems.forEach(item => {
        const currentPrice = getCurrentPrice(item);
        item.price = convertPrice(currentPrice);
        item.basePrice = currentPrice;
    });
    
    // Update UI
    renderFoodGrid();
    updateSelectedPanel();
    updateEstimatedCost();
}

function updateEstimatedCost() {
    const budgetInput = document.getElementById('budget');
    const peopleInput = document.getElementById('people');
    const periodInput = document.getElementById('period');
    
    if (!budgetInput || !peopleInput || !periodInput) return;
    
    const budget = parseFloat(budgetInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;
    const period = periodInput.value;
    
    let totalCost = 0;
    AppState.selectedItems.forEach(item => {
        totalCost += item.price * item.quantity;
    });
    
    // Add essentials cost based on period and people
    const essentialsMultiplier = {
        day: 2,
        week: 10,
        month: 40
    };
    
    const essentialsCost = people * (essentialsMultiplier[period] || 10);
    const convertedEssentialsCost = convertPrice(essentialsCost);
    totalCost += convertedEssentialsCost;
    
    // Update UI
    const estimatedCostElement = document.getElementById('estimatedCost');
    if (estimatedCostElement) {
        estimatedCostElement.textContent = formatPrice(totalCost);
        
        // Color code based on budget
        if (budget > 0) {
            const percentage = (totalCost / budget) * 100;
            if (percentage > 100) {
                estimatedCostElement.style.color = '#f72585'; // Danger
            } else if (percentage > 80) {
                estimatedCostElement.style.color = '#f8961e'; // Warning
            } else {
                estimatedCostElement.style.color = '#4cc9f0'; // Success
            }
        }
    }
}

// ----------- GENERATE SHOPPING LIST -----------
async function generateList() {
    const budgetInput = document.getElementById('budget');
    const peopleInput = document.getElementById('people');
    const periodInput = document.getElementById('period');
    
    if (!budgetInput || !peopleInput || !periodInput) {
        showNotification('Form elements not found', 'error');
        return;
    }
    
    const budget = parseFloat(budgetInput.value);
    const people = parseInt(peopleInput.value);
    const period = periodInput.value;
    
    // Validation
    const minBudget = AppState.currency === 'USD' ? 10 : 830;
    if (!budget || budget < minBudget) {
        showNotification(`Please enter a budget of at least ${formatPrice(minBudget)}`, 'error');
        return;
    }
    
    if (!people || people < 1 || people > 20) {
        showNotification('Please enter number of people (1-20)', 'error');
        return;
    }
    
    if (AppState.selectedItems.length === 0) {
        showNotification('Please select at least one ingredient', 'error');
        return;
    }
    
    // Show loading
    const generateBtn = document.getElementById('generateBtn');
    const loader = document.getElementById('generatingLoader');
    
    if (generateBtn) generateBtn.disabled = true;
    if (loader) loader.classList.remove('hidden');
    
    try {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Update prices before generation (only for auto mode)
        if (AppState.pricingMode === 'auto') {
            updateAllPrices();
        }
        
        // Generate shopping list
        const shoppingList = calculateShoppingList(budget, people, period);
        
        // Display results
        displayResults(shoppingList, budget, people, period);
        
        showNotification('Shopping list generated successfully!', 'success');
    } catch (error) {
        console.error('Error generating list:', error);
        showNotification('Failed to generate shopping list. Please try again.', 'error');
    } finally {
        if (generateBtn) generateBtn.disabled = false;
        if (loader) loader.classList.add('hidden');
    }
}

function calculateShoppingList(budget, people, period) {
    const periodMultipliers = {
        day: { meals: 3, days: 1 },
        week: { meals: 21, days: 7 },
        month: { meals: 90, days: 30 }
    };
    
    const multiplier = periodMultipliers[period];
    if (!multiplier) return {};
    
    // Categorize items
    const categories = {
        vegetables: [],
        staples: [],
        dairy: [],
        meat: [],
        essentials: []
    };
    
    AppState.selectedItems.forEach(item => {
        const category = item.category || 'essentials';
        if (categories[category]) {
            categories[category].push(item);
        } else {
            categories.essentials.push(item);
        }
    });
    
    // Calculate results
    const results = {
        categories: {},
        totalCost: 0,
        essentialsCost: 0,
        remainingBudget: budget,
        currency: AppState.currency
    };
    
    // Process each category
    Object.keys(categories).forEach(category => {
        if (categories[category].length > 0) {
            results.categories[category] = {
                items: [],
                total: 0
            };
            
            categories[category].forEach(item => {
                const itemTotal = item.price * item.quantity;
                
                results.categories[category].items.push({
                    ...item,
                    quantity: item.quantity,
                    total: itemTotal
                });
                
                results.categories[category].total += itemTotal;
                results.totalCost += itemTotal;
            });
        }
    });
    
    // Add fixed essentials
    const baseEssentials = [
        { name: 'Cooking Oil', quantity: Math.max(1, Math.floor(people * 0.3)), unit: 'liter', basePrice: 3.99 },
        { name: 'Salt & Pepper', quantity: 1, unit: 'set', basePrice: 5.99 },
        { name: 'Spices', quantity: Math.max(1, Math.floor(people * 0.2)), unit: 'oz', basePrice: 3.99 }
    ];
    
    const essentials = baseEssentials.map(item => ({
        ...item,
        price: convertPrice(item.basePrice)
    }));
    
    results.essentialsCost = essentials.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    results.totalCost += results.essentialsCost;
    results.remainingBudget = budget - results.totalCost;
    
    results.essentials = essentials;
    
    return results;
}

function displayResults(data, budget, people, period) {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;
    
    if (!data.categories || Object.keys(data.categories).length === 0) {
        resultDiv.innerHTML = `
            <div class="empty-result">
                <i class="fas fa-exclamation-circle"></i>
                <p>Unable to generate shopping list with current selections</p>
                <p class="hint">Try adjusting your budget or selecting different items</p>
            </div>
        `;
        return;
    }
    
    const currencySymbol = getCurrencySymbol();
    
    let html = `
        <div class="shopping-list">
            <div class="list-summary">
                <h4><i class="fas fa-receipt"></i> Shopping Summary</h4>
                <div class="summary-grid">
                    <div class="summary-item">
                        <div class="summary-label">Total Budget</div>
                        <div class="summary-value">${currencySymbol}${budget.toFixed(2)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">For ${people} people</div>
                        <div class="summary-value">${period.charAt(0).toUpperCase() + period.slice(1)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Estimated Cost</div>
                        <div class="summary-value">${currencySymbol}${data.totalCost.toFixed(2)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Remaining</div>
                        <div class="summary-value">${currencySymbol}${data.remainingBudget.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            
            <div class="list-categories">
    `;
    
    // Display each category
    Object.keys(data.categories).forEach(category => {
        if (data.categories[category].items.length > 0) {
            const categoryNames = {
                vegetables: 'Vegetables & Fruits',
                staples: 'Staples & Grains',
                dairy: 'Dairy & Eggs',
                meat: 'Meat & Seafood',
                essentials: 'Pantry Essentials'
            };
            
            const icons = {
                vegetables: 'fas fa-leaf',
                staples: 'fas fa-wheat-awn',
                dairy: 'fas fa-egg',
                meat: 'fas fa-drumstick-bite',
                essentials: 'fas fa-box'
            };
            
            html += `
                <div class="category-section">
                    <div class="category-header">
                        <i class="${icons[category]}"></i>
                        <h5>${categoryNames[category]}</h5>
                        <span style="margin-left: auto; font-weight: 600;">${currencySymbol}${data.categories[category].total.toFixed(2)}</span>
                    </div>
                    <div class="category-items">
            `;
            
            data.categories[category].items.forEach(item => {
                html += `
                    <div class="list-item">
                        <div class="item-info">
                            <div class="item-icon">${item.icon}</div>
                            <div class="item-details">
                                <h5>${item.name}</h5>
                                <div class="item-unit">${item.quantity} ${item.unit}</div>
                            </div>
                        </div>
                        <div class="item-price">
                            <div class="price-amount">${currencySymbol}${(item.price * item.quantity).toFixed(2)}</div>
                            <div class="price-total">${currencySymbol}${item.price.toFixed(2)}/${item.unit}</div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        }
    });
    
    // Add essentials
    if (data.essentials && data.essentials.length > 0) {
        html += `
            <div class="essentials-note">
                <i class="fas fa-lightbulb"></i>
                <strong>Daily Essentials Included:</strong>
                ${data.essentials.map(e => `${e.quantity} ${e.unit} ${e.name}`).join(', ')}
                (${currencySymbol}${data.essentialsCost.toFixed(2)})
            </div>
        `;
    }
    
    // Budget status
    const percentage = (data.totalCost / budget) * 100;
    let statusClass = 'status-success';
    let statusMessage = 'Within Budget ✓';
    let statusIcon = 'check-circle';
    
    if (percentage > 100) {
        statusClass = 'status-danger';
        statusMessage = `Over Budget by ${currencySymbol}${(-data.remainingBudget).toFixed(2)}`;
        statusIcon = 'exclamation-circle';
    } else if (percentage > 90) {
        statusClass = 'status-warning';
        statusMessage = 'Close to Budget Limit';
        statusIcon = 'exclamation-triangle';
    }
    
    html += `
            </div>
            
            <div class="budget-status">
                <div class="${statusClass}">
                    <i class="fas fa-${statusIcon}"></i>
                    ${statusMessage}
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">
                    Budget utilization: ${percentage.toFixed(1)}% 
                    (${currencySymbol}${data.totalCost.toFixed(2)} of ${currencySymbol}${budget.toFixed(2)})
                </p>
                ${data.remainingBudget > 0 ? `
                    <p style="margin-top: 10px; color: var(--success);">
                        <i class="fas fa-coins"></i> You have ${currencySymbol}${data.remainingBudget.toFixed(2)} remaining for additional items
                    </p>
                ` : ''}
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: var(--bg-surface); border-radius: var(--border-radius);">
                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                    <i class="fas fa-info-circle"></i> 
                    <strong>Note:</strong> ${AppState.pricingMode === 'auto' ? 
                        'Prices are based on current market rates and may vary by store.' : 
                        'Using custom prices entered by you.'}
                    Consider buying in-season produce and store brands to save more.
                </p>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
}

// ----------- UTILITY FUNCTIONS -----------
function showLoading(show) {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.toggle('hidden', !show);
    }
    AppState.isLoading = show;
}

function printList() {
    const resultContent = document.getElementById('result');
    if (!resultContent) return;
    
    const originalContent = document.body.innerHTML;
    
    const printContent = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
            <h2 style="color: #4361ee;">FoodBudget Pro Shopping List</h2>
            <p>Generated on ${new Date().toLocaleDateString()} for ${AppState.currentUser}</p>
            <p>Pricing Mode: ${AppState.pricingMode === 'auto' ? 'Auto Pricing' : 'Custom Pricing'}</p>
            <p>Currency: ${AppState.currency}</p>
            <p>Conversion Type: ${getConversionTypeName()}</p>
            <hr>
            ${resultContent.innerHTML}
        </div>
    `;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    renderFoodGrid(); // Restore grid
}

function getConversionTypeName() {
    switch (AppState.conversionType) {
        case 1: return '1 INR = 1 INR';
        case 2: return '1 USD = 1 USD';
        case 3: return `1 INR = ${AppState.inrToUsdRate} USD`;
        case 4: return `1 USD = ${AppState.usdToInrRate} INR`;
        default: return 'Default Conversion';
    }
}

function exportList() {
    const data = {
        user: AppState.currentUser,
        date: new Date().toISOString(),
        pricingMode: AppState.pricingMode,
        currency: AppState.currency,
        conversionType: AppState.conversionType,
        conversionRates: {
            inrToUsd: AppState.inrToUsdRate,
            usdToInr: AppState.usdToInrRate
        },
        budget: document.getElementById('budget')?.value || 0,
        people: document.getElementById('people')?.value || 1,
        period: document.getElementById('period')?.value || 'week',
        selectedItems: AppState.selectedItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
            total: item.price * item.quantity
        })),
        generatedOn: new Date().toLocaleString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foodbudget-list-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Shopping list exported successfully', 'success');
}

// Make functions globally available
window.showTab = showTab;
window.togglePassword = togglePassword;
window.login = login;
window.signup = signup;
window.logout = logout;
window.selectPricingOption = selectPricingOption;
window.goBackToLogin = goBackToLogin;
window.goBackToPricingOptions = goBackToPricingOptions;
window.changeCurrency = changeCurrency;
window.changeConversionType = changeConversionType;
window.updateCustomRate = updateCustomRate;
window.showCategory = showCategory;
window.updateCustomPrice = updateCustomPrice;
window.adjustQuantity = adjustQuantity;
window.updateQuantityFromSlider = updateQuantityFromSlider;
window.applyDefaultPrices = applyDefaultPrices;
window.resetCustomPrices = resetCustomPrices;
window.saveCustomPrices = saveCustomPrices;
window.changePricingMode = changePricingMode;
window.resetPlanner = resetPlanner;
window.selectPeriod = selectPeriod;
window.clearSearch = clearSearch;
window.clearAllSelected = clearAllSelected;
window.updateSelectedItemQuantity = updateSelectedItemQuantity;
window.removeSelectedItem = removeSelectedItem;
window.updateFoodGrid = updateFoodGrid;
window.filterFoods = filterFoods;
window.generateList = generateList;
window.printList = printList;
window.exportList = exportList;

// Initialize on load
window.onload = function() {
    console.log('Window loaded, calling initApp...');
    initApp();
};