import { Component, OnInit } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
})
export class PaymentMethodComponent implements OnInit {
  products: Product[] = [];

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        color: '#31325F',
        backgroundColor: '#c9c9c9',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '20px',
        '::placeholder': {
          color: '#1f1f1f',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  constructor(private ordersService: OrdersService, private router: Router) {}

  private getProductData(): any {
    const products = JSON.parse(localStorage.getItem('productsToPay') || '[]');
    if (products.length === 0) this.router.navigate(['/']);
    localStorage.removeItem('productsToPay');
  }

  ngOnInit(): void {
    this.getProductData();
  }
}
