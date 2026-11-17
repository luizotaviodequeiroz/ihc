/* 
  Esta função esconde a primeira tela (aluno/professor) 
  e mostra a segunda tela (idades) alterando as classes do CSS no HTML.
*/
function mostrarIdades() {
    // Busca o elemento HTML pelo ID e adiciona a classe que tem 'display: none'
    document.getElementById('escolha-perfil').classList.add('oculto');
    // Busca o menu de idades e remove o 'display: none' para ele aparecer
    document.getElementById('escolha-idade').classList.remove('oculto');
}

/* 
  Faz o processo inverso da função acima, caso o usuário queira voltar.
*/
function voltarPerfil() {
    document.getElementById('escolha-idade').classList.add('oculto');
    document.getElementById('escolha-perfil').classList.remove('oculto');
}

/* 
  O coração do nosso MVP. Usa o localStorage do navegador para salvar
  os dados como se fosse um banco de dados real. Esses dados não se perdem
  quando mudamos de página.
*/
function entrarComoAluno(idadeEscolhida) {
    // Guarda que o perfil é de um aluno
    localStorage.setItem('usuarioTipo', 'aluno');
    
    // Guarda a idade que veio do parâmetro do HTML ('6-8', '9-11' ou '12-14')
    localStorage.setItem('alunoIdade', idadeEscolhida);
    
    // Inicia a carteira do aluno com 50 moedas virtuais (nosso sistema de gamificação)
    localStorage.setItem('alunoSaldo', 50); 
    
    // Redireciona o navegador para a tela do mapa principal do jogo
    window.location.href = 'hub.html';
}

/* 
  Prepara o ambiente para a visão do professor (Dashboard de Exceção)
*/
function entrarComoProfessor() {
    localStorage.setItem('usuarioTipo', 'professor');
    window.location.href = 'dashboard.html';
}
/* === FUNÇÕES DO HUB (MAPA) === */

function carregarHub() {
    // 1. Resgata os dados da memória do navegador
    let idade = localStorage.getItem('alunoIdade');
    let saldo = localStorage.getItem('alunoSaldo');

    // Se não tiver idade salva, manda de volta pro login (Proteção de rota)
    if (!idade) {
        window.location.href = 'index.html';
        return;
    }

    // 2. Atualiza os textos na tela com os dados do usuário
    document.getElementById('hub-idade').innerText = "Faixa: " + idade + " anos";
    document.getElementById('hub-saldo').innerText = saldo;

    // 3. Injeta a narrativa correta baseada na idade (Design Universal)
    let tituloM1 = document.getElementById('titulo-missao-1');
    let descM1 = document.getElementById('desc-missao-1');

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
}

function irParaMissao(numeroMissao) {
    // Grava qual missão o aluno clicou para a próxima tela saber o que carregar
    localStorage.setItem('missaoAtual', numeroMissao);
    window.location.href = 'missao.html';
}

function sair() {
    // Limpa a memória e volta pra tela inicial
    localStorage.clear();
    window.location.href = 'index.html';
}