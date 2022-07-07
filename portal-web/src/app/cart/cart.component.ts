import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { Order_products } from '../interfaces/order_products.interface';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  order_products: Order_products[] = [];

  // inyeccion de dependencias, se inyecta el servicio del carrito y el router para navegar desde el componente
  constructor(private cartService: CartService, private router: Router) {}

  // este metodo se ejecuta cuando se presiona el boton de ir a pagar,
  // almacena el o los productos del carrito en el localStorage y se redirige a la pagina de pago
  goToPay() {
    localStorage.setItem('productsToPay', JSON.stringify(this.order_products));
    this.router.navigate(['/pagar']);
  }

  // obtiene los productos del carrito y los asigna a la variable order_products
  getCartProducts() {
    this.cartService.getCartProducts().subscribe((order_products) => {
      this.order_products = order_products;
    });
  }

  // elimina un producto del carrito recibiendo como parametro el id del producto
  deleteCartProduct(id: number) {
    this.cartService.deleteFromCart(id).subscribe((order_products) => {
      this.order_products = order_products;
    });
  }

  // este metodo se ejecuta cuando se carga el componente
  ngOnInit(): void {
    this.getCartProducts();
  }
}
