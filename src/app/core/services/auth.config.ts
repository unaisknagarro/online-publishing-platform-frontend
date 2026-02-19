import { environment } from '../../../environments/environment';

export function auth0ProviderFactory() {

    return [
        import('@auth0/auth0-angular').then(m =>
            m.provideAuth0({
                domain: environment.oauth0.domain,
                clientId: environment.oauth0.clientId,
                authorizationParams: {
                    redirect_uri: environment.oauth0.domain,
                    audience: environment.oauth0.audience
                },
                skipRedirectCallback: true
            })
        )
    ];
}