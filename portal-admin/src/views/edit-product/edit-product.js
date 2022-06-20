const { default: axios } = require("axios");
const { ipcRenderer } = require("electron/renderer");

const main = document.querySelector(".main");

const getInstitutions = async () => {
  const { data: institutions } = await axios.get(
    "http://localhost:4444/institutions"
  );

  const institutionArray = [];
  let template = "";

  for (let i = 0; i < institutions.length; i++) {
    template = template += `
      <option value="${institutions[i].name}">${institutions[i].name}</option>
    `;

    institutionArray.push({
      name: institutions[i].name,
      id: institutions[i].id,
    });
  }

  sessionStorage.setItem("institutions", JSON.stringify(institutionArray));

  return template;
};

const loadProduct = async () => {
  let product = await ipcRenderer.invoke("load-product-data");
  const institutions = await getInstitutions();
  product = JSON.parse(product);

  const template = `
  <form class="form">
    <img class="edit-product__image" src="http://localhost:4444${product.image.url}" alt="${product.name}" >
    <input
      class="form__input file"
      id="file"
      type="file"
      value="http://localhost:4444${product.image.url}"
      accept="image/png/jpg"
    />
    <input
      class="form__input"
      id="name"
      value="${product.name}"
      type="text"
      placeholder="Nombre"
      required
    />
    <input
      class="form__input"
      id="code"
      value="${product.code}"
      type="text"
      placeholder="Codigo"
      required
    />
    <input
      class="form__input"
      id="description"
      type="text"
      value="${product.description}"
      placeholder="Descripcion"
      required
    />
    <input
      class="form__input"
      id="price"
      type="number"
      value="${product.price}"
      placeholder="Precio"
      required
    />
    <input
      class="form__input"
      id="size"
      value="${product.size}"
      type="text"
      placeholder="Talla"
      required
    />
    <input
      class="form__input"
      id="stock"
      type="number"
      value="${product.stock}"
      placeholder="Stock"
      required
    />
    <select class="form__select" id="institution">
      ${institutions}
    </select>
    <button class="button green" onclick="editProduct(event, ${product.id})">Editar producto</button>
  </form>

 
  `;

  main.innerHTML += template;
};

const editProduct = async (e, id) => {
  e.preventDefault();
  const file = document.querySelector("#file");
  const name = document.querySelector("#name");
  const code = document.querySelector("#code");
  const description = document.querySelector("#description");
  const price = document.querySelector("#price");
  const size = document.querySelector("#size");
  const stock = document.querySelector("#stock");
  const institution = document.querySelector("#institution");

  const selectedOption = institution.options[institution.selectedIndex].value;
  const actualInstitutions = JSON.parse(sessionStorage.getItem("institutions"));
  // if (actualInstitutions.includes(selectedOption)) {
  // }
  const selectedInstitution = actualInstitutions.filter((institution) => {
    if (institution.name === selectedOption) {
      return institution.id;
    }
  });

  const product = {
    name: name.value,
    code: code.value,
    description: description.value,
    price: parseInt(price.value),
    size: size.value,
    stock: parseInt(stock.value),
    institution: selectedInstitution[0].id,
  };

  console.log(product.id);

  try {
    const { data } = await axios.put(
      `http://localhost:4444/products/${id}`,
      product
    );
    if (file.files.length != 0) {
      const formData = new FormData();
      formData.append("files", file.files[0], file.files[0].name);
      formData.append("refId", id);
      formData.append("ref", "Products");
      formData.append("field", "image");
      await axios.post("http://localhost:4444/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      new Notification({
        title: "Portal admin",
        body: "Se ha actualizado el producto",
      }).show();
    }
    ipcRenderer.send("open-products");
    ipcRenderer.send("edit-product", id);
  } catch (error) {
    console.log(error);
    new Notification({
      title: "Portal admin",
      body: "Ha ocurrido un error!",
    }).show();
  }
};

window.window.onload = async () => {
  await loadProduct();
};
