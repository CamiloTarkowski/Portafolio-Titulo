import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://localhost:4444';

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local`, {
      identifier: email,
      password,
    });
  }

  register(newUser: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/local/register`, {
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      number: newUser.number,
      lastname: newUser.lastname,
      sec_lastname: newUser.secLastname,
      rut: newUser.rut,
      address: newUser.address,
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
    localStorage.setItem('name',JSON.stringify(user.name));
    localStorage.setItem('lastname',JSON.stringify(user.lastname));
  }
}
