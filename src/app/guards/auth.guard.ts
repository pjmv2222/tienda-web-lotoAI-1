import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUserValue) {
    return true;
  }

  router.navigate(['/'], { queryParams: { returnUrl: state.url }});
  return false;
}; 