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

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
