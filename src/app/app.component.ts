import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { SessionWarningModalComponent } from './components/session-warning-modal/session-warning-modal.component';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CookieBannerComponent,
    SessionWarningModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Inicializar el servicio de análisis con tu ID de Google Analytics
    // Reemplaza 'UA-XXXXXXXXX-X' con tu ID real cuando lo tengas
    this.analyticsService.initializeAnalytics('UA-XXXXXXXXX-X');
  }
}
