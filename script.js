document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile nav open/close ---------- */
  var mobileNav   = document.getElementById('mobileNav');
  var openBtn     = document.getElementById('mobileOpen');
  var closeBtn    = document.getElementById('mobileClose');

  function openMobile(){ mobileNav.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeMobile(){ mobileNav.classList.remove('is-open'); document.body.style.overflow = ''; }

  if (openBtn)  openBtn.addEventListener('click', openMobile);
  if (closeBtn) closeBtn.addEventListener('click', closeMobile);

  mobileNav.querySelectorAll('.mobile-nav-body > a').forEach(function (link) {
    link.addEventListener('click', closeMobile);
  });
  mobileNav.querySelectorAll('.m-group-panel a').forEach(function (link) {
    link.addEventListener('click', closeMobile);
  });

  /* ---------- mobile accordion groups ---------- */
  document.querySelectorAll('.m-group-head').forEach(function (head) {
    head.addEventListener('click', function () {
      var group = head.closest('.m-group');
      var wasOpen = group.classList.contains('is-open');
      document.querySelectorAll('.m-group.is-open').forEach(function (g) { g.classList.remove('is-open'); });
      if (!wasOpen) group.classList.add('is-open');
    });
  });

  /* ---------- desktop dropdown: click + keyboard support (hover already in CSS) ---------- */
  document.querySelectorAll('.category-nav .nav-item').forEach(function (item) {
    var dropdown = item.querySelector('.dropdown');
    if (!dropdown) return;
    var link = item.querySelector('.nav-link');

    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 1180) return;
      e.preventDefault();
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.category-nav .nav-item.is-open').forEach(function (i) { i.classList.remove('is-open'); });
      if (!isOpen) item.classList.add('is-open');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.category-nav .nav-item')) {
      document.querySelectorAll('.category-nav .nav-item.is-open').forEach(function (i) { i.classList.remove('is-open'); });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.category-nav .nav-item.is-open').forEach(function (i) { i.classList.remove('is-open'); });
      closeMobile();
    }
  });

  /* ---------- nested flyout (Company Registration) on tap for touch/click parity ---------- */
  document.querySelectorAll('.has-flyout > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (window.innerWidth <= 1180) return;
      e.preventDefault();
      a.closest('.has-flyout').classList.toggle('is-open');
    });
  });

  /* ---------- smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- inquiry form submission ---------- */
  var form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!window.emailjs) {
        alert('Unable to send right now. Please contact us directly on WhatsApp or by email.');
        return;
      }
      emailjs.sendForm('service_dlw3fhb', 'template_kgtxcv5', this).then(
        function () { alert('Your message has been sent successfully. We will be in touch shortly.'); form.reset(); },
        function (error) { alert('Failed to send the message. Please try again later or reach us on WhatsApp.'); console.log('FAILED...', error); }
      );
    });
  }

  /* ---------- header shadow on scroll ---------- */
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    header.style.boxShadow = window.scrollY > 30 ? '0 6px 20px -10px rgba(20,22,40,.18)' : 'none';
  });
});
