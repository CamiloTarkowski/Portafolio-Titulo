import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  items:any=[];

  constructor(public productoService:ProductosService, private _http:HttpClient) {

  }

  ngOnInit() {
    var link = "http://localhost:1337/products";
    this._http.get(link).subscribe(res=>{
      this.items=res;
      console.log('items en constructor: '+this.items);
    })
    this.items = this.productoService.allItems;
    console.log('Items: '+this.items);


  }

}
