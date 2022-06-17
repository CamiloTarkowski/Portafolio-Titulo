import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
<<<<<<< HEAD
  codigo: string;
  private sub: any;
  item: any;

  constructor(
    private route: ActivatedRoute,
    public productoService: ProductosService
  ) {
    this.codigo = '';
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.codigo = params['codigo'];
    });
=======
  id:number;
  private sub:any;
  product : any;

  constructor(private route: ActivatedRoute, public productoService:ProductosService, private _http: HttpClient) {
    this.id=0;
  }

  ngOnInit() {
    //OBTENER 'id' desde template catalogo
    this.sub = this.route.params.subscribe(params=> {
      this.id = params['id'];
     });
    
    //GET 
      this.productoService.getProducto(this.id).subscribe(data => this.product=(data));


>>>>>>> 5ca0222f9663990f5db08762a5d6a41a7badcea2

    this.getItemInfo();
  }
<<<<<<< HEAD
  getItemInfo() {
    this.item = this.productoService.getItem(this.codigo);
  }
=======

>>>>>>> 5ca0222f9663990f5db08762a5d6a41a7badcea2
}
