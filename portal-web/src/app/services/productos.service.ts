import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  items:any=[]; 
  constructor(private _http: HttpClient) {
    
   }

   get allItems(){
     return this.items;
   }

   getItem(codigo:string){
     let result:any;

     for(let item of this.items){
       if(item.codigo==codigo){
         result=item;
         break;
       }
     }
     return result;
   }
}
