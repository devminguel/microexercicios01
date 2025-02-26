function adicionarItem() {
    const input = document.getElementById("itemInput");
    const texto = input.value.trim();
    if (texto === "") return;

    const lista = document.getElementById("lista");
    const novoItem = document.createElement("li");
    novoItem.textContent = texto;
    
    novoItem.addEventListener("dblclick", function() {
        lista.removeChild(novoItem);
    });
    
    lista.appendChild(novoItem);
    input.value = "";
    input.focus();

    const buscarDadosBtn = document.getElementById('buscarDadosBtn');
const mensagemApi = document.getElementById('mensagemApi');

 }

 function buscarDados() {
    fetch(' http://demo2249557.mockable.io/mensagem') 
        .then(response => response.json())
        .then(data => {
            document.getElementById("resultado").textContent = data.mensagem;
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}
