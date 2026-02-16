import { productsData } from './products-data.js';

// Get search query from URL
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q') || '';

const searchHeading = document.querySelector('.search-heading');
const searchResults = document.getElementById('search-results');
const searchInput = document.getElementById('keyword-input');

// Set search input value to query
if (searchInput) {
    searchInput.value = query;
}

if (query) {
    searchHeading.textContent = `Search results for "${query}"`;
    
    // Filter products based on query
    const lowerQuery = query.toLowerCase();
    const queryTerms = lowerQuery.split(' ');
    
    const filteredProducts = productsData.filter(product => {
        const searchText = `${product.name} ${product.subtitle} ${product.keywords}`.toLowerCase();
        // Match if any query term is found in the product text
        return queryTerms.some(term => searchText.includes(term));
    });

    if (filteredProducts.length === 0) {
        searchResults.innerHTML = '<p style="text-align: center; padding: 40px; font-size: 18px; color: #565959;">No results found for your search.</p>';
    } else {
        // Display filtered products
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Calculate shipping text
            let shippingText = '';
            if (product.shippingMode === 'by') {
                const today = new Date();
                const arriveDate = new Date(today);
                arriveDate.setDate(today.getDate() + product.shippingMin);
                const dateStr = arriveDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                shippingText = `Get it by ${dateStr}`;
            } else if (product.shippingMax) {
                shippingText = `Arrives in ${product.shippingMin}-${product.shippingMax} days`;
            } else {
                shippingText = `Delivery in ${product.shippingMin} days`;
            }
            
            productCard.innerHTML = `
                <a href="/Products/product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </a>
                <h3><a href="/Products/product.html?id=${product.id}">${product.name}</a></h3>
                <div class="rating" aria-label="Rated ${product.rating} out of 5">
                    <span class="stars" style="--rating: ${product.rating};"></span>
                    <span class="rating-count">(${product.reviewCount.toLocaleString()})</span>
                </div>
                <p class="price">${product.price}</p>
                <p class="shipping-time">${shippingText}</p>
                <button>Add to Cart</button>
            `;
            
            searchResults.appendChild(productCard);
        });

        // Attach click handlers to Add to Cart buttons
        searchResults.querySelectorAll('button').forEach((button, index) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const product = filteredProducts[index];
                
                // Import addItemToCart dynamically
                import('./header.js').then(module => {
                    module.addItemToCart(
                        product.name,
                        product.price,
                        product.image,
                        product.rating.toString(),
                        `(${product.reviewCount.toLocaleString()})`,
                        product.subtitle
                    );
                    
                    // Show visual feedback
                    const originalText = button.textContent;
                    button.textContent = 'Added!';
                    button.style.backgroundColor = '#007600';
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                    }, 1500);
                });
            });
        });
    }
} else {
    searchHeading.textContent = 'Search';
    searchResults.innerHTML = '<p style="text-align: center; padding: 40px; font-size: 18px; color: #565959;">Enter a search term to find products.</p>';
}
