import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: any = [];

  // inyeccioon de dependencias
  constructor(
    private notificationService: NotificationService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  // redirige al usuario a la pagina para pagar y setea los productos a pagar
  goToPay(order: any, notificationId: number) {
    // creo una variable que contenga los productos y sus cantidades
    const orderProducts = order.order_products.map((orderProduct: any) => {
      return {
        ...orderProduct.product,
        quantity: parseInt(orderProduct.quantity),
      };
    });

    // seteo la variable de localStorage con los productos y cantidades
    localStorage.setItem('productsToPay', JSON.stringify(orderProducts));

    // navego al usuario a la pagina de pago, con un query (?notificationId= , asi aparecera en el url) que muestra el id de la notificacion
    this.router.navigate(['/pagar'], { queryParams: { notificationId } });
  }

  // recibe el id de la notificacion y la elimina
  deleteNotification(notificationId: number) {
    // se usa el notificationService para eliminar la notificacion
    this.notificationService
      .deleteNotification(notificationId)
      .subscribe((res) => {
        // si se elimina la notificacion, se muestra un mensaje de exito
        this.toastService.success('Se borrado la notificación');

        // se recarga la pagina obteniendo las notificaciones nuevamente
        this.notificationService
          .getNotifications()
          .subscribe((notifications) => {
            // esto se hace por que la orden trae el total y el tax en string, por eso se convierte a int
            this.notifications = notifications.map((notification: any) => {
              // se esparse (...notificacion) para que no se modifique la notificacion original y solo se modifique lo que se indica nuevamente
              // en este caso se modifica el total y el tax
              return {
                ...notification,
                order: {
                  ...notification.order,
                  total: parseInt(notification.order.total),
                  tax: parseInt(notification.order.tax),
                },
              };
            });
          });
      });
  }

  // este metodo se ejecuta cuando se carga el componente y ontiene las notificaciones del servicio y las asigna a la variable notifications
  // y hace el mismo proceso que en el metodo deleteNotification al momento de refrescar las notificaciones
  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notifications = notifications.map((notification: any) => {
        return {
          ...notification,
          order: {
            ...notification.order,
            total: parseInt(notification.order.total),
            tax: parseInt(notification.order.tax),
          },
        };
      });
    });
  }
}
