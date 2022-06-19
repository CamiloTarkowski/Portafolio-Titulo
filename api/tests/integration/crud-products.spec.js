import axios from "axios";

describe("crud products integration test", () => {
  test("get all of products", async () => {
    const { status, data } = await axios.get("http://localhost:4444/products");
    expect(status).toBe(200);
    console.log(data);
  });

  test("get a specific product", async () => {
    const { status, data } = await axios.get(
      `http://localhost:4444/products/1`
    );
    expect(status).toBe(200);
    console.log(data);
  });

  test("create a product", async () => {
    const { status } = await axios.post("http://localhost:4444/products", {
      code: "JAHJD",
      name: "boston college",
      price: 5000,
      stock: 4,
      description: "dassfsd",
      amount: 1,
      institution: 1,
    });

    expect(status).toBe(200);
  });

  test("update a product", async () => {
    const { status } = await axios.put(`http://localhost:4444/products/12`, {
      code: "HCGHSF",
      name: "dwdwdaw",
      price: 1000,
      stock: 4,
      description: "dassfsd",
      amount: 3,
      institution: 1,
    });

    expect(status).toBe(200);
  });

  test.only("delete a product", async () => {
    const { status } = await axios.delete(`http://localhost:4444/products/12`);

    expect(status).toBe(200);
  });
});
