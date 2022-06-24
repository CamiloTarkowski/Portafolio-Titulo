import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: any = [];

  constructor(
    private notificationService: NotificationService,
    private toastService: ToastrService
  ) {}

  deleteNotification(notificationId: number) {
    this.notificationService
      .deleteNotification(notificationId)
      .subscribe((res) => {
        this.toastService.success('Se borrado la notificación');
        this.notificationService
          .getNotifications()
          .subscribe((notifications) => {
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
      });
  }

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
