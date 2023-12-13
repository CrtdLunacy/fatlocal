import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Product } from '../../types/ProductsSchema';

type menuId = number | undefined;
export type productObject = {
    [key: number]: Product[]
}

export const fetchProductsById = createAsyncThunk<productObject, menuId, ThunkConfig<string>>(
    'product/fetchProductsById',
    async (menuId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Product[]>(`/menus/${menuId}/products`);

            if (!response.data) {
                throw new Error();
            }

            return { [menuId!]: response.data };
        } catch (e) {
            return rejectWithValue('Products not found');
        }
    },
);
