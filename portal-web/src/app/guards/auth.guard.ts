import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
