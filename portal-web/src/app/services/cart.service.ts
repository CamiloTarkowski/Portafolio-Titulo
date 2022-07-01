import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order_products } from '../interfaces/order_products.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Product[] = [];
  orderProducts : Order_products[] = [];
  orderProduct : Order_products={} as Order_products;
  

  constructor() {
  }

  // getCartProducts(): Observable<Product[]> {
  //   this.products = JSON.parse(localStorage.getItem('cart') ?? '[]');
  //   return of(this.products);
  // }

  getCartProducts(): Observable<Order_products[]> {
    localStorage.setItem('cart', JSON.stringify(this.orderProducts));
    return of(this.orderProducts);
  }

  addToCart(product: Product, quantity: number): void {
    var finded=false;
        
    for(const order_product of this.orderProducts){
      var i = 0;
      if (product.id == order_product.id){
        this.orderProducts[i].quantity = order_product.quantity+quantity;
        finded=true;
      }
      i++;
    }
    if (finded==false){
      this.orderProduct = ({id: product.id, code: product.code,name: product.name, stock: product.stock,
        price: product.price, size: product.size, description: product.description , 
        image: {url : product.image.url},institution: {id: product.institution.id , name:product.institution.name}, 
        quantity: quantity}); 
        this.orderProducts.push(this.orderProduct);
        localStorage.setItem('cart', JSON.stringify(this.orderProducts));
    } 
    console.log("quanti: "+this.orderProducts[0].quantity);
  }
  mostrarConsola(){

    
  }
    

  deleteFromCart(id: number): Observable<Order_products[]> {
    this.orderProducts = JSON.parse(localStorage.getItem('cart') ?? '[]');
    this.orderProducts = this.deleteOnlyOneCartProduct(this.orderProducts, id);
    localStorage.setItem('cart', JSON.stringify(this.orderProducts));
    return this.getCartProducts();
  }

  updateQuantity(id:number, quantity:number){
    for(const order_product of this.orderProducts){
      if (order_product.id == id){
        order_product.quantity = order_product.quantity+quantity;
      }
    }
  }

  private deleteOnlyOneCartProduct(order_products: Order_products[], id: number): Order_products[] {
    const filteredProducts = [];
    let isReady = false;

    for (const order_product of order_products) {
      if (order_product.id === id && !isReady) {
        isReady = true;
        continue;
      }

      filteredProducts.push(order_product);
    }

    return filteredProducts;
  }
}
