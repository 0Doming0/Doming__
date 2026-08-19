(() => {
  const STORAGE_KEY = 'domingPortfolioDemo.v1';
  const defaultState = {
    cart: [],
    tables: [
      { id: 1, name: 'Mesa 1', status: 'occupied', guest: 'Juliana Mendes' },
      { id: 2, name: 'Mesa 2', status: 'calling', guest: 'Chamando garçom' },
      { id: 3, name: 'Mesa 3', status: 'free', guest: 'Disponível' },
      { id: 4, name: 'Balcão', status: 'occupied', guest: 'Retirada #8841' }
    ],
    orders: [
      { id: 8802, source: 'Mesa 1', items: '2 itens', total: 31.5, status: 'new' },
      { id: 8803, source: 'Retirada', items: '3 itens', total: 43.0, status: 'preparing' },
      { id: 8804, source: 'Mesa 4', items: '1 item', total: 18.5, status: 'ready' }
    ],
    menu: [
      { id: 'caldo', name: 'Caldo verde', description: 'Caldo cremoso com batata, couve e linguiça.', price: 18.5, emoji: '🥣', active: true, featured: true, category: 'Sopas' },
      { id: 'trudel-choco', name: 'Trudel de chocolate', description: 'Massa crocante finalizada com chocolate.', price: 12.5, emoji: '🍫', active: true, featured: true, category: 'Trudels' },
      { id: 'trudel-beijo', name: 'Trudel beijinho', description: 'Massa crocante com creme de coco.', price: 12.0, emoji: '🥥', active: true, featured: false, category: 'Trudels' },
      { id: 'burger', name: 'Burger da casa', description: 'Hambúrguer artesanal, queijo e molho da casa.', price: 24.9, emoji: '🍔', active: true, featured: false, category: 'Lanches' }
    ]
  };

  let state = loadState();
  let toastTimer;

  const routeTitles = {
    overview: 'Visão geral', architecture: 'Arquitetura & decisões',
    'client-access': 'Acesso do cliente', store: 'Loja / cardápio', cart: 'Pedido', payment: 'Pagamento',
    manager: 'Dashboard do restaurante', tables: 'Gestão de mesas', orders: 'Gestão de pedidos', menu: 'Gestão do cardápio',
    'add-item': 'Adicionar item', 'edit-item': 'Editar item', legacy: 'Páginas originais'
  };

  const legacyPages = [
    ['Entrada original', '/introduction-pages/main/', 'Landing page original do projeto'],
    ['Login original', '/introduction-pages/login/', 'Tela de autenticação experimental'],
    ['Escolha de atendimento', '/restaurant/client-request/redirect/', 'Fluxo cliente: mesa ou retirada'],
    ['Loja do cliente', '/restaurant/client-request/store/', 'Cardápio e carrinho original'],
    ['Pagamento', '/restaurant/client-payment/', 'Protótipo experimental de pagamento'],
    ['Dashboard', '/restaurant/restaurantManager/main/', 'Personalização e visão geral do restaurante'],
    ['Mesas', '/restaurant/restaurantManager/mesas/', 'Gestão realtime de mesas'],
    ['Pedidos', '/restaurant/restaurantManager/pedidos/', 'Gestão de pedidos'],
    ['Cardápio', '/restaurant/restaurantManager/cardapio/', 'Gestão de produtos e categorias'],
    ['Adicionar item', '/restaurant/restaurantManager/cardapio/adicionar-item/', 'Cadastro de produto'],
    ['Editar item', '/restaurant/restaurantManager/cardapio/editar-item/', 'Edição de produto']
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
  function money(value) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value); }
  function cartTotal() { return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0); }
  function cartCount() { return state.cart.reduce((sum, item) => sum + item.qty, 0); }
  function toast(message) {
    const el = document.getElementById('toast');
    el.textContent = message; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  }
  function go(route) { location.hash = route; }
  function currentRoute() { return (location.hash || '#overview').slice(1).split('?')[0] || 'overview'; }

  function managerShell(active, content) {
    const links = [
      ['manager','Dashboard'], ['tables','Mesas'], ['orders','Pedidos'], ['menu','Cardápio']
    ].map(([route,label]) => `<a href="#${route}" class="${route===active?'current':''}">${label}</a>`).join('');
    return `<div class="device desktop"><div class="device-screen"><div class="manager-layout">
      <nav class="manager-nav"><strong>Doming · Gestão</strong>${links}<a href="#legacy">Original 2024 ↗</a></nav>
      <section class="manager-content">${content}</section>
    </div></div></div>`;
  }

  function context(title, intro, steps, preview) {
    return `<div class="product-layout">
      <section class="panel context-panel">
        <span class="kicker">DEMONSTRAÇÃO NAVEGÁVEL</span>
        <h1>${title}</h1><p>${intro}</p>
        <div class="flow-list">${steps.map((s,i)=>`<div class="flow-step"><b>${i+1}</b><span>${s}</span></div>`).join('')}</div>
        <div class="notice info">Esta versão usa <strong>dados fictícios e localStorage</strong>. Nenhuma ação altera o Firebase antigo ou realiza cobrança real.</div>
      </section>
      ${preview}
    </div>`;
  }

  function overview() {
    return `<section class="hero">
      <div class="hero-copy">
        <span class="kicker">DOMING · RESTAURANT PRODUCT</span>
        <h1>Do QR Code ao pedido, sem procurar um garçom.</h1>
        <p>Projeto independente concebido depois de observar uma fricção real em restaurantes: clientes precisavam levantar ou procurar atendimento para pedir novamente. O Doming conectava experiência do cliente, cardápio, mesas, pedidos e gestão em uma única aplicação web.</p>
        <div class="hero-actions"><a class="primary-button" href="#client-access">Testar fluxo do cliente</a><a class="secondary-button" href="#manager">Abrir gestão</a></div>
      </div>
      <aside class="hero-panel">
        <div><span class="eyebrow">PAPEL NO PROJETO</span><h3>End-to-end ownership</h3></div>
        <div class="metric"><strong>0 → MVP</strong><span>Ideia, UX, frontend, integração, realtime e deploy.</span></div>
        <div class="metric"><strong>2 lados</strong><span>Experiência do cliente + operação do restaurante.</span></div>
        <div class="metric"><strong>Web realtime</strong><span>Firebase Realtime Database + Netlify.</span></div>
      </aside>
    </section>
    <section class="section"><div class="section-heading"><span>Problema → solução</span><h2>Um sistema pensado a partir da operação real.</h2><p>O produto foi criado antes de eu ter experiência profissional formal. Esta restauração preserva a ideia e torna todos os fluxos exploráveis como case de portfólio.</p></div>
      <div class="grid">
        <article class="card"><div class="card-icon">👤</div><h3>Cliente</h3><p>Entra por QR Code, escolhe atendimento, consulta cardápio, monta pedido e passa pelo checkout.</p><div class="tag-row"><span class="tag">Mobile-first</span><span class="tag">QR flow</span></div></article>
        <article class="card"><div class="card-icon">🏪</div><h3>Restaurante</h3><p>Visualiza mesas, acompanha chamadas, recebe pedidos, gerencia produtos e personaliza a operação.</p><div class="tag-row"><span class="tag">Operations</span><span class="tag">Realtime</span></div></article>
        <article class="card"><div class="card-icon">⚡</div><h3>Produto técnico</h3><p>HTML, CSS e JavaScript integrados ao Firebase e Netlify Functions, com foco em baixo custo para um MVP.</p><div class="tag-row"><span class="tag">Firebase</span><span class="tag">Netlify</span></div></article>
      </div>
    </section>
    <section class="section"><div class="section-heading"><span>Explore</span><h2>Entre nos dois lados do produto.</h2></div>
      <div class="grid two">
        <a class="card option-card" href="#client-access"><strong>Experiência do cliente →</strong><span>Do acesso ao restaurante até o pagamento simulado.</span></a>
        <a class="card option-card" href="#manager"><strong>Gestão do restaurante →</strong><span>Dashboard, mesas, pedidos, cardápio e CRUD de produtos.</span></a>
      </div>
    </section>`;
  }

  function architecture() {
    return `<section class="section-heading"><span>Product & engineering</span><h2>Como o MVP foi estruturado.</h2><p>A arquitetura priorizava velocidade de construção e sincronização em tempo real. Para a demo pública, dependências que poderiam causar efeitos reais foram substituídas por estado local.</p></section>
    <div class="grid">
      <article class="card"><div class="card-icon">🌐</div><h3>Frontend web</h3><p>HTML, CSS e JavaScript sem framework. Fluxos distintos para cliente e gerenciamento.</p></article>
      <article class="card"><div class="card-icon">🔥</div><h3>Realtime data</h3><p>Firebase Realtime Database sincronizava estados como mesas e chamadas entre interfaces.</p></article>
      <article class="card"><div class="card-icon">▲</div><h3>Deploy & functions</h3><p>Netlify hospedava os arquivos públicos e funções serverless usadas pelo frontend.</p></article>
    </div>
    <section class="section"><div class="grid two">
      <article class="card"><h3>Decisão de produto</h3><p>Separar claramente os dois atores: o cliente precisava chegar à ação principal rapidamente; o restaurante precisava enxergar operação, pedidos e configuração.</p></article>
      <article class="card"><h3>Aprendizado posterior</h3><p>O projeto original cresceu antes de validar aquisição e modelo comercial. Hoje eu trataria esse mesmo problema com uma validação menor antes de expandir infraestrutura e funcionalidades.</p></article>
    </div></section>`;
  }

  function clientAccess() {
    const preview = `<div class="device"><div class="device-screen"><div class="client-header"><img src="/static/Mini-Doming Icon.png" alt=""><div><strong>Doming</strong><small>Atendimento digital</small></div></div><div class="mobile-content">
      <span class="eyebrow">LACRO · RESTAURANTE DEMO</span><h2>Como deseja ser atendido?</h2><p style="color:var(--muted);font-size:12px;line-height:1.5">O QR Code direciona o cliente para o contexto certo sem exigir cadastro.</p>
      <a class="option-card" href="#store"><strong>🍽️ Estou em uma mesa</strong><span>Consultar o cardápio e pedir sem procurar atendimento.</span></a>
      <a class="option-card" href="#store"><strong>🛍️ Quero retirar</strong><span>Montar um pedido para buscar no estabelecimento.</span></a>
      <div class="notice">Demo pública: o fluxo não cria sessão real nem grava dados no banco.</div>
    </div></div></div>`;
    return context('Acesso do cliente', 'A entrada foi pensada para reduzir decisões e conduzir rapidamente à ação principal.', ['Ler o QR Code ou abrir o link do restaurante.', 'Escolher mesa ou retirada.', 'Ir diretamente ao cardápio do estabelecimento.'], preview);
  }

  function store() {
    const groups = state.menu.filter(p=>p.active).reduce((a,p)=>((a[p.category]??=[]).push(p),a),{});
    const products = Object.entries(groups).map(([cat, items]) => `<div class="category"><h3>${cat}</h3>${items.map(p=>`<div class="product-row"><div class="product-thumb">${p.emoji}</div><div><h4>${p.name}</h4><p>${p.description}</p><strong>${money(p.price)}</strong></div><button class="add-button" data-add="${p.id}" aria-label="Adicionar ${p.name}">+</button></div>`).join('')}</div>`).join('');
    const preview = `<div class="device"><div class="device-screen"><div class="store-hero"><span class="eyebrow" style="color:#8ecbff">LACRO · DEMO</span><h2 style="margin:6px 0">Peça pelo Doming</h2><p>Cardápio digital · atendimento rápido</p></div><div class="mobile-content"><input class="search" id="productSearch" placeholder="O que você quer pedir?" aria-label="Buscar produto"><div id="productList">${products}</div></div><div class="cart-bar"><div><strong id="cartTotalBar">${money(cartTotal())}</strong><small><span id="cartCountBar">${cartCount()}</span> itens</small></div><a class="primary-button compact" href="#cart">Ver pedido</a></div></div></div>`;
    return context('Loja / cardápio', 'A vitrine foi criada para concentrar o usuário em encontrar produtos e avançar para o pedido.', ['Visualizar categorias e produtos.', 'Adicionar itens sem sair do cardápio.', 'Acompanhar valor e quantidade no rodapé.', 'Abrir o pedido para revisar antes do checkout.'], preview);
  }

  function cart() {
    const list = state.cart.length ? state.cart.map(item => `<div class="list-item"><div class="product-thumb">${item.emoji}</div><div class="grow"><h4>${item.name}</h4><p>${money(item.price)} por unidade</p></div><div class="qty"><button data-qty="${item.id}" data-delta="-1">−</button><strong>${item.qty}</strong><button data-qty="${item.id}" data-delta="1">+</button></div></div>`).join('') : `<div class="notice info">Seu pedido demo está vazio. <a href="#store">Adicione alguns itens no cardápio.</a></div>`;
    const subtotal = cartTotal();
    const preview = `<div class="device"><div class="device-screen"><div class="client-header"><img src="/static/Mini-Doming Icon.png" alt=""><div><strong>Seu pedido</strong><small>Revise antes de confirmar</small></div></div><div class="mobile-content"><div class="list">${list}</div><div class="total-box"><div class="total-row"><span>Subtotal</span><span>${money(subtotal)}</span></div><div class="total-row"><span>Taxa da demo</span><span>${money(0)}</span></div><div class="total-row final"><span>Total</span><span>${money(subtotal)}</span></div></div><a class="primary-button" style="width:100%;margin-top:14px" href="#payment">Continuar para pagamento</a></div></div></div>`;
    return context('Pedido', 'O carrinho oferece uma revisão simples antes de avançar. Nesta demo você pode alterar quantidades e ver o total atualizar.', ['Revisar itens.', 'Ajustar quantidade.', 'Conferir total.', 'Avançar para pagamento simulado.'], preview);
  }

  function payment() {
    const preview = `<div class="device"><div class="device-screen"><div class="client-header"><img src="/static/Mini-Doming Icon.png" alt=""><div><strong>Pagamento</strong><small>Total ${money(cartTotal())}</small></div></div><div class="mobile-content"><div class="notice">Pagamento desativado para portfólio. Nenhuma transação real será criada.</div><h3>Escolha a forma de pagamento</h3><label class="payment-option"><input type="radio" name="pay" checked><span><strong>PIX demonstrativo</strong><br><small style="color:var(--muted)">QR Code apenas visual.</small></span></label><label class="payment-option"><input type="radio" name="pay"><span><strong>Pagar no balcão</strong><br><small style="color:var(--muted)">Fluxo de retirada.</small></span></label><div class="mock-qr" aria-label="QR Code ilustrativo"></div><button class="primary-button" id="finishOrder" style="width:100%">Simular pedido concluído</button></div></div></div>`;
    return context('Pagamento', 'O projeto original experimentou integração de pagamento. Para uma demonstração pública, o checkout foi deliberadamente convertido em simulação segura.', ['Escolher forma de pagamento.', 'Visualizar o checkout.', 'Concluir apenas uma simulação.', 'Criar um pedido fictício no painel de gestão.'], preview);
  }

  function manager() {
    const occupied = state.tables.filter(t=>t.status!=='free').length;
    const content = `<div class="manager-heading"><div><span class="eyebrow">RESTAURANTE DEMO</span><h2>Bom dia, Lacro.</h2><p>Visão rápida do que está acontecendo agora.</p></div><span class="status green">Sistema online</span></div><div class="stat-grid"><div class="stat-card"><span>Pedidos ativos</span><strong>${state.orders.filter(o=>o.status!=='done').length}</strong></div><div class="stat-card"><span>Mesas em uso</span><strong>${occupied}</strong></div><div class="stat-card"><span>Ticket da demo</span><strong>${money(24.3)}</strong></div></div><div class="manager-panel"><h3>Atividade recente</h3>${state.orders.slice(0,3).map(o=>orderMarkup(o,false)).join('')}</div><div class="manager-panel"><h3>Próximas ações</h3><div class="action-row"><a class="primary-button compact" href="#orders">Gerenciar pedidos</a><a class="ghost-button" href="#tables">Ver mesas</a><a class="ghost-button" href="#menu">Editar cardápio</a></div></div>`;
    return managerShell('manager', content);
  }

  function tables() {
    const cards = state.tables.map(t=>`<article class="table-card ${t.status==='occupied'?'occupied':t.status==='calling'?'calling':''}"><span class="status ${t.status==='free'?'gray':t.status==='calling'?'amber':'blue'}">${t.status==='free'?'Livre':t.status==='calling'?'Chamando':'Ocupada'}</span><strong>${t.name}</strong><span>${t.guest}</span></article>`).join('');
    const content = `<div class="manager-heading"><div><h2>Mesas</h2><p>Estado operacional demonstrado com dados locais.</p></div><button class="primary-button compact" id="addTable">+ Nova mesa</button></div><div class="manager-panel"><div class="table-grid" id="tableGrid">${cards}</div></div><div class="notice info" style="margin-top:14px">No projeto original, esta área foi conectada ao Firebase Realtime Database para refletir mudanças em tempo real.</div>`;
    return managerShell('tables', content);
  }

  function orderMarkup(o, controls=true) {
    const labels = { new:['Novo','blue'], preparing:['Preparando','amber'], ready:['Pronto','green'], done:['Concluído','gray'] };
    const [label,color] = labels[o.status] || labels.new;
    return `<div class="order-card"><div class="order-id">#${String(o.id).slice(-4)}</div><div><h4>${o.source} · ${money(o.total)}</h4><p>${o.items} · <span class="status ${color}">${label}</span></p></div>${controls?`<div class="action-row"><button class="small-button ${o.status==='done'?'':'primary'}" data-order-next="${o.id}">${o.status==='new'?'Preparar':o.status==='preparing'?'Marcar pronto':o.status==='ready'?'Concluir':'Reabrir'}</button></div>`:''}</div>`;
  }

  function orders() {
    const content = `<div class="manager-heading"><div><h2>Pedidos</h2><p>Fila operacional do restaurante.</p></div><span class="status blue">${state.orders.filter(o=>o.status!=='done').length} ativos</span></div><div class="manager-panel"><div id="orderList">${state.orders.map(o=>orderMarkup(o,true)).join('')}</div></div>`;
    return managerShell('orders', content);
  }

  function menu() {
    const rows = state.menu.map(p=>`<div class="order-card"><div class="product-thumb">${p.emoji}</div><div><h4>${p.name} · ${money(p.price)}</h4><p>${p.category} · <span class="status ${p.active?'green':'gray'}">${p.active?'Ativo':'Pausado'}</span>${p.featured?' · Destaque':''}</p></div><div class="action-row"><button class="small-button" data-menu-toggle="${p.id}">${p.active?'Pausar':'Ativar'}</button><button class="small-button" data-menu-edit="${p.id}">Editar</button></div></div>`).join('');
    const content = `<div class="manager-heading"><div><h2>Cardápio</h2><p>Produtos, preço e disponibilidade.</p></div><a class="primary-button compact" href="#add-item">+ Adicionar item</a></div><div class="manager-panel"><div id="menuRows">${rows}</div></div>`;
    return managerShell('menu', content);
  }

  function itemForm(mode) {
    const editing = mode === 'edit';
    const params = new URLSearchParams((location.hash.split('?')[1] || ''));
    const id = params.get('id') || state.menu[0]?.id;
    const p = editing ? state.menu.find(x=>x.id===id) || state.menu[0] : { name:'', description:'', price:'', emoji:'🍽️', category:'Lanches', active:true, featured:false };
    const content = `<div class="manager-heading"><div><h2>${editing?'Editar produto':'Adicionar produto'}</h2><p>${editing?'Atualize os dados do item selecionado.':'Crie um produto fictício para testar o fluxo.'}</p></div><a class="ghost-button" href="#menu">← Voltar</a></div><div class="manager-panel"><form id="itemForm" data-mode="${mode}" data-id="${editing?p.id:''}" class="form-grid"><div class="field"><label>Nome</label><input name="name" required value="${escapeHtml(p.name)}" placeholder="Ex.: Burger da casa"></div><div class="field"><label>Categoria</label><select name="category">${['Sopas','Trudels','Lanches','Bebidas'].map(c=>`<option ${c===p.category?'selected':''}>${c}</option>`).join('')}</select></div><div class="field"><label>Preço</label><input name="price" type="number" step="0.01" min="0" required value="${p.price}"></div><div class="field"><label>Emoji / visual</label><input name="emoji" maxlength="4" value="${p.emoji}"></div><div class="field full"><label>Descrição</label><textarea name="description" required>${escapeHtml(p.description)}</textarea></div><div class="field"><label><input name="active" type="checkbox" ${p.active?'checked':''}> Produto ativo</label></div><div class="field"><label><input name="featured" type="checkbox" ${p.featured?'checked':''}> Produto em destaque</label></div><div class="field full"><button class="primary-button" type="submit">${editing?'Salvar alterações':'Adicionar à demo'}</button></div></form></div>`;
    return managerShell('menu', content);
  }

  function legacy() {
    return `<section class="section-heading"><span>Arquivo do projeto</span><h2>Todas as páginas originais continuam acessíveis.</h2><p>Estes links abrem a implementação histórica de 2024. Algumas integrações antigas podem depender de serviços externos. A demo restaurada acima existe para garantir uma experiência estável ao recrutador sem esconder o código original.</p></section><div class="notice" style="margin-bottom:18px">As páginas originais foram construídas mobile-first e podem ter comportamento experimental. Use a navegação lateral para ver a versão restaurada.</div><div class="legacy-list">${legacyPages.map(([name,url,desc])=>`<a class="legacy-link" href="${url}" target="_blank" rel="noreferrer"><span>↗</span><div><strong>${name}</strong><span>${desc}</span></div><code>${url}</code></a>`).join('')}</div>`;
  }

  function escapeHtml(value='') { return String(value).replace(/[&<>'"]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c])); }

  const renderers = { overview, architecture, 'client-access': clientAccess, store, cart, payment, manager, tables, orders, menu, 'add-item':()=>itemForm('add'), 'edit-item':()=>itemForm('edit'), legacy };

  function bindPage() {
    const page = document.getElementById('page');
    page.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>{
      const p = state.menu.find(x=>x.id===btn.dataset.add); if(!p) return;
      const existing = state.cart.find(x=>x.id===p.id); if(existing) existing.qty++; else state.cart.push({ id:p.id, name:p.name, price:p.price, emoji:p.emoji, qty:1 });
      saveState(); toast(`${p.name} adicionado.`); render();
    }));
    page.querySelectorAll('[data-qty]').forEach(btn=>btn.addEventListener('click',()=>{
      const item = state.cart.find(x=>x.id===btn.dataset.qty); if(!item) return; item.qty += Number(btn.dataset.delta); if(item.qty<=0) state.cart=state.cart.filter(x=>x.id!==item.id); saveState(); render();
    }));
    const finish = page.querySelector('#finishOrder'); if(finish) finish.addEventListener('click',()=>{
      const total=cartTotal(); if(!state.cart.length){ toast('Adicione itens antes de concluir.'); go('store'); return; }
      state.orders.unshift({ id: Math.floor(8805+Math.random()*900), source:'Pedido da demo', items:`${cartCount()} itens`, total, status:'new' }); state.cart=[]; saveState(); toast('Pedido fictício criado no dashboard.'); go('orders');
    });
    const addTable = page.querySelector('#addTable'); if(addTable) addTable.addEventListener('click',()=>{
      const id=Math.max(0,...state.tables.map(t=>t.id))+1; state.tables.push({id,name:`Mesa ${id}`,status:'free',guest:'Disponível'}); saveState(); toast(`Mesa ${id} criada.`); render();
    });
    page.querySelectorAll('[data-order-next]').forEach(btn=>btn.addEventListener('click',()=>{
      const o=state.orders.find(x=>String(x.id)===btn.dataset.orderNext); if(!o)return; const next={new:'preparing',preparing:'ready',ready:'done',done:'new'}; o.status=next[o.status]; saveState(); render();
    }));
    page.querySelectorAll('[data-menu-toggle]').forEach(btn=>btn.addEventListener('click',()=>{ const p=state.menu.find(x=>x.id===btn.dataset.menuToggle); if(p){p.active=!p.active;saveState();render();} }));
    page.querySelectorAll('[data-menu-edit]').forEach(btn=>btn.addEventListener('click',()=>{ location.hash=`edit-item?id=${encodeURIComponent(btn.dataset.menuEdit)}`; }));
    const form=page.querySelector('#itemForm'); if(form) form.addEventListener('submit',e=>{
      e.preventDefault(); const fd=new FormData(form); const data={name:fd.get('name'),category:fd.get('category'),price:Number(fd.get('price')),emoji:fd.get('emoji')||'🍽️',description:fd.get('description'),active:fd.has('active'),featured:fd.has('featured')};
      if(form.dataset.mode==='edit'){ const p=state.menu.find(x=>x.id===form.dataset.id); if(p) Object.assign(p,data); toast('Produto atualizado.'); }
      else { data.id=`item-${Date.now()}`; state.menu.push(data); toast('Produto adicionado à demo.'); }
      saveState(); go('menu');
    });
    const search=page.querySelector('#productSearch'); if(search) search.addEventListener('input',()=>{
      const term=search.value.toLowerCase().trim(); page.querySelectorAll('.product-row').forEach(row=>{ row.style.display=row.textContent.toLowerCase().includes(term)?'grid':'none'; });
    });
  }

  function render() {
    let route=currentRoute(); if(!renderers[route]) route='overview';
    document.getElementById('routeTitle').textContent=routeTitles[route]||'Doming';
    document.querySelectorAll('[data-route]').forEach(a=>a.classList.toggle('active',a.dataset.route===route));
    const page=document.getElementById('page'); page.innerHTML=renderers[route](); bindPage(); page.focus({preventScroll:true});
    document.getElementById('sidebar').classList.remove('open');
  }

  document.getElementById('menuButton').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
  document.getElementById('resetDemo').addEventListener('click',()=>{ localStorage.removeItem(STORAGE_KEY); state=loadState(); toast('Demo restaurada ao estado inicial.'); render(); });
  window.addEventListener('hashchange',render);
  render();
})();
