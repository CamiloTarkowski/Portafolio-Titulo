const { app } = require("electron");
const { createMenuWindow } = require("./main");
require("electron-reload")(__dirname);
require("dotenv").config();

app.whenReady().then(() => {
  createMenuWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
