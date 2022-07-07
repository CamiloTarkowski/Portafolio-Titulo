const { ipcRenderer } = require("electron");

const goBack = document.querySelector("#goBack");
const addProduct = document.querySelector("#addProduct");
const listProducts = document.querySelector(".list-products");

const loadProducts = async () => {
  let products = await ipcRenderer.invoke("load-products");
  products = JSON.parse(products);
  for (let i = 0; i < products.length; i++) {
    const template = `
    <div class="product">
      <img class="product__image" src="http://localhost:4444${
        products[i].image.url
      }" alt="${products[i].name}">
      <p>${products[i].name}</p>
      <p>${products[i].code}</p>
      <p>$${parseInt(products[i].price).toLocaleString("es-ES")}</p>
      <p>${products[i].size}</p>
      <p>${products[i].stock}</p>
      <p>${products[i].institution.name}</p>
      <div class="product-buttons">
        <button class="button-radius blue" onclick="editProduct(${
          products[i].id
        })">
          <img src="../../assets/edit.svg"></img>
        </button>
        <button class="button-radius green" onclick="showProduct(${
          products[i].id
        })">
          <img src="../../assets/showMore.svg"></img>
        </button>
        <button class="button-radius red" onclick="deleteProduct(${
          products[i].id
        })">
          <img src="../../assets/trash.svg"></img>
        </button>
      </div>
    </div>
    `;

    listProducts.innerHTML += template;
  }
};

window.onload = async () => await loadProducts();

const showProduct = async (id) => {
  ipcRenderer.send("show-product", id);
};

const deleteProduct = async (id) => {
  ipcRenderer.send("delete-product", id);
  loadProducts();
};

const editProduct = async (id) => {
  ipcRenderer.send("edit-product", id);
};

goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});

addProduct.addEventListener("click", () => {
  ipcRenderer.send("new-product");
});
