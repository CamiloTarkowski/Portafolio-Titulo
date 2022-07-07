const { default: axios } = require("axios");
const { ipcRenderer } = require("electron/renderer");

const file = document.querySelector("#file");
const name = document.querySelector("#name");
const code = document.querySelector("#code");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const size = document.querySelector("#size");
const stock = document.querySelector("#stock");
const institution = document.querySelector("#institution");
const addProduct = document.querySelector("#addProduct");
const manufacturingTime = document.querySelector("#manufacturingTime");

// escucha el evento click del boton de agregar producto
addProduct.addEventListener("click", async (e) => {
  e.preventDefault();

  // se obtiene la option seleccionada en el select de institucion
  const selectedOption = institution.options[institution.selectedIndex].value;

  // se obtiene las instituciones del sessionStorage
  const actualInstitutions = JSON.parse(sessionStorage.getItem("institutions"));

  // se obtiene el id de la institucion seleccionada
  const selectedInstitution = actualInstitutions.filter((institution) => {
    if (institution.name === selectedOption) {
      return institution.id;
    }
  });

  // se crea el objeto para agregar el producto
  const product = {
    name: name.value,
    code: code.value,
    description: description.value,
    price: parseInt(price.value),
    size: size.value,
    stock: parseInt(stock.value),
    institution: selectedInstitution[0].id,
    manufacturing_time: manufacturingTime.value,
  };

  try {
    // crea el producto en la base de datos y strapi
    const { data } = await axios.post(
      "http://localhost:4444/products",
      product
    );

    // crea el archivo de imagen en el strapi y la sube
    const formData = new FormData();
    formData.append("files", file.files[0], file.files[0].name);
    formData.append("refId", data.id);
    formData.append("ref", "Products");
    formData.append("field", "image");
    await axios.post("http://localhost:4444/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    // recarga la pagina
    ipcRenderer.send("open-products");
  } catch (error) {
    console.log(error);
  }
});

// obtiene todas las instituciones (más detalle en edit-product.js es casi lo mismo que aca)
const getInstitution = async () => {
  const { data: institutions } = await axios.get(
    "http://localhost:4444/institutions"
  );

  const institutionNamesArray = [];

  for (let i = 0; i < institutions.length; i++) {
    const template = `
      <option value="${institutions[i].name}">${institutions[i].name}</option>
    `;
    institutionNamesArray.push({
      name: institutions[i].name,
      id: institutions[i].id,
    });
    institution.innerHTML += template;
  }

  sessionStorage.setItem("institutions", JSON.stringify(institutionNamesArray));
};

window.onload = getInstitution();
