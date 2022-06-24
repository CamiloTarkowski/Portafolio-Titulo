import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interfaces';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl: string = 'http://localhost:4444';
  deliveryMethod: any;
  user: User = {} as User;
  constructor(private http: HttpClient) {}

  async createOrder(products: Product[]) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.deliveryMethod = await this.createDeliveryMethod();

    if (products?.length !== 1) {
      const productsCode = products.map((product) => product.code);
      const productsQuantity = this.getProductQuantity(productsCode);
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

      return this.http.post(this.apiUrl + '/orders', order);
    }

    const order = {
      total: products[0].price,
      tax: Math.round(products[0].price * 0.19),
      client: this.user.id,
      order_state: 2,
      delivery_method: this.deliveryMethod,
      order_products: [
        {
          product: {
            id: products[0].id,
          },
          quantity: 1,
        },
      ],
    };

    return this.http.post(this.apiUrl + '/orders', order);
  }

  async createMakeOrder(product: Product[]) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.deliveryMethod = await this.createDeliveryMethod();

    // TODO: Crear orden de fabricacion para muchos productos

    const order = {
      total: product[0].price,
      tax: Math.round(product[0].price * 0.19),
      client: this.user.id,
      order_state: 1,
      delivery_method: this.deliveryMethod.id,
      order_products: [
        {
          product: {
            id: product[0].id,
          },
          quantity: 1,
        },
      ],
    };

    return this.http.post(this.apiUrl + '/orders', order);
  }

  getPayments() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.post(this.apiUrl + '/api/my-payments', { id: user.id });
  }

  private async createDeliveryMethod() {
    const { data } = await axios.post(this.apiUrl + '/delivery-methods', {
      name: this.user.name,
      address: this.user.address,
    });

    return data;
  }

  private getProductQuantity(productsCode: string[]) {
    return productsCode.reduce(
      (prev: any, cur: any) => ((prev[cur] = prev[cur] + 1 || 1), prev),
      {}
    );
  }

  private getTotalAndTax(products: Product[]): { total: number; tax: number } {
    let total = 0;

    for (let i = 0; i < products.length; i++) {
      total = total + products[i].price;
    }

    const tax = Math.round(total * 0.19);

    return {
      total,
      tax,
    };
  }
}
