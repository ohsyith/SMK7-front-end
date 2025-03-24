import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verifGuard } from './verif.guard';

describe('verifGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verifGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
