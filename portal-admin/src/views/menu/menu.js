const { default: axios } = require("axios");
const { ipcRenderer } = require("electron");

const ordersButton = document.querySelector("#orders");
const productsButton = document.querySelector("#products");
const usersButton = document.querySelector("#users");
const calendarButton = document.querySelector("#calendar");
const report = document.querySelector("#report");

// escucha el evento click del boton de los botones del menu para enviar un evento y asi cargar el html de estos en la
// ventana principal
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

// escucha el evento click en el boton de reportes y genera el reportes cuando se hace click
report.addEventListener("click", async () => {
  await axios.post("http://localhost:4444/api/report");
  ipcRenderer.send("show-notification", {
    title: "Portal admin",
    body: "Reporte de ventas generado",
  });
});
