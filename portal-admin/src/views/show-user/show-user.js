const { ipcRenderer } = require("electron/renderer");

const main = document.querySelector(".main");

const loadUser = async () => {
  let user = await ipcRenderer.invoke("load-user");
  user = JSON.parse(user);

  const template = `
  <div class="show-user">
    <h2>${user.name} ${user.lastname} ${user.sec_lastname}</h2>
    <img
      class="show-user__image"
      src="../../assets/user_circle.svg"
      alt="user icon"
    />
    <div class="show-user__text">
      <p>Nombre de usuario: ${user.username}</p>
    </div>
    <div class="show-user__text">
      <p>Email: ${user.email}</p>
    </div>
    <div class="show-user__text">
      <p>Rut: ${user.rut}</p>
    </div>
    <div class="show-user__text">
      <p>Telefono: ${user.number}</p>
    </div>
    <div class="show-user__text">
      <p>Dirección: ${user.address}</p>
    </div>

  </div>
  `;

  main.innerHTML += template;
};

window.onload = async () => await loadUser();
