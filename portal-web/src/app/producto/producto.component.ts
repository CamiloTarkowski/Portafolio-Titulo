import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  id:number;
  private sub:any;
  product : any;

  constructor(private route: ActivatedRoute, public productoService:ProductosService, private _http: HttpClient) {
    this.id=0;
  }

  ngOnInit() {
    //OBTENER 'id' desde catalogo
    this.sub = this.route.params.subscribe(params=> {
      this.id = params['id'];
     });
    //GET
    var link = 'http://localhost:1337/products/'+(this.id.toString());
    this._http.get(link).subscribe((product) => {
       this.product = product;
       console.log(product);
     })


  }

}
