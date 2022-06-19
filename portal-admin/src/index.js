const { app } = require("electron");
const { createMenuWindow } = require("./main");
const { localStorage } = require("electron-browser-storage");
const axios = require("axios");
require("electron-reload")(__dirname);
require("dotenv").config();

const storeJwt = async () => {
  try {
    const res = await axios.post(`http://localhost:4444/auth/local`, {
      identifier: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });

    const { jwt, user } = res.data;
    await localStorage.setItem("jwt", jwt);
    await localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

app.whenReady().then(async () => {
  await storeJwt();
  createMenuWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
