import { createSelector } from '@reduxjs/toolkit';
import { ISideBarItem } from '../types/sidebar';
import { RoutePath } from '@/shared/const/router';

export const getSideBarItems = createSelector(
    () => {
        const SideBarItemsList: ISideBarItem[] = [
            {
                path: RoutePath.orders,
                text: 'Заказы',
            },
            {
                path: RoutePath.menu,
                text: 'Меню',
            },
            {
                path: RoutePath.tables,
                text: 'Столы',
            },
            {
                path: RoutePath.notifications,
                text: 'Уведомления',
            },
            {
                path: RoutePath.profile,
                text: 'Заведение',
            },
        ];

        return SideBarItemsList;
    },
);
