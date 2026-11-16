//Definir a palavra a ser descoberta
let segredo = ""
let rodada = 0;
let qtdLetras = 5;
let tentativas = [];
let formularioJogo;
let linhaTentativas;
let botaoEnvio;

function iniciar() {
    //Banco de Palavras
    const palavrasEducacao = [
        "BETEL", "ALUNO", "TURMA", "LIVRO", "TEXTO",
        "PROVA", "SABER", "LIÇÃO", "NOTAS", "REGRA",
        "AULAS", "MENTE", "LÁPIS", "PAPEL", "RÉGUA",
        "TINTA", "MAPAS", "CURSO", "EXAME", "TESTE",
        "CÓPIA", "TERMO", "CANTO", "ARTES", "CORAL",
        "GRUPO", "AMIGO", "UNIÃO", "ORDEM", "NORMA",
        "VALOR", "AFETO", "CULTO", "VERBO", "SALMO",
        "HONRA", "MORAL", "ÉTICA", "GRAÇA", "SANTO",
        "LOUSA", "LÍDER", "PASTA", "SÁBIO", "IDEIA",
        "FALAR", "OUVIR", "GUIAR", "PAUTA", "REINO"
    ];

    //Definir a palavra a ser descoberta
    let posicao = Math.floor(Math.random() * palavrasEducacao.length);
    segredo = palavrasEducacao[posicao]

    //Definir a rodada atual
    rodada = 0;

    //Criar o formulário
    criarFormulario();
}

function mostrarConfetes() {
    const container = document.getElementById("confetes");
    const cores = ["#6aaa64", "#c9b458", "#74a9cf", "#ed7d6a", "#aa8ac2"];

    for (let i = 0; i < 42; i++) {
        const confete = document.createElement("span");
        confete.className = "confete";
        confete.style.left = Math.random() * 100 + "vw";
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.setProperty("--drift", (Math.random() * 160 - 80) + "px");
        confete.style.setProperty("--spin", (Math.random() * 540 - 270) + "deg");
        confete.style.animationDelay = (Math.random() * 0.35) + "s";
        container.appendChild(confete);
        setTimeout(() => confete.remove(), 3400);
    }
}

function verificar() {
    //Repetir até 5x
    //Pegar todas as letras digitadas pelo usuário
    let tentativa = "";
    let linhaAtual = document.getElementById("termo" + rodada);

    for (let i = 0; i < qtdLetras; i++) {
        let campo = document.getElementById("termo" + rodada + "-letra" + i);
        let caixa = campo.value.toUpperCase();
        let wrapper = campo.parentElement;

        campo.value = caixa;

        if (caixa == segredo[i]) {
            campo.style.backgroundColor = "green";
        } else if (segredo.includes(caixa)) {
            campo.style.backgroundColor = "yellow";
        } else {
            campo.style.backgroundColor = "gray";
            //O X aparece brevemente; depois a letra fica vermelha.
            wrapper.classList.add("is-missing");
            setTimeout(() => campo.classList.add("tile--error"), 420);
        }

        //A tentativa enviada fica visível, mas não pode mais ser editada.
        campo.disabled = true;
        tentativa += caixa;
    }

    tentativas.push(tentativa);

    let letras = "";

    for (let i = 0; i < tentativas.length; i++) {
        console.log(tentativas[i])
        for (let j = 0; j < tentativas[i].length; j++) {
            if (!letras.includes(tentativas[i][j])) {
                console.log(tentativas[i][j])
                letras += tentativas[i][j]
            }
        }
        document.getElementById("letrasUtilizadas").innerText = letras;
    }

    if (segredo == tentativa) {
        mostrarConfetes();
        botaoEnvio.disabled = true;
        alert("Acertou")
    } else {
        rodada++;

        if (rodada < 5) {
            criarFormulario();
        } else {
            botaoEnvio.disabled = true;
            alert("Fim de Jogo")
        }
    }

    alert(tentativa);
}

function criarFormulario() {
    let jogo = document.getElementById("jogo");

    //O formulário e o botão são criados uma única vez para todas as rodadas.
    if (!formularioJogo) {
        formularioJogo = document.createElement("form");
        formularioJogo.className = "guess-form";
        formularioJogo.onsubmit = function () {
            verificar();
            return false;
        };

        linhaTentativas = document.createElement("div");
        linhaTentativas.className = "guess-rows";
        formularioJogo.appendChild(linhaTentativas);

        botaoEnvio = document.createElement("input");
        botaoEnvio.type = "submit";
        botaoEnvio.value = "Enviar";
        botaoEnvio.className = "submit-button";
        formularioJogo.appendChild(botaoEnvio);
        jogo.appendChild(formularioJogo);
    }

    let linhaLetras = document.createElement("div");
    linhaLetras.id = "termo" + rodada;
    linhaLetras.className = "tile-row";

    for (let i = 0; i < qtdLetras; i++) {
        let wrapper = document.createElement("div");
        wrapper.className = "tile-wrap";

        let caixa = document.createElement("input");
        caixa.type = "text";
        caixa.maxLength = 1;
        caixa.id = "termo" + rodada + "-letra" + i;
        caixa.className = "letter-tile";
        caixa.autocomplete = "off";
        caixa.setAttribute("aria-label", "Tentativa " + (rodada + 1) + ", letra " + (i + 1));

        let xAnimado = document.createElement("span");
        xAnimado.className = "error-mark";
        xAnimado.setAttribute("aria-hidden", "true");
        xAnimado.textContent = "×";

        wrapper.appendChild(caixa);
        wrapper.appendChild(xAnimado);
        linhaLetras.appendChild(wrapper);
    }

    linhaTentativas.appendChild(linhaLetras);
    botaoEnvio.disabled = false;
}

iniciar();
