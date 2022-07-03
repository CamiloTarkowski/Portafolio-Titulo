import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.email = 'bastianhuenuqueo43@gmail.com';
    this.password = 'conTemporalB1';
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (res: { jwt: string; user: User }) => {
        this.authService.setToken(res.jwt);
        this.authService.setUser(res.user);
        this.toast.success(`Ingreso exitoso, bienvenido(a) ${res.user.name}`);
        this.router.navigate(['/']);
      },
      (err) => {
        const errorMessage = err.error.message[0].messages[0].message;
        this.getErrorAlert(errorMessage);
      }
    );
  }

  private getErrorAlert(errorMessage: string) {
    switch (errorMessage) {
      case 'Please provide your username or your e-mail.':
        this.toast.error(
          'Por favor ingrese su email o nombre de usuario y contraseña.'
        );
        return;
      case 'Please provide your password.':
        this.toast.error('Por favor ingrese su contraseña.');
        return;

      case 'Please provide your username or your e-mail.':
        this.toast.error('Por favor ingrese su email o nombre de usuario.');
        return;

      case 'Identifier or password invalid.':
        this.toast.error('Usuario/email o contraseña incorrectos.');
        return;

      default:
        this.toast.error('Ha ocurrido un error, por favor intente nuevamente.');
        return;
    }
  }
}
