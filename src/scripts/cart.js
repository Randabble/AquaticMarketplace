// Cart management
const CART_STORAGE_KEY = 'carlosaquatics_cart';

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const product = window.products.find(p => p.id === productId);
        if (product) {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
    }
    
    saveCart(cart);
    showAddedToCartMessage();
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);
    saveCart(cart);
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
}

// Update item quantity
function updateQuantity(productId, quantity) {
    if (quantity < 1) return;
    
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
        if (window.location.pathname.includes('cart.html')) {
            renderCart();
        }
    }
}

// Calculate cart total
function calculateTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart count in header
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}

// Show "Added to Cart" message
function showAddedToCartMessage() {
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.textContent = 'Added to cart!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Render cart page
function renderCart() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;
    
    const cart = getCart();
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    const cartHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="price">$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="btn-quantity" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="btn-quantity" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');
    
    cartContainer.innerHTML = cartHTML;
    
    // Update total
    const total = calculateTotal();
    document.querySelector('.cart-total').textContent = `$${total.toFixed(2)}`;
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    if (window.location.pathname.includes('cart.html')) {
        renderCart();
    }
});

// Add styles for cart message
const style = document.createElement('style');
style.textContent = `
    .cart-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-accent);
        color: white;
        padding: 1rem;
        border-radius: var(--border-radius);
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--color-border);
        gap: 1rem;
    }
    
    .cart-item img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: var(--border-radius);
    }
    
    .cart-item-details {
        flex: 1;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
    }
    
    .btn-quantity {
        background: var(--color-primary);
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
    }
    
    .btn-remove {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--color-accent);
        cursor: pointer;
    }
    
    .empty-cart {
        text-align: center;
        padding: 2rem;
        color: var(--color-text);
    }
`;
document.head.appendChild(style);
