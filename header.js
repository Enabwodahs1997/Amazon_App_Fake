// Cart state
let cart = [];

// Get cart element
const cartIcon = document.querySelector('.cart-icon');

// Function to update cart display
function updateCartDisplay() {
    cartIcon.textContent = `🛒 Cart (${cart.length})`;
}

// Function to add item to cart
function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.price').textContent;
    
    cart.push({ name: productName, price: productPrice });
    updateCartDisplay();
}

// Attach listeners to all "Add to Cart" buttons
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Initialize cart display
updateCartDisplay();