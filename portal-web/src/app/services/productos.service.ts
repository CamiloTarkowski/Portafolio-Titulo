import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  items:any[]=[
    {"codigo":"101","nombre":"Pantalón de buzo","colegio":"Los Alerces","precio":19990,"imagen":"product1.jfif", "stock": 5, "talla": "L","descripcion": "Pantalón de buzo del colegio Los Alerces hecho de algodón"},
    {"codigo":"102","nombre":"Buzo Completo","colegio": "Los Alerces","precio":29990,"imagen":"product2.jpeg", "stock": 5, "talla": "14", "descripcion": "Pantalón de buzo hecho de algodón"},
    {"codigo":"103","nombre":"Pantalón de buzo","colegio": "Alcántara de Talagante","precio":15990,"imagen":"product3.jfif", "stock": 5, "talla": "16", "descripcion": "Pantalón de buzo rojo del colegio Alcántara de Talagante hecho de algodón."},
    {"codigo":"104","nombre":"Pantalón de buzo","colegio":"Los Alerces","precio":19990,"imagen":"product1.jfif", "stock": 5, "talla": "L","descripcion": "Pantalón de buzo del colegio Los Alerces hecho de algodón"},
    {"codigo":"105","nombre":"Buzo Completo","colegio": "Los Alerces","precio":29990,"imagen":"product2.jpeg", "stock": 5, "talla": "14", "descripcion": "Pantalón de buzo hecho de algodón"},
    {"codigo":"106","nombre":"Pantalón de buzo","colegio": "Alcántara de Talagante","precio":15990,"imagen":"product3.jfif", "stock": 5, "talla": "16", "descripcion": "Pantalón de buzo rojo del colegio Alcántara de Talagante hecho de algodón."}
  ]; 

  constructor() {

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
