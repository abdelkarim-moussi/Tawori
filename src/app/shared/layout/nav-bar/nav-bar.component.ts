import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

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
