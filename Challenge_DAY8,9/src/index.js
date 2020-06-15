// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>
const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");
const doneList = document.querySelector(".js-endList");

const PENDING = "PENDING";
const FINISHED = "FINISHED";
let toDos = [];
let endTodo = [];

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintTodo(currentValue);
  todoInput.value = "";
}

function handleDelTodo(event) {
  const del = event.target;
  const li = del.parentNode;
  todoList.removeChild(li);

  const cleanTodo = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDos = cleanTodo;
  saveToDo();
}

function handleDelEndTodo(event) {
  const del = event.target;
  const li = del.parentNode;
  doneList.removeChild(li);

  const cleanTodo = endTodo.filter(function(toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  endTodo = cleanTodo;
  saveEndToDo();
}

function handleCheckBtn(event) {
  handleDelTodo(event);
  const check = event.target;
  const li = check.parentNode;
  const span = li.querySelector("span");
  const text = span.textContent;

  paintEndTodo(text);
}

function handleBackBtn(event) {
  handleDelEndTodo(event);
  const back = event.target;
  const li = back.parentNode;
  const span = li.querySelector("span");
  const text = span.textContent;

  paintTodo(text);
}

function saveToDo() {
  localStorage.setItem(PENDING, JSON.stringify(toDos));
}

function saveEndToDo() {
  localStorage.setItem(FINISHED, JSON.stringify(endTodo));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("Button");
  const checkBtn = document.createElement("Button");
  const newID = toDos.length + 1;

  span.innerHTML = text;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", handleDelTodo);
  checkBtn.innerHTML = "✅";
  checkBtn.addEventListener("click", handleCheckBtn);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(checkBtn);
  todoList.appendChild(li);
  li.id = newID;

  const toDoObj = {
    text: text,
    id: newID
  };
  toDos.push(toDoObj);
  saveToDo();
}

function paintEndTodo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("Button");
  const backBtn = document.createElement("Button");
  const newID = endTodo.length + 1;

  span.innerHTML = text;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", handleDelEndTodo);
  backBtn.innerHTML = "⏪";
  backBtn.addEventListener("click", handleBackBtn);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  doneList.appendChild(li);
  li.id = newID;

  const endTodoObj = {
    text: text,
    id: newID
  };
  endTodo.push(endTodoObj);
  saveEndToDo(endTodo);
}

function loadTodo() {
  const loadedTodo = localStorage.getItem(PENDING);
  const loadedEndTodo = localStorage.getItem(FINISHED);

  // Paint To Do
  if (loadedTodo !== null) {
    const parsedTodo = JSON.parse(loadedTodo);
    parsedTodo.forEach(function(todos) {
      paintTodo(todos.text);
    });
  }

  // Paint End To Do 뿌리기
  if (loadedEndTodo !== null) {
    const parsedEndTodo = JSON.parse(loadedEndTodo);
    parsedEndTodo.forEach(function(endTodo) {
      paintEndTodo(endTodo.text);
    });
  }
}

function init() {
  loadTodo();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
