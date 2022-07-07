import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  products: any;

  constructor(public productService: ProductService) {}

  // este metodo se ejecuta cuando se carga el componente
  ngOnInit() {
    // obtiene los productos del catalogo y los asigna a la variable products
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
