
const meuFormulario = document.getElementById('meuFormulario');
const respostaApi = document.getElementById('respostaApi');


async function enviarDados(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Captura os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Cria o objeto com os dados a serem enviados
    const dados = {
        nome: nome,
        email: email
    };

    const url = ' http://demo2249557.mockable.io/enviardados'; // Substitua pela sua URL do mockable.io

    try {
        // Faz a requisição POST usando fetch
        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(dados) // Converte o objeto para JSON
        });

        // Verifica se a resposta é válida
        if (!resposta.ok) {
            throw new Error('Erro ao enviar dados para a API');
        }

        // Converte a resposta para JSON
        const dadosResposta = await resposta.json();

        // Exibe a mensagem de sucesso no <div>
        respostaApi.textContent = dadosResposta.mensagem;
    } catch (erro) {
        // Exibe uma mensagem de erro caso algo dê errado
        respostaApi.textContent = 'Erro ao enviar os dados.';
        console.error(erro);
    }
}

// Adiciona um evento de submit ao formulário
meuFormulario.addEventListener('submit', enviarDados);