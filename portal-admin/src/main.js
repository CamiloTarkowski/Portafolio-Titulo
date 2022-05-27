const { ipcMain, BrowserWindow } = require("electron");

let mainWindow;

const createMenuWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    backgroundColor: "#6578B9",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile("views/menu/menu.html");
};

ipcMain.on("go-back", () => {
  mainWindow.loadFile("views/menu/menu.html");
});

ipcMain.on("open-orders", () => {
  mainWindow.loadFile("views/orders/orders.html");
});

ipcMain.on("open-products", () => {
  mainWindow.loadFile("views/products/products.html");
});

ipcMain.on("open-report", () => {
  mainWindow.loadFile("views/reports/reports.html");
});

ipcMain.on("open-users", () => {
  mainWindow.loadFile("views/users/users.html");
});

module.exports = {
  createMenuWindow,
};
