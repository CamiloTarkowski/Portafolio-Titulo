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
  // se crea un usuario con todo vacio
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

  // inyeccion de dependencias
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {}

  // se registra un nuevo usuario
  register() {
    // se valida hacen validaciones antes de registrar
    if (!this.validateNewUser(this.newUser)) {
      return;
    }

    // se deshabilita el boton de registrar
    this.disableButton = true;

    // se registra el usuario
    this.authService.register(this.newUser).subscribe(
      (res: { jwt: string; user: User }) => {
        // se guarda el token y el usuario en el localStorage
        this.authService.setToken(res.jwt);
        this.authService.setUser(res.user);

        // se muestra un mensaje de exito
        this.toast.success(
          `Usuario registrado correctamente, bienvenido ${res.user.username}`
        );

        // se redirige al usuario a la pagina de login
        this.router.navigate(['/iniciar-sesion']);
      },
      (err) => {
        // se obtiene el message de error
        const errorMessage = err.error.message[0].messages[0].message;

        // se habilita el boton de registrar
        this.disableButton = false;

        // se muestra un mensaje de error
        this.getErrorAlert(errorMessage);
      }
    );
  }

  // se traduce el error y se muestra
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

  // validaciones del usuario por registrar
  private validateNewUser(user: User): boolean {
    // si estan vacios los campos
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
      // se muestra un mensaje de error
      this.toast.error('Por favor complete todos los campos.');
      return false;
    }

    // valida que el rut sea correcto y el numero de telefono
    const numberRegex = RegExp(/\D*([+56]\d [2-9])(\D)(\d{4})(\D)(\d{4})\D*/g);
    const rutRegex = RegExp(/^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/);

    // si el numero no concuerda con el formato
    if (!numberRegex.test(user.number)) {
      // se muestra un mensaje de error
      this.toast.error('Por favor ingrese un número de teléfono válido.');
      return false;
    }

    // si el rut no concuerda con el formato
    if (!rutRegex.test(user.rut)) {
      // se muestra un mensaje de error
      this.toast.error('Por favor ingrese un rut válido.');
      return false;
    }

    // si tdo esta bien retorno true para que continue
    return true;
  }
}
