const { ipcRenderer } = require("electron");
const loginButton = document.querySelector("#loginButton");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// escucha el evento click del boton de login
loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // envia el email y password al main.js a traves del evento "login"
  ipcRenderer.send("login", {
    email: email.value,
    password: password.value,
  });
});
