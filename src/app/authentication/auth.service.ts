import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  getEmail():string | null {
    return localStorage.getItem('email')
  }

  setlogin(username: string,email:string,token:string,role:string,userID:string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userID',userID)
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/signin'])
  }
}
