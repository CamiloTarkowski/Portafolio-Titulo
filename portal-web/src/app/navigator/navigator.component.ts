import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent {
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
