import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user.interfaces';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent{

  user: User={} as User;

  constructor(
    public authService: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.user = JSON.parse(localStorage.getItem('user') ?? '[]');
    console.log("user name: "+this.user.name);    

  }


    

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toast.success('Se ha cerrado sesión correctamente.');
  }


    

}
