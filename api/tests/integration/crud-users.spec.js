import axios from "axios";

describe("crud users integration test", () => {
  test("get all of users", async () => {
    const { status, data } = await axios.get("http://localhost:1337/users");
    expect(status).toBe(200);
    console.log(data);
  });

  test("get a specific user", async () => {
    const { status, data } = await axios.get(`http://localhost:1337/users/4`);
    expect(status).toBe(200);
    console.log(data);
  });

  test.only("delete a user", async () => {
    const { status } = await axios.delete(`http://localhost:1337/users/5`);

    expect(status).toBe(200);
  });
});
