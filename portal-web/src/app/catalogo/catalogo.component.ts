import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  items:any[]=[];

  constructor(public productoService:ProductosService) {

  }

  ngOnInit() {
    this.items = this.productoService.allItems;
  }

}
