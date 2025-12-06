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
    
    // Navbar com scroll - ajustar cores baseado na posição
    function updateNavbarStyle() {
        const principalSection = document.querySelector('section#principal');
        const principalHeight = principalSection ? principalSection.offsetHeight : 920;
        const scrollY = window.pageYOffset;
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (scrollY < principalHeight - 100) {
            // Menu sobre a imagem de fundo - transparente com texto branco
            navbar.style.background = isDarkMode ? 'rgba(31, 41, 55, 0.1)' : 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navLinks.forEach(link => {
                link.style.color = '#ffffff';
                link.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
            });
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.style.color = '#ffffff';
                themeToggle.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        } else {
            // Menu sobre fundo claro/escuro - fundo mais sólido
            if (isDarkMode) {
                navbar.style.background = 'rgba(31, 41, 55, 0.95)';
                navLinks.forEach(link => {
                    link.style.color = '#f9fafb';
                    link.style.textShadow = '';
                });
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navLinks.forEach(link => {
                    link.style.color = '';
                    link.style.textShadow = '';
                });
            }
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.style.color = '';
                themeToggle.style.background = '';
            }
        }
    }
    
    window.addEventListener('scroll', () => {
        updateNavbarStyle();
        updateActiveNav();
    });
    
    // Atualizar estilo inicial
    updateNavbarStyle();
    
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
    // Atualizar navbar após carregar tema
    setTimeout(updateNavbarStyle, 100);
    
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
        // Atualizar navbar quando tema mudar
        updateNavbarStyle();
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
                // Respeitar projetos ocultos pelo botão "Ver mais"
                const isHiddenByButton = projeto.classList.contains('hidden') && Array.from(projetos).indexOf(projeto) >= 3;
                
                if (filtro === 'todos') {
                    // Se não estiver oculto pelo botão "Ver mais", mostrar
                    if (!isHiddenByButton) {
                        projeto.style.display = 'block';
                        projeto.style.opacity = '1';
                        projeto.style.transform = 'translateY(0)';
                    }
                } else {
                    const tech = projeto.getAttribute('data-tech') || '';
                    if (tech.includes(filtro) && !isHiddenByButton) {
                        projeto.style.display = 'block';
                        projeto.style.opacity = '1';
                        projeto.style.transform = 'translateY(0)';
                    } else if (!isHiddenByButton) {
                        projeto.style.opacity = '0';
                        projeto.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            if (projeto.style.opacity === '0') {
                                projeto.style.display = 'none';
                            }
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
    const submitButton = contactForm ? contactForm.querySelector('.btn-submit') : null;
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Desabilitar botão durante envio
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            }
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validação básica
            if (!name || !email || !subject || !message) {
                if (formMessage) {
                    formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                }
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
                }
                return;
            }
            
            // Simular envio (você pode integrar com Formspree, EmailJS, etc.)
            // Por enquanto, vamos abrir o cliente de email com os dados preenchidos
            try {
                const emailBody = `Olá Murilo,\n\n${message}\n\n---\nNome: ${name}\nE-mail: ${email}`;
                const mailtoLink = `mailto:murilogcode@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                
                // Tentar abrir o cliente de email
                window.location.href = mailtoLink;
                
                // Mostrar mensagem de sucesso
                if (formMessage) {
                    formMessage.textContent = 'Redirecionando para seu cliente de email... Se não abrir, envie manualmente para murilogcode@gmail.com';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                }
                
                // Limpar formulário após 2 segundos
                setTimeout(() => {
                    contactForm.reset();
                    if (formMessage) {
                        formMessage.textContent = 'Mensagem preparada! Verifique seu cliente de email.';
                    }
                }, 2000);
                
            } catch (error) {
                if (formMessage) {
                    formMessage.textContent = 'Erro ao preparar mensagem. Por favor, envie um e-mail diretamente para murilogcode@gmail.com';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                }
            } finally {
                // Reabilitar botão após 3 segundos
                setTimeout(() => {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
                    }
                    if (formMessage) {
                        setTimeout(() => {
                            formMessage.style.display = 'none';
                        }, 5000);
                    }
                }, 3000);
            }
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

