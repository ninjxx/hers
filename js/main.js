// Main JavaScript for the jewellery website

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    // Modal functionality
    const modals = {
        search: document.getElementById('searchModal'),
        cart: document.getElementById('cartModal'),
        wishlist: document.getElementById('wishlistModal'),
        profile: document.getElementById('profileModal')
    };
    
    const buttons = {
        search: document.getElementById('searchBtn'),
        cart: document.getElementById('cartBtn'),
        wishlist: document.getElementById('wishlistBtn'),
        profile: document.getElementById('profileBtn')
    };
    
    // Open modals
    Object.keys(buttons).forEach(key => {
        if (buttons[key]) {
            buttons[key].addEventListener('click', () => {
                openModal(modals[key]);
            });
        }
    });
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeAllModals();
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        Object.keys(modals).forEach(key => {
            if (e.target === modals[key]) {
                closeAllModals();
            }
        });
    });
    
    function openModal(modal) {
        closeAllModals();
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeAllModals() {
        Object.keys(modals).forEach(key => {
            if (modals[key]) {
                modals[key].classList.remove('active');
            }
        });
        document.body.style.overflow = 'auto';
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Initialize products
    initializeProducts();
    
    // Initialize cart and wishlist
    initializeCart();
    initializeWishlist();
    
    // Scroll animations
    initScrollAnimations();
    
    // Mouse follower
    initMouseFollower();
});

// Product data
const products = [
    {
        id: 1,
        name: "Golden Pearl Necklace",
        price: 24999,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "necklaces"
    },
    {
        id: 2,
        name: "Diamond Solitaire Ring",
        price: 58999,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "rings"
    },
    {
        id: 3,
        name: "Pearl Drop Earrings",
        price: 12999,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "earrings"
    },
    {
        id: 4,
        name: "Gold Bangle Set",
        price: 34999,
        image: "https://images.unsplash.com/photo-1588444650700-6c7f0c89d36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "bracelets"
    },
    {
        id: 5,
        name: "Rose Gold Pendant",
        price: 8999,
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "necklaces"
    },
    {
        id: 6,
        name: "Emerald Stone Ring",
        price: 42999,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "rings"
    }
];

// Initialize products in the featured section
function initializeProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="product-action-btn add-to-wishlist" data-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="product-action-btn add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₹${product.price.toLocaleString()}</p>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to product action buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToWishlist(productId);
        });
    });
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initializeCart() {
    updateCartBadge();
    renderCartItems();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCartItems();
    
    // Show confirmation
    showNotification(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCartItems();
    
    showNotification('Item removed from cart');
}

function updateCartBadge() {
    const cartBadge = document.querySelector('#cartBtn .badge');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total span');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        if (cartTotalElement) cartTotalElement.textContent = '₹0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">₹${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    if (cartTotalElement) {
        cartTotalElement.textContent = `₹${total.toLocaleString()}`;
    }
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function initializeWishlist() {
    updateWishlistBadge();
    renderWishlistItems();
}

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = wishlist.find(item => item.id === productId);
    
    if (!existingItem) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        renderWishlistItems();
        
        showNotification(`${product.name} added to wishlist`);
    } else {
        showNotification(`${product.name} is already in your wishlist`);
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    renderWishlistItems();
    
    showNotification('Item removed from wishlist');
}

function updateWishlistBadge() {
    const wishlistBadge = document.querySelector('#wishlistBtn .badge');
    
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlist.length;
        wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

function renderWishlistItems() {
    const wishlistItemsContainer = document.querySelector('.wishlist-items');
    
    if (!wishlistItemsContainer) return;
    
    wishlistItemsContainer.innerHTML = '';
    
    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = '<p>Your wishlist is empty</p>';
        return;
    }
    
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        
        wishlistItem.innerHTML = `
            <div class="wishlist-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="wishlist-item-details">
                <h4 class="wishlist-item-title">${item.name}</h4>
                <p class="wishlist-item-price">₹${item.price.toLocaleString()}</p>
            </div>
            <button class="wishlist-item-remove" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        wishlistItemsContainer.appendChild(wishlistItem);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.wishlist-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromWishlist(productId);
        });
    });
}

// Notification system
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Scroll animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('stagger-item')) {
                    const delay = Array.from(fadeElements).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Mouse follower
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateFollower() {
        // Ease the movement
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = `${followerX - 10}px`;
        follower.style.top = `${followerY - 10}px`;
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Hide follower when not moving
    let timeout;
    document.addEventListener('mousemove', () => {
        follower.style.opacity = '1';
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            follower.style.opacity = '0';
        }, 1000);
    });
}