document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const whatsappButton = document.getElementById('whatsapp-button');

    // Controle de scroll para Navbar e Botão WhatsApp
    window.addEventListener('scroll', () => {
        // Navbar glass effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Mostrar botão flutuante
        if (window.scrollY > 300) {
            whatsappButton.classList.add('visible');
        } else {
            whatsappButton.classList.remove('visible');
        }
    });

    // Observer para animações de fade-in
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Lógica do Banner de Cookies
    (function() {
        const cookieBanner = document.getElementById('cookie-banner');
        const acceptButton = document.getElementById('accept-cookies');

        // Mostra o banner após 2 segundos se não foi aceito antes
        if (localStorage.getItem('cookiesAccepted_v1') !== 'true') {
            setTimeout(() => { cookieBanner.classList.add('show'); }, 2000);
        }

        acceptButton.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted_v1', 'true');
            cookieBanner.classList.remove('show');
        });
    })();

    // Scroll Suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = navbar.offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                     top: offsetPosition,
                     behavior: 'smooth'
                });
            }
        });
    });
});