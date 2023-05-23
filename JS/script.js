//seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const search = document.querySelector('#search-input');
const tarefas = document.getElementsByClassName("todo");
const filter = document.getElementById("filter-select");
const cancelSearchBtn = document.querySelector('#erase-button')
let cont = 1;

let oldInputValue;

//-----FUNÇÕES-----

//função que cria a parte da tarefa com os botões
const saveTodo = function(text){

    const todo = document.createElement('div');
    todo.classList.add('todo');
    todo.id = cont;

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
    cont++;
}
//esconder tela
const toggleForms = function (){
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

//atualizar tarefa
const updateTodo = function(text){
    const todos = document.querySelectorAll(".todo");
    
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}

//pesquisa o que foi digitado nas tarefas
let searchTodo = function (){
    if (search.value != ''){
        for(let tarefa of tarefas){
            let title = tarefa.querySelector('h3');
            title = title.textContent.toLowerCase();
            let searchText = search.value.toLowerCase();
            if(!title.includes(searchText)){
                tarefa.style.display = 'none';
            }else{
                tarefa.style.display = '';
            }
        }
    }else{
        for(let tarefa of tarefas){
            tarefa.style.display = '';
        }
    }
}

//filtro de tarefas
const filterTodo = function(){
    
    if(filter.value == 'all'){
        for(let tarefa of tarefas){
            if(tarefa.classList.contains('todo')){
                tarefa.style.display = '';
            }
        }
    }

    if(filter.value == 'done'){
        for(let tarefa of tarefas){
            if(tarefa.classList.contains('done')){
                tarefa.style.display = '';
            }else{
                tarefa.style.display = 'none';
            }
        }
    }

    if(filter.value == 'todo'){
        for(let tarefa of tarefas){
            if(!tarefa.classList.contains('done')){
                tarefa.style.display = '';
            }else{
                tarefa.style.display = 'none';
            }
        }
    }
}
//botão de limpar
const clearSearch = function(){
    search.value = '';
    searchTodo();
    search.focus();

}

//-----EVENTOS-----
//add tarefa
todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    
    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue);
    }
})
//cria modelo de tarefa e adiciona na lista de tarefas
document.addEventListener("click", function(e){
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle('done');
    }

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

});
//cancel edit
cancelEditBtn.addEventListener("click", function(e){
    e.preventDefault();

    toggleForms();
});
//edit
editForm.addEventListener("submit", function(e){
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        // att
        updateTodo(editInputValue);
    }

    toggleForms();
})
//pesquisa
search.addEventListener('input', searchTodo);

//cancela pesquisa
cancelSearchBtn.addEventListener("click", function(e){
    e.preventDefault();
    clearSearch();
    
});

//filtro
filter.addEventListener('change', filterTodo);