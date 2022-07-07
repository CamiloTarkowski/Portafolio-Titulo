const { ipcMain, BrowserWindow } = require("electron");
const { localStorage } = require("electron-browser-storage");
const axios = require("axios");
const { Notification } = require("electron/main");

// se crea las variables para las ventanas
let mainWindow;
let newProductWindow;
let showProductWindow;
let showProductsWindow;
let editProductWindow;
let showUserWindow;
let showPopupWindow;

// se crea la funcion para crear la ventana principal
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

  // obtengo el usuario del localStorage gracias a una libreria (electron-browser-storage) ya que normalmente no se
  // puede desde aqui
  const user = await localStorage.getItem("user");

  // si no hay usuario se carga el login y si hay usuario se carga la ventana principal
  if (!user) {
    mainWindow.loadFile("views/login/login.html");
  } else {
    mainWindow.loadFile("views/menu/menu.html");
  }
};

// se crea la funion para crear la ventana de un nuevo producto
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

// se crea la funcion para crear la ventana de editar producto
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

// se crea la funcion para mostrar un producto
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

// se crea la funcion para mostrar todos los productos
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

// se crea la funcion para mostrar los usuarios
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

// se crea la funcion para mostrar el popup del calendario
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

// ipcMain.on: Se pone a escuchar los eventos que se indiquen en la funcion, cuando se escucha uno, ejecuta su codigo interno que seria esta funcion de al lado usualmente llamado callback

// Vuelve para el menu principal
ipcMain.on("go-back", () => {
  // si la ventana de mostrar productos esta abierta, se cierra
  if (showProductWindow && !showProductWindow.isDestroyed()) {
    showProductWindow.close();
  }

  // carga la ventana principal
  mainWindow.loadFile("views/menu/menu.html");
});

// Carga la info de orders.html
ipcMain.on("open-orders", () => {
  mainWindow.loadFile("views/orders/orders.html");
});

// Carga la info de products.html
ipcMain.on("open-products", async () => {
  mainWindow.loadFile("views/products/products.html");
});

// Carga la info de calendar.html
ipcMain.on("open-calendar", () => {
  mainWindow.loadFile("views/calendar/calendar.html");
});

// Carga la info de users.html
ipcMain.on("open-users", () => {
  mainWindow.loadFile("views/users/users.html");
});

// ipcMain.handle: es una funcion que se puede usar para escuchar un evento "invoke" del ipcRenderer y esta puede enviar informacion

// Trae todos los productos y se los retorna al ipcRenderer que invoco esta funcion
ipcMain.handle("load-products", async () => {
  const { data: products } = await axios.get("http://localhost:4444/products");
  return JSON.stringify(products);
});

// Trae todos los usuarios y se los retorna al ipcRenderer que invoco esta funcion
ipcMain.handle("load-users", async () => {
  const { data: users } = await axios.get("http://localhost:4444/users");
  return JSON.stringify(users);
});

// Trae todos los pedidos y se los retorna al ipcRenderer que invoco esta funcion
ipcMain.handle("load-orders", async () => {
  const { data: orders } = await axios.get("http://localhost:4444/orders");
  return JSON.stringify(orders);
});

// Trae todos los pedidos con estado "Pedido" y se los retorna al ipcRenderer que invoco esta funcion
ipcMain.handle("load-calendar-orders", async () => {
  const { data } = await axios.get("http://localhost:4444/orders");
  // filtra los pedidos con estado "Pedido"
  const orders = data.filter((order) => order.order_state.state == "Pedido");
  return JSON.stringify(orders);
});

// Abre la ventana showProductWindow y escucha el evento invoke "load-product" y recibe un id para devolverle un producto en especifico
ipcMain.on("show-product", (_, id) => {
  createShowProductWindow();
  ipcMain.handle(`load-product`, async () => {
    const { data: product } = await axios.get(
      `http://localhost:4444/products/${id}`
    );
    return JSON.stringify(product);
  });

  // esto se hace para que se pueda abrir más de una ventana de showProductWindow
  setTimeout(() => ipcMain.removeHandler("load-product"), 300);
});

// Abre la ventana showProductsWindow y escucha el evento invoke "load-products" y recibe unos ids para devolverle unos productos en especifico
ipcMain.on("show-products", (_, ids) => {
  createShowProductsWindow();
  ipcMain.handle("load-show-products", async () => {
    const { data: products } = await axios.get(
      `http://localhost:4444/products`
    );

    // filtra los productos que sean iguales a los ids que se recibieron
    const filteredProducts = products.filter((product) => {
      if (ids.includes(product.id)) {
        return product;
      }
    });

    return JSON.stringify(filteredProducts);
  });

  setTimeout(() => ipcMain.removeHandler("load-show-products"), 200);
});

// Borra un producto con el id recibido
ipcMain.on("delete-product", async (_, id) => {
  await axios.delete(`http://localhost:4444/products/${id}`);
  // recarga la ventana
  mainWindow.loadFile("views/products/products.html");

  // envia una notificación de que se borró un producto
  new Notification({
    title: "Portal admin",
    body: "Se ha eliminado el producto",
  }).show();
});

