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

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
    this.toastService.success(
      'Has agregado ' + this.quantity + ' unidades al carrito'
    );
  }

  goToPay() {
    const product = { ...this.product, quantity: this.quantity };
    localStorage.setItem('productsToPay', JSON.stringify([product]));
    this.router.navigate(['/pagar']);
  }

  async createMakeOrder() {
    (
      await this.ordersService.createMakeOrder([
        { ...this.product, quantity: this.quantity },
      ])
    ).subscribe(
      (res) => {
        this.toastService.success(
          'Se ha enviado un pedido para fabricacion, espere una notificacion para ver si la dueña lo acepta o rechaza'
        );
      },
      (err) => {
        this.toastService.error(
          'No se pudo crear el pedido de fabricación, intente nuevamente'
        );
      }
    );
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productService.getProduct(id).subscribe(
        (product: any) => {
          this.product = product;
        },
        (err) => {
          this.router.navigate(['/']);
        }
      );
    });
  }

  increaseQuantity() {
    this.quantity++;
  }

  diminishQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getQuantity() {
    return this.quantity;
  }
}
