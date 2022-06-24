const { default: axios } = require("axios");
const { ipcRenderer } = require("electron");

const ordersButton = document.querySelector("#orders");
const productsButton = document.querySelector("#products");
const usersButton = document.querySelector("#users");
const calendarButton = document.querySelector("#calendar");
const report = document.querySelector("#report");

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

report.addEventListener("click", async () => {
  await axios.post("http://localhost:4444/api/report");
  ipcRenderer.send("show-notification", {
    title: "Portal admin",
    body: "Reporte de ventas generado",
  });
});
