// Product data
window.products = [
    {
        id: 1,
        name: "Red Tail Guppy",
        price: 12.99,
        image: "assets/images/guppy-redtail.jpg",
        description: "Beautiful red tail guppy with vibrant colors. Perfect for community tanks.",
        category: "guppies"
    },
    {
        id: 2,
        name: "Blue Delta Guppy",
        price: 14.99,
        image: "assets/images/guppy-bluedelta.jpg",
        description: "Stunning blue delta guppy with flowing fins. A show-stopper in any aquarium.",
        category: "guppies"
    },
    {
        id: 3,
        name: "Java Fern",
        price: 8.99,
        image: "assets/images/plant-javafern.jpg",
        description: "Hardy aquatic plant perfect for beginners. Grows well in low light conditions.",
        category: "plants"
    },
    {
        id: 4,
        name: "Anubias Nana",
        price: 9.99,
        image: "assets/images/plant-anubias.jpg",
        description: "Compact aquatic plant with broad leaves. Ideal for foreground planting.",
        category: "plants"
    }
];

// Product card template
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-card-content">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Render products
function renderProducts(container, products) {
    if (!container) return;
    
    const productHTML = products.map(createProductCard).join('');
    container.innerHTML = productHTML;
    
    // Add event listeners to Add to Cart buttons
    container.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// Initialize shop page
document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        // If we're on the shop page, show all products
        if (window.location.pathname.includes('shop.html')) {
            renderProducts(productGrid, window.products);
        } 
        // If we're on the home page, show featured products (first 4)
        else if (window.location.pathname.includes('index.html')) {
            renderProducts(productGrid, window.products.slice(0, 4));
        }
    }
    
    // Handle product detail page
    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = window.products.find(p => p.id === productId);
        
        if (product) {
            document.querySelector('.product-detail').innerHTML = `
                <div class="product-detail-content">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h1>${product.name}</h1>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <p class="description">${product.description}</p>
                        <div class="quantity-selector">
                            <label for="quantity">Quantity:</label>
                            <input type="number" id="quantity" min="1" value="1">
                        </div>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
            
            // Add event listener to Add to Cart button
            document.querySelector('.add-to-cart').addEventListener('click', (e) => {
                const quantity = parseInt(document.getElementById('quantity').value);
                addToCart(productId, quantity);
            });
        }
    }
});
