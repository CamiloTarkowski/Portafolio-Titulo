const { app } = require("electron");
const { createMenuWindow } = require("./main");
require("electron-reload")(__dirname);

app.whenReady().then(createMenuWindow);
