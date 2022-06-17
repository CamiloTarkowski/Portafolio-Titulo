const { Application } = require("spectron");
const assert = require("assert");
const electronPath = require("electron"); // Require Electron from the binaries included in node_modules.
const path = require("path");

describe("Application launch", function () {
  this.timeout(20000);

  it("shows an initial window", async function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, "../src/index.js")],
    });
    await this.app.start();
    const element = await this.app.client.$("#products");
    console.log(element);
    await this.app.stop();
  });
});
