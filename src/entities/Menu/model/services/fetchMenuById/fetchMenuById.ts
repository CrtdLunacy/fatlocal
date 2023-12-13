import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Menu } from '../../types/MenuSchema';

export const fetchMenuById = createAsyncThunk<Menu, number, ThunkConfig<string>>(
    'menu/fetchMenuById',
    async (id, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<Menu>(`/Menus/${id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Menu not found');
        }
    },
);
