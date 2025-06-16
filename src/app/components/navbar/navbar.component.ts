import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;
  isMenuOpen = false;
  isDropdownOpen = false;
  isMobile = false;
  isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    // Suscribirse al observable del usuario actual
    this.authService.currentUser.subscribe(user => {
      console.log('Usuario actual:', user); // Para debugging
      this.currentUser = user;
    });
    
    if (this.isBrowser) {
      // Solo ejecutar código relacionado con window en el navegador
      this.isMobile = window.innerWidth < 768;
      
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth < 768;
        if (!this.isMobile) {
          this.isMenuOpen = false;
        }
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.dropdown');
    
    if (!dropdown && this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
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
