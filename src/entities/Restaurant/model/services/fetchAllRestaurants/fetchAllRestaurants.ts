import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Restaurant } from '../../types/RestaurantSchema';
import { RestaurantActions } from '../../slices/restaurantSlice';

export const fetchAllRestaurants = createAsyncThunk<Restaurant[], void, ThunkConfig<string>>(
    'restaurant/fetchAllRestaurants',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.get<Restaurant[]>('/Restaurants');

            if (!response.data) {
                throw new Error();
            }

            dispatch(RestaurantActions.setActiveRestaurant(response.data[0]));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Restaurants not found');
        }
    },
);
