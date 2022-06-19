import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  productId: string = '';
  amount: string = '';
  address: string = '';
  name: string = '';

  constructor(private http: HttpClient) {}

  async sendOrder(event: any) {
    event.preventDefault();
    const { data: deliveryData } = await axios.post(
      'http://localhost:4444/delivery-methods',
      {
        name: this.name,
        address: this.address,
      }
    );

    const { id } = deliveryData;

    // this.http
    //   .post('', {
    //     name: this.name,
    //     address: this.address,
    //   })
    //   .subscribe((deliveryMethod: any) => {
    //     this.deliveryMethodId = deliveryMethod.id;
    //   })

    const { data } = await axios.post('http://localhost:4444/orders', {
      client: {
        id: 4,
      },
      order_state: {
        id: 1,
      },
      products: {
        id: this.productId,
      },
      delivery_method: {
        id: id,
      },
      first_pay: '5000',
    });

    console.log(data);

    this.productId = '';
    this.amount = '';
    this.address = '';
    this.name = '';
  }
}
