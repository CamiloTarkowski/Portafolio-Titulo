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

  constructor(private cartService: CartService, private router: Router) {}

  goToPay() {
    localStorage.setItem('productsToPay', JSON.stringify(this.order_products));
    this.router.navigate(['/pagar']);
  }

  getCartProducts() {
    this.cartService.getCartProducts().subscribe((order_products) => {
      this.order_products = order_products;
    });
  }

  deleteCartProduct(id: number) {
    this.cartService.deleteFromCart(id).subscribe((order_products) => {
      this.order_products = order_products;
    });
  }

  ngOnInit(): void {
    this.getCartProducts();
  }
}
