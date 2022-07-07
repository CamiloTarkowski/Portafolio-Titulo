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
  // esta variable se usa para deshabilitar el boton de ingresar
  disableButton: boolean = false;

  // inyeccion de dependencias, se inyecta el servicio de autenticacion, el toastr para mostrar mensajes y el router
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    // aqui relleno el email y la contraseña con datos predeterminados para no escribrirlos a cada rato (esto en main no va a estar)
    this.email = 'bastianhuenuqueo43@gmail.com';
    this.password = 'conTemporalB1';
  }

  // este metodo se ejecuta cuando se presiona el boton de ingresar
  login() {
    // deshabilito el boton de ingresar
    this.disableButton = true;

    // envio al servicio el email y password para verificar si existe un usuario con esos datos
    this.authService.login(this.email, this.password).subscribe(
      (res: { jwt: string; user: User }) => {
        // seteo el token en el localStorage desde el servicio
        this.authService.setToken(res.jwt);
        this.authService.setUser(res.user);

        // muestro un mensaje de exito
        this.toast.success(`Ingreso exitoso, bienvenido(a) ${res.user.name}`);

        // navego a la pagina de inicio
        this.router.navigate(['/']);
      },
      (err) => {
        // obtengo el mensaje de error
        const errorMessage = err.error.message[0].messages[0].message;

        // habilito el boton de ingresar
        this.disableButton = false;

        // muestro el mensaje de error
        this.getErrorAlert(errorMessage);
      }
    );
  }

  // el mensaje viene en ingles asi que aca uso un switch para traducir los mensajes y mostrarlos
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
