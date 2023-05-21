//seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const pesquisa = document.querySelector('#search-input');
const tarefas = document.getElementsByClassName("todo");
let cont = 1;

let oldInputValue;

//funções
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

const toggleForms = function (){
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = function(text){
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}

function filterCards(){
    if (pesquisa.value != ''){
        for(let tarefa of tarefas){
            let title = tarefa.querySelector('h3');
            title = title.textContent.toLowerCase();
            let pesquisaTexto = pesquisa.value.toLowerCase();
            console.log(title)
            if(!title.includes(pesquisaTexto)){
                tarefa.style.display = 'none';
            }else{
                tarefa.style.display = '';
            }
        }
    }
}

//eventos
todoForm.addEventListener("submit", function(e){
    e.preventDefault();
    
    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue);
    }
})

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

cancelEditBtn.addEventListener("click", function(e){
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", function(e){
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        // att
        updateTodo(editInputValue);
    }

    toggleForms();
})

pesquisa.addEventListener('input', filterCards);