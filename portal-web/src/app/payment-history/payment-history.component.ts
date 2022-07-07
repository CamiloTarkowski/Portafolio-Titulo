import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
})
export class PaymentHistoryComponent implements OnInit {
  payments: any[] = [];

  // inyeccion de dependencias
  constructor(private ordersService: OrdersService) {}

  // obtiene los pagos de el usuario a traves del servicio y los guarda en la variable payments
  getPayments() {
    this.ordersService.getPayments().subscribe((payments: any) => {
      this.payments = payments;
    });
  }

  // este metodo se ejecuta cuando se carga el componente
  ngOnInit(): void {
    this.getPayments();
  }
}
