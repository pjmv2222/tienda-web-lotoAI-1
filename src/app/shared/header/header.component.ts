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
  showResendVerification: boolean = false;
  userEmailForVerification: string = '';
  isResendingEmail: boolean = false;

  ngOnInit() {
    this.cargarBotes();
    
    // Suscribirse al estado del usuario con debugging
    this.authService.currentUser.subscribe(user => {
      console.log('Header - Estado del usuario actualizado:', {
        user: user ? {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          name: user.name
        } : null,
        hasUser: !!user
      });
      this.currentUser = user;
    });
  }

  async cargarBotes() {
    try {
      const timestamp = new Date().getTime();
      const headers = {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };
      
      const response = await this.http.get<{ [key: string]: string }>(`assets/botes.json?t=${timestamp}`, { headers }).toPromise();

      if (response) {
        // Mapeo entre nombres de juegos del frontend y claves del JSON
        const nameMapping: { [key: string]: string } = {
          'euromillones': 'euromillones',
          'primitiva': 'primitiva',
          'bonoloto': 'bonoloto',
          'gordo': 'gordo',
          'lototurf': 'lototurf',
          'eurodreams': 'eurodreams',
          'loterianacional': 'loterianacional'
        };

        Object.keys(nameMapping).forEach(frontendName => {
          const jsonKey = nameMapping[frontendName];
          if (response[jsonKey] && response[jsonKey] !== '0') {
            // El archivo contiene strings directos, no objetos
            this.botes[frontendName] = response[jsonKey];
          }
        });
      }
    } catch (error) {
      console.error('Error cargando botes:', error);
      // En caso de error, intentar cargar valores por defecto
      this.botes = {
        'euromillones': 'No disponible',
        'primitiva': 'No disponible',
        'bonoloto': 'No disponible',
        'gordo': 'No disponible',
        'lototurf': 'No disponible',
        'eurodreams': 'No disponible',
        'loterianacional': 'No disponible'
      };
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
    console.log('Iniciando proceso de login...');

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

    console.log('Enviando credenciales al servicio de autenticación...');

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoggingIn = false;
        this.username = '';
        this.password = '';
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('Error en login:', {
          status: error.status,
          message: error.error?.message || 'Error desconocido',
          error: error
        });

        this.isLoggingIn = false;

        if (error.status === 404) {
          this.loginError = 'No existe una cuenta con este email. ¿Deseas registrarte?';
        } else if (error.status === 401) {
          this.loginError = 'Contraseña incorrecta';
        } else if (error.status === 403 && error.error?.needsVerification) {
          this.loginError = 'Por favor verifica tu email antes de iniciar sesión.';
          this.showResendVerification = true;
          this.userEmailForVerification = error.error.email;
        } else {
          this.loginError = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
        }
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

  // Método para reenviar email de verificación
  resendVerificationEmail() {
    if (!this.userEmailForVerification) {
      return;
    }

    this.isResendingEmail = true;
    
    this.authService.resendVerificationEmail(this.userEmailForVerification).subscribe({
      next: (response) => {
        console.log('Email de verificación reenviado:', response);
        this.isResendingEmail = false;
        this.loginError = 'Email de verificación reenviado. Por favor revisa tu bandeja de entrada.';
        this.showResendVerification = false;
      },
      error: (error) => {
        console.error('Error reenviando email:', error);
        this.isResendingEmail = false;
        this.loginError = 'Error al reenviar el email. Por favor, inténtalo de nuevo.';
      }
    });
  }

  // Método para obtener solo el primer nombre del usuario
  getFirstName(): string {
    // Usar 'nombre' o 'name' como fallback para compatibilidad
    const fullName = this.currentUser?.nombre || this.currentUser?.name;
    if (!fullName) {
      return '';
    }
    
    // Dividir el nombre completo por espacios y tomar solo el primer elemento
    const names = fullName.trim().split(' ');
    return names[0] || '';
  }

  // Método para obtener la ruta de cada juego
  getRouterLink(juego: string): string {
    const routeMap: { [key: string]: string } = {
      'euromillones': '/euromillon',
      'primitiva': '/primitiva',
      'bonoloto': '/bonoloto',
      'gordo': '/gordo-primitiva',
      'lototurf': '/lototurf',
      'eurodreams': '/eurodreams',
      'loterianacional': '/loteria-nacional'
    };

    return routeMap[juego.toLowerCase()] || '/home';
  }
}
