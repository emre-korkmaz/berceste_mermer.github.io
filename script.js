// script.js - mobil menü, yıl güncelleme, form doğrulama, galeri render ve lightbox
document.addEventListener('DOMContentLoaded', function () {
  // Yılı otomatik güncelle
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobil menü toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  navToggle && navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    navList && navList.classList.toggle('show');
  });

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navList && navList.classList.contains('show')) {
          navList.classList.remove('show');
          navToggle && navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Form doğrulama ve mock gönderim (index.html formu)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form && form.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('error-name').textContent = '';
    document.getElementById('error-email').textContent = '';
    status.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();

    let valid = true;
    if (!name) {
      document.getElementById('error-name').textContent = 'Lütfen isminizi girin.';
      valid = false;
    }
    if (!email || !validateEmail(email)) {
      document.getElementById('error-email').textContent = 'Geçerli bir e-posta adresi girin.';
      valid = false;
    }
    if (!valid) return;

    status.textContent = 'Gönderiliyor...';
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    setTimeout(() => {
      status.textContent = 'Mesajınız başarıyla gönderildi. Teşekkürler.';
      form.reset();
      submitBtn.disabled = false;
    }, 1000);
  });

  // Galerileri render et (her ürün sayfasında #gallery id'si)
  document.querySelectorAll('.gallery').forEach(galleryEl => {
    const path = galleryEl.dataset.path || '';
    const images = (galleryEl.dataset.images || '').split(',').map(s => s.trim()).filter(Boolean);

    if (images.length === 0) {
      galleryEl.innerHTML = '<p style="color:var(--muted)">Henüz fotoğraf eklenmemiş. README.md içindeki adımları takip edin.</p>';
      return;
    }

    images.forEach((imgFile, idx) => {
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = path + imgFile;
      img.alt = imgFile;
      img.loading = 'lazy';
      img.dataset.index = idx;
      fig.appendChild(img);
      galleryEl.appendChild(fig);
    });
  });

  // Basit lightbox (tek modal her sayfada id=lightbox)
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Build flat list of images on the page's gallery
    let imgs = Array.from(document.querySelectorAll('.gallery img'));
    let current = 0;

    function openLightbox(index) {
      if (!imgs || imgs.length === 0) return;
      current = index;
      lbImg.src = imgs[current].src;
      lbImg.alt = imgs[current].alt || '';
      lbCaption.textContent = imgs[current].alt || '';
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    function next() {
      current = (current + 1) % imgs.length;
      openLightbox(current);
    }
    function prev() {
      current = (current - 1 + imgs.length) % imgs.length;
      openLightbox(current);
    }

    imgs.forEach((img, i) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        // re-query images each open to allow dynamic changes
        imgs = Array.from(document.querySelectorAll('.gallery img'));
        const index = imgs.indexOf(img);
        openLightbox(index >= 0 ? index : 0);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });

    // keyboard controls
    document.addEventListener('keydown', (e) => {
      if (!lightbox || lightbox.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
    var button = document.querySelector('.hero-button');
    if (button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            var teklifSection = document.getElementById('teklif');
            if (teklifSection) {
                teklifSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
