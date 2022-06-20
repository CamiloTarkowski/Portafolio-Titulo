const { ipcRenderer } = require("electron");

const goBack = document.querySelector("#goBack");
const listOrders = document.querySelector(".list-orders");

const loadOrders = async () => {
  let orders = await ipcRenderer.invoke("load-orders");
  orders = JSON.parse(orders);
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].order_state.state === "Pedido") continue;

    console.log(orders[i]);

    const template = `
    <div class="order">
      <div class="row-title-container">
        <span class="row-title">${orders[i].client.name} ${
      orders[i].client.lastname
    } ${orders[i].client.sec_lastname}</span>
      </div>
      <div class="light">
        <p class="row">Id pedido:</p>
        <p class="row">${orders[i].id}</p>
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
        <p class="row">${showProductsCode(orders[i].order_products)}</p>
      </div>
      <div class="dark">
        <p class="row">Fecha:</p>
        <p class="row">${formatDate(orders[i].created_at)}</p>
      </div>
      <div class="light">
        <p class="row">Total:</p>
        <p class="row">$${parseInt(orders[i].total).toLocaleString("es-ES")}</p>
      </div>
      <div class="orders-buttons">
        <button type="button" class="button green" onclick="accept(${
          orders[i].id
        })">Aceptar</button>
        <button type="button" class="button red" onclick="decline(${
          orders[i].id
        })">Rechazar</button>
        <button type="button" class="button blue" onclick="showProduct(${orders[
          i
        ].order_products.map((order_product) => order_product.product.id)})">${
      orders[i].order_products.length > 1 ? "Ver productos" : "Ver producto"
    }</button>
      </div>
    </div>
    `;

    listOrders.innerHTML += template;
  }
};

window.onload = async () => await loadOrders();

goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});

const showProductsCode = (order_products) => {
  const codes = order_products.map(
    (order_product) => `${order_product.product.code} (${order_product.amount})`
  );

  return codes.join(", ");
};

const formatDate = (date) => {
  const DATE_INDEX = 0;
  const newDate = date.split(10)[DATE_INDEX];
  const day = newDate[8] + newDate[9];
  const month = newDate[5] + newDate[6];
  const year = newDate[0] + newDate[3];
  return `${day}/${month}/${year}`;
};

const showProduct = async (...ids) => {
  ipcRenderer.send("show-products", ids);
};

const accept = async (id) => {
  ipcRenderer.send("accept-order", id);
};

const decline = async (id) => {
  ipcRenderer.send("decline-order", id);
};
