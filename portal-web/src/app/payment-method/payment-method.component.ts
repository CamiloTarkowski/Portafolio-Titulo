import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { OrdersService } from '../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Order_products } from '../interfaces/order_products.interface';
import { User } from '../interfaces/user.interfaces';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
})
export class PaymentMethodComponent implements OnInit, OnDestroy {
  apiUrl: string = 'http://localhost:4444';
  user: any;
  products: Product[] = [];
  orderProducts: Order_products[]=[];
  finalPrice: number = 0;
  TEST_CREDIT_CART = '4242 4242 4242 4242';
  isValid: boolean = false;
  notificationId?: string | null = '';
  user1: User[] = [];

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        color: '#31325F',
        backgroundColor: '#ffffff',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '20px',
        '::placeholder': {
          color: '#b1b1b1',
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
    private route: ActivatedRoute,
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
          this.toastService.error(
            'Hubo un error al realizar el pago, intente más tarde'
          );
        } else {
          if (result.paymentIntent?.status === 'succeeded') {
            (await this.ordersService.createOrder(this.orderProducts)).subscribe(
              (res: any) => {
                if (this.notificationId != '') {
                  console.log(this.notificationId);
                  this.http
                    .delete(
                      `${this.apiUrl}/notifications/${this.notificationId}`
                    )
                    .subscribe((res) => {
                      console.log(res);
                    });
                }
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
    this.notificationId =
      this.route.snapshot.queryParamMap.get('notificationId');
    const orderProducts: any[] = JSON.parse(
      localStorage.getItem('productsToPay') || '[]'
    );
    if (orderProducts.length === 0) this.router.navigate(['/']);

    this.finalPrice = orderProducts
      .map((orderProduct: Order_products) => orderProduct.price*orderProduct.quantity)
      .reduce((a: number, b: number) => Number(a) + Number(b));
    this.orderProducts = orderProducts;
  }

  private createPaymentIntent(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/pay`, {
      amount: this.finalPrice,
    });
  }

  ngOnInit(): void {
    this.getProductData();
    this.user = JSON.parse(localStorage.getItem('user')|| '[]');
  }

  ngOnDestroy(): void {
    localStorage.removeItem('productsToPay');
  }
}
