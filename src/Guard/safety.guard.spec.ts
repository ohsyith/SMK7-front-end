import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { safetyGuard } from './safety.guard';

describe('safetyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => safetyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
