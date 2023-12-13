import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Product } from '../../types/ProductsSchema';

type menuId = number | undefined;

export const fetchProductsIntegration = createAsyncThunk<Product[], menuId, ThunkConfig<string>>(
    'product/fetchProductsIntegration',
    async (menuId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Product[]>(`/menus/${menuId}/products`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('Products not found');
        }
    },
);
