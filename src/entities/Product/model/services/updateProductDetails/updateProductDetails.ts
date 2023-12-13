import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProductDetails } from '../../types/ProductsSchema';
import { getProductDetailsForm } from '../../selectors/index';
import { fetchProducts } from '../fetchProducts/fetchProducts';

type productId = number | undefined;
export const updateProductDetails = createAsyncThunk<ProductDetails, productId, ThunkConfig<string>>(
    'product/updateProductDetails',
    async (productId, thunkAPI) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkAPI;

        const formData = getProductDetailsForm(getState());

        try {
            const response = await extra.api.put<ProductDetails>(`/products/${productId}`, formData);

            if (!response.data) {
                throw new Error();
            }

            await dispatch(fetchProducts());
            return response.data;
        } catch (e) {
            return rejectWithValue('Product details not found');
        }
    },
);
