const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = "toDos"
const toDos = []

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}
function paintTodo(text) {
    const li = document.createElement("li")
    const delBtn = document.createElement("button")
    const span = document.createElement("span")
    const newId = toDos.length + 1

    delBtn.innerText = "❌"
    span.innerText = text
    li.appendChild(delBtn)
    li.appendChild(span)
    toDoList.appendChild(li)
    li.id = newId

    const toDoObj = {
        text: text,
        id: newId,
    }
    toDos.push(toDoObj)
    saveToDos()
}

function handleSubmit(event) {
    event.preventDefault()
    const currentValue = toDoInput.value
    paintTodo(currentValue)
    toDoInput.value = ""
}
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS)
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos) //object to string
        parsedToDos.forEach(function (toDo) {
            paintTodo(toDo.text) // 지난번에 저장한 todo에 대한 list출력
        })
    }
}
function init() {
    loadToDos()
    toDoForm.addEventListener("submit", handleSubmit)
}

init()
