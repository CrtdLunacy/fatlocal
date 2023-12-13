import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Restaurant } from '../../types/RestaurantSchema';

export const fetchRestaurant = createAsyncThunk<Restaurant, number, ThunkConfig<string>>(
    'restaurant/fetchRestaurant',
    async (restId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get<Restaurant>(`/Restaurants/${restId}`);

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Restaurant not found');
        }
    },
);
