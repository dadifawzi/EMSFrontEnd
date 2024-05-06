import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { backofficeguardGuard } from './backofficeguard.guard';

describe('backofficeguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => backofficeguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
