import { isNil } from 'lodash';

export const ACCESS_TOKEN = 'access-token';
export const REFRESH_TOKEN = 'refresh-token';

class LocalStorageService {
    // eslint-disable-next-line class-methods-use-this
    public getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    // eslint-disable-next-line class-methods-use-this
    public setAccessToken(token: string | undefined): void {
        if (isNil(token)) {
            return;
        }
        localStorage.setItem(ACCESS_TOKEN, token);
    }

    // eslint-disable-next-line class-methods-use-this
    public setRefreshToken(token: string | undefined): void {
        if (isNil(token)) {
            return;
        }
        localStorage.setItem(REFRESH_TOKEN, token);
    }

    // eslint-disable-next-line class-methods-use-this
    public removeAccessToken(): void {
        localStorage.removeItem(ACCESS_TOKEN);
    }
}

export const localStorageService = new LocalStorageService();
