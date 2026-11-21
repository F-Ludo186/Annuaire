import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { hasFavoritesGuardGuard } from './has-favorites-guard-guard';

describe('hasFavoritesGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => hasFavoritesGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
