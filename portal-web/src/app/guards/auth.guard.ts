import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})

// GUARDS: son los filtros que se aplican a las rutas de la aplicacion

// este guard se encarga de verificar si el usuario esta autenticado o no
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    // si el usuario no esta autenticado, se redirige a la pagina de login y se devuelve un false para que no navegue a la ruta esperada
    if (!this.authService.isLogged()) {
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }

    // si el usuario esta autenticado, se devuelve un true para que navegue a la ruta esperada
    return true;
  }
}
