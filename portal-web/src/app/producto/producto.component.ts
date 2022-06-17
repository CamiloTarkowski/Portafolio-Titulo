import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  id: number = 0;
  private sub: any;
  product: any;

  constructor(
    private route: ActivatedRoute,
    public productoService: ProductosService,
    private _http: HttpClient
  ) {}

  ngOnInit() {
    //OBTENER 'id' desde template catalogo
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    //GET
    this.productoService
      .getProducto(this.id)
      .subscribe((data: any) => (this.product = data));
  }
}
