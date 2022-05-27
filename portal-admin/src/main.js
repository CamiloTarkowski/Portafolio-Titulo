const { app, BrowserWindow } = require("electron");

require("electron-reload")(__dirname);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    backgroundColor: "#6578B9",
  });

  mainWindow.loadFile("views/menu/menu.html");
};

app.whenReady().then(() => {
  createWindow();
});
