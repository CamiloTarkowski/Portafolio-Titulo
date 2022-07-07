import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

// SERVICES: los services son una forma de poder acceder a informacion desde cualquier parte de la aplicacion, inyectados en el constructor de un componente

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private link = 'http://localhost:4444';

  constructor(private _http: HttpClient) {}

  // retorna todos los productos y devuelve un observable
  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.link + '/products');
  }

  // obtiene un producto especifico por id y devuelve un observable
  getProduct(id: number): Observable<Product> {
    return this._http.get<Product>(
      'http://localhost:4444/products/' + id.toString()
    );
  }
}
