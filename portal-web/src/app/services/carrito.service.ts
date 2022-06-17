import { Injectable } from '@angular/core';
import { ProductosService } from './productos.service'; 
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  productos:any;
  id:number;
  private sub:any;

  constructor(private route:ActivatedRoute, private productoService:ProductosService) {
    this.id=0;
   }

  agregarAlCarro(id:number){
    this.sub = this.route.params.subscribe(params=> {
      this.id = params['id'];
     });
     this.productoService.getProducto(this.id).subscribe(data => this.productos=(data));
     
  }
}
