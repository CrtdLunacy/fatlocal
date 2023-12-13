export { fetchRestaurant } from './model/services/fetchRestaurant/fetchRestaurant';
export { fetchAllRestaurants } from './model/services/fetchAllRestaurants/fetchAllRestaurants';
export {
    getRestaurant, getRestaurantError, getRestaurantIsLoading, getRestaurantsList,
} from './model/selectors/index';
export type { Restaurant, RestaurantSchema } from './model/types/RestaurantSchema';
export { RestaurantReducer, RestaurantActions } from './model/slices/restaurantSlice';
