import axios from 'axios';
import { API_URL } from '@/shared/const/keycloack';
import { authService } from '@/shared/services/auth.service';

const AUTHORIZATION_HEADER = 'Authorization';

const $api = axios.create({
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    if (config.headers) config.headers[AUTHORIZATION_HEADER] = `Bearer ${authService.getAccessToken()}`;
    return config;
});

export {
    $api,
};
