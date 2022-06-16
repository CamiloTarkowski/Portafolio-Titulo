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

addProduct.addEventListener("click", async (e) => {
  e.preventDefault();

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

  try {
    const { data } = await axios.post(
      "http://localhost:1337/products",
      product
    );
    const formData = new FormData();
    formData.append("files", file.files[0], file.files[0].name);
    formData.append("refId", data.id);
    formData.append("ref", "Products");
    formData.append("field", "image");
    await axios.post("http://localhost:1337/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    ipcRenderer.send("open-products");
  } catch (error) {
    console.log(error);
  }
});

const getInstitution = async () => {
  const { data: institutions } = await axios.get(
    "http://localhost:1337/institutions"
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
