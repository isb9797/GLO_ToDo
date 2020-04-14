"use strict";

const todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todocompleted = document.querySelector(".todo-completed");

let todoData = [];

const render = function () {
  todoList.textContent = "";
  todocompleted.textContent = "";
  todoData = JSON.parse(localStorage.getItem("todoData"));
  if (todoData === null) {
    todoData = [];
  } else {
    todoData.forEach(function (item) {
      const li = document.createElement("li");
      li.classList.add("todo-item");
      li.innerHTML =
        '<span class="text-todo">' +
        item.value +
        "</span>" +
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        "</div>";

      if (item.completed) {
        todocompleted.append(li);
      } else {
        todoList.append(li);
      }

      const todoCompletedBtn = li.querySelector(".todo-complete");
      todoCompletedBtn.addEventListener("click", function () {
        item.completed = !item.completed;

        let elVal = this.parentElement.parentElement.textContent;

        let rewriteArray = JSON.parse(localStorage.getItem("todoData"));

        for (let i of rewriteArray) {
          for (let k in rewriteArray) {
            if (i.value === elVal && i.complete === false) {
              rewriteArray.splice(k - 1, 1, {
                value: i.value,
                complete: true,
              });
            } else if (i.value === elVal && i.complete === false) {
              //todocompleted.append(li);
              rewriteArray.splice(k - 1, 1, {
                value: i.value,
                complete: true,
              });
            }
          }
        }
        console.log("rewriteArray: ", rewriteArray);
      });

      const todoRemoveBtn = li.querySelector(".todo-remove");
      todoRemoveBtn.addEventListener("click", function () {
        let elVal = this.parentElement.parentElement.textContent;

        let removeArray = JSON.parse(localStorage.getItem("todoData"));

        for (let k of removeArray) {
          for (let i in removeArray) {
            if (k.value === elVal) {
              //console.log('removeArray: ', removeArray[i]);
              removeArray.splice(i, 1);
              console.log("removeArray: ", removeArray);
            }
          }
        }
        localStorage.removeItem("todoData");
        if (removeArray.length !== 0) {
          localStorage.setItem("todoData", JSON.stringify(removeArray));
        }

        //todoData = JSON.parse(localStorage.getItem('todoData'));
        render();
      });
    });
  }
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();

  if (headerInput.value === "") {
    return;
  } else {
    const newTodo = {
      value: headerInput.value,
      complete: false,
    };
    todoData.push(newTodo);
    //console.log('todoData: ', todoData);
    localStorage.setItem("todoData", JSON.stringify(todoData));
    headerInput.value = "";
    render();
  }
});

render();
