const { ipcRenderer } = require("electron/renderer");

const main = document.querySelector(".main");

const loadProducts = async () => {
  let products = await ipcRenderer.invoke("load-show-products");
  products = JSON.parse(products);
  products = products.map((product) => {
    product.amount = 1;

    return product;
  });
  // products = calculateAmountOfProducts(JSON.parse(products));

  for (let i = 0; i < products.length; i++) {
    const template = `
    <div class="show-product">
      <h2>${products[i].name}</h2>
      <img class="show-product__image" src="http://localhost:4444${products[i].image.url}" alt="${products[i].name}">
      <div class="show-product__text">
        <p>Codigo: ${products[i].code}</p>
      </div>
      <div class="show-product__text">
        <p>Descripción: ${products[i].description}</p>
      </div>
      <div class="show-product__text">
        <p>Precio: $${products[i].price}</p>
      </div>
      <div class="show-product__text">
        <p>Talla: ${products[i].size}</p>
      </div>
      <div class="show-product__text">
        <p>Stock: ${products[i].stock}</p>
      </div>
  
      <div class="show-product__text">
        <p>Institución: ${products[i].institution.name}</p>
      </div>
    
    </div>
    
    `;

    main.innerHTML += template;
  }
};

window.onload = loadProducts();
