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
    this.authService.logout();
    this.router.navigate(['/iniciar-sesion']);
    this.toast.success('Se ha cerrado sesión correctamente.');
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '[]');
  }
}
