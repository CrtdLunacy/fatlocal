import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProductDetails } from '../../types/ProductsSchema';
import { getProductDetailsForm } from '../../selectors/index';
import { ProductActions } from '../../slices/productSlice';

export const createProduct = createAsyncThunk<ProductDetails, void, ThunkConfig<string>>(
    'product/createProduct',
    async (_, thunkAPI) => {
        const {
            extra, rejectWithValue, getState, dispatch,
        } = thunkAPI;

        const formData = getProductDetailsForm(getState());

        try {
            const response = await extra.api.post<ProductDetails>('/products', formData);

            if (!response.data) {
                throw new Error();
            }

            dispatch(ProductActions.updateProductDetails({}));
            return response.data;
        } catch (e) {
            return rejectWithValue('Product details not found');
        }
    },
);
