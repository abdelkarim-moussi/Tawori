import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guessGuard } from './guess.guard';

describe('guessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
