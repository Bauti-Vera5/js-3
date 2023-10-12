document.addEventListener("DOMContentLoaded", function() {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    const todoListElement = document.getElementById("todo-list");
    const taskInput = document.getElementById("task-input");
    const output = document.getElementById("output");

    function renderTodoList() {
        todoListElement.innerHTML = "";
        todoList.forEach(function(task, index) {
            const li = document.createElement("li");
            li.textContent = task;
            li.addEventListener("click", function() {
                // Elimina la tarea al hacer clic
                todoList.splice(index, 1);
                renderTodoList();
                saveToLocalStorage();
            });
            todoListElement.appendChild(li);
        });
    }


    function saveToLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }


    renderTodoList();


    document.getElementById("add-task").addEventListener("click", function() {
        const newTask = taskInput.value;
        if (newTask.trim() !== "") {
            todoList.push(newTask);
            renderTodoList();
            saveToLocalStorage();
            taskInput.value = "";
        }
    });


    document.getElementById("clear-tasks").addEventListener("click", function() {
        todoList.length = 0;
        renderTodoList();
        saveToLocalStorage();
    });


    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const newTask = taskInput.value;
            if (newTask.trim() !== "") {
                todoList.push(newTask);
                renderTodoList();
                saveToLocalStorage();
                taskInput.value = "";
            }
        }
    });


    function showMessage(message) {
        output.textContent = message;
    }
});


