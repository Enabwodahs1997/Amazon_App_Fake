import './subheader.css';

// Define categories based on products
const categories = [
    { name: 'All', query: '' },
    { name: 'Electronics', query: 'camera' },
    { name: 'Beauty & Personal Care', query: 'lotion soap face wash body wash' },
    { name: 'Hair Care', query: 'shampoo conditioner hair gel hair spray' },
    { name: 'Fragrances', query: 'perfume' }
];

// Create subheader HTML
const createSubheader = () => {
    const subheader = document.createElement('div');
    subheader.className = 'subheader';
    
    categories.forEach(category => {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = category.name;
        link.dataset.query = category.query;
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (category.name === 'All') {
                window.location.href = '/main.html';
            } else {
                window.location.href = `/search.html?q=${encodeURIComponent(category.query)}`;
            }
        });
        
        subheader.appendChild(link);
    });
    
    return subheader;
};

// Insert subheader after the header element
const header = document.querySelector('header');
if (header) {
    const subheader = createSubheader();
    header.insertAdjacentElement('afterend', subheader);
}
