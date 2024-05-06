import { CanActivateFn } from '@angular/router';

export const backofficeguardGuard: CanActivateFn = (route, state) => {
  return true;
};
