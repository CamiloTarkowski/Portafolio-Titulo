const { ipcMain, BrowserWindow } = require("electron");
const axios = require("axios");

let mainWindow;
let newProductWindow;
let showProductWindow;

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

const createNewProductWindow = () => {
  newProductWindow = new BrowserWindow({
    width: 450,
    height: 800,
    autoHideMenuBar: true,
    backgroundColor: "#6578B9",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  newProductWindow.loadFile("views/show-product/show-product.html");
};

const createShowProductWindow = () => {
  showProductWindow = new BrowserWindow({
    width: 450,
    height: 800,
    autoHideMenuBar: true,
    backgroundColor: "#6578B9",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    resizable: false,
  });
};

const createShowProductsWindow = () => {
  showProductWindow = new BrowserWindow({
    width: 450,
    height: 800,
    autoHideMenuBar: true,
    backgroundColor: "#6578B9",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    resizable: false,
  });

  showProductWindow.loadFile("views/show-products/show-products.html");
};

ipcMain.on("go-back", () => {
  mainWindow.loadFile("views/menu/menu.html");
});

ipcMain.on("open-orders", () => {
  mainWindow.loadFile("views/orders/orders.html");
});

ipcMain.on("open-products", async () => {
  mainWindow.loadFile("views/products/products.html");
});

ipcMain.on("open-report", () => {
  mainWindow.loadFile("views/reports/reports.html");
});

ipcMain.on("open-users", () => {
  mainWindow.loadFile("views/users/users.html");
});

ipcMain.handle("load-products", async () => {
  const { data: products } = await axios.get("http://localhost:1337/products");
  return JSON.stringify(products);
});

ipcMain.handle("load-users", async () => {
  const { data: users } = await axios.get("http://localhost:1337/users");
  return JSON.stringify(users);
});

ipcMain.handle("load-orders", async () => {
  const { data: orders } = await axios.get("http://localhost:1337/orders");
  return JSON.stringify(orders);
});

ipcMain.on("show-product", (_, id) => {
  createShowProductWindow();
  ipcMain.handle(`load-product`, async () => {
    const { data: product } = await axios.get(
      `http://localhost:1337/products/${id}`
    );
    return JSON.stringify(product);
  });

  setTimeout(() => ipcMain.removeHandler("load-product"), 200);
});

ipcMain.on("new-product", () => {
  createNewProductWindow();
});

module.exports = {
  createMenuWindow,
};
