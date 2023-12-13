import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { WarehouseSchema } from 'src/widgets/Warehouse';
import { rtkApi } from '@/shared/api/rtkApi';
import { MenuSchema } from '@/entities/Menu';
import { ProductsSchema } from '@/entities/Product';
import { RestaurantSchema } from '@/entities/Restaurant';
import { UserSchema } from '@/entities/User';

export interface StateSchema {
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    restaurants: RestaurantSchema;
    user: UserSchema;

    // Асинхронные редюсеры
    warehouse?: WarehouseSchema;
    menu?: MenuSchema;
    products?: ProductsSchema;
}
export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
