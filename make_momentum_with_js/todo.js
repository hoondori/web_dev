const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = dogreeting = document.querySelector('.js-toDoList')

const TODO_LS = "todo"
let todos = [];

function loadToDo() {
    const loadedTodo = localStorage.getItem(TODO_LS)
    if (loadedTodo !== null) {
        const parsedTodo = JSON.parse(loadedTodo);
        //console.log(parsedTodo)
        parsedTodo.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    } 
}

function deleteToDo(event) {
    //console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    console.log(li.id);
    toDoList.removeChild(li);
    const cleanToDos = todos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    todos = cleanToDos
    saveTodo();
    //console.log(cleanToDos)
}

function saveTodo() {
    localStorage.setItem(TODO_LS, JSON.stringify(todos))


}
function paintToDo(text) {
    console.log(text)
    const li = document.createElement("li");
    const delBtn = document.createElement("button")
    const span = document.createElement("span");
    const newId = todos.length + 1;

    delBtn.value = "😄";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const todoObj = {
        text: text,
        id: newId
    };
    todos.push(todoObj);

    saveTodo();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
}
function init() {
    loadToDo()
    toDoForm.addEventListener("submit", handleSubmit)
}

init();