import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-producto',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: Product = {} as Product;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private toastService: ToastrService
  ) {}

  // Agrega el producto al carrito y la cantidad
  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);

    // Muestra un mensaje de que se agrego al carrito
    this.toastService.success(
      'Has agregado ' + this.quantity + ' unidades al carrito'
    );
  }

  // se va a la pagina de pago
  goToPay() {
    // crea una variable que producto que contiene los datos del producto y su cantidad
    const product = { ...this.product, quantity: this.quantity };

    // se almacena en el localStorage el producto y la cantidad
    localStorage.setItem('productsToPay', JSON.stringify([product]));

    // se redirecciona a la pagina de pago
    this.router.navigate(['/pagar']);
  }

  // crea una orden de fabricacion
  async createMakeOrder() {
    // se usa el servicio pasandole el producto y la cantidad
    (
      await this.ordersService.createMakeOrder([
        { ...this.product, quantity: this.quantity },
      ])
    ).subscribe(
      (res) => {
        // se muestra un mensaje de que se creo la orden de fabricacion
        this.toastService.success(
          'Se ha enviado un pedido para fabricacion, espere una notificacion para ver si la dueña lo acepta o rechaza'
        );
      },
      (err) => {
        // se muestra un mensaje de que no se pudo crear la orden de fabricacion
        this.toastService.error(
          'No se pudo crear el pedido de fabricación, intente nuevamente'
        );
      }
    );
  }

  // esto se ejecuta cuando se carga el componente
  ngOnInit() {
    // Trae el id del url y asigna al los datos a la propiedad producto
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productService.getProduct(id).subscribe(
        (product: any) => {
          this.product = product;
        },
        (err) => {
          // si no existe el producto se redirecciona a la pagina de inicio
          this.router.navigate(['/']);
        }
      );
    });
  }

  // augmenta la cantidad de productos
  increaseQuantity() {
    this.quantity++;
  }

  // disminuye la cantidad de productos
  diminishQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // retorna la cantidad de productos
  getQuantity() {
    return this.quantity;
  }
}
