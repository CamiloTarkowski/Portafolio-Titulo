import { Pipe, PipeTransform } from '@angular/core';

// PIPES: los pipes son una forma de transformar datos, solo son para mostrar datos, no modifica ningun valor
// entra un dato en el html y sale transformado

// Ejemplo: en el html se puede usar el pipe: {{ product.name | uppercase }} para que el nombre del producto sea mayuscula (bastian -> BASTIAN)

@Pipe({
  name: 'getOrderProducts',
})
export class GetOrderProductsPipe implements PipeTransform {
  transform(products: unknown[]): unknown {
    // este pipe solo se usa para mostrar los productos de una orden y su cantidad en un mismo texto
    // EJ: (  ([{product: {name: 'producto 1', price: 1000, ...}, quantity: 2}])   ->  "producto 1 (2)""  )
    return products
      .map(({ product, quantity }: any) => `${product.name} (${quantity})`)
      .join(', ');
  }
}
