import { ToDoPrototype } from "./toDo.js";

let toDoList = [];
let toDo = new ToDoPrototype();
let completed = new ToDoPrototype();
let completedList = [];

// Them input vao toDoList
document.querySelector("#addItem").onclick = function () {
  let input = document.querySelector("#newTask");
  let name = String(input.value);
  let id = String(Date.now());
  toDo = { id, name };
  toDoList.push(toDo);
  console.log(toDoList);
  //Reset input
  input.value = "";
  renderToDoList(toDoList, "#todo");
  saveLocalStorage();
};

//Xuất ra màn hình
let renderToDoList = (arr, selector) => {
  let output = "";
  for (let index of arr) {
    output += `
    <li>${index.name}
    <div>
    <i class="far fa-trash-alt" onclick="deleteElement('${index.id}')" style="cursor:pointer"></i>
    <i class="far fa-check-circle" onclick="completedTask('${index.id}')" style="cursor:pointer"></i>
    </div>
    </li>`;
  }
  document.querySelector(selector).innerHTML = output;
};

//Lưu vào local storage
let saveLocalStorage = () => {
  localStorage.setItem("toDo", JSON.stringify(toDoList));
  localStorage.setItem("comp", JSON.stringify(completedList));
};

//Lấy mảng từ local storage
let getLocalStorage = () => {
  if (localStorage.getItem("toDo")) {
    toDoList = JSON.parse(localStorage.getItem("toDo"));
  }
  if (localStorage.getItem("comp")) {
    completedList = JSON.parse(localStorage.getItem("comp"));
  }
};

//Xóa phần tử
window.deleteElement = (idClick) => {
  //render ra mảng mới không có id đã tìm
  toDoList = toDoList.filter((toDo) => toDo.id !== idClick);
  saveLocalStorage();
  renderToDoList(toDoList, "#todo");
};

//lấy array completedList
window.completedTask = (idClick) => {
  completed = toDoList.find((toDo) => toDo.id === idClick);
  completedList.push(completed);
  renderCompletedList(completedList, "#completed");
  deleteElement(idClick);
  saveLocalStorage();
  console.log("completed", completed);
  console.log("completedList", completedList);
};

//render completedList
let renderCompletedList = (arr, selector) => {
  let output = "";
  for (let index of arr) {
    output += `
    <li>${index.name}
    <div>
    <i class="far fa-trash-alt" onclick="deleteCompleted('${index.id}')" style="cursor:pointer"></i>
    <i class="fas fa-check-circle" onclick="moveElementToDoList('${index.id}')" style="cursor:pointer; color:green"></i>
    </div>
    </li>`;
  }
  document.querySelector(selector).innerHTML = output;
};

//Xóa phần tử trong completed
window.deleteCompleted = (idClick) => {
  completedList = completedList.filter((completed) => completed.id !== idClick);
  saveLocalStorage();
  renderCompletedList(completedList, "#completed");
};

//Chuyển từ completedList vào toDoList
window.moveElementToDoList = (idClick) => {
  toDo = completedList.find((completed) => completed.id === idClick);
  toDoList.push(toDo);
  renderCompletedList(completedList, "#completed");
  renderToDoList(toDoList, "#todo");
  deleteCompleted(idClick);
  saveLocalStorage();
};

//show Only ToDoList
document.querySelector("#one").onclick = () => {
  document.querySelector("#completed").style.display = "none";
};

//show all
document.querySelector("#all").onclick = () => {
  document.querySelector("#completed").style.display = "block";
};

//sort a->Z trigger
document.querySelector("#two").onclick = () => {
  sortAToZ(toDoList);
  sortAToZ(completedList);
  renderToDoList(toDoList, "#todo");
  renderCompletedList(completedList, "#completed");
};

//sort a-> Z
let sortAToZ = function (arr){
  arr.sort((toDoNext, toDo) => {
    let nameToDo = toDo.name.toLocaleLowerCase();
    let nameToDoNext = toDoNext.name.toLocaleLowerCase();
    if (nameToDoNext < nameToDo) {
      return -1;
    }
    return 1;
  });
}
//sort z->A trigger
document.querySelector("#three").onclick = () => {
  sortZToA(toDoList);
  sortZToA(completedList);
  renderToDoList(toDoList, "#todo");
  renderCompletedList(completedList, "#completed");
};

let sortZToA = function (arr){
  arr.sort((toDoNext, toDo) => {
    let nameToDo = toDo.name.toLocaleLowerCase();
    let nameToDoNext = toDoNext.name.toLocaleLowerCase();
    if (nameToDoNext > nameToDo) {
      return -1;
    }
    return 1;
  });
}

window.onload = function () {
  getLocalStorage();
  renderToDoList(toDoList, "#todo");
  renderCompletedList(completedList, "#completed");
};
