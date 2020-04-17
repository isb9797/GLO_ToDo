'use strict';
//Урок 13 TODO 


//Получаем основные элементы
const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

//Получаем JSON из localStorage
let todoData = JSON.parse(localStorage.getItem('todoData'));

//Чтобы небыло ошибки присваиваем todoData пустой массив
if (todoData === null){
    todoData = [];
}

const render = () => {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    //Долго и нудно работаем с данными
    todoData.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' +
        '</div>';
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        //
        const btnComplete = li.querySelector('.todo-complete');
        btnComplete.addEventListener('click', () =>{
            item.completed = !item.completed;
            render();
        });

        const btnRemove = li.querySelector('.todo-remove');
       btnRemove.addEventListener('click', () => {
            let newTodo = [];
            for (let index = 0; index <todoData.length; index++) {
                 if (item.value !== todoData[index].value){
                    newTodo.push(todoData[index]);
                 }
            }
            todoData = newTodo;
            render();
        });
    });
    headerInput.value ='';
    localStorage.setItem('todoData', JSON.stringify(todoData));
};

todoControl.addEventListener('submit', (event) => {
    event.preventDefault();
    if (headerInput.value !== ''){
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
    
        todoData.push(newTodo);

        render();
        
    }
});

render();