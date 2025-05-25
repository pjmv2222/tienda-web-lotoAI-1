import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { AnalyticsService } from './services/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CookieBannerComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    // Inicializar el servicio de análisis con tu ID de Google Analytics
    // Reemplaza 'UA-XXXXXXXXX-X' con tu ID real cuando lo tengas
    this.analyticsService.initializeAnalytics('UA-XXXXXXXXX-X');
  }
}
