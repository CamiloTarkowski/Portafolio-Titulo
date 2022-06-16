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
    var link = 'http://localhost:1337/products';
    this._http.get(link).subscribe((products) => {
      this.products = products;
      console.log("imagen url: "+this.products[0].image);
    })
  }
}
