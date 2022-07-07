const { ipcRenderer } = require("electron");
const loginButton = document.querySelector("#loginButton");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  ipcRenderer.send("login", {
    email: email.value,
    password: password.value,
  });
});
