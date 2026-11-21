import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { PersonService } from './services/person.service';
import { inject } from '@angular/core';


export const hasFavoritesGuardGuard: CanActivateFn = (route, state) => {
  const personService = inject(PersonService);
  const router = inject(Router);
  
  if(personService.favoriteCount() <= 0)
  { 
    return router.createUrlTree(['/']);
  }
  return true;
};
