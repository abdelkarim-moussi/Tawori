import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

export const guessGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserApiService);
  return !userService.isAuthenticated();
};
