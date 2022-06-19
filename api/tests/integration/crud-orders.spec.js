import axios from "axios";

describe("crud orders integration test", () => {
  test("get all of orders", async () => {
    const { status, data } = await axios.get("http://localhost:4444/orders");
    expect(status).toBe(200);
    console.log(data);
  });

  test("get a specific order", async () => {
    const { status, data } = await axios.get(`http://localhost:4444/orders/1`);
    expect(status).toBe(200);
    console.log(data);
  });

  test("create a order", async () => {
    const { data: dataMethod } = await axios.post(
      "http://localhost:4444/delivery-methods",
      {
        name: "joselito",
        address: "mi casa 1111",
      }
    );
    const { status } = await axios.post("http://localhost:4444/orders", {
      total: 15000,
      first_pay: 5000,
      final_pay: 9000,
      tax: 1000,
      order_state: 1,
      delivery_method: {
        id: dataMethod.id,
      },
      client: {
        id: 4,
      },
      products: {
        id: 1,
      },
    });

    expect(status).toBe(200);
  });

  test("update a order", async () => {
    const { status } = await axios.put(`http://localhost:4444/orders/1`, {
      total: 29000,
      first_pay: 8000,
      final_pay: 20000,
      tax: 100000,
    });

    expect(status).toBe(200);
  });

  test.only("delete a order", async () => {
    const { status } = await axios.delete(`http://localhost:4444/orders/18`);

    expect(status).toBe(200);
  });
});
