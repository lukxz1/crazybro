// ==================== DADOS DOS PRODUTOS ====================
const products = [
    {
        id: 1,
        name: "Calça Cargo Oversized",
        price: 159.90,
        image: "images/calca-cargo.jpg",
        fallbackText: "🩳",
        category: "Calças",
        description: "Calça cargo oversized com corte streetwear"
    },
    {
        id: 2,
        name: "Camiseta Oversized Preta",
        price: 69.90,
        image: "images/camiseta-preta.jpg",
        fallbackText: "👕",
        category: "Camisetas",
        description: "Camiseta oversized 100% algodão, estilo street"
    },
    {
        id: 3,
        name: "Jaqueta Bomber",
        price: 229.90,
        image: "images/jaqueta-bomber.jpg",
        fallbackText: "🧥",
        category: "Jaquetas",
        description: "Jaqueta bomber com acabamento premium"
    },
    {
        id: 4,
        name: "Moletom Hoodie",
        price: 149.90,
        image: "images/moletom-hoodie.jpg",
        fallbackText: "🧦",
        category: "Moletons",
        description: "Hoodie oversized com capuz e bolso canguru"
    },
    {
        id: 5,
        name: "Bermuda Cargo",
        price: 99.90,
        image: "images/bermuda-cargo.jpg",
        fallbackText: "🩳",
        category: "Bermudas",
        description: "Bermuda cargo com múltiplos bolsos"
    },
    {
        id: 6,
        name: "Camisa Flannel",
        price: 119.90,
        image: "images/camisa-flannel.jpg",
        fallbackText: "👔",
        category: "Camisas",
        description: "Camisa flannel xadrez, estilo urbano"
    },
    {
        id: 7,
        name: "Tênis Skate",
        price: 279.90,
        image: "images/tenis-skate.jpg",
        fallbackText: "👟",
        category: "Calçados",
        description: "Tênis skate profissional com solado antiderrapante"
    },
    {
        id: 8,
        name: "Boné Snapback",
        price: 49.90,
        image: "images/bone-snapback.jpg",
        fallbackText: "🧢",
        category: "Acessórios",
        description: "Boné snapback ajustável, fechamento traseiro"
    },
    {
        id: 9,
        name: "Blusa de Moletom",
        price: 129.90,
        image: "images/blusa-moletom.jpg",
        fallbackText: "🧵",
        category: "Blusas",
        description: "Blusa de moletom fleece, corte regular"
    },
    {
        id: 10,
        name: "Short de Praia",
        price: 59.90,
        image: "images/short-praia.jpg",
        fallbackText: "🩲",
        category: "Shorts",
        description: "Short de praia estampado, tecido quick dry"
    },
    {
        id: 11,
        name: "Corta Vento",
        price: 189.90,
        image: "images/corta-vento.jpg",
        fallbackText: "🌬️",
        category: "Jaquetas",
        description: "Jaqueta corta vento tecnológica"
    },
    {
        id: 12,
        name: "Regata Básica",
        price: 39.90,
        image: "images/regata.jpg",
        fallbackText: "🎽",
        category: "Regatas",
        description: "Regata básica em algodão, ideal para layering"
    }
];

// ==================== CARRINHO ====================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = 0;

// ==================== FUNÇÕES PRINCIPAIS ====================

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Atualizar contador do carrinho
function updateCartCount() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount = savedCart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Criar card de produto COM IMAGENS LOCAIS
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" 
                 onerror="this.style.display='none'; this.parentNode.innerHTML='<span>${product.fallbackText}</span>'"
                 loading="lazy" />
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-category">${product.category}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-price">R$ ${product.price.toFixed(2)}</div>
            <button class="btn btn-primary add-to-cart" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}">
                Adicionar ao Carrinho
            </button>
        </div>
    `;
    return productCard;
}

// Adicionar produto ao carrinho
function addToCart(productId, productName, productPrice) {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar se produto já está no carrinho
    const existingItem = savedCart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        savedCart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(savedCart));
    updateCartCount();
    showNotification(`${productName} adicionado ao carrinho!`, 'success');
}

// Mostrar notificação
function showNotification(message, type) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    // Cor baseada no tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else {
        notification.style.backgroundColor = '#104472';
    }
    
    // Adicionar à página
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ==================== EVENT LISTENERS GLOBAIS ====================

// Clique em "Adicionar ao Carrinho"
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const productName = e.target.getAttribute('data-name');
        const productPrice = parseFloat(e.target.getAttribute('data-price'));
        
        addToCart(productId, productName, productPrice);
    }
});

// Navegação suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== FUNÇÕES PARA PÁGINA DE PRODUTOS ====================

// Carregar todos os produtos
function loadAllProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Configurar filtros
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterProducts);
    }
}

// Filtrar produtos
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    const filteredProducts = products.filter(product => {
        const categoryMatch = category === 'all' || product.category === category;
        
        let priceMatch = true;
        if (priceRange !== 'all') {
            switch(priceRange) {
                case '0-50': priceMatch = product.price <= 50; break;
                case '50-100': priceMatch = product.price > 50 && product.price <= 100; break;
                case '100-150': priceMatch = product.price > 100 && product.price <= 150; break;
                case '150+': priceMatch = product.price > 150; break;
            }
        }
        
        return categoryMatch && priceMatch;
    });
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// ==================== FUNÇÕES PARA PÁGINA INICIAL ====================

// Carregar produtos em destaque
function loadFeaturedProducts() {
    const featuredProducts = document.getElementById('featured-products');
    if (!featuredProducts) return;
    
    const featured = products.slice(0, 4); // Primeiros 4 produtos
    
    featured.forEach(product => {
        const productCard = createProductCard(product);
        featuredProducts.appendChild(productCard);
    });
}

// ==================== INICIALIZAÇÃO POR PÁGINA ====================

// Página de produtos
if (window.location.pathname.includes('produtos.html') || 
    window.location.pathname.endsWith('produtos.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadAllProducts();
        setupFilters();
        updateCartCount();
    });
}

// Página inicial
if (window.location.pathname.endsWith('index.html') || 
    window.location.pathname.endsWith('/')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadFeaturedProducts();
        updateCartCount();
    });
}

// Página de carrinho
if (window.location.pathname.includes('carrinho.html')) {
    // Funções específicas do carrinho serão carregadas na própria página
}

// Página de checkout
if (window.location.pathname.includes('checkout.html')) {
    // Funções específicas do checkout serão carregadas na própria página
}

// No seu script.js - Adicione esta função
function setupPushNotifications() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Notificações permitidas');
            }
        });
    }
}

// Chame no DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    setupPushNotifications();
    // ... resto do código
});