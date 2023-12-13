import { StateSchema } from '@/app/providers/StoreProvider';

export const getRestaurant = (state: StateSchema) => state.restaurants.restaurant;
export const getRestaurantsList = (state: StateSchema) => state.restaurants.restaurantsList;
export const getRestaurantIsLoading = (state: StateSchema) => state.restaurants.isLoading || false;
export const getRestaurantError = (state: StateSchema) => state.restaurants.error;
