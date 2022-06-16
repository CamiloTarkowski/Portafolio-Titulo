import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  items:any=[]; 
  constructor() {
    
   }

   get allItems(){
     return this.items;
   }

   getItem(code:string){
     let result:any;

     for(let item of this.items){
       if(item.code==code){
         result=item;
         break;
       }
     }
     return result;
   }
}
