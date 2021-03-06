const { ipcMain, BrowserWindow } = require("electron");
const { localStorage } = require("electron-browser-storage");
const axios = require("axios");
const { Notification } = require("electron/main");

let mainWindow;
let newProductWindow;
let showProductWindow;
let showProductsWindow;
let editProductWindow;
let showUserWindow;
let showPopupWindow;

const createMenuWindow = async () => {
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
    resizable: false,
  });

  const user = await localStorage.getItem("user");

  if (!user) {
    mainWindow.loadFile("views/login/login.html");
  } else {
    mainWindow.loadFile("views/menu/menu.html");
  }
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
    resizable: false,
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
    resizable: false,
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

const createPopupWindow = () => {
  showPopupWindow = new BrowserWindow({
    width: 360,
    height: 308,
    autoHideMenuBar: true,
    backgroundColor: "#6578B9",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    resizable: false,
  });

  showPopupWindow.loadFile("views/popup/popup.html");
};

ipcMain.on("go-back", () => {
  if (showProductWindow && !showProductWindow.isDestroyed()) {
    showProductWindow.close();
  }
  mainWindow.loadFile("views/menu/menu.html");
});

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

ipcMain.handle("load-products", async () => {
  const { data: products } = await axios.get("http://localhost:4444/products");
  return JSON.stringify(products);
});

ipcMain.handle("load-users", async () => {
  const { data: users } = await axios.get("http://localhost:4444/users");
  return JSON.stringify(users);
});

ipcMain.handle("load-orders", async () => {
  const { data: orders } = await axios.get("http://localhost:4444/orders");
  return JSON.stringify(orders);
});

ipcMain.handle("load-calendar-orders", async () => {
  const { data } = await axios.get("http://localhost:4444/orders");
  const orders = data.filter((order) => order.order_state.state == "Pedido");
  return JSON.stringify(orders);
});

ipcMain.on("show-product", (_, id) => {
  createShowProductWindow();
  ipcMain.handle(`load-product`, async () => {
    const { data: product } = await axios.get(
      `http://localhost:4444/products/${id}`
    );
    return JSON.stringify(product);
  });

  setTimeout(() => ipcMain.removeHandler("load-product"), 300);
});

ipcMain.on("show-products", (_, ids) => {
  createShowProductsWindow();
  ipcMain.handle("load-show-products", async () => {
    const { data: products } = await axios.get(
      `http://localhost:4444/products`
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
  await axios.delete(`http://localhost:4444/products/${id}`);
  mainWindow.loadFile("views/products/products.html");
  new Notification({
    title: "Portal admin",
    body: "Se ha eliminado el producto",
  }).show();
});

ipcMain.on("edit-product", (_, id) => {
  if (editProductWindow && !editProductWindow.isDestroyed()) {
    editProductWindow.close();
  }
  createEditProductWindow();
  ipcMain.handle(`load-product-data`, async () => {
    const { data: product } = await axios.get(
      `http://localhost:4444/products/${id}`
    );
    return JSON.stringify(product);
  });

  setTimeout(() => ipcMain.removeHandler("load-product-data"), 300);
});

ipcMain.on("new-product", async () => {
  createNewProductWindow();
});

ipcMain.on("add-product", async (_, products) => {
  await axios.post(`http://localhost:4444/products/${id}`, products);
  mainWindow.loadFile("views/products/products.html");
  new Notification({
    title: "Portal admin",
    body: "Se ha agregado el producto",
  }).show();
});

ipcMain.on("show-user", (_, id) => {
  createShowUserWindow();
  ipcMain.handle(`load-user`, async () => {
    const { data: user } = await axios.get(`http://localhost:4444/users/${id}`);
    return JSON.stringify(user);
  });

  setTimeout(() => ipcMain.removeHandler("load-user"), 300);
});

ipcMain.on("delete-user", async (_, id) => {
  await axios.delete(`http://localhost:4444/users/${id}`);
  mainWindow.loadFile("views/users/users.html");
  new Notification({
    title: "Portal admin",
    body: "Se ha borrado el usuario",
  }).show();
});

ipcMain.on("accept-order", async (_, id) => {
  await axios.put(`http://localhost:4444/orders/${id}`, {
    order_state: 2,
  });

  mainWindow.loadFile("views/orders/orders.html");
  new Notification({
    title: "Portal admin",
    body: "Se ha enviado una notificacion de aceptacion",
  }).show();

  await axios.post(`http://localhost:4444/notifications`, {
    order: {
      id,
    },
    message:
      "Se ha aceptado el pedido de fabricaci??n, proceda a la pasarela de pago y se le notificara la fecha estimada.",
  });
});

ipcMain.on("decline-order", async (_, id) => {
  await axios.put(`http://localhost:4444/orders/${id}`, {
    order_state: 3,
  });
  mainWindow.loadFile("views/orders/orders.html");
  new Notification({
    title: "Portal admin",
    body: "Se ha enviado una notificacion de rechazo",
  }).show();

  await axios.post(`http://localhost:4444/notifications`, {
    order: {
      id,
    },
    message:
      "El pedido de fabricaci??n fue rechazado por la due??a, los motivos pueden ser: No hay materiales, no hay tiempo.",
  });
});

ipcMain.on("show-notification", async (_, data) => {
  new Notification({
    title: data.title,
    body: data.body,
  }).show();
});

ipcMain.on("show-popup", async (_, schedule) => {
  createPopupWindow();
  ipcMain.handle(`load-popup-data`, () => {
    return schedule;
  });

  setTimeout(() => ipcMain.removeHandler("load-popup-data"), 300);
});

ipcMain.on("login", async (_, { email, password }) => {
  if (email.length < 3 || password.length < 3) {
    new Notification({
      title: "Portal admin - Error",
      body: "Debe ingresar un email y contrase??a",
    }).show();
    return;
  }

  try {
    const res = await axios.post(`http://localhost:4444/auth/local`, {
      identifier: email,
      password,
    });

    const { jwt, user } = res.data;
    await localStorage.setItem("jwt", jwt);
    await localStorage.setItem("user", JSON.stringify(user));

    mainWindow.loadFile("views/menu/menu.html");
  } catch (error) {
    console.log(error);
    new Notification({
      title: "Portal admin - Error",
      body: "email o contrase??a incorrectos",
    }).show();
  }
});

module.exports = {
  createMenuWindow,
};
