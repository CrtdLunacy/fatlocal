import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authService } from '@/shared/services/auth.service';

export const rtkApi = createApi({
    reducerPath: 'rtkApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://moysklad.nemenu-demo.ru/api/v1',
        prepareHeaders: (headers) => {
            const token = authService.getAccessToken() || '';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
