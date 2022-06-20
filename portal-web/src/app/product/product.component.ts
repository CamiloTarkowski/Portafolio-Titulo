import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private toastService: ToastrService
  ) {}

  addToCart() {
    this.cartService.addToCart(this.product);
    this.toastService.success('Producto agregado al carrito');
  }

  createOrder() {
    if (this.product.stock === 0) {
      this.ordersService.createOrder(this.product, 1).subscribe(
        (res) => {
          this.toastService.success(
            'Se ha enviado un pedido para fabricacion, espere una notificacion para ver si la dueña lo acepta o rechaza'
          );
        },
        (err) => {
          this.toastService.error(
            'No se pudo crear el pedido de fabricacion, intente nuevamente'
          );
        }
      );
      return;
    }

    // Crea una orden con orden state: pedido
  }

  ngOnInit() {
    // Treae el id del url y asigna al los doatos a la propieda producto
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.productService.getProduct(id).subscribe((product: any) => {
        this.product = product;
      });
    });
  }
}