// Abre la ventana de editar un producto con el id recibido y escucha el evento invoke "load-product-data" y recibe un id para devolverle la info del producto a editar
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

// Abre la ventana new crear un producto
ipcMain.on("new-product", async () => {
  createNewProductWindow();
});

// crea un nuevo producto con los datos recibidos
ipcMain.on("add-product", async (_, products) => {
  await axios.post(`http://localhost:4444/products/${id}`, products);

  // recarga la ventana
  mainWindow.loadFile("views/products/products.html");

  // envia una notificación de que se creó un producto
  new Notification({
    title: "Portal admin",
    body: "Se ha agregado el producto",
  }).show();
});

// abre la ventana de mostrar un usuario especifico con el id recibido y escucha el evento invoke "load-user" y recibe un id para devolverle un usuario en especifico
ipcMain.on("show-user", (_, id) => {
  createShowUserWindow();
  ipcMain.handle(`load-user`, async () => {
    const { data: user } = await axios.get(`http://localhost:4444/users/${id}`);
    return JSON.stringify(user);
  });

  setTimeout(() => ipcMain.removeHandler("load-user"), 300);
});

// elimina un usuario con el id recibido
ipcMain.on("delete-user", async (_, id) => {
  await axios.delete(`http://localhost:4444/users/${id}`);
  // recarga la ventana
  mainWindow.loadFile("views/users/users.html");

  // envia una notificación de que se borró un usuario
  new Notification({
    title: "Portal admin",
    body: "Se ha borrado el usuario",
  }).show();
});

// acepta una orden con el id recibido
ipcMain.on("accept-order", async (_, id) => {
  // pasa el estado de la orden a "Pendiente"
  await axios.put(`http://localhost:4444/orders/${id}`, {
    order_state: 5,
  });

  // recarga la ventana
  mainWindow.loadFile("views/orders/orders.html");

  // envia una notificación de que se aceptó una orden
  new Notification({
    title: "Portal admin",
    body: "Se ha enviado una notificacion de aceptacion",
  }).show();

  // crea una notificación de que se aceptó una orden
  await axios.post(`http://localhost:4444/notifications`, {
    order: {
      id,
    },
    message:
      "Se ha aceptado el pedido de fabricación, proceda a la pasarela de pago y se le notificara la fecha estimada.",
  });
});

// rechaza una orden con el id recibido
ipcMain.on("decline-order", async (_, id) => {
  // pasa la orden a estado rechazado
  await axios.put(`http://localhost:4444/orders/${id}`, {
    order_state: 3,
  });

  // recarga la ventana
  mainWindow.loadFile("views/orders/orders.html");

  // envia una notificación de que se rechazó una orden
  new Notification({
    title: "Portal admin",
    body: "Se ha enviado una notificacion de rechazo",
  }).show();

  // crea una notificación de que se rechazó una orden
  await axios.post(`http://localhost:4444/notifications`, {
    order: {
      id,
    },
    message:
      "El pedido de fabricación fue rechazado por la dueña, los motivos pueden ser: No hay materiales, no hay tiempo.",
  });
});

// evento para crear notificaciones fuera de main.js
ipcMain.on("show-notification", async (_, data) => {
  new Notification({
    title: data.title,
    body: data.body,
  }).show();
});

// crear la ventana de popup del calendario y carga la data del pedido en el calendario
ipcMain.on("show-popup", async (_, schedule) => {
  createPopupWindow();
  ipcMain.handle(`load-popup-data`, () => {
    return schedule;
  });

  setTimeout(() => ipcMain.removeHandler("load-popup-data"), 300);
});

// enevto que recibe el email y contraseña del usuario para autenticarlo
ipcMain.on("login", async (_, { email, password }) => {
  if (email.length < 3 || password.length < 3) {
    // envia una notificación de que debe ingresar un email y contraseña
    new Notification({
      title: "Portal admin - Error",
      body: "Debe ingresar un email y contraseña",
    }).show();
    return;
  }

  try {
    // intenta autenticar al usuario
    const res = await axios.post(`http://localhost:4444/auth/local`, {
      identifier: email,
      password,
    });

    // si el usuario se autentico correctamente revibe un jwt (JSON WEB TOKEN) y el usuario
    const { jwt, user } = res.data;

    // se guarda el jwt y el user en el local storage
    await localStorage.setItem("jwt", jwt);
    await localStorage.setItem("user", JSON.stringify(user));

    // se carga la ventana principal
    mainWindow.loadFile("views/menu/menu.html");
  } catch (error) {
    console.log(error);

    // envia una notificación de que no se pudo autenticar por email o contraseña incorrectos
    new Notification({
      title: "Portal admin - Error",
      body: "email o contraseña incorrectos",
    }).show();
  }
});

// se exporta esta funciona para que se pueda usar en otro archivo
module.exports = {
  createMenuWindow,
};
