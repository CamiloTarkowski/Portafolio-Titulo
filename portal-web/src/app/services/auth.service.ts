import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://localhost:1337';

  login(email: string, password: string): Observable<any> {
    console.log('auth');
    return this.http.post(`${this.apiUrl}/auth/local`, {
      identifier: email,
      password,
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
