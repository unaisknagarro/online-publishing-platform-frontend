import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { User } from "../../shared/models/user";

@Injectable({ providedIn: 'root' })
export class AuthService {

private currentUser = new BehaviorSubject<User | null>(null);

  login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u:any) => u.email === email && u.password === password);
    if(user){
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser.next(user);
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}