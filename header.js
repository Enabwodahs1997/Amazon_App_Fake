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

// Get cart element
const cartIcon = document.querySelector('.cart-icon');

// Function to update cart display
function updateCartDisplay() {
    if (!cartIcon) {
        return;
    }
    cartIcon.textContent = `🛒 Cart (${cart.length})`;
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

// Restore cart before wiring events so the count is correct.
cart = loadCart();
updateCartDisplay();

// Attach listeners to all "Add to Cart" buttons
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', addToCart);
});