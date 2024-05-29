import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../login/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  if (!authService.isTokenValid()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
