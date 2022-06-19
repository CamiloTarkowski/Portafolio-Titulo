import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl: string = 'http://localhost:4444';
  constructor(private http: HttpClient) {}

  getOrders(id: number) {
    return this.http.get(`${this.apiUrl}/auth/local`);
  }
}
