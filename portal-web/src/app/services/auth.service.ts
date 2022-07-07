import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interfaces';

// SERVICES: los services son una forma de poder acceder a informacion desde cualquier parte de la aplicacion, inyectados en el constructor de un componente

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // inyeccion de dependencias
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'http://localhost:4444';

  // se recibe un usuario y se retorna un observable con el resultado, desde el componenete se suscribe al observable y obtiene los rerultados
  login(email: string, password: string): Observable<any> {
    // verifica el usuario con el backend
    return this.http.post(`${this.apiUrl}/auth/local`, {
      identifier: email,
      password,
    });
  }

  // se recibe un usuario y se retorna un observable con el resultado, desde el componenete se suscribe al observable y obtiene los rerultados
  register(newUser: any): Observable<any> {
    // crea un usuario llamando al backend y enviando los datos con una peticion POST a la API
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

  // se cierra la sesion del usuario borrando el token y el usuario de localStorage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // verifica si el usuario esta logueado viendo el localStorage
  isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // setea el token el localStorage
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // setea el usuario en el localStorage
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
