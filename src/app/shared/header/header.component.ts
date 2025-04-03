import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  botes: { [key: string]: string } = {};
  loading = true;
  juegos = ['euromillones', 'primitiva', 'bonoloto', 'gordo', 'lototurf', 'eurodreams', 'loterianacional'];
  
  // Variables para el login
  username: string = '';
  password: string = '';
  loginError: string = '';
  isLoggingIn: boolean = false;
  showPassword: boolean = false;
  currentUser: User | null = null;

  ngOnInit() {
    this.cargarBotes();
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  async cargarBotes() {
    try {
      const timestamp = new Date().getTime();
      const response = await this.http.get<{ [key: string]: string }>(`assets/botes.json?t=${timestamp}`).toPromise();
      
      if (response) {
        Object.keys(response).forEach(key => {
          if (response[key] && response[key] !== '0') {
            if (!response[key].includes('MILLONES') && !response[key].includes('€')) {
              this.botes[key] = `${response[key]} MILLONES`;
            } else {
              this.botes[key] = response[key];
            }
          }
        });
      }
    } catch (error) {
      console.error('Error cargando botes:', error);
    } finally {
      this.loading = false;
    }
  }

  getImageUrl(juego: string): string {
    const imageMap: { [key: string]: string } = {
      'euromillones': 'cabecera_EuromillonesAJ_topaz',
      'primitiva': 'cabecera_PrimitivaAJ_topaz',
      'bonoloto': 'cabecera_BonolotoAJ_topaz',
      'gordo': 'cabecera_ElGordoAJ_topaz',
      'lototurf': 'cabecera_LototurfAJ_topaz',
      'eurodreams': 'cabecera_EurodreamsAJ_topaz',
      'loterianacional': 'cabecera_LoteriaNacionalAJ_topaz'
    };

    const imageName = imageMap[juego.toLowerCase()] || juego;
    return `assets/img/${imageName}.png`;
  }

  getBoteDisplay(juego: string): string {
    return this.botes[juego] || 'Cargando...';
  }

  // Método para iniciar sesión
  login() {
    // Validar campos
    if (!this.username || !this.password) {
      this.loginError = 'Por favor, complete todos los campos';
      return;
    }

    this.isLoggingIn = true;
    this.loginError = '';

    const credentials = {
      email: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoggingIn = false;
        this.username = '';
        this.password = '';
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.isLoggingIn = false;
        console.error('Error de inicio de sesión:', error);
        this.loginError = error?.error?.message || 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
      }
    });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  // Método para navegar a la página de recuperación de contraseña
  goToForgotPassword() {
    this.router.navigate(['/recuperar-password']);
  }

  // Método para navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/registro']);
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
