import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order_products } from '../interfaces/order_products.interface';
import { Product } from '../interfaces/product.interface';

// SERVICES: los services son una forma de poder acceder a informacion desde cualquier parte de la aplicacion, inyectados en el constructor de un componente

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];
  orderProducts: Order_products[] = [];
  orderProduct: Order_products = {} as Order_products;

  // retorna todos los productos del carrito obteniendo los datos de localStorage
  getCartProducts(): Observable<Order_products[]> {
    this.orderProducts = JSON.parse(localStorage.getItem('cart') ?? '[]');

    // retorna un observable de los productos del carrito
    return of(this.orderProducts);
  }

  // agrega un producto al carrito
  addToCart(product: Product, quantity: number): void {
    let finded = false;
    let i = 0;
    for (let order_product of this.orderProducts) {
      if (product.id == order_product.id) {
        this.orderProducts[i].quantity = order_product.quantity + quantity;

        finded = true;
      }
      i++;
    }
    if (finded == false) {
      this.orderProduct = {
        id: product.id,
        code: product.code,
        name: product.name,
        stock: product.stock,
        price: product.price,
        size: product.size,
        description: product.description,
        image: { url: product.image.url },
        institution: {
          id: product.institution.id,
          name: product.institution.name,
        },
        quantity: quantity,
      };
      this.orderProducts.push(this.orderProduct);
    }

    // guarda los productos del carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(this.orderProducts));
  }

  // elimina un producto del carrito recibiendo el id del producto
  deleteFromCart(id: number): Observable<Order_products[]> {
    // obtiene los productos del carrito
    this.orderProducts = JSON.parse(localStorage.getItem('cart') ?? '[]');

    // elimina el producto del carrito pasandole los productos y el id del producto a borrar
    this.orderProducts = this.deleteOnlyOneCartProduct(this.orderProducts, id);

    // guarda los productos del carrito en localStorage sin el producto eliminado
    localStorage.setItem('cart', JSON.stringify(this.orderProducts));

    // retorna un observable de los productos del carrito actualizado
    return this.getCartProducts();
  }

  // borra un solo producto del carrito recibiendo el id del producto
  private deleteOnlyOneCartProduct(
    order_products: Order_products[],
    id: number
  ): Order_products[] {
    const filteredProducts = [];
    let isReady = false;

    for (const order_product of order_products) {
      // si el id del producto a borrar es igual al id del producto actual y no ha sido borrado
      if (order_product.id === id && !isReady) {
        isReady = true;
        continue;
      }

      // agrega el producto actual al array de productos filtrados
      filteredProducts.push(order_product);
    }

    // retorna el array de productos filtrados sin el producto eliminado
    return filteredProducts;
  }
}
