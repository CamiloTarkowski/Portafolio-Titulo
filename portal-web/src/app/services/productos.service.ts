import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoI } from '../models/productos/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  /* Objeto que contiene todos los items*/
  
  
  products:any;
  private sub:any;
  id:number;
  private link = 'http://localhost:1337/products';

  constructor(private route: ActivatedRoute, private _http:HttpClient) {
    this.id=0;
   }
 
  /* retorna todos los productos */
  getAllProducts():Observable<ProductoI[]>{
    return this._http.get<ProductoI[]>(this.link);
    }

  /* busca y retorna un item por id. Si no encuentra nada, retorna [object] */
  getProducto(id:number){
    let result:any;
    this.sub = this.route.params.subscribe(params=> {
      this.id = params['id'];
     });

    var link = 'http://localhost:1337/products/'+(this.id.toString());
    this._http.get(link).subscribe((products) => {
       this.products = products;
       console.log(this.products);
     })
    return result;
  }

}
