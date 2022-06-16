const { ipcMain, BrowserWindow } = require("electron");
const axios = require("axios");

let mainWindow;
let newProductWindow;
let showProductWindow;
let showProductsWindow;
let editProductWindow;
let showUserWindow;

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
    height: 700,
    autoHideMenuBar: true,
    backgroundColor: "#6578B9",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  newProductWindow.loadFile("views/new-product/new-product.html");
};

const createEditProductWindow = () => {
  editProductWindow = new BrowserWindow({
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

  editProductWindow.loadFile("views/edit-product/edit-product.html");
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

  showProductWindow.loadFile("views/show-product/show-product.html");
};

const createShowProductsWindow = () => {
  showProductsWindow = new BrowserWindow({
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

  showProductsWindow.loadFile("views/show-products/show-products.html");
};

const createShowUserWindow = () => {
  showUserWindow = new BrowserWindow({
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

  showUserWindow.loadFile("views/show-user/show-user.html");
};

ipcMain.on("go-back", () => {
  if (showProductWindow && !showProductWindow.isDestroyed()) {
    showProductWindow.close();
  }
  mainWindow.loadFile("views/menu/menu.html");
});

// OPEN WINDOWS
ipcMain.on("open-orders", () => {
  mainWindow.loadFile("views/orders/orders.html");
});

ipcMain.on("open-products", async () => {
  mainWindow.loadFile("views/products/products.html");
});

ipcMain.on("open-calendar", () => {
  mainWindow.loadFile("views/calendar/calendar.html");
});

ipcMain.on("open-users", () => {
  mainWindow.loadFile("views/users/users.html");
});

// LOAD DATA
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

// ACTIONS
ipcMain.on("show-product", (_, id) => {
  createShowProductWindow();
  ipcMain.handle(`load-product`, async () => {
    const { data: product } = await axios.get(
      `http://localhost:1337/products/${id}`
    );
    return JSON.stringify(product);
  });

  setTimeout(() => ipcMain.removeHandler("load-product"), 300);
});

ipcMain.on("show-products", (_, ids) => {
  createShowProductsWindow();
  ipcMain.handle("load-show-products", async () => {
    const { data: products } = await axios.get(
      `http://localhost:1337/products`
    );

    const filteredProducts = products.filter((product) => {
      if (ids.includes(product.id)) {
        return product;
      }
    });

    return JSON.stringify(filteredProducts);
  });

  setTimeout(() => ipcMain.removeHandler("load-show-products"), 200);
});

ipcMain.on("delete-product", async (_, id) => {
  await axios.delete(`http://localhost:1337/products/${id}`);
  mainWindow.loadFile("views/products/products.html");
});

ipcMain.on("edit-product", (_, id) => {
  if (editProductWindow && !editProductWindow.isDestroyed()) {
    console.log("aaa");
    editProductWindow.close();
  }
  createEditProductWindow();
  ipcMain.handle(`load-product-data`, async () => {
    const { data: product } = await axios.get(
      `http://localhost:1337/products/${id}`
    );
    return JSON.stringify(product);
  });

  setTimeout(() => ipcMain.removeHandler("load-product-data"), 300);
});

ipcMain.on("new-product", async () => {
  createNewProductWindow();
});

ipcMain.on("add-product", async (event, products) => {
  await axios.post(`http://localhost:1337/products/${id}`, products);
  mainWindow.loadFile("views/products/products.html");
});

ipcMain.on("show-user", (_, id) => {
  createShowUserWindow();
  ipcMain.handle(`load-user`, async () => {
    const { data: user } = await axios.get(`http://localhost:1337/users/${id}`);
    return JSON.stringify(user);
  });

  setTimeout(() => ipcMain.removeHandler("load-user"), 300);
});

ipcMain.on("delete-user", async (_, id) => {
  await axios.delete(`http://localhost:1337/users/${id}`);
  mainWindow.loadFile("views/users/users.html");
});

module.exports = {
  createMenuWindow,
};
