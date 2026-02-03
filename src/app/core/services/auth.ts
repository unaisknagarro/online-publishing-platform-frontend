import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, afterNextRender, PLATFORM_ID } from '@angular/core';
//import { Auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const NAMESPACE = 'https://publishhub.com';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private platformId = inject(PLATFORM_ID);
  private auth0 = inject(Auth0Service, { optional: true });


  user$!: Observable<any>;
  isAuthenticated$!: Observable<boolean>;
  roles$!: Observable<string[]>;

  constructor() {
    //afterNextRender(() => {
    if (isPlatformBrowser(this.platformId) && this.auth0) {
      this.user$ = this.auth0.user$;
      this.isAuthenticated$ = this.auth0.isAuthenticated$;
      this.roles$ = this.auth0.user$.pipe(
        map(user => user?.[`${NAMESPACE}/roles`] || [])
      );
      //});
    }
  }

  login() {
    if (isPlatformBrowser(this.platformId) && this.auth0) {
      this.auth0.loginWithRedirect();
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId) && this.auth0) {
      this.auth0.logout({
        logoutParams: {
          returnTo: typeof window === 'undefined' ? '' : window.location.origin
        }
      });
    }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId) && this.auth0) {
      return this.auth0.getAccessTokenSilently();
    }
    return null;
  }

  hasRole(role: 'editor' | 'user') {
    return this.roles$.pipe(
      map((roles: string[]) => roles.includes(role))
    );
  }




  // googleLogin() {
  //   return signInWithPopup(this.auth, new GoogleAuthProvider());
  // }


  // facebookLogin() {
  //   return signInWithPopup(this.auth, new FacebookAuthProvider());
  // }


  // logout() {
  //   return signOut(this.auth);
  // }


  // async getToken() {
  //   return this.auth.currentUser?.getIdToken();
  // }
}