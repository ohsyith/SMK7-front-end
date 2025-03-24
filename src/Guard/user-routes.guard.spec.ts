import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userRoutesGuard } from './user-routes.guard';

describe('userRoutesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
