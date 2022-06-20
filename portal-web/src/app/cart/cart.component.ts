import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: Product[] = [];

  constructor(private cartService: CartService) {}

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
