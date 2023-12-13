import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';

export type ReducersList = {
  [key in StateSchemaKey]?: Reducer<NonNullable<StateSchema[key]>>;
}

interface DynamicModuleProps {
  reducers: ReducersList;
  isRemoved?: boolean;
}

export const useDynamicModuleLoad = ({ reducers, isRemoved = true }: DynamicModuleProps): void => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();

        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@Mount ${name} reducer` });
            }
        });
        return () => {
            if (isRemoved) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@Unmount ${name} reducer` });
                });
            }
        };
    // eslint-disable-next-line
  }, []);
};
