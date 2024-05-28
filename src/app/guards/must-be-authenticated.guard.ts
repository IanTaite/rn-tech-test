import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@services';
import { tap } from 'rxjs';

export const mustBeAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isAuthenticated$.pipe(
    tap((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }
    })
  );
};
