import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl: string = 'http://localhost:4444';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get(`${this.apiUrl}/api/notifications/${user.id}`);
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notifications/${notificationId}`);
  }
}
