import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];
  quantity: number = 0;

  constructor() {}

  getCartProducts(): Observable<Product[]> {
    this.products = JSON.parse(localStorage.getItem('cart') ?? '[]');
    return of(this.products);
  }

  addToCart(product: Product): void {
    this.products = JSON.parse(localStorage.getItem('cart') ?? '[]');
    this.products.push(product);
    localStorage.setItem('cart', JSON.stringify(this.products));
  }

  deleteFromCart(id: number): Observable<Product[]> {
    this.products = JSON.parse(localStorage.getItem('cart') ?? '[]');
    this.products = this.deleteOnlyOneCartProduct(this.products, id);
    localStorage.setItem('cart', JSON.stringify(this.products));
    return this.getCartProducts();
  }

  private deleteOnlyOneCartProduct(products: Product[], id: number): Product[] {
    const filteredProducts = [];
    let isReady = false;

    for (const product of products) {
      if (product.id === id && !isReady) {
        isReady = true;
        continue;
      }

      filteredProducts.push(product);
    }

    return filteredProducts;
  }
}
