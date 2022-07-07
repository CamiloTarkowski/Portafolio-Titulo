import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
})
export class PaymentHistoryComponent implements OnInit {
  payments: any[] = [];

  constructor(private ordersService: OrdersService) {}

  getPayments() {
    this.ordersService.getPayments().subscribe((payments: any) => {
      this.payments = payments;
    });
  }

  ngOnInit(): void {
    this.getPayments();
  }
}
