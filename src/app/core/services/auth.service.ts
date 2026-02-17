import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly key = 'users';
  private readonly sessionKey = 'session';

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.sessionKey) || 'null');
  }

  signup(data: any) {
    const users = JSON.parse(localStorage.getItem(this.key) || '[]');
    users.push(data);
    localStorage.setItem(this.key, JSON.stringify(users));
  }

  login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem(this.key) || '[]');
    const user = users.find(
      (u:any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem(this.sessionKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.sessionKey);
  }

  isLoggedIn() {
    return !!this.getCurrentUser();
  }
}