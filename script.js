/* ============================================================
   SPYBITECH  -  site behaviour
   Navigation, hero slider, product catalogue, quote list,
   domain search, counters and scroll motion.
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '264853522714';
  var SALES_EMAIL = 'sales@spybitech.com.na';
  var EMAILJS_SERVICE = 'service_dlw3fhb';
  var EMAILJS_TEMPLATE = 'template_kgtxcv5';
  var PROMO_ENDS = new Date('2026-10-31T23:59:59+02:00');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PRODUCTS = window.SPY_PRODUCTS || [];
  var CATS = window.SPY_CATEGORIES || {};

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(id, cls) {
    return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#' + id + '" xlink:href="#' + id + '"/></svg>';
  }
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) { if (PRODUCTS[i].id === id) return PRODUCTS[i]; } return null; }
  function waLink(text) { return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text); }
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || 'null');
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }

  /* ============================================================
     NAVIGATION (desktop dropdowns, mobile drawer)
     ============================================================ */
  function initNav() {
    var mobileNav = $('#mobileNav');
    var openBtn = $('#mobileOpen');
    var closeBtn = $('#mobileClose');
    function openMobile() { mobileNav.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function closeMobile() { if (!mobileNav) return; mobileNav.classList.remove('is-open'); document.body.style.overflow = ''; }

    if (mobileNav) {
      if (openBtn) openBtn.addEventListener('click', openMobile);
      if (closeBtn) closeBtn.addEventListener('click', closeMobile);
      $$('.mobile-nav-body > a, .m-group-panel a, .m-group-link', mobileNav).forEach(function (a) {
        a.addEventListener('click', closeMobile);
      });
      $$('.m-group-toggle', mobileNav).forEach(function (t) {
        t.addEventListener('click', function () {
          var g = t.closest('.m-group');
          var wasOpen = g.classList.contains('is-open');
          $$('.m-group.is-open', mobileNav).forEach(function (x) { x.classList.remove('is-open'); });
          if (!wasOpen) g.classList.add('is-open');
        });
      });
    }

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.category-nav .nav-item')) {
        $$('.category-nav .nav-item.is-open').forEach(function (i) { i.classList.remove('is-open'); });
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        $$('.category-nav .nav-item.is-open').forEach(function (i) { i.classList.remove('is-open'); });
        closeMobile(); closeModal(); closeDrawer();
      }
    });
    $$('.has-flyout > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 1180) return;
        e.preventDefault();
        a.closest('.has-flyout').classList.toggle('is-open');
      });
    });

    var header = $('.site-header');
    if (header) {
      var setShadow = function () {
        header.style.boxShadow = window.scrollY > 30 ? '0 6px 20px -10px rgba(20,22,40,.18)' : 'none';
      };
      window.addEventListener('scroll', setShadow, { passive: true });
      setShadow();
      var setHdr = function () { document.documentElement.style.setProperty('--hdr', header.offsetHeight + 'px'); };
      setHdr();
      window.addEventListener('resize', setHdr);
    }
  }

  /* ============================================================
     PROMOTION (refer and win): countdown and auto expiry
     ============================================================ */
  function initPromo() {
    var now = new Date();
    if (now > PROMO_ENDS) {
      $$('[data-expires]').forEach(function (el) { el.remove(); });
      return;
    }
    var strip = $('.promo-strip');
    if (strip && store('spy_promo_closed') === true) strip.classList.add('is-hidden');
    var close = $('.ps-close');
    if (close) close.addEventListener('click', function () { strip.classList.add('is-hidden'); store('spy_promo_closed', true); });

    var timers = $$('[data-countdown]');
    if (!timers.length) return;
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var ms = PROMO_ENDS - new Date();
      if (ms <= 0) { $$('[data-expires]').forEach(function (el) { el.remove(); }); clearInterval(t); return; }
      var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      timers.forEach(function (el) {
        var parts = { d: d, h: pad(h), m: pad(m), s: pad(s) };
        $$('[data-u]', el).forEach(function (u) { u.textContent = parts[u.getAttribute('data-u')]; });
      });
    }
    tick();
    var t = setInterval(tick, 1000);
  }

  /* ============================================================
     SHARED UI: modal, drawer, toast, floating buttons
     (injected once so every page gets them)
     ============================================================ */
  function injectShell() {
    var html =
      '<div class="modal" id="pModal" aria-hidden="true">' +
        '<div class="modal-scrim" data-close></div>' +
        '<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="pModalTitle">' +
          '<button class="modal-close" data-close aria-label="Close">' + icon('ic-close') + '</button>' +
          '<div class="modal-media"></div>' +
          '<div class="modal-body"></div>' +
        '</div>' +
      '</div>' +
      '<div class="drawer" id="qDrawer" aria-hidden="true">' +
        '<div class="modal-scrim" data-qclose></div>' +
        '<aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="qTitle">' +
          '<div class="drawer-head"><div><h3 id="qTitle">Your quote list</h3><p>We reply with pricing and availability, usually within one business day.</p></div>' +
          '<button class="modal-close" style="position:static" data-qclose aria-label="Close quote list">' + icon('ic-close') + '</button></div>' +
          '<div class="drawer-body" id="qItems"></div>' +
          '<form class="q-form" id="qForm" novalidate>' +
            '<div class="row"><input name="user_name" placeholder="Full name" required autocomplete="name"><input name="phone" placeholder="Phone or WhatsApp" autocomplete="tel"></div>' +
            '<input name="user_email" type="email" placeholder="Email address" required autocomplete="email">' +
            '<input name="company" placeholder="Company (optional)" autocomplete="organization">' +
            '<textarea name="notes" placeholder="Site location, number of points or cameras, anything we should know"></textarea>' +
            '<div class="q-status" id="qStatus" role="status"></div>' +
            '<div class="btns"><button type="submit" class="btn btn-primary">' + icon('ic-mail') + ' Send request</button>' +
            '<a class="btn btn-wa" id="qWa" href="#" target="_blank" rel="noopener">' + icon('ic-whatsapp') + ' WhatsApp</a></div>' +
          '</form>' +
        '</aside>' +
      '</div>' +
      '<a class="fab-wa" href="https://wa.me/' + WA_NUMBER + '" target="_blank" rel="noopener" aria-label="Chat with Spybitech on WhatsApp">' + icon('ic-whatsapp') + '<span class="tip">Chat with us on WhatsApp</span></a>' +
      '<div class="quote-bar" id="qBar"><span><strong id="qBarN">0</strong> items in your quote list</span><button class="btn btn-primary btn-sm" data-open-quote>Review and send</button></div>' +
      '<div class="toast" id="toast" role="status">' + icon('ic-check') + '<span></span></div>';
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    $$('[data-close]', $('#pModal')).forEach(function (b) { b.addEventListener('click', closeModal); });
    $$('[data-qclose]').forEach(function (b) { b.addEventListener('click', closeDrawer); });
    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-open-quote]');
      if (o) { e.preventDefault(); openDrawer(); }
    });
  }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast'); if (!t) return;
    $('span', t).textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2400);
  }

  /* ============================================================
     QUOTE LIST (stored in the visitor's browser)
     ============================================================ */
  function getQuote() { var q = store('spy_quote'); return Array.isArray(q) ? q : []; }
  function setQuote(q) { store('spy_quote', q); renderQuote(); }

  function addToQuote(item) {
    var q = getQuote();
    var found = null;
    q.forEach(function (x) { if (x.id === item.id) found = x; });
    if (found) found.qty += 1;
    else q.push({ id: item.id, name: item.name, sku: item.sku || '', img: item.img || '', qty: 1 });
    setQuote(q);
    $$('.quote-count').forEach(function (c) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); });
    toast(item.name + ' added to your quote list');
  }

  function renderQuote() {
    var q = getQuote();
    var n = q.reduce(function (a, x) { return a + x.qty; }, 0);
    $$('.quote-count').forEach(function (c) { c.textContent = n; c.classList.toggle('has', n > 0); });
    var bar = $('#qBar');
    if (bar) { $('#qBarN').textContent = n; bar.classList.toggle('show', n > 0 && !$('#qDrawer').classList.contains('is-open') && !$('#pModal').classList.contains('is-open')); }

    $$('[data-add]').forEach(function (b) {
      var inList = q.some(function (x) { return x.id === b.getAttribute('data-add'); });
      b.classList.toggle('is-added', inList);
      var lbl = $('.lbl', b);
      if (lbl) lbl.textContent = inList ? 'Added to quote' : 'Add to quote';
    });

    var box = $('#qItems');
    if (!box) return;
    if (!q.length) {
      box.innerHTML = '<div class="q-empty">' + icon('ic-list') + '<p><strong>Your quote list is empty.</strong><br>Add products, a package or a domain, then send the list to our team in one go.</p><a class="btn btn-outline btn-sm" href="products">Browse products</a></div>';
    } else {
      box.innerHTML = q.map(function (x) {
        var thumb = x.img ? '<img src="' + esc(x.img) + '" alt="" referrerpolicy="no-referrer" loading="lazy">' : '<span class="q-thumb">' + icon('ic-list') + '</span>';
        return '<div class="q-item" data-id="' + esc(x.id) + '">' + thumb +
          '<div><div class="q-name">' + esc(x.name) + '</div><div class="q-sku">' + esc(x.sku) + '</div>' +
          '<button class="q-remove" data-qrm>Remove</button></div>' +
          '<div class="q-qty"><button data-qdec aria-label="Decrease quantity">' + icon('ic-minus') + '</button><span>' + x.qty + '</span><button data-qinc aria-label="Increase quantity">' + icon('ic-plus') + '</button></div></div>';
      }).join('');
    }
    var wa = $('#qWa');
    if (wa) wa.href = waLink(quoteText());
  }

  function quoteText(extra) {
    var q = getQuote();
    var lines = ['Hello Spybitech, please quote me for:'];
    q.forEach(function (x) { lines.push('- ' + x.qty + ' x ' + x.name + (x.sku ? ' (' + x.sku + ')' : '')); });
    if (extra) lines.push('', extra);
    return lines.join('\n');
  }

  function initQuote() {
    var box = $('#qItems');
    box.addEventListener('click', function (e) {
      var row = e.target.closest('.q-item'); if (!row) return;
      var id = row.getAttribute('data-id');
      var q = getQuote();
      q.forEach(function (x) {
        if (x.id !== id) return;
        if (e.target.closest('[data-qinc]')) x.qty += 1;
        if (e.target.closest('[data-qdec]')) x.qty = Math.max(1, x.qty - 1);
      });
      if (e.target.closest('[data-qrm]')) q = q.filter(function (x) { return x.id !== id; });
      setQuote(q);
    });

    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-add]');
      if (b) {
        e.preventDefault();
        var p = byId(b.getAttribute('data-add'));
        if (p) addToQuote({ id: p.id, name: p.brand + ' ' + p.name, sku: p.sku, img: p.img });
        return;
      }
      var c = e.target.closest('[data-add-custom]');
      if (c) {
        e.preventDefault();
        addToQuote({ id: c.getAttribute('data-add-custom'), name: c.getAttribute('data-name'), sku: c.getAttribute('data-sku') || '', img: c.getAttribute('data-img') || '' });
        if (c.closest('.dom-row')) { c.classList.add('is-added'); c.innerHTML = icon('ic-check') + ' Added'; }
        if (c.hasAttribute('data-open')) openDrawer();
      }
    });

    var form = $('#qForm');
    var status = $('#qStatus');
    var wa = $('#qWa');
    wa.addEventListener('click', function (e) {
      if (!getQuote().length) { e.preventDefault(); showStatus('err', 'Add at least one item to your quote list first.'); return; }
      var f = new FormData(form);
      var who = [f.get('user_name'), f.get('company')].filter(Boolean).join(', ');
      wa.href = waLink(quoteText(who ? 'From: ' + who : ''));
    });

    function showStatus(kind, msg) { status.className = 'q-status ' + kind; status.textContent = msg; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = getQuote();
      var f = new FormData(form);
      if (!q.length) { showStatus('err', 'Add at least one item to your quote list first.'); return; }
      if (!f.get('user_name') || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.get('user_email') || '')) {
        showStatus('err', 'Enter your name and a valid email address so we can send the quote.');
        return;
      }
      var msg = [
        'QUOTE REQUEST (website quote list)',
        '',
        q.map(function (x) { return x.qty + ' x ' + x.name + (x.sku ? ' [' + x.sku + ']' : ''); }).join('\n'),
        '',
        'Phone: ' + (f.get('phone') || 'not given'),
        'Company: ' + (f.get('company') || 'not given'),
        'Notes: ' + (f.get('notes') || 'none')
      ].join('\n');
      var btn = $('button[type=submit]', form);
      btn.disabled = true;
      showStatus('ok', 'Sending your request...');
      var done = function () {
        btn.disabled = false;
        showStatus('ok', 'Request sent. Our team will reply to ' + f.get('user_email') + ' with pricing.');
        setQuote([]); form.reset();
      };
      var fail = function () {
        btn.disabled = false;
        showStatus('err', 'The request could not be sent. Use the WhatsApp button, or email ' + SALES_EMAIL + '.');
      };
      if (window.emailjs && emailjs.send) {
        emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, { user_name: f.get('user_name'), user_email: f.get('user_email'), message: msg }).then(done, fail);
      } else { fail(); }
    });

    renderQuote();
  }

  function openDrawer() {
    var d = $('#qDrawer'); if (!d) return;
    closeModal();
    d.classList.add('is-open'); d.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('#qBar').classList.remove('show');
    setTimeout(function () { var f = $('#qForm input'); if (f && window.innerWidth > 760) f.focus(); }, 350);
  }
  function closeDrawer() {
    var d = $('#qDrawer'); if (!d || !d.classList.contains('is-open')) return;
    d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    renderQuote();
  }

  /* ============================================================
     PRODUCT CARDS
     ============================================================ */
  function imgTag(src, fit, cls, alt, zoom) {
    var z = zoom ? ' style="--z:' + zoom + '"' : '';
    return '<img class="' + (cls || '') + ' fit-' + (fit || 'contain') + '"' + z + ' src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async" referrerpolicy="no-referrer">';
  }

  function card(p, n) {
    var cat = CATS[p.cat] || {};
    var badge = p.badge ? '<span class="p-badge' + (/package|power/i.test(p.badge) ? ' red' : '') + '">' + esc(p.badge) + '</span>' : '';
    var kit = p.kit ? imgTag(p.kit, 'contain', 'kit-img', '') : '';
    return '<article class="p-card enter" style="--n:' + (n || 0) + '" data-id="' + p.id + '" data-icon="' + (cat.icon || 'ic-server') + '">' +
      badge +
      '<button class="p-quick" data-view="' + p.id + '">Quick view</button>' +
      '<button class="p-media" data-view="' + p.id + '" aria-label="View ' + esc(p.brand + ' ' + p.name) + '">' + imgTag(p.img, p.fit, 'p-img', p.brand + ' ' + p.name, p.zoom) + kit + '</button>' +
      '<div class="p-body"><span class="p-brand">' + esc(p.brand) + ' &middot; ' + esc(cat.short || '') + '</span>' +
      '<h3 class="p-name">' + esc(p.name) + '</h3><span class="p-sku">' + esc(p.sku) + '</span></div>' +
      '<div class="p-foot"><button class="btn p-add" data-add="' + p.id + '">' + icon('ic-plus') + '<span class="lbl">Add to quote</span></button>' +
      '<a class="p-wa" href="' + waLink('Hello Spybitech, I would like a price for the ' + p.brand + ' ' + p.name + ' (' + p.sku + ').') + '" target="_blank" rel="noopener" aria-label="Ask about this product on WhatsApp">' + icon('ic-whatsapp') + '</a></div>' +
      '</article>';
  }

  function wireImages(root) {
    $$('img.p-img, img.kit-img, .modal-media img', root).forEach(function (img) {
      if (img.dataset.wired) return;
      img.dataset.wired = '1';
      var ok = function () { img.classList.add('loaded'); };
      var bad = function () {
        var media = img.closest('.p-media, .modal-media');
        var c = img.closest('[data-icon]');
        img.remove();
        if (media && !media.querySelector('.fb-icon')) media.insertAdjacentHTML('afterbegin', icon(c ? c.getAttribute('data-icon') : 'ic-server', 'fb-icon'));
      };
      if (img.complete && img.naturalWidth) ok();
      else if (img.complete && !img.naturalWidth && img.src) bad();
      else { img.addEventListener('load', ok); img.addEventListener('error', bad); }
    });
    $$('.p-card.enter', root).forEach(function (c) {
      c.addEventListener('animationend', function () { c.classList.remove('enter'); }, { once: true });
    });
  }

  function renderInto(el, list) {
    el.innerHTML = list.map(card).join('');
    wireImages(el);
    renderQuote();
  }

  function matches(p, filter) {
    if (!filter || filter === 'all') return true;
    var parts = filter.split(',');
    return parts.some(function (f) { f = f.trim(); return p.cat === f || (p.tags || []).indexOf(f) > -1; });
  }

  /* ---------- quick view modal ---------- */
  var lastFocus;
  function openModal(id) {
    var p = byId(id); if (!p) return;
    var m = $('#pModal');
    var cat = CATS[p.cat] || {};
    lastFocus = document.activeElement;
    $('.modal-card', m).setAttribute('data-icon', cat.icon || 'ic-server');
    $('.modal-media', m).innerHTML = imgTag(p.img, p.fit, '', p.brand + ' ' + p.name, p.zoom);
    $('.modal-body', m).innerHTML =
      '<span class="p-brand">' + esc(p.brand) + ' &middot; ' + esc(cat.label || '') + '</span>' +
      '<h3 id="pModalTitle">' + esc(p.name) + '</h3>' +
      '<span class="p-sku">Model: ' + esc(p.sku) + '</span>' +
      '<p class="m-blurb">' + esc(p.blurb) + '</p>' +
      '<ul class="m-specs">' + (p.specs || []).map(function (s) { return '<li>' + icon('ic-check') + '<span>' + esc(s) + '</span></li>'; }).join('') + '</ul>' +
      '<div class="m-actions"><button class="btn btn-primary p-add" data-add="' + p.id + '">' + icon('ic-plus') + '<span class="lbl">Add to quote</span></button>' +
      '<a class="btn btn-outline" href="' + waLink('Hello Spybitech, I would like a price for the ' + p.brand + ' ' + p.name + ' (' + p.sku + ').') + '" target="_blank" rel="noopener">' + icon('ic-whatsapp') + ' Ask on WhatsApp</a></div>' +
      '<p class="m-note">Pricing depends on quantity and installation. Supply only or supplied and installed by our technicians.</p>';
    $('.modal-media img', m).classList.add('loaded');
    wireImages(m);
    renderQuote();
    m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('#qBar').classList.remove('show');
    setTimeout(function () { $('.modal-close', m).focus(); }, 50);
  }
  function closeModal() {
    var m = $('#pModal'); if (!m || !m.classList.contains('is-open')) return;
    m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true');
    if (!$('#qDrawer').classList.contains('is-open')) document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    renderQuote();
  }

  function initProducts() {
    document.addEventListener('click', function (e) {
      var v = e.target.closest('[data-view]');
      if (v) { e.preventDefault(); openModal(v.getAttribute('data-view')); }
    });

    /* product rails: <div class="p-rail" data-filter="cameras,kits" data-limit="8"> */
    $$('.p-rail[data-filter]').forEach(function (rail) {
      var list = PRODUCTS.filter(function (p) { return matches(p, rail.getAttribute('data-filter')); });
      var lim = parseInt(rail.getAttribute('data-limit') || '12', 10);
      renderInto(rail, list.slice(0, lim));
    });

    /* rail arrows */
    $$('[data-rail-prev], [data-rail-next]').forEach(function (b) {
      b.addEventListener('click', function () {
        var rail = document.getElementById(b.getAttribute('data-rail-prev') || b.getAttribute('data-rail-next'));
        if (!rail) return;
        var step = rail.clientWidth * 0.8 * (b.hasAttribute('data-rail-prev') ? -1 : 1);
        rail.scrollBy({ left: step, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });

    /* tabbed rail on the home page */
    $$('[data-rail-tabs]').forEach(function (tabs) {
      var rail = document.getElementById(tabs.getAttribute('data-rail-tabs'));
      tabs.addEventListener('click', function (e) {
        var t = e.target.closest('.cat-tab'); if (!t) return;
        $$('.cat-tab', tabs).forEach(function (x) { x.classList.remove('is-active'); x.setAttribute('aria-pressed', 'false'); });
        t.classList.add('is-active'); t.setAttribute('aria-pressed', 'true');
        rail.setAttribute('data-filter', t.getAttribute('data-filter'));
        var list = PRODUCTS.filter(function (p) { return matches(p, t.getAttribute('data-filter')); });
        renderInto(rail, list.slice(0, 12));
        rail.scrollLeft = 0;
      });
    });

    /* full catalogue page */
    var grid = $('#shopGrid');
    if (grid) {
      var tabs = $('#shopTabs'), search = $('#shopSearch'), count = $('#shopCount'), empty = $('#shopEmpty');
      var state = { cat: 'all', q: '' };
      var all = '<button class="cat-tab is-active" data-cat="all" aria-pressed="true">All products <span class="n">' + PRODUCTS.length + '</span></button>';
      tabs.innerHTML = all + Object.keys(CATS).map(function (k) {
        var n = PRODUCTS.filter(function (p) { return p.cat === k; }).length;
        return n ? '<button class="cat-tab" data-cat="' + k + '" aria-pressed="false">' + icon(CATS[k].icon) + esc(CATS[k].label) + ' <span class="n">' + n + '</span></button>' : '';
      }).join('');

      var draw = function () {
        var q = state.q.toLowerCase();
        var list = PRODUCTS.filter(function (p) {
          var inCat = state.cat === 'all' || p.cat === state.cat;
          var hay = (p.brand + ' ' + p.name + ' ' + p.sku + ' ' + (p.tags || []).join(' ') + ' ' + p.blurb).toLowerCase();
          return inCat && (!q || q.split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; }));
        });
        renderInto(grid, list);
        count.innerHTML = '<strong>' + list.length + '</strong> ' + (list.length === 1 ? 'product' : 'products') + (state.cat !== 'all' ? ' in ' + esc(CATS[state.cat].label) : '') + (q ? ' matching &ldquo;' + esc(state.q) + '&rdquo;' : '');
        empty.classList.toggle('show', !list.length);
      };
      var setCat = function (c, push) {
        if (c !== 'all' && !CATS[c]) c = 'all';
        state.cat = c;
        $$('.cat-tab', tabs).forEach(function (t) {
          var on = t.getAttribute('data-cat') === c;
          t.classList.toggle('is-active', on); t.setAttribute('aria-pressed', on ? 'true' : 'false');
          if (on && t.scrollIntoView && push) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        });
        if (push) history.replaceState(null, '', c === 'all' ? location.pathname : '#' + c);
        draw();
      };
      tabs.addEventListener('click', function (e) { var t = e.target.closest('.cat-tab'); if (t) setCat(t.getAttribute('data-cat'), true); });
      var deb;
      search.addEventListener('input', function () {
        clearTimeout(deb);
        deb = setTimeout(function () {
          state.q = search.value.trim();
          if (state.q && state.cat !== 'all') setCat('all', true); else draw();
        }, 120);
      });
      var reset = $('#shopReset');
      if (reset) reset.addEventListener('click', function () { search.value = ''; state.q = ''; setCat('all', true); });
      window.addEventListener('hashchange', function () { setCat(location.hash.slice(1) || 'all', false); });
      setCat(location.hash.slice(1) || 'all', false);
    }

    /* package thumbnails pulled from catalogue */
    $$('[data-thumb]').forEach(function (img) {
      var p = byId(img.getAttribute('data-thumb'));
      if (p) { img.src = p.img; img.referrerPolicy = 'no-referrer'; img.alt = p.brand + ' ' + p.name; }
    });

    /* live product counter */
    $$('[data-product-total]').forEach(function (el) { el.setAttribute('data-count', PRODUCTS.length); });
  }

  /* ============================================================
     HOME HERO SLIDER
     ============================================================ */
  function initHero() {
    var hero = $('.hx'); if (!hero) return;
    var slides = $$('.hx-slide', hero), tabs = $$('.hx-tab', hero);
    var i = 0, timer = null, DUR = 7000;
    hero.style.setProperty('--dur', DUR + 'ms');

    function go(n) {
      slides[i].classList.remove('is-active'); tabs[i].classList.remove('is-active'); tabs[i].setAttribute('aria-selected', 'false');
      slides[i].setAttribute('aria-hidden', 'true');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('is-active'); tabs[i].classList.add('is-active'); tabs[i].setAttribute('aria-selected', 'true');
      slides[i].setAttribute('aria-hidden', 'false');
      var bar = $('.bar i', tabs[i]); if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      if (reduceMotion || hero.classList.contains('paused')) return;
      timer = setTimeout(function () { go(i + 1); }, DUR);
    }
    tabs.forEach(function (t, n) { t.addEventListener('click', function () { go(n); }); });
    hero.addEventListener('mouseenter', function () { hero.classList.add('paused'); clearTimeout(timer); });
    hero.addEventListener('mouseleave', function () { hero.classList.remove('paused'); go(i); });
    hero.addEventListener('focusin', function () { hero.classList.add('paused'); clearTimeout(timer); });
    hero.addEventListener('focusout', function () { hero.classList.remove('paused'); schedule(); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearTimeout(timer); else schedule(); });

    var x0 = null;
    hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    if (reduceMotion) hero.classList.add('paused');
    schedule();
  }

  /* ============================================================
     DOMAIN SEARCH  (prices from the current Spybitech advert)
     ============================================================ */
  var TLDS = [
    { tld: '.com.na', price: 1410.85 },
    { tld: '.co.na', price: 1608.00 },
    { tld: '.com', price: 550.00 },
    { tld: '.africa', price: 750.00 },
    { tld: '.net', price: 550.00 },
    { tld: '.org', price: 550.00 },
    { tld: '.edu.na', price: 1700.00 },
    { tld: '.na', price: 6909.90 }
  ];
  function money(n) { return 'N$ ' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  function initDomains() {
    $$('[data-price-table]').forEach(function (el) {
      var sorted = TLDS.slice().sort(function (a, b) { return a.price - b.price; });
      el.innerHTML = sorted.map(function (t) {
        return '<div class="pt-row"><span class="tld">' + t.tld + '</span><span class="amt">' + money(t.price) + ' <small>/ year</small></span></div>';
      }).join('');
    });

    var form = $('#domForm'); if (!form) return;
    var input = $('input', form), out = $('#domResults');

    var samples = ['yourbusiness', 'windhoekmotors', 'namibtours', 'yourshop', 'erongolodge'];
    var si = 0, ci = 0, typing;
    function typePh() {
      if (document.activeElement === input || input.value) return;
      var w = samples[si];
      ci++;
      input.setAttribute('placeholder', w.slice(0, ci));
      if (ci > w.length + 12) { ci = 0; si = (si + 1) % samples.length; }
      typing = setTimeout(typePh, ci > w.length ? 120 : 90);
    }
    if (!reduceMotion) typePh(); else input.setAttribute('placeholder', 'yourbusiness');
    input.addEventListener('focus', function () { clearTimeout(typing); input.setAttribute('placeholder', 'yourbusiness'); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var raw = input.value.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
      if (!raw) { input.focus(); return; }
      var chosen = null;
      TLDS.slice().sort(function (a, b) { return b.tld.length - a.tld.length; }).forEach(function (t) {
        if (!chosen && raw.slice(-t.tld.length) === t.tld) chosen = t.tld;
      });
      var name = chosen ? raw.slice(0, -chosen.length) : raw.split('.')[0];
      name = name.replace(/[^a-z0-9-]/g, '').replace(/^-+|-+$/g, '');
      if (name.length < 2) {
        out.innerHTML = '<div class="dom-row"><span class="nm">Enter at least two letters or numbers.</span></div>';
        return;
      }
      var list = TLDS.slice();
      if (chosen) list.sort(function (a, b) { return (a.tld === chosen ? -1 : 0) - (b.tld === chosen ? -1 : 0); });
      out.innerHTML = list.map(function (t, n) {
        var d = name + t.tld;
        return '<div class="dom-row" style="--n:' + n + '"><span class="nm">' + esc(name) + '<span>' + t.tld + '</span></span>' +
          '<span class="pr"><b>' + money(t.price) + '</b> / year</span>' +
          '<button class="btn btn-outline" data-add-custom="dom:' + esc(d) + '" data-name="Domain registration: ' + esc(d) + '" data-sku="' + t.tld + ', 1 year">' + icon('ic-plus') + ' Add to quote</button></div>';
      }).join('');
    });
  }

  /* ============================================================
     COUNTERS AND SCROLL MOTION
     ============================================================ */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var numEl = el;
    if (reduceMotion) { numEl.innerHTML = target + (suffix ? '<small>' + suffix + '</small>' : ''); return; }
    var t0 = null, dur = 1400;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      numEl.innerHTML = Math.round(target * e) + (suffix ? '<small>' + suffix + '</small>' : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initMotion() {
    var targets = $$('.reveal, .pkg, .step, .mail-offer, [data-count]');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      targets.forEach(function (t) { t.classList.add('in'); if (t.hasAttribute('data-count')) countUp(t); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        if (en.target.hasAttribute('data-count')) countUp(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ============================================================
     CONTACT PAGE FORM (kept on EmailJS)
     ============================================================ */
  function initInquiry() {
    var form = $('#inquiry-form'); if (!form) return;
    var note = $('.form-note', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = $('button[type=submit]', form);
      var say = function (msg, ok) { if (note) { note.textContent = msg; note.style.color = ok ? '#14663F' : '#9B1C21'; } };
      if (!window.emailjs) { say('Unable to send right now. Please contact us on WhatsApp or by email.', false); return; }
      btn.disabled = true; say('Sending...', true);
      emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, form).then(function () {
        btn.disabled = false; form.reset(); say('Message sent. We will be in touch shortly.', true);
      }, function () {
        btn.disabled = false; say('The message could not be sent. Please try again or reach us on WhatsApp.', false);
      });
    });
  }

  /* ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    injectShell();
    initNav();
    initPromo();
    initQuote();
    initProducts();
    initHero();
    initDomains();
    initInquiry();
    initMotion();
  });
})();
