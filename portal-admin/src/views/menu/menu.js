const { ipcRenderer } = require("electron");

const ordersButton = document.querySelector("#orders");
const productsButton = document.querySelector("#products");
const usersButton = document.querySelector("#users");
const reportButton = document.querySelector("#report");

ordersButton.addEventListener("click", () => {
  ipcRenderer.send("open-orders");
});

productsButton.addEventListener("click", () => {
  ipcRenderer.send("open-products");
});

usersButton.addEventListener("click", () => {
  ipcRenderer.send("open-users");
});

reportButton.addEventListener("click", () => {
  ipcRenderer.send("open-report");
});
