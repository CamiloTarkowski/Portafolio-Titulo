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
<<<<<<< HEAD
    var link = 'http://localhost:1337/products';
    this._http.get(link).subscribe((products) => {
      this.products = products;
      console.log(this.products);
      // console.log('items en constructor: ' + this.items);
    });
    // console.log('Items: ' + this.items);
=======
    this.productoService.getAllProducts().subscribe(data => this.products=(data));
    console.log("Products: "+this.products);
>>>>>>> 5ca0222f9663990f5db08762a5d6a41a7badcea2
  }
}
