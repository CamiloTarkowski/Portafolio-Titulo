import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl: string = 'http://localhost:4444';
  deliveryMethod: any;
  user: User = {} as User;
  constructor(private http: HttpClient) {}

  createOrder(products: Product[] | Product) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.createDeliveryMethod();

    if (products instanceof Array) {
      const productsCode = products.map((product) => product.code);
      const productsQuantity = this.getProductQuantity(productsCode);
      const { total, tax } = this.getTotalAndTax(products);

      const order = {
        total,
        tax,
        client: this.user.id,
        order_state: 2,
        delivery_method: this.deliveryMethod.id,
        order_products: [
          products.map((product) => ({
            product: {
              id: product.id,
            },
            quantity: productsQuantity[product.code],
          })),
        ],
      };

      return this.http.post(this.apiUrl + '/orders', order);
    }

    const order = {
      total: products.price,
      tax: products.price * 0.19,
      client: this.user.id,
      order_state: 2,
      delivery_method: this.deliveryMethod,
      order_products: [
        {
          product: {
            id: products.id,
          },
          quantity: 1,
        },
      ],
    };

    return this.http.post(this.apiUrl + '/orders', order);
  }

  createMakeOrder(product: Product) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.createDeliveryMethod();

    const order = {
      total: product.price,
      tax: product.price * 0.19,
      client: this.user.id,
      order_state: 1,
      delivery_method: this.deliveryMethod,
      order_products: [
        {
          product: {
            id: product.id,
          },
          quantity: 1,
        },
      ],
    };

    return this.http.post(this.apiUrl + '/orders', order);
  }

  private createDeliveryMethod() {
    this.http
      .post(this.apiUrl + '/delivery-methods', {
        name: this.user.name,
        address: this.user.address,
      })
      .subscribe((deliveryMethod) => {
        this.deliveryMethod = deliveryMethod;
      });
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

    const tax = total * 0.19;

    return {
      total,
      tax,
    };
  }
}
