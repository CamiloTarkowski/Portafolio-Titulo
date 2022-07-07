const { app } = require("electron");
const { createMenuWindow } = require("./main");
require("electron-reload")(__dirname);

// COMO FUNCIONA ELECTRON:
// Electron funciona a traves de una arquitectura de eventos.
// hay dos tipos de eventos: ipcMain y ipcRenderer
// ipcMain: es un evento que se ejecuta en el proceso principal (el proceso que ejecuta el electron)
// ipcRenderer: es un evento que se ejecuta en el proceso de renderizado (el proceso que ejecuta el navegador)
// en esta aplicacion basicamente ipcRender se ocupa fuera del archivo main.js
// ipcMain se ocupa dentro del archivo main.js

// crea la ventana principal cuando la aplicacion se inicia
app.whenReady().then(() => {
  createMenuWindow();
});

// cierra la aplicacion cuando la ventana principal se cierra
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
