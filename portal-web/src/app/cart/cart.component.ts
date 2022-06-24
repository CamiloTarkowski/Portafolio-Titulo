import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  goToPay() {
    localStorage.setItem('productsToPay', JSON.stringify(this.products));
    this.router.navigate(['/pagar']);
  }

  getCartProducts() {
    this.cartService.getCartProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteCartProduct(id: number) {
    this.cartService.deleteFromCart(id).subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit(): void {
    this.getCartProducts();
  }
}
