import { isNil } from 'lodash';
import Cookies from 'js-cookie';

export const ACCESS_TOKEN = 'access-token';
export const REFRESH_TOKEN = 'refresh-token';

class CookieService {
    // eslint-disable-next-line class-methods-use-this
    public getAccessToken(): string | undefined {
        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) return token;
        return Cookies.get(`${ACCESS_TOKEN}`);
    }

    // eslint-disable-next-line class-methods-use-this
    public getRefreshToken(): string | undefined {
        const token = localStorage.getItem('REFRESH_TOKEN');
        if (token) return token;
        return Cookies.get(`${REFRESH_TOKEN}`);
    }

    // eslint-disable-next-line class-methods-use-this
    public setAccessToken(token: string | undefined): void {
        if (isNil(token)) {
            return;
        }
        Cookies.set(`${ACCESS_TOKEN}`, `${token}`, {
            expires: 1, path: '', secure: true, sameSite: 'none',
        });
        localStorage.setItem('AUTH_TOKEN', token);
    }

    // eslint-disable-next-line class-methods-use-this
    public setRefreshToken(token: string | undefined): void {
        if (isNil(token)) {
            return;
        }
        Cookies.set(`${REFRESH_TOKEN}`, `${token}`, {
            expires: 7, path: '', secure: true, sameSite: 'none',
        });
        localStorage.setItem('REFRESH_TOKEN', token);
    }
}

export const cookieService = new CookieService();
