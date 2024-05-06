import { CanActivateFn } from '@angular/router';

export const userguardGuard: CanActivateFn = (route, state) => {
  return true;
};
