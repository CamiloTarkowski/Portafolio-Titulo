import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interfaces/user.interfaces';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent implements OnInit{

  user: User={} as User;
  apiUrl: string = 'http://localhost:4444';
  name: string = '';
  lastname: string='';


  constructor(
    public authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private http: HttpClient
  ) {
    
  }
   

    

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.toast.success('Se ha cerrado sesión correctamente.');
  }

  ngOnInit(): void {

    this.name = JSON.parse(localStorage.getItem('name')|| '[]');
    this.lastname = JSON.parse(localStorage.getItem('lastname')|| '[]');
    
    }

  }
