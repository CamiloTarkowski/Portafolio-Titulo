import axios from "axios";

class ProductApi {
  async getProducts() {
    const { data } = await axios.get("http://localhost:1337/products");

    return console.log(data);
  }

  async getProduct(id) {
    const { data } = await axios.get(`http://localhost:1337/products/${id}`);

    return console.log(data);
  }

  async createProduct() {
    const { data } = await axios.post("http://localhost:1337/products", {
      code: "JAHJD",
      name: "boston college",
      price: 5000,
      stock: 4,
      description: "dassfsd",
      amount: 1,
      institution: 1,
    });

    return console.log(data);
  }

  async updateProduct(id) {
    const { data } = await axios.put(`http://localhost:1337/products/${id}`, {
      code: "JAHFBUFSJD",
      name: "dwdwdaw",
      price: 1000,
      stock: 4,
      description: "dassfsd",
      amount: 3,
      institution: 1,
    });

    return this.getProduct(id);
  }

  async deleteProduct(id) {
    await axios.delete(`http://localhost:1337/products/${id}`);

    return this.getProduct(id);
  }
}

class OrderApi {
  async getOrders() {
    const { data } = await axios.get("http://localhost:1337/orders");

    return console.log(data);
  }

  async getOrder(id) {
    const { data } = await axios.get(`http://localhost:1337/orders/${id}`);

    return console.log(data);
  }

  async createOrder() {
    const { data: dataMethod } = await axios.post(
      "http://localhost:1337/delivery-methods",
      {
        name: "joselito",
        address: "mi casa 1111",
      }
    );
    const { data } = await axios.post("http://localhost:1337/orders", {
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

    return console.log(data);
  }

  async updateOrder(id) {
    const { data } = await axios.put(`http://localhost:1337/orders/${id}`, {
      total: 29000,
      first_pay: 8000,
      final_pay: 20000,
      tax: 1000,
    });

    return this.getProduct(id);
  }

  async deleteOrder(id) {
    await axios.delete(`http://localhost:1337/products/orders${id}`);

    return this.getProduct(id);
  }
}

class AuthApi {
  async login() {
    const data = await axios.post(`http://localhost:1337/auth/local`, {
      indetifier: "sergio",
      password: "contrasena123",
    });

    return console.log(data);
  }

  async register() {
    const data = await axios.post(`http://localhost:1337/auth/local/register`, {
      username: "sergio",
      password: "contrasena123",
      email: "sergio@gmail.com",
      name: "sergio",
      lastname: "pizarro",
      sec_lastname: "moraga",
      address: "mi casa 1939",
      number: "948248224",
      rut: "19.792.299-2",
    });

    return console.log(data);
  }
}

const productApi = new ProductApi();
const orderApi = new OrderApi();
const authApi = new AuthApi();

const main = async () => {
  // await productApi.getProducts();
  // await productApi.getProduct(1);
  // await productApi.createProduct();
  // await productApi.updateProduct(2);
  // await productApi.deleteProduct(11);
  // ----
  // await orderApi.getOrders();
  // await orderApi.getOrders(1);
  // await orderApi.createOrder();
  // await orderApi.updateOrdere(2);
  // await orderApi.deleteOrder(3);
  // ----
  // await authApi.register()
  // await authApi.login()
};

main();
