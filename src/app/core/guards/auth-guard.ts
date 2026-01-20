import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
//import { Auth } from '@angular/fire/auth';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';


export const AuthGuard: CanActivateFn = () => {
  const auth = inject(Auth0Service);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map(isAuth => {
      if (!isAuth) {
        auth.loginWithRedirect();
        return false;
      }
      return true;
    })
  );
};