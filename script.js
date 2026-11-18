/* === TELA INICIAL (LOGIN E PERFIL) === */

function mostrarIdades() {
    document.getElementById('escolha-perfil').classList.add('oculto');
    document.getElementById('escolha-idade').classList.remove('oculto');
}

function voltarPerfil() {
    document.getElementById('escolha-idade').classList.add('oculto');
    document.getElementById('escolha-perfil').classList.remove('oculto');
}

function entrarComoAluno(idadeEscolhida) {
    localStorage.setItem('usuarioTipo', 'aluno');
    localStorage.setItem('alunoIdade', idadeEscolhida);
    localStorage.setItem('alunoSaldo', 50);
    localStorage.removeItem('missao1Concluida');
    window.location.href = 'hub.html';
}

function entrarComoProfessor() {
    alert("Área do Professor: ficará para a próxima etapa do projeto!");
}

/* === FUNÇÕES DO HUB (MAPA) === */

function carregarHub() {
    let idade = localStorage.getItem('alunoIdade');
    let saldo = localStorage.getItem('alunoSaldo');
    let missao1Concluida = localStorage.getItem('missao1Concluida') === 'true';

    if (!idade) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('hub-idade').innerText = "Faixa: " + idade + " anos";
    document.getElementById('hub-saldo').innerText = saldo;

    let tituloM1 = document.getElementById('titulo-missao-1');
    let descM1 = document.getElementById('desc-missao-1');
    let btnM1 = document.getElementById('btn-missao-1');

    if (idade === '6-8') {
        tituloM1.innerText = "A Loja de Doces";
        descM1.innerText = "Você quer comprar um doce ou guardar a moeda?";
    } 
    else if (idade === '9-11') {
        tituloM1.innerText = "Equipamento Espacial";
        descM1.innerText = "Você precisa de peças novas. O que vai priorizar?";
    } 
    else if (idade === '12-14') {
        tituloM1.innerText = "O Negócio de Mini-Pizzas";
        descM1.innerText = "Defina a estratégia de preços para vender no atacado ou varejo.";
    }

    if (missao1Concluida) {
        tituloM1.innerText += " ✔";
        btnM1.innerText = "Jogar Novamente";

        let cardM2 = document.getElementById('card-missao-2');
        let tituloM2 = document.getElementById('titulo-missao-2');
        let descM2 = document.getElementById('desc-missao-2');
        let btnM2 = document.getElementById('btn-missao-2');

        cardM2.classList.remove('bloqueada');
        tituloM2.innerText = "Missão 2: Planejando Gastos";
        descM2.innerText = "Novo desafio liberado!";
        btnM2.disabled = false;
        btnM2.classList.remove('pedra');
        btnM2.classList.add('grama');
        btnM2.innerText = "Acessar Missão 2";
    }
}

function irParaMissao(numeroMissao) {
    localStorage.setItem('missaoAtual', numeroMissao);
    if (numeroMissao === 1) {
        window.location.href = 'missao-1.html';
    } else if (numeroMissao === 2) {
        alert("Conteúdo do próximo módulo! (Disponível na próxima etapa do projeto)");
    }
}

function sair() {
    localStorage.clear();
    window.location.href = 'index.html';
}

/* === DADOS E LÓGICA DA MISSÃO 1 (CONHECENDO O DINHEIRO) === */

const DADOS_MISSAO_1 = {
    '6-8': {
        icone: "🍬",
        titulo: "A Loja de Doces",
        cenario: "Você tem 50 moedas e viu um doce gigante por 15 moedas, mas estava juntando para um brinquedo maior. O que você faz?",
        opcoes: [
            {
                texto: "Guardar a moeda para o brinquedo",
                correta: true,
                feedback: "Muito bem! Saber esperar mostra que você entendeu o valor de juntar dinheiro."
            },
            {
                texto: "Comprar o doce agora mesmo",
                correta: false,
                feedback: "Ops! Gastar por impulso diminui suas moedas para o que você realmente queria."
            }
        ]
    },
    '9-11': {
        icone: "🚀",
        titulo: "Equipamento Espacial",
        cenario: "Sua nave precisa de peças novas e suas moedas são limitadas. O que você vai priorizar na loja espacial?",
        opcoes: [
            {
                texto: "Motor de Reserva (Item essencial)",
                correta: true,
                feedback: "Boa escolha! Você priorizou o equipamento necessário para a nave continuar voando."
            },
            {
                texto: "Pintura Brilhante (Apenas visual)",
                correta: false,
                feedback: "Cuidado! Gastar com aparência antes do essencial deixou sua nave sem energia."
            }
        ]
    },
    '12-14': {
        icone: "🍕",
        titulo: "O Negócio de Mini-Pizzas",
        cenario: "Cada mini-pizza custa 4 moedas para produzir. Como você define sua estratégia de preços?",
        opcoes: [
            {
                texto: "6 moedas no atacado e 8 no varejo",
                correta: true,
                feedback: "Estratégia certa! Você cobriu o custo de 4 moedas e garantiu lucro nos dois formatos."
            },
            {
                texto: "3 moedas no atacado para vender rápido",
                correta: false,
                feedback: "Atenção ao custo! Vender por 3 moedas algo que custou 4 gera prejuízo a cada pizza."
            }
        ]
    }
};

function carregarMissao1() {
    let idade = localStorage.getItem('alunoIdade');
    let saldo = localStorage.getItem('alunoSaldo');

    if (!idade || !DADOS_MISSAO_1[idade]) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('missao-idade').innerText = "Faixa: " + idade + " anos";
    document.getElementById('missao-saldo').innerText = saldo;

    let dados = DADOS_MISSAO_1[idade];
    document.getElementById('m1-icone').innerText = dados.icone;
    document.getElementById('m1-titulo').innerText = dados.titulo;
    document.getElementById('m1-cenario').innerText = dados.cenario;
    document.getElementById('btn-opcao-0').innerText = dados.opcoes[0].texto;
    document.getElementById('btn-opcao-1').innerText = dados.opcoes[1].texto;
}

function responderMissao1(indiceOpcao) {
    let idade = localStorage.getItem('alunoIdade');
    let saldoAtual = parseInt(localStorage.getItem('alunoSaldo')) || 50;
    let opcaoEscolhida = DADOS_MISSAO_1[idade].opcoes[indiceOpcao];

    let novoSaldo = opcaoEscolhida.correta ? saldoAtual + 5 : Math.max(0, saldoAtual - 5);
    localStorage.setItem('alunoSaldo', novoSaldo);
    localStorage.setItem('missao1Concluida', 'true');

    document.getElementById('missao-saldo').innerText = novoSaldo;
    document.getElementById('m1-opcoes').classList.add('oculto');

    let caixaFeedback = document.getElementById('m1-feedback');
    let textoMoedas = document.getElementById('m1-resultado-moedas');
    let textoFeedback = document.getElementById('m1-texto-feedback');

    caixaFeedback.classList.remove('oculto', 'sucesso', 'alerta');
    if (opcaoEscolhida.correta) {
        caixaFeedback.classList.add('sucesso');
        textoMoedas.innerText = "+5 MOEDAS!";
    } else {
        caixaFeedback.classList.add('alerta');
        textoMoedas.innerText = "-5 MOEDAS!";
    }

    textoFeedback.innerText = opcaoEscolhida.feedback;
}

function voltarParaHub() {
    window.location.href = 'hub.html';
}
