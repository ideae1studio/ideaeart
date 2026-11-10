
// ==========================================
// IDEAE - Interacciones de la página
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENÚ MÓVIL =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===== NAVBAR CON SCROLL =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    });
    
    // ===== LIGHTBOX PARA GALERÍA =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.getElementById('lightboxClose');
    
    document.querySelectorAll('.galeria-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const titulo = item.dataset.titulo || 'Obra de IDEAE';
            const desc = item.dataset.desc || '';
            
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = titulo;
            } else {
                // Si aún no hay imagen, mostrar placeholder
                lightboxImg.src = '';
                lightboxImg.alt = titulo;
            }
            
            lightboxTitle.textContent = titulo;
            lightboxDesc.textContent = desc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    lightboxClose.addEventListener('click', cerrarLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarLightbox();
    });
    
    function cerrarLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ===== ANIMACIONES AL SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animar elementos al hacer scroll
    document.querySelectorAll('.galeria-item, .proyecto-card, .contacto-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===== SCROLL SUAVE PARA ENLACES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
