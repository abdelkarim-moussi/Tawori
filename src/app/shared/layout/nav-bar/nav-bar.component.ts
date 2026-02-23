import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {

  isAuthenticated = false;
  userEmail = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkAuth();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAuth();
    });
  }

  checkAuth(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      this.isAuthenticated = true;
      this.userEmail = parsed.email || '';
    } else {
      this.isAuthenticated = false;
      this.userEmail = '';
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isAuthenticated = false;
    this.userEmail = '';
    this.router.navigate(['/login']);
  }
}
