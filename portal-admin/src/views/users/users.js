const { ipcRenderer } = require("electron");

const goBack = document.querySelector("#goBack");
const listUsers = document.querySelector(".list-users");

const loadUsers = async () => {
  let users = await ipcRenderer.invoke("load-users");
  users = JSON.parse(users);
  console.log(users);
  for (let i = 0; i < users.length; i++) {
    const template = `
    <div class="user">
      <img class="user__image" src="../../assets/user_circle.svg" alt="">
      <p>${users[i].username}</p>
      <p>${users[i].name}</p>
      <p>${users[i].email}</p>

      <div class="product-buttons">
        <button class="button-radius green">
          <img src="../../assets/showMore.svg"></img>
        </button>
        <button class="button-radius red">
          <img src="../../assets/trash.svg"></img>
        </button>
      </div>
    </div>
    `;

    listUsers.innerHTML += template;
  }
};

window.onload = loadUsers();

goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});
