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

  createOrder(products: Product[] | Product, orderType: number) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.createDeliveryMethod();

    // Si es una orden de fabricacion entra aqui
    if (products instanceof Array) {
      const productsCode = products.map((product) => product.code);
      const productsAmount = this.getProductAmount(productsCode);
      const { total, tax } = this.getTotalAndTax(products);

      const order = {
        total,
        tax,
        client: this.user.id,
        order_state: orderType,
        delivery_method: this.deliveryMethod.id,
        order_products: [
          products.map((product) => ({
            product: {
              id: product.id,
            },
            amount: productsAmount[product.code],
          })),
        ],
      };

      console.log(order);
      return this.http.post(this.apiUrl + '/orders', order);
    }

    // Solo llega aqui si es una orden de venta
    const order = {
      total: products.price,
      tax: products.price * 0.19,
      client: this.user.id,
      order_state: orderType,
      delivery_method: this.deliveryMethod.id,
      order_products: [
        {
          product: {
            id: products.id,
          },
          amount: 1,
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

  private getProductAmount(productsCode: string[]) {
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
