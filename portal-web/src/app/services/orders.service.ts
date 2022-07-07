import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interfaces';
import axios from 'axios';

// SERVICES: los services son una forma de poder acceder a informacion desde cualquier parte de la aplicacion, inyectados en el constructor de un componente

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl: string = 'http://localhost:4444';
  deliveryMethod: any;
  user: User = {} as User;

  constructor(private http: HttpClient) {}

  // crea un pedido con los o el producto que se le pase
  async createOrder(products: Product[]) {
    // obtiene el usuario de la sesion
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // crea un metodo de entrega para el pedido
    this.deliveryMethod = await this.createDeliveryMethod();

    // si hay más de un producto
    if (products?.length !== 1) {
      // obtiene un array con los codigos de los productos
      const productsCode = products.map((product) => product.code);

      // obtiene la cantidad de productos que hay por cada codigo ({JSHSJH: 2, GWOSJA: 1})
      const productsQuantity = this.getProductQuantity(productsCode);

      // obtiene el total y el impuesto del pedido
      const { total, tax } = this.getTotalAndTax(products);

      const order = {
        total,
        tax,
        client: this.user.id,
        order_state: 2,
        delivery_method: this.deliveryMethod.id,
        order_products: products.map((product) => ({
          product: {
            id: product.id,
          },
          quantity: productsQuantity[product.code],
        })),
      };

      // crea el pedido
      return this.http.post(this.apiUrl + '/orders', order);
    }

    // si solo hay un producto
    const order = {
      total: products[0].price * (products[0].quantity || 1),
      tax: Math.round(products[0].price * (products[0].quantity || 1) * 0.19),
      client: this.user.id,
      order_state: 2,
      delivery_method: this.deliveryMethod,
      order_products: [
        {
          product: {
            id: products[0].id,
          },
          quantity: products[0].quantity,
        },
      ],
    };

    // crea el pedido
    return this.http.post(this.apiUrl + '/orders', order);
  }

  // un pedido de fabricacion con un producto
  async createMakeOrder(product: Product[]) {
    // obtiene el usuario de la sesion
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // crea un metodo de entrega para el pedido
    this.deliveryMethod = await this.createDeliveryMethod();

    const order = {
      total: product[0].price * (product[0].quantity || 1),
      tax: Math.round(product[0].price * (product[0].quantity || 1) * 0.19),
      client: this.user.id,
      order_state: 1,
      delivery_method: this.deliveryMethod.id,
      order_products: [
        {
          product: {
            id: product[0].id,
          },
          quantity: product[0].quantity,
        },
      ],
    };

    // crea el pedido en estado "Cotizacion"
    return this.http.post(this.apiUrl + '/orders', order);
  }

  // obtienes todos los pagos del usuario
  getPayments() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.post(this.apiUrl + '/api/my-payments', { id: user.id });
  }

  // crea un metodo de entrega
  private async createDeliveryMethod() {
    const { data } = await axios.post(this.apiUrl + '/delivery-methods', {
      name: this.user.name,
      address: this.user.address,
    });

    // devuelve el metodo de entrega
    return data;
  }

  // obtiene la cantidad de productos que hay por cada codigo
  private getProductQuantity(productsCode: string[]) {
    return productsCode.reduce(
      (prev: any, cur: any) => ((prev[cur] = prev[cur] + 1 || 1), prev),
      {}
    );
  }

  // obtiene el total y el impuesto del pedido
  private getTotalAndTax(products: Product[]): { total: number; tax: number } {
    let total = 0;

    for (let i = 0; i < products.length; i++) {
      const groupProduct = products[i].price * (products[i].quantity || 1);
      total = total + groupProduct;
    }

    const tax = Math.round(total * 0.19);

    return {
      total,
      tax,
    };
  }
}
