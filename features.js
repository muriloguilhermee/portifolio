// ============================================
// NOVAS FUNCIONALIDADES - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MENU DE NAVEGAÇÃO FIXO ==========
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Atualizar link ativo ao scrollar
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Navbar com scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        updateActiveNav();
    });
    
    // Menu mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Fechar menu ao clicar em link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // ========== BOTÃO VOLTAR AO TOPO ==========
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== MODO ESCURO/CLARO ==========
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // ========== FILTRO DE PROJETOS ==========
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const projetos = document.querySelectorAll('.projeto');
    
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Atualizar botões ativos
            filtroBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filtro = btn.getAttribute('data-filtro');
            
            projetos.forEach(projeto => {
                if (filtro === 'todos') {
                    if (!projeto.classList.contains('hidden')) {
                        projeto.style.display = 'block';
                        setTimeout(() => {
                            projeto.style.opacity = '1';
                            projeto.style.transform = 'translateY(0)';
                        }, 50);
                    }
                } else {
                    const tech = projeto.getAttribute('data-tech') || '';
                    if (tech.includes(filtro)) {
                        projeto.style.display = 'block';
                        setTimeout(() => {
                            projeto.style.opacity = '1';
                            projeto.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        projeto.style.opacity = '0';
                        projeto.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            projeto.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // ========== ANIMAÇÃO DAS BARRAS DE HABILIDADES ==========
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 100);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // ========== ESTATÍSTICAS ANIMADAS ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 30);
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ========== FORMULÁRIO DE CONTATO ==========
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            // Para usar Formspree, substitua YOUR_FORM_ID pelo seu ID
            // Obtenha em: https://formspree.io/
            const formAction = contactForm.getAttribute('action');
            
            if (formAction && formAction.includes('formspree.io')) {
                try {
                    const response = await fetch(formAction, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        formMessage.textContent = 'Mensagem enviada com sucesso!';
                        formMessage.className = 'form-message success';
                        formMessage.style.display = 'block';
                        contactForm.reset();
                    } else {
                        throw new Error('Erro ao enviar');
                    }
                } catch (error) {
                    formMessage.textContent = 'Erro ao enviar mensagem. Por favor, envie um e-mail diretamente para murilogcode@gmail.com';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                }
            } else {
                // Fallback: abrir cliente de email
                const email = 'murilogcode@gmail.com';
                const subject = encodeURIComponent(formData.get('subject'));
                const body = encodeURIComponent(formData.get('message') + '\n\nDe: ' + formData.get('name') + ' (' + formData.get('email') + ')');
                window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            }
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    // ========== LAZY LOADING DE IMAGENS ==========
    if ('loading' in HTMLImageElement.prototype) {
        // Navegador suporta lazy loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback para navegadores antigos
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========== SMOOTH SCROLL PARA LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// ========== ANALYTICS (Estrutura) ==========
// Descomente e configure quando tiver o ID do Google Analytics
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR_GA_ID');
*/

