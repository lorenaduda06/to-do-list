const localStorageKey = 'list-to-do'; // Nessa chave ficarão salvas as tarefas localmente no navegador

function validarExistenciaTarefa() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Recupera as tarefas salvas no localStorage e converte de string para array se não tiver nada salvo usa [] como valor padrão
    let inputValue = document.getElementById('input-task').value;   // Captura o valor digitado com esse id
    let exists = values.find(x => x.name == inputValue);            // Procura se já existe uma tarefa com o mesmo nome no array
    return !exists ? false : true;      // Se não exixtir retorna falso, senão retorna true (valor já existe)
}

function novaTarefa() {
    let input = document.getElementById('input-task');  // Captura o elemento do input onde a tarefa é digitada

    // Para validação
    if (!input.value) {
        alert('Digite alguma tarefa para inserir em sua lista.');
    }
    else if (validarExistenciaTarefa()) {
        alert('Já existe uma task com essa descrição');
    }
    else {
        // Incrementa localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");     // JSON transforma a string em um array
        values.push({           // Adiciona novo objeto com a propriedade name contendo o texto da tarefa
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values));  // Converte o array em string para salvar no localStorage
        mostrarValores();
    }
    input.value = '';   // Limpa caixa de texto após inserir tarefa
}

function mostrarValores() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Lê a lista do localStorage
    let list = document.getElementById('list-to-do');
    list.innerHTML = '';

    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button id='check' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg></button></li>`;
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // lê a lista de tarefas
    let index = values.find(x => x.name == data);   // Busca qual elemento tem o name igual a data (nosso parametro)
    values.splice(index,1); // Realiza a deleção 
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    mostrarValores();   // Remove item tanto no localStorage como na interface visual do site
}

mostrarValores();   // Faz com que quando a página for recarregada os itens colocados anteriormente permaneçam