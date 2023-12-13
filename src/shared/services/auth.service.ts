import { localStorageService } from './localstorage.service';
import keycloak from '../../keycloack';
import { APP_URL } from '@/shared/const/keycloack';
import { cookieService } from '../services/cookie.service';

class AuthService {
    redirectUri: string = APP_URL;

    // eslint-disable-next-line class-methods-use-this
    public getAccessToken(): string | undefined {
        return cookieService.getAccessToken();
    }

    // eslint-disable-next-line class-methods-use-this
    public getRefreshToken(): string | undefined {
        return cookieService.getRefreshToken();
    }

    // eslint-disable-next-line class-methods-use-this
    public setAccessToken(token: string | undefined): void {
        cookieService.setAccessToken(token);
    }

    // eslint-disable-next-line class-methods-use-this
    public setRefreshToken(token: string | undefined): void {
        cookieService.setRefreshToken(token);
    }

    // eslint-disable-next-line class-methods-use-this
    public removeAccessToken(): void {
        localStorageService.removeAccessToken();
    }

    public logout(): void {
        this.removeAccessToken();
        keycloak.logout({ redirectUri: this.redirectUri });
    }
}

export const authService = new AuthService();
