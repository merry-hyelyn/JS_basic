const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = "toDos"
let toDos = []

function deleteToDo(event) {
    const btn = event.target
    const li = btn.parentNode
    toDoList.removeChild(li)

    // filter => list요소 하나씩 접근해서 주어진 함수로 해당 아이템을 처리 후 새로운 배열 리턴cf) .forEach
    const cleanTodos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id) // li.id => String
    })
    toDos = cleanTodos // const였던 toDos let으로 변경하여 값 변경
    saveToDos()
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

function paintTodo(text) {
    const li = document.createElement("li")
    const delBtn = document.createElement("button")
    const span = document.createElement("span")
    const newId = toDos.length + 1

    delBtn.innerHTML = "❌"
    delBtn.addEventListener("click", deleteToDo)
    delBtn.className = "toDo_button"
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
