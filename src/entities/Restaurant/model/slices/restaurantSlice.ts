import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant, RestaurantSchema } from '../types/RestaurantSchema';
import { fetchRestaurant } from '../services/fetchRestaurant/fetchRestaurant';
import { fetchAllRestaurants } from '../services/fetchAllRestaurants/fetchAllRestaurants';

const initialState: RestaurantSchema = {
    isLoading: false,
    error: undefined,
    restaurant: undefined,
    restaurantsList: [],
};
export const RestaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setActiveRestaurant: (state, action: PayloadAction<Restaurant>) => {
            state.restaurant = action.payload;
        },
        changeRestaurant: (state, action: PayloadAction<string>) => {
            if (state.restaurantsList) {
                const currentRestaurant = state.restaurantsList.filter((item) => item.title === action.payload);
                state.restaurant = { ...currentRestaurant[0] };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurant.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchRestaurant.fulfilled, (
                state,
                action: PayloadAction<Restaurant>,
            ) => {
                state.isLoading = false;
                state.restaurant = action.payload;
            })
            .addCase(fetchRestaurant.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchAllRestaurants.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchAllRestaurants.fulfilled, (
                state,
                action: PayloadAction<Restaurant[]>,
            ) => {
                state.isLoading = false;
                state.restaurantsList = action.payload;
            })
            .addCase(fetchAllRestaurants.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { actions: RestaurantActions } = RestaurantSlice;
export const { reducer: RestaurantReducer } = RestaurantSlice;
