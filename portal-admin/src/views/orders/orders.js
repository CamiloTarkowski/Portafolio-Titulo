const { ipcRenderer } = require("electron");

const goBack = document.querySelector("#goBack");

goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});
