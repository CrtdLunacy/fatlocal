import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Menu } from '../../types/MenuSchema';

type groupId = number;
export type menuObject = {
    [key: number]: Menu[]
}

export const fetchSubgroups = createAsyncThunk<menuObject, groupId, ThunkConfig<string>>(
    'menu/fetchSubgroups',
    async (groupId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        return [];
    },
);
