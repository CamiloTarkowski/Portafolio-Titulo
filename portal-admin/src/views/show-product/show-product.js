const { ipcRenderer } = require("electron/renderer");

const main = document.querySelector(".main");

// carga el producto a mostrar
const loadProduct = async () => {
  let product = await ipcRenderer.invoke("load-product");
  product = JSON.parse(product);

  const template = `
  <div class="show-product">
    <h2>${product.name}</h2>
    <img class="show-product__image" src="http://localhost:4444${
      product.image.url
    }" alt="${product.name}">
    <div class="show-product__text">
      <p>Codigo: ${product.code}</p>
    </div>
    <div class="show-product__text">
      <p>Descripción: ${product.description}</p>
    </div>
    <div class="show-product__text">
      <p>Precio: $${parseInt(product.price).toLocaleString("es-ES")}</p>
    </div>
    <div class="show-product__text">
      <p>Talla: ${product.size}</p>
    </div>
    <div class="show-product__text">
      <p>Stock: ${product.stock}</p>
    </div>
    <div class="show-product__text">
      <p>Institución: ${product.institution.name}</p>
    </div>
   
  </div>
  `;

  main.innerHTML += template;
};

window.onload = loadProduct();
