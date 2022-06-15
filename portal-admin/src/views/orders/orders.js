const { ipcRenderer } = require("electron");

const goBack = document.querySelector("#goBack");
const listOrders = document.querySelector(".list-orders");

const loadOrders = async () => {
  let orders = await ipcRenderer.invoke("load-orders");
  orders = JSON.parse(orders);
  console.log(orders);
  for (let i = 0; i < orders.length; i++) {
    const template = `
    <div class="order">
      <div class="row-title-container">
        <span class="row-title">${orders[i].client.name} ${
      orders[i].client.lastname
    } ${orders[i].client.sec_lastname}</span>
      </div>
      <div class="light">
        <p class="row">Id pedido:</p>
        <p class="row">${orders[i].client.id}</p>
      </div>
      <div class="dark">
        <p class="row">Direccion:</p>
        <p class="row">${orders[i].client.address}</p>
      </div>
      <div class="light">
        <p class="row">Telefono:</p>
        <p class="row">${orders[i].client.number}</p>
      </div>
      <div class="dark">
        <p class="row">Rut:</p>
        <p class="row">${orders[i].client.rut}</p>
      </div>
      <div class="light">
        <p class="row">Codigo(s) producto(s):</p>
        <p class="row">${showProductsCode(orders[i].products)}</p>
      </div>
      <div class="dark">
        <p class="row">Fecha:</p>
        <p class="row">${formatDate(orders[i].created_at)}</p>
      </div>
      <div class="light">
        <p class="row">Total:</p>
        <p class="row">$${orders[i].total}</p>
      </div>
      <div class="orders-buttons">
        <button class="button green">Aceptar</button>
        <button class="button red">Eliminar</button>
        <button class="button blue" onclick="showProduct(${
          orders[i].products[0].id
        })">Ver producto</button>
      </div>
    </div>
    `;

    listOrders.innerHTML += template;
  }
};

window.onload = loadOrders();

goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});

const showProductsCode = (products) => {
  const codesSet = new Set(products.map((product) => product.code));
  return Array.from(codesSet).join(", ");
};

const formatDate = (date) => {
  const DATE_INDEX = 0;
  const newDate = date.split(10)[DATE_INDEX];
  const day = newDate[8] + newDate[9];
  const month = newDate[5] + newDate[6];
  const year = newDate[0] + newDate[3];
  return `${day}/${month}/${year}`;
};

const showProducts = async (id) => {};
