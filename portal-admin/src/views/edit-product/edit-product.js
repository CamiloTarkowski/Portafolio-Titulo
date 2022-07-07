const { default: axios } = require("axios");
const { ipcRenderer } = require("electron/renderer");

const main = document.querySelector(".main");

// obtiene todas las instituciones
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

    // agrega las instituciones al array
    institutionArray.push({
      name: institutions[i].name,
      id: institutions[i].id,
    });
  }

  // guarda las instituciones en el sessionStorage
  sessionStorage.setItem("institutions", JSON.stringify(institutionArray));

  // retorna el template creado
  return template;
};

// carga el producto a editar
const loadProduct = async () => {
  // obtiene la info del producto
  let product = await ipcRenderer.invoke("load-product-data");
  const institutions = await getInstitutions();
  product = JSON.parse(product);

  // crea el template para editar el producto
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

// fucnion para editar el producto
const editProduct = async (e, id) => {
  // previene la recarga de la pagina
  e.preventDefault();

  // obtiene los datos del producto
  const file = document.querySelector("#file");
  const name = document.querySelector("#name");
  const code = document.querySelector("#code");
  const description = document.querySelector("#description");
  const price = document.querySelector("#price");
  const size = document.querySelector("#size");
  const stock = document.querySelector("#stock");
  const institution = document.querySelector("#institution");

  // obtiene la opcion seleccionada en el select del html
  const selectedOption = institution.options[institution.selectedIndex].value;

  // obtiene las instituciones del sessionStorage
  const actualInstitutions = JSON.parse(sessionStorage.getItem("institutions"));

  // obtiene el id de la institucion seleccionada
  const selectedInstitution = actualInstitutions.filter((institution) => {
    if (institution.name === selectedOption) {
      return institution.id;
    }
  });

  // crea el objeto para editar el producto
  const product = {
    name: name.value,
    code: code.value,
    description: description.value,
    price: parseInt(price.value),
    size: size.value,
    stock: parseInt(stock.value),
    institution: selectedInstitution[0].id,
  };

  try {
    // actualiza el producto
    await axios.put(`http://localhost:4444/products/${id}`, product);

    // si hay una imagen seleccionada se actualiza
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
      ipcRenderer.send("show-notification", {
        title: "Portal admin",
        body: "Se ha actualizado el producto",
      });
    }

    // se recarga la pagina de porductos y el editar el producto
    ipcRenderer.send("open-products");
    ipcRenderer.send("edit-product", id);
  } catch (error) {
    ipcRenderer.send("show-notification", {
      title: "Portal admin - Error",
      body: "Ha ocurrido un error!",
    });
  }
};

// se ejecuta cuando carga la ventana
window.window.onload = async () => {
  await loadProduct();
};
