import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserData = (state: StateSchema) => state.user.user;
export const getUsersList = (state: StateSchema) => state.user.usersList;
export const getUserLoading = (state: StateSchema) => state.restaurants.isLoading || false;
export const getUserError = (state: StateSchema) => state.restaurants.error;
