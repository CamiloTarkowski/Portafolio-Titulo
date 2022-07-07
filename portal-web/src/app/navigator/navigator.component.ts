import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user.interfaces';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent implements OnInit {
  user: User = {} as User;
  apiUrl: string = 'http://localhost:4444';

  constructor(
    public authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  logout() {
    // llama a la funcion de cerrar sesion del servicio
    this.authService.logout();

    // redirige al usuario a la pagina de login
    this.router.navigate(['/iniciar-sesion']);

    // muestra un mensaje de exito
    this.toast.success('Se ha cerrado sesión correctamente.');
  }

  // este metodo se ejecuta cuando se carga el componente y ontiene el usuario del localStorage y lo asigna a la variable user
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '[]');
  }
}
