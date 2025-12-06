// ============================================
// MELHORIAS VISUAIS - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== LOADING SCREEN ==========
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    });
    
    // ========== CURSOR PERSONALIZADO ==========
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    // Detectar se é mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        document.body.classList.add('mobile');
    }
    
    if (window.innerWidth >= 1024 && !isMobile) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            if (cursor && cursorDot) {
                cursorX += (mouseX - cursorX) * 0.1;
                cursorY += (mouseY - cursorY) * 0.1;
                
                cursor.style.left = cursorX - 10 + 'px';
                cursor.style.top = cursorY - 10 + 'px';
                
                cursorDot.style.left = mouseX - 3 + 'px';
                cursorDot.style.top = mouseY - 3 + 'px';
            }
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .projeto, .nav-link, .certificado-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursor) cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                if (cursor) cursor.classList.remove('hover');
            });
        });
    }
    
    // ========== EFEITO DE DIGITAÇÃO ==========
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        element.classList.add('typing-effect');
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing-effect');
            }
        }
        
        type();
    }
    
    // Aplicar efeito de digitação após loading
    setTimeout(() => {
        const nameElement = document.getElementById('typing-name');
        const titleElement = document.getElementById('typing-title');
        
        if (nameElement && !nameElement.dataset.typed) {
            const name = nameElement.textContent;
            typeWriter(nameElement, name, 150);
            nameElement.dataset.typed = 'true';
            
            setTimeout(() => {
                if (titleElement && !titleElement.dataset.typed) {
                    const title = titleElement.textContent;
                    typeWriter(titleElement, title, 120);
                    titleElement.dataset.typed = 'true';
                }
            }, name.length * 150 + 300);
        }
    }, 2000);
    
    // ========== GRADIENTES ANIMADOS ==========
    const gradientElements = document.querySelectorAll('#estatisticas, button#verMais, .btn-submit');
    gradientElements.forEach(el => {
        el.classList.add('animated-gradient');
    });
    
    // ========== GLOW EFFECT ==========
    const glowElements = document.querySelectorAll('.projeto, .certificado-card, button#verMais');
    glowElements.forEach(el => {
        el.classList.add('glow-effect');
    });
    
    // ========== MICROINTERAÇÕES ==========
    // Adicionar bounce-in em elementos ao aparecer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const microObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('bounce-in');
                microObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const microElements = document.querySelectorAll('.certificado-card, .stat-item, .timeline-item');
    microElements.forEach(el => {
        microObserver.observe(el);
    });
    
    // Shake effect em botões ao clicar
    const buttons = document.querySelectorAll('button, .btn-submit, .filtro-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            this.classList.add('shake');
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
        });
    });
    
    // ========== BLUR ON SCROLL ==========
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.backdropFilter = 'blur(30px) saturate(180%)';
            navbar.style.webkitBackdropFilter = 'blur(30px) saturate(180%)';
        } else {
            navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
            navbar.style.webkitBackdropFilter = 'blur(20px) saturate(180%)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ========== PARALLAX SUAVE ==========
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelector('.particles');
        
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // ========== RIPPLE EFFECT ==========
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    const rippleButtons = document.querySelectorAll('button, .btn-submit, .filtro-btn');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
});

