import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../../types/UserSchema';

export const fetchUserById = createAsyncThunk<User, number, ThunkConfig<string>>(
    'user/fetchUserById',
    async (userId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<User>(`/Users/${userId}`);

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('The user with the current ID was not found or does not exist.');
        }
    },
);
