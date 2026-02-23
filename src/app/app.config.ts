import { ApplicationConfig, provideBrowserGlobalErrorListeners, PLATFORM_ID, ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideQuillConfig } from 'ngx-quill';
import { environment } from '../environments/environment';
import { provideAuth0 } from '@auth0/auth0-angular';
import { tokenInterceptor } from './core/interceptors/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([tokenInterceptor]), withFetch()),
     provideAuth0({
      domain: environment.oauth0.domain,
      clientId: environment.oauth0.clientId,
      authorizationParams: {
        redirect_uri: typeof window !== 'undefined'
          ? window.location.origin
          : undefined,
          audience: environment.oauth0.audience
      }
    }),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {

        provideAuth0({
          domain: environment.oauth0.domain,
          clientId: environment.oauth0.clientId,
          authorizationParams: {
            redirect_uri: environment.oauth0.domain,
            audience: environment.oauth0.audience
          },
        });
      }
    },
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video'],
          ['clean']
        ]
      }
    })
  ]
};


