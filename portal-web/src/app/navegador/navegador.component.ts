import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css'],
})
export class NavegadorComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toast.success('Se ha cerrado sesión correctamente.');
  }
}
