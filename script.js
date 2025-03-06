/**
 * Classe Task: Representa uma tarefa com título, descrição e status.
 * O construtor inicializa os atributos title, description e status.
 */
class Task {
    constructor(title, description, status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

/**
 * Classe Activities: Gerencia uma lista de tarefas e suas operações.
 * O construtor inicializa a lista de tarefas (tasks) e carrega as tarefas salvas no localStorage.
 */
class Activities {
    constructor() {
        this.tasks = [];
        this.loadTasks();
    }

    /**
     * Adiciona um objeto (tarefa) à lista de tarefas.
     * @param {Object} object - A tarefa a ser adicionada.
     */
    addObject(object) {
        this.tasks.push(object);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    /**
     * Limita o número de caracteres em um textarea para 300.
     * Adiciona um evento de input ao textarea para garantir que o limite seja respeitado.
     */
    limitedText() {
        document.addEventListener('DOMContentLoaded', () => {
            const textAreaEl = document.querySelector('textarea.description-task');
            if (textAreaEl) {
                textAreaEl.addEventListener('input', (event) => {
                    const texto = event.target.value;
                    if (texto.length > 300) {
                        event.target.value = texto.slice(0, 300);
                    }
                });
            }
        });
    }

    /**
     * Alterna a exibição entre dois elementos no DOM.
     * Oculta o elemento com o ID 'title' e exibe o elemento com o ID 'description'.
     * @param {string} title - O ID do elemento a ser ocultado.
     * @param {string} description - O ID do elemento a ser exibido.
     */
    createTaskShow(title, description) {
        document.getElementById(title).style.display = 'none';
        document.getElementById(description).style.display = 'block';
    }

    /**
     * Salva uma nova tarefa no array de tarefas e no localStorage.
     * Captura os valores do título e da descrição dos campos de input.
     * Valida se o título foi preenchido.
     * Cria uma nova instância de Task e a adiciona à lista de tarefas.
     * Limpa os campos de input após salvar.
     * Atualiza a exibição para mostrar a tarefa criada.
     * Salva a lista de tarefas no localStorage.
     */
    saveTask() {
        const title = document.querySelector('#title-text').value;
        const description = document.querySelector('.description-task').value;
        const status = 'Status: Pendente';

        if (title.length < 1) {
            alert('Digite o nome do título!');
            return;
        }

        const task = new Task(title, description, status);
        this.addObject(task);

        // Limpar os campos
        document.querySelector('#title-text').value = '';
        document.querySelector('.description-task').value = '';

        this.createTaskShow('task-create', 'task-create02');

        document.querySelector('.title-create-official').innerHTML = title;
        document.querySelector('.description-create-official').innerHTML = description;
        document.querySelector('.status-create-official').innerHTML = status;

        // Salvar as tarefas no localStorage
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    /**
     * Lista todas as tarefas na tela, criando elementos HTML dinamicamente.
     * Limpa o conteúdo atual da área de cards para evitar duplicação.
     * Para cada tarefa, cria um card (article) com título, descrição e um botão de acesso.
     */
    listTask() {
        const cardCreate = document.querySelector('.card-area');
        cardCreate.innerHTML = ''; // Limpa o conteúdo atual e impede que os cards dupliquem

        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        
        this.tasks.forEach(task => {
            const card = document.createElement('article');
            card.classList.add('task-card');

            // Define a cor do card com base no status da tarefa
            if (task.status === 'Status: Pendente') {
                card.style.backgroundColor = '#FF6347'; 
            } else if (task.status === 'Status: Em andamento') {
                card.style.backgroundColor = '#00BFFF'; 
            } else if (task.status === 'Status: Concluído') {
                card.style.backgroundColor = '#32CD32'; 
            }

            const divElement = document.createElement('div');

            const titleElement = document.createElement('h1');
            titleElement.classList.add('title-list-card');
            titleElement.textContent = `Título: ${task.title}`;

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('name-title');
            descriptionElement.textContent = task.description;

            const buttonCard = document.createElement('button');
            buttonCard.classList.add('button-card');
            buttonCard.innerHTML = 'Acessar tarefa';
            buttonCard.addEventListener('click', () => this.acessCardTask(task));

            card.appendChild(divElement);
            divElement.appendChild(titleElement);
            divElement.appendChild(descriptionElement);
            cardCreate.appendChild(card);
            card.appendChild(buttonCard);
        });
    }

    /**
     * Retorna à lista de tarefas, ocultando a view da tarefa selecionada.
     * Atualiza a lista de tarefas na tela e reinicia a animação de exibição.
     */
    returnCardTasks() {
        const returnBtn = document.querySelector('#return-list-tasks');
        returnBtn.innerHTML = 'Retornar';
        if (returnBtn) {
            // Remove o listener antigo
            returnBtn.onclick = null;
            returnBtn.addEventListener('click', () => {
                // Atualiza a lista de tarefas
                this.listTask();

                // Alterna a exibição para a área de cards
                this.createTaskShow('card-official', 'card-area');
                document.getElementById('card-area').style.display = 'flex';

                // Reinicia a animação
                this.cardCreate = document.getElementById('card-area');
                this.cardCreate.classList.remove('slide-animation'); // Remove a classe para reiniciar a animação
                void this.cardCreate.offsetWidth; // Força a reflow (reinicia a animação)
                this.cardCreate.classList.add('slide-animation'); // Cria novamente a classe
            });
        } else {
            console.error('Botão não encontrado!');
        }
    }

    /**
     * Configura o botão de remoção de uma tarefa.
     * Remove a tarefa da lista e atualiza o localStorage e a exibição.
     * @param {Object} task - A tarefa a ser removida.
     */
    removeCardTasks(task) {
        const removeBtn = document.querySelector('#remove-task');
        removeBtn.innerHTML = 'Remover tarefa';

        if (removeBtn) {
            // Remove o listener antigo, se existir
            removeBtn.removeEventListener('click', this.handleRemoveTask); // Remove o listener específico

            // Adiciona o novo listener
            this.handleRemoveTask = () => {
                const index = this.tasks.findIndex(t => t.title === task.title && t.description === task.description && t.status === task.status);

                if (index !== -1) {
                    this.tasks.splice(index, 1);

                    // Atualiza o localStorage
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));

                    // Atualiza a lista de tarefas na tela
                    this.listTask();

                    // Retorna para a lista de tarefas
                    this.createTaskShow('card-official', 'card-area');
                    document.getElementById('card-area').style.display = 'flex';
                }
            };

            // Adiciona o listener ao botão de remoção
            removeBtn.addEventListener('click', this.handleRemoveTask);
        } else {
            console.error('Botão não encontrado.');
        }
    }

    /**
     * Configura o botão de alteração de status de uma tarefa.
     * Permite ao usuário selecionar um novo status para a tarefa.
     * @param {Object} task - A tarefa cujo status será alterado.
     */
    modifyStatusTasks(task) {
        const cardOfficial = document.getElementById('card-official');
        const modifyStatus = document.querySelector('#modify-status');
        modifyStatus.innerHTML = 'Alterar status';

        // Remove o listener antigo
        modifyStatus.onclick = null;
        modifyStatus.addEventListener('click', () => {
            if (modifyStatus) {
                this.createTaskShow('card-official', 'modify-status-section');
                document.querySelector('.title-modify-status').innerHTML = `Selecione o status atual da tarefa: ${task.title}`;
            }
        });

        // Limpar estados dos checkboxes
        const pending = document.getElementById('pending');
        const progress = document.getElementById('in-progress');
        const completed = document.getElementById('completed');
        const change = document.getElementById('change-status');
        change.innerHTML = 'Alterar Status';

        // Resetar checkboxes
        pending.checked = false;
        progress.checked = false;
        completed.checked = false;
        pending.disabled = false;
        progress.disabled = false;
        completed.disabled = false;

        // Remover listeners antigos (se houver)
        pending.onclick = null;
        progress.onclick = null;
        completed.onclick = null;
        change.onclick = null;

        // Define a cor do card com base no status atual da tarefa
        if (task.status === 'Status: Pendente') {
            cardOfficial.style.backgroundColor = "#FF6347";
        } else if (task.status === 'Status: Em andamento') {
            cardOfficial.style.backgroundColor = "#00BFFF";
        } else if (task.status === 'Status: Concluído') {
            cardOfficial.style.backgroundColor = "#32CD32";
        } else {
            cardOfficial.style.backgroundColor = "white";
        }

        // Adicionar novos listeners para os checkboxes
        pending.onclick = () => {
            if (pending.checked) {
                progress.disabled = true;
                completed.disabled = true;
            } else {
                progress.disabled = false;
                completed.disabled = false;
            }
        };

        progress.onclick = () => {
            if (progress.checked) {
                pending.disabled = true;
                completed.disabled = true;
            } else {
                pending.disabled = false;
                completed.disabled = false;
            }
        };

        completed.onclick = () => {
            if (completed.checked) {
                pending.disabled = true;
                progress.disabled = true;
            } else {
                pending.disabled = false;
                progress.disabled = false;
            }
        };

        // Listener para o botão de alterar status
        change.onclick = () => {
            if (pending.checked) {
                task.status = 'Status: Pendente';
            } else if (progress.checked) {
                task.status = 'Status: Em andamento';
            } else if (completed.checked) {
                task.status = 'Status: Concluído';
            }

            // Atualiza o localStorage
            localStorage.setItem('tasks', JSON.stringify(this.tasks));

            // Atualiza a UI para refletir as mudanças
            this.listTask(); // Re-renderiza a lista de tarefas
            this.acessCardTask(task); // Atualiza a visualização da tarefa atual
            
            // Retorna para a lista de tarefas
            this.createTaskShow('modify-status-section', 'card-official');
            
            
        };
    }

    /**
     * Configura o botão de alteração de informações de uma tarefa.
     * Permite ao usuário editar o título e a descrição da tarefa.
     * @param {Object} task - A tarefa cujas informações serão alteradas.
     */
    modifyInfoTask(task) {
        const changeTaskButton = document.getElementById('change-task');
        changeTaskButton.innerHTML = 'Alterar';

        // Remove o listener antigo
        changeTaskButton.onclick = null;
        changeTaskButton.addEventListener('click', () => {
            this.createTaskShow('card-official', 'change-task-article');

            const changeTaskArea = document.getElementById('change-task-article');
            changeTaskArea.innerHTML = '';

            // Primeira div dentro do article
            const titleChangeArticle = document.createElement('h1');
            titleChangeArticle.classList.add('title-change-article');
            titleChangeArticle.innerHTML = 'Alterar tarefa: ';

            const titleChangeDiv = document.createElement('div');
            titleChangeDiv.classList.add('title-change-div');

            const titleChangeH1 = document.createElement('h1');
            titleChangeH1.classList.add('title-change-h1');
            titleChangeH1.innerHTML = 'Novo título: ';

            const titleChangeInput = document.createElement('input');
            titleChangeInput.classList.add('title-change-input');
            titleChangeInput.type = 'text';
            titleChangeInput.placeholder = task.title;

            // Segunda Div
            const descriptionChangeDiv = document.createElement('div');
            descriptionChangeDiv.classList.add('description-change-div');

            const descriptionChangeH1 = document.createElement('h1');
            descriptionChangeH1.classList.add('description-change-h1');
            descriptionChangeH1.innerHTML = 'Nova descrição: ';

            const descriptionChangeText = document.createElement('textarea');
            descriptionChangeText.classList.add('description-change-text');
            descriptionChangeText.placeholder = task.description;

            // Botão para alterar
            const buttonChangeTask = document.createElement('button');
            buttonChangeTask.classList.add('button-change-task');
            buttonChangeTask.innerHTML = 'Alterar informações';

            // Atribuição - Formulando o article
            changeTaskArea.appendChild(titleChangeArticle);
            changeTaskArea.appendChild(titleChangeDiv);
            changeTaskArea.appendChild(descriptionChangeDiv);

            titleChangeDiv.appendChild(titleChangeH1);
            titleChangeDiv.appendChild(titleChangeInput);

            descriptionChangeDiv.appendChild(descriptionChangeH1);
            descriptionChangeDiv.appendChild(descriptionChangeText);

            descriptionChangeDiv.appendChild(buttonChangeTask);

            // Listener para o botão de alterar informações
            buttonChangeTask.onclick = () => {
                const newTitle = titleChangeInput.value || task.title; // Mantém o título atual se o novo estiver vazio
                const newDescription = descriptionChangeText.value || task.description; // Mantém a descrição atual se a nova estiver vazia

                // Atualiza a tarefa
                task.title = newTitle;
                task.description = newDescription;

                // Atualiza o localStorage
                localStorage.setItem('tasks', JSON.stringify(this.tasks));

                // Retorna para a lista de tarefas
                this.createTaskShow('change-task-article', 'card-area');
                document.getElementById('card-area').style.display = 'flex';

                // Atualiza a lista de tarefas na tela
                this.listTask();
            };
        });
    }

    /**
     * Acessa uma tarefa específica da lista de tarefas.
     * Oculta a lista de tarefas e exibe a view da tarefa selecionada.
     * Configura os botões de retorno, remoção, alteração de status e edição de informações.
     * @param {Object} task - A tarefa a ser acessada.
     */
    acessCardTask(task) {
        // Oculta a lista de tarefas e exibe a view da tarefa selecionada
        this.createTaskShow('card-area', 'card-official');

        // Atualiza os detalhes da tarefa na view
        document.querySelector('.title-select-official').innerHTML = task.title;
        document.querySelector('.description-select-official').innerHTML = task.description;
        document.querySelector('.status-create-official').innerHTML = task.status;

        // Configura o botão de retorno
        this.returnCardTasks();

        // Configura o botão de remoção
        this.removeCardTasks(task);

        // Configura o botão de alterar status
        this.modifyStatusTasks(task);

        // Configura o botão de alterar título e descrição
        this.modifyInfoTask(task);
    }

    /**
     * Carrega as tarefas salvas no localStorage.
     * Se houver tarefas salvas, converte-as de volta para um array de objetos.
     */
    loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }
}

// Cria uma instância global da classe Activities para gerenciar as tarefas.
const activities = new Activities();

// Função para limitar caracteres
activities.limitedText();

// Funções globais para serem chamadas diretamente do HTML.
/**
 * Salva uma nova tarefa.
 */
window.saveTask = () => {
    activities.saveTask();
};

/**
 * Lista todas as tarefas.
 */
window.listTask = () => {
    activities.listTask();
};