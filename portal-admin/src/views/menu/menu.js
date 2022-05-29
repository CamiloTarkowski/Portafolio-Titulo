/* const button = document.querySelector("#button");
const container = document.querySelector(".container");

button.addEventListener("click", async (e) => {
  e.preventDefault();
  const rawOrders = await fetch("http://localhost:1337/orders", {
    method: "GET",
  });

  let orders = await rawOrders.json();

  console.log(orders.length);
  const templates = [];

  container.style.display = "flex";
  for (let i = 0; i < orders.length; i++) {
    currentOrder = orders[i];

    templates.push(`
      <div>
        <span class="row"><strong>Nombres y apellidos del cliente:</strong> ${
          currentOrder.client.name
        } ${currentOrder.client.lastname} ${
      currentOrder.client.sec_lastname
    }</span>
        <span class="row"><strong>Id de pedido:</strong>  ${
          currentOrder.id
        }</span>
        <span class="row"><strong>Direccion:</strong>  ${
          currentOrder.delivery_method.address
        }</span>
        <span class="row"><strong>Rut:</strong>  ${
          currentOrder.client.rut
        }</span>
        <span class="row"><strong>Codigo Producto:</strong>  ${
          currentOrder.products[0].code
        }</span>
        <span class="row"><strong>Abono:</strong>  ${
          currentOrder.first_pay
        }</span>
        <span class="row"><strong>Cantidad:</strong>  ${
          currentOrder.products.length
        }</span>
        <span class="row"><strong>Fecha de creacion del pedido:</strong>  ${new Date(
          currentOrder.created_at
        ).toLocaleString()}</span>
      </div>
    `);
  }

  container.innerHTML = `${templates}`;
});
 */

const { ipcRenderer } = require("electron");

const ordersButton = document.querySelector("#orders");
const productsButton = document.querySelector("#products");
const usersButton = document.querySelector("#users");
const reportButton = document.querySelector("#report");

ordersButton.addEventListener("click", () => {
  ipcRenderer.send("open-orders");
});

productsButton.addEventListener("click", () => {
  ipcRenderer.send("open-products");
});

usersButton.addEventListener("click", () => {
  ipcRenderer.send("open-users");
});

reportButton.addEventListener("click", () => {
  ipcRenderer.send("open-report");
});
