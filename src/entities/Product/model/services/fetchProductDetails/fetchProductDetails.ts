import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProductDetails } from '../../types/ProductsSchema';

type productId = number | undefined;
export const fetchProductDetails = createAsyncThunk<ProductDetails, productId, ThunkConfig<string>>(
    'product/fetchProductDetails',
    async (productId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<ProductDetails>(`/products/${productId}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('Product details not found');
        }
    },
);
