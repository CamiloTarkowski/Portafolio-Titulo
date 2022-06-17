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
        this.toast.success(`Login exitoso, bienvenido ${res.user.name}`);
        // this.navigatorService.set
        this.router.navigate(['/']);
      },
      (err) => {
        const errorMessage = err.error.message[0].messages[0].message;
        if (errorMessage === 'Please provide your username or your e-mail.') {
          this.toast.error(
            'Por favor ingrese su email o nombre de usuario y contraseña.'
          );
        } else if (errorMessage === 'Please provide your password.') {
          this.toast.error('Por favor ingrese su contraseña.');
        } else if (
          errorMessage === 'Please provide your username or your e-mail.'
        ) {
          this.toast.error('Por favor ingrese su email o nombre de usuario.');
        } else if (errorMessage === 'Identifier or password invalid.') {
          this.toast.error('Usuario o contraseña incorrectos.');
        }
      }
    );
  }
}
