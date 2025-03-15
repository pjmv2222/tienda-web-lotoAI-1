import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  isMenuOpen = false;
  isMobile = window.innerWidth < 768;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.isMenuOpen = false;
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.closeMenu();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeMenu();
  }

  get userName(): string {
    return this.currentUser ? `${this.currentUser.nombre} ${this.currentUser.apellido}` : '';
  }
} 