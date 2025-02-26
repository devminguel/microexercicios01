// Seleciona os elementos do DOM
const formUsuario = document.getElementById('formUsuario');
const tabelaUsuarios = document.querySelector('#tabelaUsuarios tbody');
const salvarBtn = document.getElementById('salvarBtn');
const cancelarEdicaoBtn = document.getElementById('cancelarEdicaoBtn');

let dadosOriginais = []; // Armazena os dados originais da API
let modoEdicao = false; // Controla se está no modo de edição

// URLs dos endpoints do mockable.io
const URL_GET = 'http://demo2249557.mockable.io/usuariosss';
const URL_POST = 'http://demo2249557.mockable.io/userp';

// Função para buscar dados da API
async function buscarDados() {
    try {
        const resposta = await fetch(URL_GET);
        if (!resposta.ok) throw new Error('Erro ao buscar dados da API');
        dadosOriginais = await resposta.json();
        exibirDadosNaTabela(dadosOriginais);
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
            <td>
                <button onclick="editarUsuario(${usuario.id})">Editar</button>
                <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
            </td>
        `;

        tabelaUsuarios.appendChild(linha);
    });
}

// Função para adicionar ou atualizar um usuário
async function salvarUsuario(event) {
    event.preventDefault();

    const usuario = {
        id: document.getElementById('usuarioId').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        idade: document.getElementById('idade').value
    };

    if (modoEdicao) {
        // Simula o UPDATE no front-end
        const index = dadosOriginais.findIndex(u => u.id == usuario.id);
        dadosOriginais[index] = usuario;
        exibirDadosNaTabela(dadosOriginais);
        alert('Usuário atualizado com sucesso!');
    } else {
        // Simula o CREATE no front-end
        usuario.id = Date.now(); // Gera um ID único
        dadosOriginais.push(usuario);
        exibirDadosNaTabela(dadosOriginais);
        alert('Usuário adicionado com sucesso!');
    }

    formUsuario.reset();
    cancelarEdicao();
}

// Função para editar um usuário
function editarUsuario(id) {
    const usuario = dadosOriginais.find(u => u.id == id);
    if (usuario) {
        document.getElementById('usuarioId').value = usuario.id;
        document.getElementById('nome').value = usuario.nome;
        document.getElementById('email').value = usuario.email;
        document.getElementById('idade').value = usuario.idade;

        modoEdicao = true;
        salvarBtn.textContent = 'Atualizar';
        cancelarEdicaoBtn.style.display = 'inline-block';
    }
}

// Função para excluir um usuário
function excluirUsuario(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        dadosOriginais = dadosOriginais.filter(u => u.id != id);
        exibirDadosNaTabela(dadosOriginais);
        alert('Usuário excluído com sucesso!');
    }
}

// Função para cancelar a edição
function cancelarEdicao() {
    formUsuario.reset();
    modoEdicao = false;
    salvarBtn.textContent = 'Salvar';
    cancelarEdicaoBtn.style.display = 'none';
}

// Adiciona eventos
formUsuario.addEventListener('submit', salvarUsuario);
cancelarEdicaoBtn.addEventListener('click', cancelarEdicao);

// Busca os dados ao carregar a página
buscarDados();