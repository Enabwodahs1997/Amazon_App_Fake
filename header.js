// Cart state
export let cart = [];
const CART_STORAGE_KEY = "amazon_cart";

const loadCart = () => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.warn("Failed to load cart from storage:", error);
        return [];
    }
};

const saveCart = () => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.warn("Failed to save cart to storage:", error);
    }
};

// Get cart button - it's in the header
const cartButton = document.querySelector('header button[onclick*="checkout"]');

// Function to update cart display
export function updateCartDisplay() {
    if (!cartButton) {
        return;
    }
    cartButton.textContent = `🛒 Cart (${cart.length})`;
}

// Function to add item to cart
function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    if (!productCard) {
        return;
    }

    const nameEl = productCard.querySelector('h3') || productCard.querySelector('a');
    const priceEl = productCard.querySelector('.price');

    if (!nameEl || !priceEl) {
        return;
    }

    const productName = nameEl.textContent.trim();
    const productPrice = priceEl.textContent.trim();
    
    cart.push({ name: productName, price: productPrice });
    saveCart();
    updateCartDisplay();
}

// Export function to add item to cart from product details
export function addItemToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    updateCartDisplay();
}

// Export function to load cart
export function getCart() {
    return cart;
}

// Restore cart before wiring events so the count is correct.
cart = loadCart();
updateCartDisplay();

// Attach listeners to all "Add to Cart" buttons
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', addToCart);
});

const shippingItems = document.querySelectorAll('.shipping-time');
if (shippingItems.length) {
    const addDays = (date, days) => {
        const next = new Date(date);
        next.setDate(next.getDate() + days);
        return next;
    };

    const formatDate = (date) => date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });

    const today = new Date();

    shippingItems.forEach(item => {
        const minDays = Number.parseInt(item.dataset.min, 10);
        const maxDays = Number.parseInt(item.dataset.max, 10);
        const mode = item.dataset.mode || 'range';

        if (Number.isNaN(minDays)) {
            return;
        }

        if (mode === 'by') {
            const arriveDate = addDays(today, minDays);
            item.textContent = `Get it by ${formatDate(arriveDate)}`;
            return;
        }

        if (!Number.isNaN(maxDays) && maxDays > minDays) {
            item.textContent = `Arrives in ${minDays}-${maxDays} days`;
            return;
        }

        item.textContent = `Arrives in ${minDays} days`;
    });
}