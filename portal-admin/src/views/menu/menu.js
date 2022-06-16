const { ipcRenderer } = require("electron");

const ordersButton = document.querySelector("#orders");
const productsButton = document.querySelector("#products");
const usersButton = document.querySelector("#users");
const calendarButton = document.querySelector("#calendar");

ordersButton.addEventListener("click", () => {
  ipcRenderer.send("open-orders");
});

productsButton.addEventListener("click", () => {
  ipcRenderer.send("open-products");
});

usersButton.addEventListener("click", () => {
  ipcRenderer.send("open-users");
});

calendarButton.addEventListener("click", () => {
  ipcRenderer.send("open-calendar");
});
