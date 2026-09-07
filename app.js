document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Hand-thrown mug', category: 'Home', price: 28, color: 'clay', icon: '☕', description: 'Made slowly in small batches.' },
        { id: 2, name: 'Linen market tote', category: 'Home', price: 36, color: 'sage', icon: '▱', description: 'Your everyday carry, elevated.' },
        { id: 3, name: 'Brass desk tray', category: 'Desk', price: 42, color: 'butter', icon: '⌁', description: 'A home for little essentials.' },
        { id: 4, name: 'Cedar incense set', category: 'Wellness', price: 24, color: 'sky', icon: '〰', description: 'A quiet ritual for your space.' },
        { id: 5, name: 'Daily notes journal', category: 'Desk', price: 18, color: 'rose', icon: '✎', description: 'For thoughts worth keeping.' },
        { id: 6, name: 'Stoneware vase', category: 'Home', price: 54, color: 'lavender', icon: '♢', description: 'A soft shape for wild stems.' }
    ];
    let cart = [];
    let category = 'All';
    const grid = document.getElementById('product-grid');
    const search = document.getElementById('search-input');
    const sort = document.getElementById('sort-select');
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const toast = document.getElementById('toast');

    const money = value => `$${value.toFixed(2)}`;
    function visibleProducts() {
        const query = search.value.toLowerCase().trim();
        let result = products.filter(product => (category === 'All' || product.category === category) &&
            `${product.name} ${product.description}`.toLowerCase().includes(query));
        if (sort.value === 'low') result.sort((a, b) => a.price - b.price);
        if (sort.value === 'high') result.sort((a, b) => b.price - a.price);
        return result;
    }
    function renderProducts() {
        const result = visibleProducts();
        document.getElementById('empty-state').hidden = result.length > 0;
        grid.innerHTML = result.map(product => `
            <article class="product-card">
                <div class="product-image ${product.color}"><span>${product.icon}</span><button class="quick-add" data-add="${product.id}">+ Add to bag</button></div>
                <div class="product-info"><div><p class="product-category">${product.category}</p><h3>${product.name}</h3></div><strong>${money(product.price)}</strong></div>
                <p class="product-description">${product.description}</p>
            </article>`).join('');
    }
    function renderCart() {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
        document.getElementById('cart-items').innerHTML = cart.length ? cart.map(item => `
            <div class="cart-item"><div class="cart-thumb ${item.color}">${item.icon}</div><div class="cart-item-details"><div class="cart-item-top"><div><h3>${item.name}</h3><p>${money(item.price)}</p></div><button class="remove-item" data-remove="${item.id}" aria-label="Remove ${item.name}">×</button></div><div class="quantity"><button data-quantity="${item.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-quantity="${item.id}" data-change="1" aria-label="Increase quantity">+</button></div></div></div>`).join('') : '<div class="empty-cart"><span>♧</span><p>Your bag is waiting<br>for something lovely.</p></div>';
        document.getElementById('cart-total').textContent = money(total);
        document.getElementById('checkout-button').disabled = !cart.length;
    }
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2400);
    }
    function setDrawer(open) {
        drawer.classList.toggle('open', open);
        overlay.classList.toggle('open', open);
        drawer.setAttribute('aria-hidden', String(!open));
        if (open) document.getElementById('close-cart').focus();
    }
    function addToCart(id) {
        const product = products.find(item => item.id === id);
        const existing = cart.find(item => item.id === id);
        if (existing) existing.quantity += 1;
        else cart.push({ ...product, quantity: 1 });
        renderCart();
        showToast(`${product.name} added to your bag`);
    }
    grid.addEventListener('click', event => {
        const button = event.target.closest('[data-add]');
        if (button) addToCart(Number(button.dataset.add));
    });
    document.querySelectorAll('.category-tab').forEach(button => button.addEventListener('click', () => {
        document.querySelector('.category-tab.active').classList.remove('active');
        button.classList.add('active');
        category = button.dataset.category;
        renderProducts();
    }));
    search.addEventListener('input', renderProducts);
    sort.addEventListener('change', renderProducts);
    document.getElementById('cart-button').addEventListener('click', () => setDrawer(true));
    document.getElementById('close-cart').addEventListener('click', () => setDrawer(false));
    overlay.addEventListener('click', () => setDrawer(false));
    document.getElementById('cart-items').addEventListener('click', event => {
        const remove = event.target.closest('[data-remove]');
        const change = event.target.closest('[data-quantity]');
        if (remove) cart = cart.filter(item => item.id !== Number(remove.dataset.remove));
        if (change) {
            const item = cart.find(entry => entry.id === Number(change.dataset.quantity));
            item.quantity += Number(change.dataset.change);
            if (item.quantity < 1) cart = cart.filter(entry => entry.id !== item.id);
        }
        renderCart();
    });
    document.getElementById('checkout-button').addEventListener('click', () => {
        if (!cart.length) return;
        cart = [];
        renderCart();
        setDrawer(false);
        showToast('Thanks! Your order is on its way.');
    });
    document.getElementById('newsletter-form').addEventListener('submit', event => {
        event.preventDefault();
        event.target.reset();
        document.getElementById('form-message').textContent = 'You’re on the list. See you soon!';
    });
    renderProducts();
    renderCart();
});
