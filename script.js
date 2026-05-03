document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 80;
    navbar?.classList.toggle('scrolled', scrolled);
    backToTop?.classList.toggle('visible', window.scrollY > 600);
  });

  // === HAMBURGER MENU ===
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // === SCROLL REVEAL ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // === COUNTER ANIMATION ===
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  // === PORTFOLIO FILTER ===
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // === PRODUK PAGE: DROPDOWN FILTER ===
  const filterSelect = document.getElementById('filterSelect');
  const catalogCards = document.querySelectorAll('.catalog-card');
  filterSelect?.addEventListener('change', () => {
    const val = filterSelect.value;
    catalogCards.forEach(card => {
      if (val === 'semua' || card.dataset.category === val) {
        card.style.display = '';
        card.style.opacity = '0';
        setTimeout(() => card.style.opacity = '1', 50);
      } else {
        card.style.display = 'none';
      }
    });
  });

  // === CMS DATA BINDING ===
  const loadCMSData = async () => {
    try {
      // 1. Hero Data
      const heroRes = await fetch('data/home/hero.json');
      if (heroRes.ok) {
        const heroData = await heroRes.json();
        const heroSection = document.querySelector('.hero');
        const heroTitle = document.querySelector('.hero-content h1');
        const heroDesc = document.querySelector('.hero-desc');
        const heroVisualPlaceholder = document.querySelector('.hero-image-wrapper > div:first-child');

        if (heroTitle && heroData.judul) heroTitle.innerHTML = heroData.judul;
        if (heroDesc && heroData.deskripsi) heroDesc.textContent = heroData.deskripsi;
        
        if (heroSection && heroData.hero_background) {
          heroSection.style.backgroundImage = `url('${heroData.hero_background}')`;
          heroSection.style.backgroundSize = 'cover';
          heroSection.style.backgroundPosition = 'center';
        }
        
        if (heroVisualPlaceholder && heroData.hero_foreground) {
          heroVisualPlaceholder.innerHTML = `<img src="${heroData.hero_foreground}" alt="Hero Image" style="width:100%; height:auto; max-height:450px; object-fit:contain; position:relative; z-index:2;">`;
          heroVisualPlaceholder.style.background = 'none';
        }
      }

      // 2. Social Media Settings
      const settingsRes = await fetch('data/settings.json');
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        const footerSocialsContainers = document.querySelectorAll('.footer-socials');
        
        if (footerSocialsContainers.length > 0) {
          const socialHtml = settingsData.social_media.map(s => {
            let icon = 'fa-share-alt';
            if (s.platform === 'facebook') icon = 'fab fa-facebook-f';
            else if (s.platform === 'instagram') icon = 'fab fa-instagram';
            else if (s.platform === 'tiktok') icon = 'fab fa-tiktok';
            else if (s.platform === 'whatsapp') icon = 'fab fa-whatsapp';
            
            return `<a href="${s.url}" target="_blank" title="${s.platform}"><i class="${icon}"></i></a>`;
          }).join('');
          
          footerSocialsContainers.forEach(el => el.innerHTML = socialHtml);
        }
      }
    } catch (err) {
      console.warn('CMS data not loaded:', err);
    }
  };
  loadCMSData();

});
