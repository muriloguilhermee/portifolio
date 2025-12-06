// Animação de scroll suave
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer para animações ao scrollar
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('section#sec, section#skill, .projeto');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Botão "Ver mais" projetos
    const btn = document.getElementById('verMais');
    const todosProjetos = document.querySelectorAll('.projeto');
    // Projetos que começam ocultos (todos exceto os 3 primeiros)
    const projetosOcultosInicial = Array.from(todosProjetos).slice(3);
    let mostrando = false;

    if (btn && projetosOcultosInicial.length > 0) {
        btn.addEventListener('click', () => {
            if (!mostrando) {
                // Mostrar projetos com animação suave
                projetosOcultosInicial.forEach((projeto, index) => {
                    setTimeout(() => {
                        projeto.classList.remove('hidden');
                        projeto.style.opacity = '0';
                        projeto.style.transform = 'translateY(30px)';
                        projeto.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                        setTimeout(() => {
                            projeto.style.opacity = '1';
                            projeto.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
                mostrando = true;
                btn.textContent = "Ver menos";
            } else {
                // Ocultar projetos com animação suave (em ordem reversa)
                const projetosVisiveis = projetosOcultosInicial.filter(p => !p.classList.contains('hidden'));
                projetosVisiveis.reverse().forEach((projeto, index) => {
                    setTimeout(() => {
                        projeto.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                        projeto.style.opacity = '0';
                        projeto.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            projeto.classList.add('hidden');
                        }, 500); // Aguarda a animação terminar antes de ocultar
                    }, index * 80);
                });
                mostrando = false;
                btn.textContent = "Ver mais";
            }
        });
    }

    // Adicionar efeito de parallax suave no scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const principal = document.querySelector('section#principal');
        if (principal && currentScroll < principal.offsetHeight) {
            principal.style.transform = `translateY(${currentScroll * 0.5}px)`;
        }
        lastScroll = currentScroll;
    });
});

// Função para exibir saudação baseada no horário
function exibirMensagem() {
    const agora = new Date();
    const hora = agora.getHours();
    let mensagem;

    if (hora >= 5 && hora < 12) {
        mensagem = "Bom dia!";
    } else if (hora >= 12 && hora < 18) {
        mensagem = "Boa tarde!";
    } else {
        mensagem = "Boa noite!";
    }

    const saudacaoElement = document.getElementById("saudacao");
    if (saudacaoElement) {
        saudacaoElement.innerText = mensagem;
    }
}