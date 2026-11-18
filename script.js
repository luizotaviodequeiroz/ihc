/* === ARMAZENAMENTO SEGURO (FUNCIONA NO NAVEGADOR E EM COMPILADORES ONLINE) === */
const memoriaTemporaria = {};

function salvarDado(chave, valor) {
    memoriaTemporaria[chave] = String(valor);
    try {
        localStorage.setItem(chave, String(valor));
    } catch (erro) {
        // Se o compilador online bloquear o localStorage, usa a memória temporária
    }
}

function lerDado(chave) {
    try {
        const valorSalvo = localStorage.getItem(chave);
        if (valorSalvo !== null) return valorSalvo;
    } catch (erro) {
        // Ignora bloqueio do compilador online
    }
    return memoriaTemporaria[chave] || null;
}

function limparDados() {
    for (let chave in memoriaTemporaria) {
        delete memoriaTemporaria[chave];
    }
    try {
        localStorage.clear();
    } catch (erro) {}
}

/* === CONTROLE DE TELAS (SUBSTITUI A TROCA DE PÁGINAS NO COMPILADOR) === */
function mostrarTela(idTela) {
    document.getElementById('tela-login').classList.add('oculto');
    document.getElementById('tela-hub').classList.add('oculto');
    document.getElementById('tela-missao-1').classList.add('oculto');

    document.getElementById(idTela).classList.remove('oculto');
}

/* === TELA INICIAL (PERFIL E IDADE) === */
function mostrarIdades() {
    document.getElementById('escolha-perfil').classList.add('oculto');
    document.getElementById('escolha-idade').classList.remove('oculto');
}

function voltarPerfil() {
    document.getElementById('escolha-idade').classList.add('oculto');
    document.getElementById('escolha-perfil').classList.remove('oculto');
}

function entrarComoAluno(idadeEscolhida) {
    salvarDado('usuarioTipo', 'aluno');
    salvarDado('alunoIdade', idadeEscolhida);
    salvarDado('alunoSaldo', 50);
    salvarDado('missao1Concluida', 'false');

    carregarHub();
    mostrarTela('tela-hub');
}

function entrarComoProfessor() {
    alert("Área do Professor: ficará para a próxima etapa do projeto!");
}

/* === TELA DO HUB (MAPA DE MISSÕES) === */
function carregarHub() {
    let idade = lerDado('alunoIdade');
    let saldo = lerDado('alunoSaldo');
    let missao1Concluida = lerDado('missao1Concluida') === 'true';

    if (!idade) {
        mostrarTela('tela-login');
        return;
    }

    document.getElementById('hub-idade').innerText = "Faixa: " + idade + " anos";
    document.getElementById('hub-saldo').innerText = saldo;

    let tituloM1 = document.getElementById('titulo-missao-1');
    let descM1 = document.getElementById('desc-missao-1');
    let btnM1 = document.getElementById('btn-missao-1');

    // Adapta o texto da Missão 1 conforme a faixa etária
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

    // Controla o desbloqueio da Missão 2 após concluir a Missão 1
    let cardM2 = document.getElementById('card-missao-2');
    let tituloM2 = document.getElementById('titulo-missao-2');
    let descM2 = document.getElementById('desc-missao-2');
    let btnM2 = document.getElementById('btn-missao-2');

    if (missao1Concluida) {
        tituloM1.innerText += " ✔";
        btnM1.innerText = "Jogar Novamente";

        cardM2.classList.remove('bloqueada');
        tituloM2.innerText = "Missão 2: Planejando Gastos";
        descM2.innerText = "Novo desafio liberado!";
        btnM2.disabled = false;
        btnM2.classList.remove('pedra');
        btnM2.classList.add('grama');
        btnM2.innerText = "Acessar Missão 2";
    } else {
        btnM1.innerText = "Jogar Missão 1";

        cardM2.classList.add('bloqueada');
        tituloM2.innerText = "Missão 2: Em Breve";
        descM2.innerText = "Complete a Missão 1 para liberar.";
        btnM2.disabled = true;
        btnM2.classList.remove('grama');
        btnM2.classList.add('pedra');
        btnM2.innerText = "Bloqueado";
    }
}

function irParaMissao(numeroMissao) {
    salvarDado('missaoAtual', numeroMissao);

    if (numeroMissao === 1) {
        carregarMissao1();
        mostrarTela('tela-missao-1');
    } else if (numeroMissao === 2) {
        alert("Conteúdo do próximo módulo! (Disponível na próxima etapa do projeto)");
    }
}

function voltarParaHub() {
    carregarHub();
    mostrarTela('tela-hub');
}

function sair() {
    limparDados();
    voltarPerfil();
    mostrarTela('tela-login');
}

/* === MISSÃO 1: CONHECENDO O DINHEIRO (DILEMA ÚNICO POR FAIXA) === */
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
    let idade = lerDado('alunoIdade');
    let saldo = lerDado('alunoSaldo');

    if (!idade || !DADOS_MISSAO_1[idade]) {
        mostrarTela('tela-login');
        return;
    }

    // Reseta os botões e esconde o feedback anterior caso jogue novamente
    document.getElementById('m1-opcoes').classList.remove('oculto');
    document.getElementById('m1-feedback').classList.add('oculto');

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
    let idade = lerDado('alunoIdade');
    let saldoAtual = parseInt(lerDado('alunoSaldo')) || 50;
    let opcaoEscolhida = DADOS_MISSAO_1[idade].opcoes[indiceOpcao];

    // Ganha 5 moedas se acertar ou perde 5 se errar
    let novoSaldo = opcaoEscolhida.correta ? saldoAtual + 5 : Math.max(0, saldoAtual - 5);
    salvarDado('alunoSaldo', novoSaldo);
    salvarDado('missao1Concluida', 'true');

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
