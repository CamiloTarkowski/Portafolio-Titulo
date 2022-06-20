import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getOrderProducts',
})
export class GetOrderProductsPipe implements PipeTransform {
  transform(products: unknown[]): unknown {
    return products
      .map(({ product, amount }: any) => `${product.name} (${amount})`)
      .join(', ');
  }
}
