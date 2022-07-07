const { ipcRenderer } = require("electron");

const goBack = document.querySelector("#goBack");
const listUsers = document.querySelector(".list-users");

// carga todos los usuarios a mostrar
const loadUsers = async () => {
  let users = await ipcRenderer.invoke("load-users");
  users = JSON.parse(users);

  for (let i = 0; i < users.length; i++) {
    const template = `
    <div class="user">
      <img class="user__image" src="../../assets/user_circle.svg" alt="">
      <p>${users[i].username}</p>
      <p>${users[i].name}</p>
      <p>${users[i].email}</p>

      <div class="product-buttons">
        <button class="button-radius green" onclick="showUser(event, ${users[i].id})">
          <img src="../../assets/showMore.svg"></img>
        </button>
        <button class="button-radius red" onclick="deleteUser(event, ${users[i].id})">
          <img src="../../assets/trash.svg"></img>
        </button>
      </div>
    </div>
    `;

    listUsers.innerHTML += template;
  }
};

// elimina el usuario seleccionado en el main.js por medio de un evento "delete-user" y se envia el id del usuario y se recarga la ventana
const deleteUser = (e, id) => {
  e.preventDefault();
  ipcRenderer.send("delete-user", id);
};

// muestra el usuario seleccionado en el main.js por medio de un evento "show-user" y se envia el id del usuario
const showUser = (e, id) => {
  e.preventDefault();
  ipcRenderer.send("show-user", id);
};

window.onload = loadUsers();

goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});
