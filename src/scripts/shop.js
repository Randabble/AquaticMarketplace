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
    // SVG for guppies, fallback to image for plants
    const isGuppy = product.category === 'guppies';
    const svgGuppy = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 2048 2048\"><g><path fill=\"#880E4F\" d=\"M797 360c17,1 45,-73 56,-61 91,99 275,90 340,2 15,-21 32,66 58,59l0 427 -455 0 0 -427z\"></path><path fill=\"#880E4F\" d=\"M1787 1586c2,39 3,77 5,111l1 33 -33 0 -192 0 -30 0 -1 -31 -5 -114 257 0z\"></path><path fill=\"#880E4F\" d=\"M517 1586l-5 114 -1 31 -30 0 -192 0 -33 0 1 -33c1,-34 3,-72 5,-111l257 0z\"></path><path fill=\"#C72464\" d=\"M1236 355c99,2 284,19 330,120 37,82 68,153 94,221 26,69 47,133 64,200 20,79 35,225 46,384 7,103 12,212 17,311l-257 0 -28 -595 -61 -153 0 777 0 0c0,36 -15,69 -39,93 -24,24 -57,39 -93,39l-568 0c-36,0 -69,-15 -93,-39 -24,-24 -39,-57 -39,-93l0 -776 -61 153 -28 595 -257 0c4,-99 10,-209 17,-311 11,-159 25,-305 46,-384 17,-67 38,-132 64,-200 26,-68 57,-140 94,-221 21,-46 68,-73 120,-90 64,-20 142,-28 209,-32 5,126 98,227 212,227 113,0 206,-100 212,-225z\"></path><path fill=\"#780B45\" d=\"M1011 625c-128,0 -207,-158 -205,-271l21 -33c18,-27 30,-35 32,-7 7,88 55,221 165,230l-13 81z\"></path><path fill=\"#780B45\" d=\"M1037 625c128,0 207,-158 205,-271l-21 -33c-18,-27 -30,-35 -32,-7 -7,88 -55,221 -165,230l13 81z\"></path><g><polygon fill=\"#880E4F\" points=\"1051,776 972,776 955,1108 1121,1243\"></polygon><polygon fill=\"#F06292\" points=\"1121,1242 1130,1307 955,1497 976,1124\"></polygon><polygon fill=\"#F06292\" points=\"982,608 1060,608 1097,816 955,1108\"></polygon></g><g><path fill=\"#FF6D00\" d=\"M916 584c44,20 90,37 90,48 0,12 -46,48 -90,48 -44,0 -30,-22 -30,-48 0,-27 -14,-69 30,-48z\"></path><path fill=\"#FF6D00\" d=\"M1140 584c-44,20 -90,37 -90,48 0,12 46,48 90,48 44,0 30,-22 30,-48 0,-27 14,-69 -30,-48z\"></path></g><ellipse fill=\"#E65100\" cx=\"1025\" cy=\"632\" rx=\"44\" ry=\"43\"></ellipse></g><rect fill=\"none\" width=\"2048\" height=\"2048\"></rect></g></svg>`;
    return `
        <div class=\"modern-product-card\" data-id=\"${product.id}\" onclick=\"window.location.href='product.html?id=${product.id}'\">
            <div class=\"image\">${isGuppy ? svgGuppy : `<img src='${product.image}' alt='${product.name}'>`}</div>
            <div class=\"productTitle\">${product.name}</div>
            <div class=\"cost\">$${product.price.toFixed(2)}</div>
            ${isGuppy ? `<div class=\"radio-inputs\">
                <label class=\"radio\">
                    <input type=\"radio\" name=\"size-${product.id}\" checked><span class=\"name\">S</span>
                </label>
                <label class=\"radio\">
                    <input type=\"radio\" name=\"size-${product.id}\"><span class=\"name\">M</span>
                </label>
                <label class=\"radio\">
                    <input type=\"radio\" name=\"size-${product.id}\"><span class=\"name\">L</span>
                </label>
                <label class=\"radio\">
                    <input type=\"radio\" name=\"size-${product.id}\"><span class=\"name\">XL</span>
                </label>
                <label class=\"radio\">
                    <input type=\"radio\" name=\"size-${product.id}\"><span class=\"name\">XXL</span>
                </label>
            </div>` : ''}
            <button class=\"addtocart\" data-id=\"${product.id}\" onclick=\"event.stopPropagation(); addToCart(${product.id});\">Add to Cart</button>
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
