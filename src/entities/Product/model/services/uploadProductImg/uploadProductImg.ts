import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProductActions } from '../../slices/productSlice';
import { UrlData } from '../../types/ProductsSchema';

export const uploadProductImg = createAsyncThunk<UrlData, FormData, ThunkConfig<string>>(
    'product/uploadProductImg',
    async (data, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.post<UrlData>('/FileStorage/upload', data);

            if (!response.data) {
                throw new Error();
            }

            dispatch(ProductActions.updateProductDetails({ image: response.data.directUrl }));

            return response.data;
        } catch (e) {
            return rejectWithValue('Product details not found');
        }
    },
);
