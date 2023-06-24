// *** global variable

const form = document.querySelector("form");
const inputValue = document.querySelector(".input-txt");
const listContainer = document.querySelector(".list-container");
const itemContainer = document.querySelector("ul");
const itemCounter = document.querySelector(".count");
const clearCompletebtn = document.querySelector(".clear")
// add item to dom

const onSubmit = (e) => {
  let value = false;
  e.preventDefault();
  let input = capitalizeFirstLetter(inputValue.value);
  if (input === "") {
    alert("PLEASE INPUT A TODO");
  } else {
    inputValue.value = "";
    addItemsToLocal(value, input);
    addItemsDom(input);
  }
};

// functions

function capitalizeFirstLetter(sentense) {
  return sentense.slice(0, 1).toUpperCase().trim() + sentense.slice(1).trim();
}

// add item to local storage
function addItemsDom(item) {
  // creating new item
  const list = document.createElement("li");
  const divtxt = document.createElement("div");
  const button = document.createElement("button");
  const divcheck = document.createElement("div");
  const divcircle = document.createElement("div");
  const checkedMark = document.createElement("img");
  const listtext = document.createElement("p");
  const buttondel = document.createElement("img");

  list.classList.add("list-item", "flex");
  divtxt.classList.add("list-txt", "flex");
  button.classList.add("delete-btn");
  divcheck.classList.add("list-checked");
  divcircle.classList.add("circled");
  checkedMark.src = "./img/icon-check.svg";
  checkedMark.alt = "checked";
  checkedMark.classList.add("checked-mark");
  listtext.textContent = item;
  buttondel.src = "./img/icon-cross.svg";
  buttondel.alt = "delete";

  list.appendChild(divtxt);
  list.appendChild(button);

  divtxt.appendChild(divcheck);
  divtxt.appendChild(listtext);

  divcheck.appendChild(divcircle);
  divcheck.appendChild(checkedMark);

  button.appendChild(buttondel);

  itemContainer.appendChild(list);
  // addeventlistener on delete btn
  // checked()
}

// add item from local storage


// add item from local storage
function displayitem() {
  const itemFormStorage = getItemsFromLocal();
  itemFormStorage.forEach((item) => addItemsDom(item.text));
}

//remove item from dom

function deleteitem(e) {
  if (e.target.parentElement.classList.contains("delete-btn")) {
    e.target.parentElement.parentElement.remove();
    removeItemsFromLocal(e.target.parentElement.parentElement.textContent);
  } else if (e.target.parentElement.classList.contains("list-checked")) {
    valueItemsFromLocal(e.target.parentElement.parentElement.textContent)

      const circle = e.target.parentElement.querySelector(".circled")
      const mark = e.target.parentElement.querySelector(".checked-mark")
      const par = e.target.parentElement.parentElement.querySelector("p")
  
      circle.style.backgroundImage = "linear-gradient( to right bottom,hsl(192, 100%, 67%),hsl(280, 87%, 65%))"
      mark.style.display = "block"
      par.style.textDecoration = "line-through"
      par.style.color = "var(--Dark-Grayish-Blue)"
    }
  }


// add item to local storage

function addItemsToLocal(value, text){
  let itemFormStorage;
  if (localStorage.getItem("item") === null) {
    itemFormStorage = [];
  } else {
    itemFormStorage = JSON.parse(localStorage.getItem("item"));
  }
  itemFormStorage.push({ value, text });
  localStorage.setItem("item", JSON.stringify(itemFormStorage));
}
//  get  item to local storage
function getItemsFromLocal() {
  if (localStorage.getItem("item") === null) {
    itemFormStorage = [];
  } else {
    itemFormStorage = JSON.parse(localStorage.getItem("item"));
  }
  return itemFormStorage.map((item) => item);
}

//  remove item from local storage
function removeItemsFromLocal(item) {
  let itemFormStorage = getItemsFromLocal();
  itemFormStorage = itemFormStorage.filter((items) => {
    if (items.text !== item) {
      return items;
    }
  });
  localStorage.setItem("item", JSON.stringify(itemFormStorage));
}
//  value to true from local storage
function valueItemsFromLocal(item) {
  let itemFormStorage = getItemsFromLocal();
  itemFormStorage = itemFormStorage.map((items) => {
    if (items.text === item) {
      items.value = true
    }
    return items
  });
  localStorage.setItem("item", JSON.stringify(itemFormStorage));
}

function removeFromLocal(){
  let itemFormStorage = getItemsFromLocal();
  itemFormStorage = itemFormStorage.filter((items) => {
    if (items.value !== true) {
      return items;
    }
  });
  localStorage.setItem("item", JSON.stringify(itemFormStorage));
}

function removecomplete(){
  removeFromLocal()
  
}
// ** eventlistener
itemContainer.addEventListener("click", deleteitem);
form.addEventListener("submit", onSubmit);
window.addEventListener("DOMContentLoaded", displayitem);
clearCompletebtn.addEventListener("click",removecomplete)


