(() => {
  const STORAGE_KEY = 'domingPortfolioDemo.v1';
  const defaultState = {
    cart: [],
    tables: [
      { id: 1, name: 'Table 1', status: 'occupied', guest: 'Juliana Mendes' },
      { id: 2, name: 'Table 2', status: 'calling', guest: 'Calling waiter' },
      { id: 3, name: 'Table 3', status: 'free', guest: 'Available' },
      { id: 4, name: 'Counter', status: 'occupied', guest: 'Pickup #8841' }
    ],
    orders: [
      { id: 8802, source: 'Table 1', items: '2 items', total: 31.5, status: 'new' },
      { id: 8803, source: 'Pickup', items: '3 items', total: 43.0, status: 'preparing' },
      { id: 8804, source: 'Table 4', items: '1 item', total: 18.5, status: 'ready' }
    ],
    menu: [
      { id: 'caldo', name: 'Caldo Verde Soup', description: 'Creamy potato, kale and sausage soup.', price: 18.5, emoji: '🥣', active: true, featured: true, category: 'Soups' },
      { id: 'trudel-choco', name: 'Chocolate Trudel', description: 'Crispy pastry finished with chocolate.', price: 12.5, emoji: '🍫', active: true, featured: true, category: 'Trudels' },
      { id: 'trudel-beijo', name: 'Coconut Trudel', description: 'Crispy pastry with coconut cream.', price: 12.0, emoji: '🥥', active: true, featured: false, category: 'Trudels' },
      { id: 'burger', name: 'House Burger', description: 'Handcrafted burger, cheese and house sauce.', price: 24.9, emoji: '🍔', active: true, featured: false, category: 'Snacks' }
    ]
  };

  let state = loadState();
  let toastTimer;

  const routeTitles = {
    overview: 'Overview', architecture: 'Architecture & decisions',
    'client-access': 'Customer access', store: 'Store / menu', cart: 'Order', payment: 'Payment',
    manager: 'Restaurant dashboard', tables: 'Table management', orders: 'Order management', menu: 'Menu management',
    'add-item': 'Add item', 'edit-item': 'Edit item', legacy: 'Original pages'
  };

  const legacyPages = [
    ['Original landing page', '/introduction-pages/main/', 'Original product landing page'],
    ['Original login', '/introduction-pages/login/', 'Experimental authentication screen'],
    ['Service selection', '/restaurant/client-request/redirect/', 'Customer flow: table or pickup'],
    ['Customer store', '/restaurant/client-request/store/', 'Original digital menu and cart'],
    ['Payment prototype', '/restaurant/client-payment/', 'Experimental payment flow'],
    ['Dashboard', '/restaurant/restaurantManager/main/', 'Restaurant customization and overview'],
    ['Tables', '/restaurant/restaurantManager/mesas/', 'Realtime table management'],
    ['Orders', '/restaurant/restaurantManager/pedidos/', 'Order management'],
    ['Menu', '/restaurant/restaurantManager/cardapio/', 'Product and category management'],
    ['Add item', '/restaurant/restaurantManager/cardapio/adicionar-item/', 'Product creation flow'],
    ['Edit item', '/restaurant/restaurantManager/cardapio/editar-item/', 'Product editing flow']
  ];

  function cloneDefault() {
    return JSON.parse(JSON.stringify(defaultState));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...cloneDefault(), ...JSON.parse(raw) } : cloneDefault();
    } catch {
      return cloneDefault();
    }
  }

  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function money(value) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BRL' }).format(value); }
  function cartTotal() { return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
  function cartCount() { return state.cart.reduce((sum, item) => sum + item.qty, 0); }
  function toast(message) {
    const el = document.getElementById('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }
  function go(route) { location.hash = route; }
  function currentRoute() { return (location.hash || '#overview').slice(1).split('?')[0] || 'overview'; }

  function managerShell(active, content) {
    const links = [
      ['manager', 'Dashboard'], ['tables', 'Tables'], ['orders', 'Orders'], ['menu', 'Menu']
    ].map(([route, label]) => `<a href="#${route}" class="${route === active ? 'current' : ''}">${label}</a>`).join('');
    return `<div class="device desktop"><div class="device-screen"><div class="manager-layout">
      <nav class="manager-nav"><strong>Doming · Management</strong>${links}<a href="#legacy">Original 2024 ↗</a></nav>
      <section class="manager-content">${content}</section>
    </div></div></div>`;
  }

  function context(title, intro, steps, preview) {
    return `<div class="product-layout">
      <section class="panel context-panel">
        <span class="kicker">INTERACTIVE DEMO</span>
        <h1>${title}</h1><p>${intro}</p>
        <div class="flow-list">${steps.map((step, index) => `<div class="flow-step"><b>${index + 1}</b><span>${step}</span></div>`).join('')}</div>
        <div class="notice info">This version uses <strong>fictional data and localStorage</strong>. No action changes the original Firebase database or processes real payments.</div>
      </section>
      ${preview}
    </div>`;
  }

  function overview() {
    return `<section class="hero">
      <div class="hero-copy">
        <span class="kicker">DOMING · RESTAURANT PRODUCT</span>
        <h1>From QR code to a new order — without searching for a waiter.</h1>
        <p>I conceived this independent product after observing a real restaurant-service friction: customers often had to stand up or look for a waiter whenever they wanted to order again. Doming connected the customer experience, menu, tables, orders and restaurant management in one web application.</p>
        <div class="hero-actions"><a class="primary-button" href="#client-access">Try customer flow</a><a class="secondary-button" href="#manager">Open management</a></div>
      </div>
      <aside class="hero-panel">
        <div><span class="eyebrow">MY ROLE</span><h3>End-to-end ownership</h3></div>
        <div class="metric"><strong>0 → MVP</strong><span>Problem discovery, UX, frontend, integration, realtime and deployment.</span></div>
        <div class="metric"><strong>2 sides</strong><span>Customer experience + restaurant operations.</span></div>
        <div class="metric"><strong>Realtime web</strong><span>Firebase Realtime Database + Netlify.</span></div>
      </aside>
    </section>
    <section class="section"><div class="section-heading"><span>Problem → solution</span><h2>A system designed from real operational friction.</h2><p>The original product was built before I had formal professional product experience. This restoration preserves the idea while making every main flow easy to explore as a portfolio case.</p></div>
      <div class="grid">
        <article class="card"><div class="card-icon">👤</div><h3>Customer</h3><p>Enters through a QR code, chooses the service mode, browses the menu, builds an order and goes through checkout.</p><div class="tag-row"><span class="tag">Mobile-first</span><span class="tag">QR flow</span></div></article>
        <article class="card"><div class="card-icon">🏪</div><h3>Restaurant</h3><p>Monitors tables and service calls, receives orders, manages products and controls the operation.</p><div class="tag-row"><span class="tag">Operations</span><span class="tag">Realtime</span></div></article>
        <article class="card"><div class="card-icon">⚡</div><h3>Technical product</h3><p>HTML, CSS and JavaScript integrated with Firebase and Netlify Functions, designed around a low-cost MVP architecture.</p><div class="tag-row"><span class="tag">Firebase</span><span class="tag">Netlify</span></div></article>
      </div>
    </section>
    <section class="section"><div class="section-heading"><span>Explore</span><h2>See both sides of the product.</h2></div>
      <div class="grid two">
        <a class="card option-card" href="#client-access"><strong>Customer experience →</strong><span>From restaurant access to a simulated payment.</span></a>
        <a class="card option-card" href="#manager"><strong>Restaurant management →</strong><span>Dashboard, tables, orders, menu and product CRUD.</span></a>
      </div>
    </section>`;
  }

  function architecture() {
    return `<section class="section-heading"><span>Product & engineering</span><h2>How the MVP was structured.</h2><p>The original architecture prioritized build speed and realtime synchronization. For the public demo, dependencies that could create real-world side effects were replaced with local browser state.</p></section>
    <div class="grid">
      <article class="card"><div class="card-icon">🌐</div><h3>Web frontend</h3><p>Framework-free HTML, CSS and JavaScript with separate flows for customers and restaurant management.</p></article>
      <article class="card"><div class="card-icon">🔥</div><h3>Realtime data</h3><p>Firebase Realtime Database synchronized states such as tables and customer service calls between interfaces.</p></article>
      <article class="card"><div class="card-icon">▲</div><h3>Deployment & functions</h3><p>Netlify hosted the public application and serverless functions used by the frontend.</p></article>
    </div>
    <section class="section"><div class="grid two">
      <article class="card"><h3>Product decision</h3><p>Separate the two actors clearly: customers needed to reach the main action quickly, while restaurant staff needed visibility into operations, orders and configuration.</p></article>
      <article class="card"><h3>What I learned later</h3><p>The original project expanded before acquisition and the commercial model were validated. Today I would validate a smaller sellable outcome before expanding infrastructure and feature scope.</p></article>
    </div></section>`;
  }

  function clientAccess() {
    const preview = `<div class="device"><div class="device-screen"><div class="client-header"><img src="/static/Mini-Doming Icon.png" alt=""><div><strong>Doming</strong><small>Digital service</small></div></div><div class="mobile-content">
      <span class="eyebrow">LACRO · RESTAURANT DEMO</span><h2>How would you like to be served?</h2><p style="color:var(--muted);font-size:12px;line-height:1.5">The QR code brings the customer directly into the right context without requiring an account.</p>
      <a class="option-card" href="#store"><strong>🍽️ I'm at a table</strong><span>Browse the menu and order without searching for staff.</span></a>
      <a class="option-card" href="#store"><strong>🛍️ I want pickup</strong><span>Build an order to collect at the restaurant.</span></a>
      <div class="notice">Public demo: this flow does not create a real session or write data to a database.</div>
    </div></div></div>`;
    return context('Customer access', 'The entry flow was designed to minimize decisions and move customers quickly toward the main action.', ['Scan the QR code or open the restaurant link.', 'Choose table service or pickup.', 'Go directly to the restaurant menu.'], preview);
  }

  function store() {
    const groups = state.menu.filter(product => product.active).reduce((acc, product) => ((acc[product.category] ??= []).push(product), acc), {});
    const products = Object.entries(groups).map(([category, items]) => `<div class="category"><h3>${category}</h3>${items.map(product => `<div class="product-row"><div class="product-thumb">${product.emoji}</div><div><h4>${product.name}</h4><p>${product.description}</p><strong>${money(product.price)}</strong></div><button class="add-button" data-add="${product.id}" aria-label="Add ${product.name}">+</button></div>`).join('')}</div>`).join('');
    const preview = `<div class="device"><div class="device-screen"><div class="store-hero"><span class="eyebrow" style="color:#8ecbff">LACRO · DEMO</span><h2 style="margin:6px 0">Order with Doming</h2><p>Digital menu · faster service</p></div><div class="mobile-content"><input class="search" id="productSearch" placeholder="What would you like to order?" aria-label="Search products"><div id="productList">${products}</div></div><div class="cart-bar"><div><strong id="cartTotalBar">${money(cartTotal())}</strong><small><span id="cartCountBar">${cartCount()}</span> items</small></div><a class="primary-button compact" href="#cart">View order</a></div></div></div>`;
    return context('Store / menu', 'The storefront keeps the customer focused on finding products and advancing toward an order.', ['Browse categories and products.', 'Add items without leaving the menu.', 'Track order value and quantity at the bottom.', 'Open the cart to review before checkout.'], preview);
  }

  function cart() {
    const list = state.cart.length ? state.cart.map(item => `<div class="list-item"><div class="product-thumb">${item.emoji}</div><div class="grow"><h4>${item.name}</h4><p>${money(item.price)} each</p></div><div class="qty"><button data-qty="${item.id}" data-delta="-1">−</button><strong>${item.qty}</strong><button data-qty="${item.id}" data-delta="1">+</button></div></div>`).join('') : `<div class="notice info">Your demo order is empty. <a href="#store">Add a few items from the menu.</a></div>`;
    const subtotal = cartTotal();
    const preview = `<div class="device"><div class="device-screen"><div class="client-header"><img src="/static/Mini-Doming Icon.png" alt=""><div><strong>Your order</strong><small>Review before confirming</small></div></div><div class="mobile-content"><div class="list">${list}</div><div class="total-box"><div class="total-row"><span>Subtotal</span><span>${money(subtotal)}</span></div><div class="total-row"><span>Demo fee</span><span>${money(0)}</span></div><div class="total-row final"><span>Total</span><span>${money(subtotal)}</span></div></div><a class="primary-button" style="width:100%;margin-top:14px" href="#payment">Continue to payment</a></div></div></div>`;
    return context('Order', 'The cart provides a simple review step before checkout. In this demo you can change quantities and see the total update instantly.', ['Review items.', 'Adjust quantities.', 'Check the total.', 'Continue to simulated payment.'], preview);
  }

  function payment() {
    const preview = `<div class="device"><div class="device-screen"><div class="client-header"><img src="/static/Mini-Doming Icon.png" alt=""><div><strong>Payment</strong><small>Total ${money(cartTotal())}</small></div></div><div class="mobile-content"><div class="notice">Payments are disabled in this portfolio demo. No real transaction will be created.</div><h3>Choose a payment method</h3><label class="payment-option"><input type="radio" name="pay" checked><span><strong>Demo PIX</strong><br><small style="color:var(--muted)">Visual QR code only.</small></span></label><label class="payment-option"><input type="radio" name="pay"><span><strong>Pay at the counter</strong><br><small style="color:var(--muted)">Pickup flow.</small></span></label><div class="mock-qr" aria-label="Illustrative QR code"></div><button class="primary-button" id="finishOrder" style="width:100%">Simulate completed order</button></div></div></div>`;
    return context('Payment', 'The original project experimented with payment integration. For a public portfolio demo, checkout was deliberately converted into a safe simulation.', ['Choose a payment method.', 'Review the checkout.', 'Complete a simulation only.', 'Create a fictional order in the management dashboard.'], preview);
  }

  function manager() {
    const occupied = state.tables.filter(table => table.status !== 'free').length;
    const content = `<div class="manager-heading"><div><span class="eyebrow">RESTAURANT DEMO</span><h2>Good morning, Lacro.</h2><p>A quick view of what's happening right now.</p></div><span class="status green">System online</span></div><div class="stat-grid"><div class="stat-card"><span>Active orders</span><strong>${state.orders.filter(order => order.status !== 'done').length}</strong></div><div class="stat-card"><span>Tables in use</span><strong>${occupied}</strong></div><div class="stat-card"><span>Demo average ticket</span><strong>${money(24.3)}</strong></div></div><div class="manager-panel"><h3>Recent activity</h3>${state.orders.slice(0, 3).map(order => orderMarkup(order, false)).join('')}</div><div class="manager-panel"><h3>Next actions</h3><div class="action-row"><a class="primary-button compact" href="#orders">Manage orders</a><a class="ghost-button" href="#tables">View tables</a><a class="ghost-button" href="#menu">Edit menu</a></div></div>`;
    return managerShell('manager', content);
  }

  function tables() {
    const cards = state.tables.map(table => `<article class="table-card ${table.status === 'occupied' ? 'occupied' : table.status === 'calling' ? 'calling' : ''}"><span class="status ${table.status === 'free' ? 'gray' : table.status === 'calling' ? 'amber' : 'blue'}">${table.status === 'free' ? 'Available' : table.status === 'calling' ? 'Calling' : 'Occupied'}</span><strong>${table.name}</strong><span>${table.guest}</span></article>`).join('');
    const content = `<div class="manager-heading"><div><h2>Tables</h2><p>Operational state demonstrated with local data.</p></div><button class="primary-button compact" id="addTable">+ New table</button></div><div class="manager-panel"><div class="table-grid" id="tableGrid">${cards}</div></div><div class="notice info" style="margin-top:14px">In the original project, this area connected to Firebase Realtime Database so table changes could update in real time.</div>`;
    return managerShell('tables', content);
  }

  function orderMarkup(order, controls = true) {
    const labels = { new: ['New', 'blue'], preparing: ['Preparing', 'amber'], ready: ['Ready', 'green'], done: ['Completed', 'gray'] };
    const [label, color] = labels[order.status] || labels.new;
    const buttonText = order.status === 'new' ? 'Prepare' : order.status === 'preparing' ? 'Mark ready' : order.status === 'ready' ? 'Complete' : 'Reopen';
    return `<div class="order-card"><div class="order-id">#${String(order.id).slice(-4)}</div><div><h4>${order.source} · ${money(order.total)}</h4><p>${order.items} · <span class="status ${color}">${label}</span></p></div>${controls ? `<div class="action-row"><button class="small-button ${order.status === 'done' ? '' : 'primary'}" data-order-next="${order.id}">${buttonText}</button></div>` : ''}</div>`;
  }

  function orders() {
    const content = `<div class="manager-heading"><div><h2>Orders</h2><p>Restaurant operations queue.</p></div><span class="status blue">${state.orders.filter(order => order.status !== 'done').length} active</span></div><div class="manager-panel"><div id="orderList">${state.orders.map(order => orderMarkup(order, true)).join('')}</div></div>`;
    return managerShell('orders', content);
  }

  function menu() {
    const rows = state.menu.map(product => `<div class="order-card"><div class="product-thumb">${product.emoji}</div><div><h4>${product.name} · ${money(product.price)}</h4><p>${product.category} · <span class="status ${product.active ? 'green' : 'gray'}">${product.active ? 'Active' : 'Paused'}</span>${product.featured ? ' · Featured' : ''}</p></div><div class="action-row"><button class="small-button" data-menu-toggle="${product.id}">${product.active ? 'Pause' : 'Activate'}</button><button class="small-button" data-menu-edit="${product.id}">Edit</button></div></div>`).join('');
    const content = `<div class="manager-heading"><div><h2>Menu</h2><p>Products, pricing and availability.</p></div><a class="primary-button compact" href="#add-item">+ Add item</a></div><div class="manager-panel"><div id="menuRows">${rows}</div></div>`;
    return managerShell('menu', content);
  }

  function itemForm(mode) {
    const editing = mode === 'edit';
    const params = new URLSearchParams((location.hash.split('?')[1] || ''));
    const id = params.get('id') || state.menu[0]?.id;
    const product = editing ? state.menu.find(item => item.id === id) || state.menu[0] : { name: '', description: '', price: '', emoji: '🍽️', category: 'Snacks', active: true, featured: false };
    const categories = ['Soups', 'Trudels', 'Snacks', 'Drinks'];
    const content = `<div class="manager-heading"><div><h2>${editing ? 'Edit product' : 'Add product'}</h2><p>${editing ? 'Update the selected item.' : 'Create a fictional product to test the flow.'}</p></div><a class="ghost-button" href="#menu">← Back</a></div><div class="manager-panel"><form id="itemForm" data-mode="${mode}" data-id="${editing ? product.id : ''}" class="form-grid"><div class="field"><label>Name</label><input name="name" required value="${escapeHtml(product.name)}" placeholder="Example: House Burger"></div><div class="field"><label>Category</label><select name="category">${categories.map(category => `<option ${category === product.category ? 'selected' : ''}>${category}</option>`).join('')}</select></div><div class="field"><label>Price</label><input name="price" type="number" step="0.01" min="0" required value="${product.price}"></div><div class="field"><label>Emoji / visual</label><input name="emoji" maxlength="4" value="${product.emoji}"></div><div class="field full"><label>Description</label><textarea name="description" required>${escapeHtml(product.description)}</textarea></div><div class="field"><label><input name="active" type="checkbox" ${product.active ? 'checked' : ''}> Active product</label></div><div class="field"><label><input name="featured" type="checkbox" ${product.featured ? 'checked' : ''}> Featured product</label></div><div class="field full"><button class="primary-button" type="submit">${editing ? 'Save changes' : 'Add to demo'}</button></div></form></div>`;
    return managerShell('menu', content);
  }

  function legacy() {
    return `<section class="section-heading"><span>Project archive</span><h2>All original pages remain accessible.</h2><p>These links open the historical 2024 implementation. Some old integrations may depend on external services. The restored demo exists to provide recruiters with a stable experience without hiding the original code.</p></section><div class="notice" style="margin-bottom:18px">The original pages were built mobile-first for the Brazilian market and remain in Portuguese. Some flows are experimental. Use the sidebar to explore the restored English demo.</div><div class="legacy-list">${legacyPages.map(([name, url, description]) => `<a class="legacy-link" href="${url}" target="_blank" rel="noreferrer"><span>↗</span><div><strong>${name}</strong><span>${description}</span></div><code>${url}</code></a>`).join('')}</div>`;
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  const renderers = {
    overview,
    architecture,
    'client-access': clientAccess,
    store,
    cart,
    payment,
    manager,
    tables,
    orders,
    menu,
    'add-item': () => itemForm('add'),
    'edit-item': () => itemForm('edit'),
    legacy
  };

  function bindPage() {
    const page = document.getElementById('page');

    page.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => {
      const product = state.menu.find(item => item.id === button.dataset.add);
      if (!product) return;
      const existing = state.cart.find(item => item.id === product.id);
      if (existing) existing.qty++;
      else state.cart.push({ id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 });
      saveState();
      toast(`${product.name} added.`);
      render();
    }));

    page.querySelectorAll('[data-qty]').forEach(button => button.addEventListener('click', () => {
      const item = state.cart.find(entry => entry.id === button.dataset.qty);
      if (!item) return;
      item.qty += Number(button.dataset.delta);
      if (item.qty <= 0) state.cart = state.cart.filter(entry => entry.id !== item.id);
      saveState();
      render();
    }));

    const finish = page.querySelector('#finishOrder');
    if (finish) finish.addEventListener('click', () => {
      const total = cartTotal();
      if (!state.cart.length) {
        toast('Add items before completing the order.');
        go('store');
        return;
      }
      state.orders.unshift({ id: Math.floor(8805 + Math.random() * 900), source: 'Demo order', items: `${cartCount()} items`, total, status: 'new' });
      state.cart = [];
      saveState();
      toast('Fictional order created in the dashboard.');
      go('orders');
    });

    const addTable = page.querySelector('#addTable');
    if (addTable) addTable.addEventListener('click', () => {
      const id = Math.max(0, ...state.tables.map(table => table.id)) + 1;
      state.tables.push({ id, name: `Table ${id}`, status: 'free', guest: 'Available' });
      saveState();
      toast(`Table ${id} created.`);
      render();
    });

    page.querySelectorAll('[data-order-next]').forEach(button => button.addEventListener('click', () => {
      const order = state.orders.find(item => String(item.id) === button.dataset.orderNext);
      if (!order) return;
      const next = { new: 'preparing', preparing: 'ready', ready: 'done', done: 'new' };
      order.status = next[order.status];
      saveState();
      render();
    }));

    page.querySelectorAll('[data-menu-toggle]').forEach(button => button.addEventListener('click', () => {
      const product = state.menu.find(item => item.id === button.dataset.menuToggle);
      if (product) {
        product.active = !product.active;
        saveState();
        render();
      }
    }));

    page.querySelectorAll('[data-menu-edit]').forEach(button => button.addEventListener('click', () => {
      location.hash = `edit-item?id=${encodeURIComponent(button.dataset.menuEdit)}`;
    }));

    const form = page.querySelector('#itemForm');
    if (form) form.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: Number(formData.get('price')),
        emoji: formData.get('emoji') || '🍽️',
        description: formData.get('description'),
        active: formData.has('active'),
        featured: formData.has('featured')
      };

      if (form.dataset.mode === 'edit') {
        const product = state.menu.find(item => item.id === form.dataset.id);
        if (product) Object.assign(product, data);
        toast('Product updated.');
      } else {
        data.id = `item-${Date.now()}`;
        state.menu.push(data);
        toast('Product added to the demo.');
      }
      saveState();
      go('menu');
    });

    const search = page.querySelector('#productSearch');
    if (search) search.addEventListener('input', () => {
      const term = search.value.toLowerCase().trim();
      page.querySelectorAll('.product-row').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(term) ? 'grid' : 'none';
      });
    });
  }

  function render() {
    let route = currentRoute();
    if (!renderers[route]) route = 'overview';
    document.getElementById('routeTitle').textContent = routeTitles[route] || 'Doming';
    document.querySelectorAll('[data-route]').forEach(link => link.classList.toggle('active', link.dataset.route === route));
    const page = document.getElementById('page');
    page.innerHTML = renderers[route]();
    bindPage();
    page.focus({ preventScroll: true });
    document.getElementById('sidebar').classList.remove('open');
  }

  document.getElementById('menuButton').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));
  document.getElementById('resetDemo').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    toast('Demo restored to its initial state.');
    render();
  });
  window.addEventListener('hashchange', render);
  render();
})();
