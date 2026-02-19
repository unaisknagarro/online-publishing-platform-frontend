import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  standalone: true,
  template: `<p>Logging you in...</p>`
})
export class Callback implements OnInit {
  private auth = inject(AuthService);

  ngOnInit() {
    this.auth.handleRedirectCallback().subscribe(() => {
      window.location.href = '/';
    });
  }
}