const btn = document.getElementById('verMais');
const projetos = document.querySelectorAll('.projeto.hidden');
let mostrando = false;

btn.addEventListener('click', () => {
    projetos.forEach(projeto => {
    projeto.classList.toggle('hidden');
    });
    mostrando = !mostrando;
    btn.textContent = mostrando ? "Ver menos" : "Ver mais";
});


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

        document.getElementById("saudacao").innerText = mensagem;
    }