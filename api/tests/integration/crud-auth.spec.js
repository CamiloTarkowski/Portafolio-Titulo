import axios from "axios";

describe("crud-auth integration test", () => {
  test("auth register", async () => {
    const { status } = await axios.post(
      `http://localhost:4444/auth/local/register`,
      {
        username: "sergio",
        password: "contrasena123",
        email: "sergio@gmail.com",
        name: "sergio",
        lastname: "pizarro",
        sec_lastname: "moraga",
        address: "mi casa 1939",
        number: "948248224",
        rut: "19.792.299-2",
      }
    );

    expect(status).toBe(200);
  });

  test.only("auth login", async () => {
    const { status, data } = await axios.post(
      `http://localhost:4444/auth/local`,
      {
        identifier: "sergio",
        password: "contrasena123",
      }
    );

    expect(status).toBe(200);
    console.log(data);
  });
});
