import { Component, HostListener } from '@angular/core';
import { AuthService } from '../Authentication/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isNavbarScrolled = false;
  hideauthButtons = false;
  @HostListener('window:scroll', [])

  onWindowScroll() {
    this.isNavbarScrolled = window.scrollY > 50;
  }

  constructor(private router: Router,public authService:AuthService){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.hideauthButtons = event.url === '/signin' || event.url === '/register';
    });
  }
}
