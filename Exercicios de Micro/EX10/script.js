// URLs dos endpoints do mockable.io
const URL_GET = ' http://demo2249557.mockable.io/usuariosss';
const URL_POST = 'http://demo2249557.mockable.io/userp';

// Seleciona os elementos do DOM
const formUsuario = document.getElementById('formUsuario');
const tabelaUsuarios = document.querySelector('#tabelaUsuarios tbody');
const atualizarListaBtn = document.getElementById('atualizarListaBtn');

// Função para buscar dados da API
async function buscarDados() {
    try {
        const resposta = await fetch(URL_GET);
        if (!resposta.ok) throw new Error('Erro ao buscar dados da API');
        const dados = await resposta.json();
        exibirDadosNaTabela(dados);
    } catch (erro) {
        console.error(erro);
        alert('Erro ao carregar os dados.');
    }
}

// Função para exibir dados na tabela
function exibirDadosNaTabela(dados) {
    tabelaUsuarios.innerHTML = '';
    dados.forEach(usuario => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.idade}</td>
        `;

        tabelaUsuarios.appendChild(linha);
    });
}

// Função para cadastrar um novo usuário
async function cadastrarUsuario(event) {
    event.preventDefault();

    const usuario = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        idade: document.getElementById('idade').value
    };

    try {
        const resposta = await fetch(URL_POST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!resposta.ok) throw new Error('Erro ao cadastrar usuário');

        alert('Usuário cadastrado com sucesso!');
        formUsuario.reset();
        buscarDados(); // Atualiza a lista após o cadastro
    } catch (erro) {
        console.error(erro);
        alert('Erro ao cadastrar usuário.');
    }
}

// Adiciona eventos
formUsuario.addEventListener('submit', cadastrarUsuario);
atualizarListaBtn.addEventListener('click', buscarDados);

// Busca os dados ao carregar a página
buscarDados();
