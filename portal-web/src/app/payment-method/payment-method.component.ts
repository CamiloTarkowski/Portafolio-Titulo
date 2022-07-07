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

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
})
export class PaymentMethodComponent implements OnInit, OnDestroy {
  apiUrl: string = 'http://localhost:4444';
  user: any;
  orderProducts: Order_products[] = [];
  finalPrice: number = 0;
  isValid: boolean = false;
  notificationId?: string | null = '';
  disableButton: boolean = false;

  // este es un map para el pipe i18nPlural que ve que el numero de productos es mayor a 1 le pone "unidades", si es 1 le pone "unidad"
  quantityMap = {
    '=1': 'unidad',
    other: 'unidades',
  };

  // esto se encarga de obtener un nodo del html en este caso es la tarjeta de stripe, esto es parecido a como hicieramos
  // const boton = document.querySelector("#card") en js vanilla
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  // esta son las opciones de la tarjeta
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

  // esto es para poner las cosas en español
  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  // inyeccion de dependencias
  constructor(
    private ordersService: OrdersService,
    private stripeService: StripeService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  // esto crea un intento de pago, si sale bien crea una orden, si no sale bien muestra un error
  pay(): void {
    // crea un intento de pago
    this.createPaymentIntent()
      .pipe(
        switchMap((clientSecret) =>
          // aqui verifica si el intento de pago sale bien que es cuando se devuelve el clientSecret
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
        // si hay un error muestra un mensaje de error
        if (result.error) {
          this.toastService.error(
            'Hubo un error al realizar el pago, intente más tarde'
          );

          // habilita el boton de pago
          this.disableButton = false;
        } else {
          // si el pago sale bien
          if (result.paymentIntent?.status === 'succeeded') {
            // crea una orden
            (
              await this.ordersService.createOrder(this.orderProducts)
            ).subscribe(
              (res: any) => {
                if (this.notificationId) {
                  // si se viene desde las notificaciones, borra la notificacion para que no aparezca en "notificaciones"
                  this.http
                    .delete(
                      `${this.apiUrl}/notifications/${this.notificationId}`
                    )
                    .subscribe((res) => {});
                }

                // actualiza el stock del producto
                this.updateProductStock(res.order_products);

                // pone la orden en estado "Pedido"
                this.http
                  .put(`${this.apiUrl}/orders/${res.id}`, {
                    order_state: 2,
                  })
                  .subscribe((res) => {
                    // muestra un mensaje de que el pago se realizo correctamente
                    this.toastService.success(
                      'Pago realizado con éxito, se le enviara una notificacion con la fecha de entrega aproximada'
                    );
                    // habilita el boton de pago
                    this.disableButton = false;

                    // redirige a la pagina del catalogo
                    this.router.navigate(['/catalogo']);
                  });
              },
              (err: any) => {
                console.log(err);
              }
            );
          }
        }
      });
  }

  // obtiene los datos del producto y si se viene desde una notificacion o pago normal
  private getProductData(): void {
    // se obtiene el id de la notificacion si es que existe alguna
    this.notificationId =
      this.route.snapshot.queryParamMap.get('notificationId');

    // se obtienen los productos que se van a pagar
    const orderProducts: any[] = JSON.parse(
      localStorage.getItem('productsToPay') || '[]'
    );

    // si no hay productos se redirige a la pagina de inicio, esto es para que no se pueda acceder directamente a la pagina de pago
    // desde el url del navegador
    if (orderProducts.length === 0) this.router.navigate(['/']);

    // se obtiene el precio final de todos los productos
    this.finalPrice = orderProducts
      .map((product: Product) => product.price * (product.quantity || 1))
      .reduce((a: number, b: number) => Number(a) + Number(b));

    // se asigna los productos a la variable de orderProducts
    this.orderProducts = orderProducts;
  }

  // crea un intento de pago enviando el monto a pagar y se deshabilita el boton de pago
  private createPaymentIntent(): Observable<any> {
    this.disableButton = true;
    return this.http.post(`${this.apiUrl}/api/pay`, {
      amount: this.finalPrice,
    });
  }

  // actualiza el stock de los productos
  private updateProductStock(order_products: any[]): void {
    for (const order_product of order_products) {
      // se calcula el nuevo stock
      const newStock =
        parseInt(order_product.product.stock) - order_product.quantity;

      // se actualiza el stock, si el stock es menor a 0 se pone en 0
      this.http
        .put(`${this.apiUrl}/products/${order_product.product.id}`, {
          stock: newStock < 0 ? 0 : newStock,
        })
        .subscribe(
          (res: any) => {},
          (err: any) => {
            console.log(err);
          }
        );
    }
  }

  // esto se ejeuta cuando se carga el componente
  ngOnInit(): void {
    this.getProductData();
    this.user = localStorage.getItem('user');
  }

  // esto se ejecuta cuando se destruye el componente (sale de la seccion de pago)
  ngOnDestroy(): void {
    localStorage.removeItem('productsToPay');
  }
}
