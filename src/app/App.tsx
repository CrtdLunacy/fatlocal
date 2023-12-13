import React, { Suspense } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Loader } from '@/shared/ui/Loader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchUserByToken } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllRestaurants } from '@/entities/Restaurant';

function App() {
    const { initialized } = useKeycloak();
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchUserByToken());
        dispatch(fetchAllRestaurants());
    });

    if (!initialized) {
        return (
            <div className={classNames('mainLoader', {}, [])}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="Загрузка...">
                <div className="content-page">
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}

export default App;
