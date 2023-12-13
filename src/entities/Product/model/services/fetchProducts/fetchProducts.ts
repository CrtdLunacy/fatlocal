import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Product } from '../../types/ProductsSchema';

export type productObject = {
  [key: number]: Product[]
}

export const fetchProducts = createAsyncThunk<productObject, void, ThunkConfig<string>>(
    'product/fetchProducts',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Product[]>('/products');

            if (!response.data) {
                throw new Error();
            }

            const preparedData = response.data.reduce((result: productObject, item: Product) => {
                const parentId = item.parentId as number;
                if (!result[parentId]) {
                    result[parentId] = [item]; // Создать новый массив, если его нет
                } else {
                    result[parentId].push(item); // Добавить в существующий массив
                }
                return result;
            }, {});

            return preparedData;
        } catch (e) {
            return rejectWithValue('Products not found');
        }
    },
);
