📋 Sistema de Gerenciamento de Tarefas (Tasks)
Um sistema de gerenciamento de tarefas desenvolvido com HTML, CSS e JavaScript. O projeto permite criar, listar, editar e excluir tarefas, além de alterar seu status (Pendente, Em andamento, Concluído). Todas as tarefas são salvas no localStorage, garantindo que os dados persistam mesmo após o fechamento do navegador.

🚀 Funcionalidades
Criação de Tarefas:

Adicione novas tarefas com título e descrição.

Limite de 300 caracteres para a descrição.

Status padrão: "Pendente".

Listagem de Tarefas:

Visualize todas as tarefas em cards coloridos, com cores correspondentes ao status:

🔴 Pendente: Vermelho.

🔵 Em andamento: Azul.

🟢 Concluído: Verde.

Edição de Tarefas:

Altere o título e a descrição de uma tarefa existente.

Alteração de Status:

Mude o status da tarefa entre "Pendente", "Em andamento" e "Concluído".

Exclusão de Tarefas:

Remova tarefas da lista.

Persistência de Dados:

Todas as tarefas são salvas no localStorage, garantindo que os dados não sejam perdidos ao recarregar a página.

🛠️ Tecnologias Utilizadas
HTML: Estruturação da interface do usuário.

CSS: Estilização e animações (como a animação de slide ao abrir a lista de tarefas).

JavaScript:

Manipulação do DOM para renderização dinâmica das tarefas.

Gerenciamento do estado das tarefas (criação, edição, exclusão e alteração de status).

Uso do localStorage para persistência de dados.

Lógica complexa para garantir a atualização imediata da interface após cada ação.

🧠 Destaques do JavaScript
O JavaScript foi a parte mais complexa e poderosa do sistema. Aqui estão alguns dos principais pontos:

1. Classes e Gerenciamento de Estado
Classe Task: Representa uma tarefa com propriedades como title, description e status.

Classe Activities: Gerencia a lista de tarefas e todas as operações relacionadas (adicionar, editar, excluir, alterar status).

2. Manipulação do DOM
Renderização Dinâmica: As tarefas são renderizadas dinamicamente no DOM usando JavaScript. Cada tarefa é representada por um card, criado com base no estado atual das tarefas.

Atualização em Tempo Real: Após qualquer alteração (criação, edição, exclusão ou mudança de status), a interface é atualizada imediatamente sem a necessidade de recarregar a página.

3. Persistência com localStorage
Todas as tarefas são salvas no localStorage como uma string JSON. Quando a página é carregada, as tarefas são recuperadas e renderizadas novamente.

4. Lógica de Atualização de Status
O status de uma tarefa pode ser alterado entre "Pendente", "Em andamento" e "Concluído". A cor do card é atualizada dinamicamente com base no status selecionado.

5. Event Listeners
Foram utilizados event listeners para capturar interações do usuário, como cliques em botões e alterações em checkboxes.

6. Validações e Feedback
O sistema valida se o título da tarefa foi preenchido antes de salvar.

Feedback visual é fornecido ao usuário, como a mudança de cor do card ao alterar o status.

🎨 Design e Interface
Interface Moderna: Design limpo e responsivo, com cards coloridos e animações suaves.

Cores Dinâmicas: As cores dos cards mudam conforme o status da tarefa.

Animações: Transições suaves ao alternar entre seções (criação, listagem e edição de tarefas).

📂 Estrutura do Projeto
HTML:

index.html: Página inicial com menu de navegação.

create.html: Página para criar novas tarefas.

task_list.html: Página para listar todas as tarefas.

CSS:

style.css: Estilos globais e animações.

JavaScript:

script.js: Lógica principal do sistema, incluindo a manipulação do DOM e o gerenciamento do estado das tarefas.

🖥️ Como Executar o Projeto
Deploy: https://tasks-one-pi.vercel.app/task_list.html

Navegue pelo sistema usando o menu:

Home: Página inicial.

Criar Tarefa: Adicione novas tarefas.

Listar Tarefas: Visualize e gerencie suas tarefas.

📝 Exemplo de Uso
Criar uma Tarefa:

Acesse a página "Criar Tarefa".

Preencha o título e a descrição.

Clique em "Adicionar Tarefa".

Alterar o Status:

Na lista de tarefas, clique em "Acessar Tarefa".

Altere o status usando os checkboxes e clique em "Alterar Status".

Editar uma Tarefa:

Na lista de tarefas, clique em "Acessar Tarefa".

Clique em "Alterar" para editar o título e a descrição.

Excluir uma Tarefa:

Na lista de tarefas, clique em "Acessar Tarefa".

Clique em "Remover Tarefa".
