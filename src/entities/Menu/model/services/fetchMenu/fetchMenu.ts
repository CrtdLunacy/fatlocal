import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Menu } from '../../types/MenuSchema';

export const fetchMenu = createAsyncThunk<Menu[], void, ThunkConfig<string>>(
    'menu/fetchMenu',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<Menu[]>('/Menus');

            if (!response.data) {
                throw new Error();
            }
            const { data } = response;
            return [...data];
        } catch (e) {
            console.log(e);
            return rejectWithValue('Menu not found');
        }
    },
);
