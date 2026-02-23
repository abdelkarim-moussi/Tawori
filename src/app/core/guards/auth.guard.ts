import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService = inject(UserApiService);
  return userService.isAuthenticated();
};
