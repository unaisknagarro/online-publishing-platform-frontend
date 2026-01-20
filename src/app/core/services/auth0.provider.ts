import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Provider } from '@angular/core';
import { provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';

export const AUTH0_BROWSER_PROVIDER: Provider = {
  provide: 'AUTH0_BROWSER_PROVIDER',
  deps: [PLATFORM_ID],
  useFactory: (platformId: object) => {
    if (!isPlatformBrowser(platformId)) {
      return [];
    }

    return provideAuth0({
       domain: environment.oauth0.domain,
        clientId: environment.oauth0.clientId,
        authorizationParams: {
            redirect_uri: environment.oauth0.domain,
            audience: environment.oauth0.audience
        },
    });
  }
};