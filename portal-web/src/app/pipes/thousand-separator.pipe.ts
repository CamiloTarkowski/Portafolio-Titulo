import { Pipe, PipeTransform } from '@angular/core';

// PIPES: los pipes son una forma de transformar datos, solo son para mostrar datos, no modifica ningun valor
// entra un dato en el html y sale transformado

// Ejemplo: en el html se puede usar el pipe: {{ product.name | uppercase }} para que el nombre del producto sea mayuscula (bastian -> BASTIAN)

@Pipe({
  name: 'ThousandSeparator',
})
export class ThousandSeparatorPipe implements PipeTransform {
  // este pipe se usa para agregar los separadores de miles a un numero (1000000 -> 1.000.000)
  public transform(value: any) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
