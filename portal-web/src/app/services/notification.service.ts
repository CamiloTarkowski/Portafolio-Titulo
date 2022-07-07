import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// SERVICES: los services son una forma de poder acceder a informacion desde cualquier parte de la aplicacion, inyectados en el constructor de un componente

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl: string = 'http://localhost:4444';

  constructor(private http: HttpClient) {}

  // obtiene todas las notificaciones del usuario
  getNotifications(): Observable<any> {
    // trae el usuario de localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // retorna un observable con las notificaciones del usuario
    return this.http.get(`${this.apiUrl}/api/notifications/${user.id}`);
  }

  // elimina una notificacion y devuelve un observable
  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notifications/${notificationId}`);
  }
}
