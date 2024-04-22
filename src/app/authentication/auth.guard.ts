import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if token is present in local storage
    const token = localStorage.getItem('token');
    if (token) {
      // Token is present, allow access to the route
      return true;
    } else {
      // Token is not present, redirect to the login page
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
