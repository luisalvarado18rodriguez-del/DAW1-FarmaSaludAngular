import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FarmaSaludAngular');

  hideNavbar = false;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;

        // aquí defines rutas sin navbar
        this.hideNavbar =
          url.includes('/login') ||
          url.includes('/registro');
      });
  }

  hasRole(role: string): boolean {
    const userRole = localStorage.getItem('user_role');
    if (!userRole) return false;

    return userRole.trim().toUpperCase() === role.toUpperCase();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user_role') !== null;
  }

  logout() {
    localStorage.removeItem('user_role');

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}