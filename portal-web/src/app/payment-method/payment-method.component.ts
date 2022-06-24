import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { OrdersService } from '../services/orders.service';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
})
export class PaymentMethodComponent implements OnInit, OnDestroy {
  apiUrl: string = 'http://localhost:4444';
  user: any;
  products: Product[] = [];
  finalPrice: number = 0;
  TEST_CREDIT_CART = '4242 4242 4242 4242';
  isValid: boolean = false;

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

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

  constructor(
    private ordersService: OrdersService,
    private stripeService: StripeService,
    private toastService: ToastrService,
    private router: Router,
    private http: HttpClient
  ) {}

  pay(): void {
    this.createPaymentIntent()
      .pipe(
        switchMap((clientSecret) =>
          this.stripeService.confirmCardPayment(clientSecret, {
            payment_method: {
              card: this.card?.element,
              billing_details: {
                name: this.user.name,
              },
            },
          })
        )
      )
      .subscribe(async (result) => {
        if (result.error) {
          console.log(result.error);
          this.toastService.error(
            'Hubo un error al realizar el pago, intente más tarde'
          );
        } else {
          if (result.paymentIntent?.status === 'succeeded') {
            (await this.ordersService.createOrder(this.products)).subscribe(
              (res: any) => {
                this.toastService.success(
                  'Pago realizado con éxito, se le enviara una notificacion con la fecha de entrega aproximada'
                );
                this.router.navigate(['/catalogo']);
              },
              (err: any) => {
                console.log(err);
              }
            );
          }
        }
      });
  }

  private getProductData(): void {
    const products: Product[] = JSON.parse(
      localStorage.getItem('productsToPay') || '[]'
    );
    if (products.length === 0) this.router.navigate(['/']);

    this.finalPrice = products
      .map((product: Product) => product.price)
      .reduce((a: number, b: number) => Number(a) + Number(b));
    this.products = products;
  }

  private createPaymentIntent(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/pay`, {
      amount: this.finalPrice,
    });
  }

  ngOnInit(): void {
    this.getProductData();
    this.user = localStorage.getItem('user');
  }

  ngOnDestroy(): void {
    localStorage.removeItem('productsToPay');
  }
}
