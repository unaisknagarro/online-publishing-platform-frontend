import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
//import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth';
import { map } from 'rxjs/operators';


export const RoleGuard = (role: 'editor' | 'user'): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.hasRole(role).pipe(
      map(hasRole => {
        if (!hasRole) {
          router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  };
};