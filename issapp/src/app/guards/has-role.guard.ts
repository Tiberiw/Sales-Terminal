import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../login/auth.service';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const role = authService.getRole();

  if (!authService.isLoggedIn() || role !== expectedRole) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
