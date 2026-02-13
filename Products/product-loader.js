import { productsData } from '../products-data.js';
import { addItemToCart, updateCartDisplay } from '../header.js';

// Initialize cart display
updateCartDisplay();

// Get product ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id')) || 1;

// Find the product
const product = productsData.find(p => p.id === productId);

if (!product) {
    window.location.href = '/main.html';
}

// Update page title
document.title = `${product.name} - Amazon`;

// Populate product hero section
document.querySelector('.product-image-large').src = product.image;
document.querySelector('.product-image-large').alt = product.name;
document.querySelector('.product-title').textContent = product.name;
document.querySelector('.product-subtitle').textContent = product.subtitle;
document.querySelector('.product-hero .stars').style.setProperty('--rating', product.rating);
document.querySelector('.product-hero .rating').setAttribute('aria-label', `Rated ${product.rating} out of 5`);
document.querySelector('.product-hero .rating-count').textContent = `(${product.reviewCount.toLocaleString()})`;
document.querySelector('.product-info .price').textContent = product.price;
document.querySelector('.in-stock').textContent = product.inStock ? 'In Stock' : 'Out of Stock';
if (!product.inStock) {
    document.querySelector('.in-stock').style.color = '#b12704';
}

// Populate bullets
const bulletsList = document.querySelector('.product-bullets');
bulletsList.innerHTML = '';
product.bullets.forEach(bullet => {
    const li = document.createElement('li');
    li.textContent = bullet;
    bulletsList.appendChild(li);
});

// Populate description
document.querySelector('.product-description').textContent = product.description;

// Populate specs
const specGrid = document.querySelector('.spec-grid');
specGrid.innerHTML = '';
for (const [label, value] of Object.entries(product.specs)) {
    const row = document.createElement('div');
    row.className = 'spec-row';
    row.innerHTML = `
        <span class="spec-label">${label}</span>
        <span class="spec-value">${value}</span>
    `;
    specGrid.appendChild(row);
}

// Update review summary
document.querySelector('.review-average').textContent = product.rating.toFixed(1);
document.querySelector('.review-summary .stars').style.setProperty('--rating', product.rating);
document.querySelector('.review-summary .rating').setAttribute('aria-label', `Rated ${product.rating} out of 5`);
document.querySelector('.review-summary .rating-count').textContent = `(${product.reviewCount.toLocaleString()} ratings)`;

// Generate dynamic review count
const reviewWithText = Math.floor(product.reviewCount * 0.8);
document.querySelector('.review-count').textContent = `${reviewWithText.toLocaleString()} with reviews`;

// Add to cart functionality
const addToCartBtn = document.querySelector('.product-info .review-btn');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        addItemToCart(product.name, product.price);
        // Show visual feedback
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Added to Cart!';
        addToCartBtn.style.backgroundColor = '#007600';
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.style.backgroundColor = '';
        }, 1500);
    });
}
