import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];
  private link = 'http://localhost:4444/products';

  constructor(private _http: HttpClient) {}

  /* retorna todos los productos */
  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.link);
  }

  /* busca y retorna un producto por id. Si no encuentra nada, retorna [object] */

  getProduct(id: number): Observable<Product[]> {
    this.link = 'http://localhost:4444/products/' + id.toString();
    return this._http.get<Product[]>(this.link);
  }
}
