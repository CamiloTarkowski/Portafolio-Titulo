const { ipcRenderer } = require("electron/renderer");

const main = document.querySelector(".main");

// TODO: mostrar si es que tiene más de un codigo de producto diferente una slider de productos horziontalmente y mostrar la cantidad que pidieron de ese producto

/* const loadProduct = async () => {
  let product = await ipcRenderer.invoke("load-product");
  product = JSON.parse(product);

  const template = `
  <div class="show-product">
    <h2>${product.name}</h2>
    <img class="show-product__image" src="http://localhost:1337${product.image.url}" alt="${product.name}">
    <div class="show-product__text">
      <p>Codigo: ${product.code}</p>
    </div>
    <div class="show-product__text">
      <p>Descripción: ${product.description}</p>
    </div>
    <div class="show-product__text">
      <p>Precio: $${product.price}</p>
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

  ipcRenderer.send("close-product");
  main.innerHTML += template;
};

window.onload = loadProduct();
 */
