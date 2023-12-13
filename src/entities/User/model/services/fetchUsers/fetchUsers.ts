import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../../types/UserSchema';

export const fetchUsers = createAsyncThunk<User[], void, ThunkConfig<string>>(
    'user/fetchUsers',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<User[]>('/Users');

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Users not found');
        }
    },
);
