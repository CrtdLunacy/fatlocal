import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProductDetails } from '../../types/ProductsSchema';

export const deleteProduct = createAsyncThunk<ProductDetails, number, ThunkConfig<string>>(
    'product/deleteProduct',
    async (productId, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.delete<ProductDetails>(`/products/${productId}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('Product details not found');
        }
    },
);
