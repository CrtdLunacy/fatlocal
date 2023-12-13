import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { isNil } from 'lodash';
import { AuthClientError, AuthClientEvent, AuthClientTokens } from '@react-keycloak/core/lib/types';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import ThemeProvider from '@/app/providers/ThemeProvider/ui/ThemeProvider';
import App from '@/app/App';
import '@/app/styles/index.scss';
import { StoreProvider } from '@/app/providers/StoreProvider';
import keycloak from '@/keycloack';
import { authService } from '@/shared/services/auth.service';
import { ErrorBoundary } from '@/app/providers/ErrorBoudary';

const container = document.getElementById('root');

const onEventActions = (eventType: AuthClientEvent, error?: AuthClientError) => {
    if (['onInitError', 'onAuthError', 'onAuthRefreshError'].includes(eventType) || !isNil(error)) {
        console.error('Keycloak error occurred with type: ', eventType, error);
        authService.logout();
    }
};

const onTokensActions = (tokens: AuthClientTokens) => {
    authService.setAccessToken(tokens.token);
    authService.setRefreshToken(tokens.refreshToken);
};

if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать React-приложение');
}
const root = createRoot(container);

root.render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: 'login-required', checkLoginIframe: true, grant_type: 'password' }}
        onTokens={onTokensActions}
        onEvent={onEventActions}
    >
        <BrowserRouter>
            <StoreProvider>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ErrorBoundary>
            </StoreProvider>
        </BrowserRouter>
    </ReactKeycloakProvider>,
);
export { Theme } from '@/shared/const/theme';
