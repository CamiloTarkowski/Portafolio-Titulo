import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  products: any;

  constructor(
    public productoService: ProductosService,
    private _http: HttpClient
  ) {}

  ngOnInit() {
    this.productoService
      .getAllProducts()
      .subscribe((data) => (this.products = data));
    console.log('Products: ' + this.products);
  }
}
