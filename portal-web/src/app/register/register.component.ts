import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newUser: User = {
    username: '',
    email: '',
    password: '',
    name: '',
    number: '',
    lastname: '',
    sec_lastname: '',
    address: '',
    rut: '',
  };
  disableButton: boolean = false;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  register() {
    if (!this.validateNewUser(this.newUser)) {
      return;
    }
    this.disableButton = true;
    this.authService.register(this.newUser).subscribe(
      (res: { jwt: string; user: User }) => {
        this.authService.setToken(res.jwt);
        this.authService.setUser(res.user);
        this.toast.success(
          `Usuario registrado correctamente, bienvenido ${res.user.username}`
        );
        this.router.navigate(['/login']);
      },
      (err) => {
        const errorMessage = err.error.message[0].messages[0].message;
        this.disableButton = false;
        this.getErrorAlert(errorMessage);
      }
    );
  }

  private getErrorAlert(errorMessage: string): void {
    switch (errorMessage) {
      case 'Username already taken':
        this.toast.error('El nombre de usuario ya está en uso.');
        return;

      default:
        this.toast.error('Ha ocurrido un error, por favor intente nuevamente.');
        return;
    }
  }

  private validateNewUser(user: User): boolean {
    if (
      !user.username ||
      !user.email ||
      !user.password ||
      !user.name ||
      !user.lastname ||
      !user.sec_lastname ||
      !user.address ||
      !user.number ||
      !user.rut
    ) {
      this.toast.error('Por favor complete todos los campos.');
      return false;
    }

    const numberRegex = RegExp(/\D*([+56]\d [2-9])(\D)(\d{4})(\D)(\d{4})\D*/g);
    const rutRegex = RegExp(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/);

    if (!numberRegex.test(user.number)) {
      this.toast.error('Por favor ingrese un número de teléfono válido.');
      return false;
    }

    if (!rutRegex.test(user.rut)) {
      this.toast.error('Por favor ingrese un rut válido.');
      return false;
    }

    return true;
  }
}
