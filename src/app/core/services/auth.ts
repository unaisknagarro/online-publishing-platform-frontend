import { inject, Injectable } from '@angular/core';
//import { Auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

const NAMESPACE = 'https://publishhub.com';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth0 = inject(Auth0Service, { optional: true });


  user$: Observable<any> = of(null);
  isAuthenticated$!: Observable<boolean>;
  roles$!: Observable<string[]>;

  constructor() {
      // this.user$ = this.auth0.user$;
      // this.isAuthenticated$ = this.auth0.isAuthenticated$;
      // this.roles$ = this.auth0.user$.pipe(
      //   map(user => user?.[`${NAMESPACE}/roles`] || [])
      // );
  }

  login() {
    // if(this.oauth0){
    //   this.auth0.loginWithRedirect();
    // }
    return;
  }

  logout() {
      // this.auth0.logout({
      //   logoutParams: {
      //     returnTo: typeof window === 'undefined' ? '' : window.location.origin
      //   }
      // });
  }

  getToken() {
      //return this.auth0.getAccessTokenSilently();
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