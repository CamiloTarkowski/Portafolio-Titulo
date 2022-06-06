import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  codigo:string;
  private sub:any;
  item : any;

  constructor(private route: ActivatedRoute, public productoService:ProductosService) {
    this.codigo='';
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params=> {
      this.codigo = params['codigo'];
    });
    
    this.getItemInfo();

  }
  getItemInfo(){
    this.item=this.productoService.getItem(this.codigo);
  }
  

}
