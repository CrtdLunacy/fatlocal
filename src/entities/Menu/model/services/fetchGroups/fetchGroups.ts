import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Menu } from '../../types/MenuSchema';

export const fetchGroups = createAsyncThunk<Menu[], number, ThunkConfig<string>>(
    'menu/fetchGroups',
    async (menuId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        return [];
    },
);
