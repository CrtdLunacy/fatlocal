import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { AppRoutes, RoutePath } from '@/shared/const/router';
import { AppRouteProps } from '@/shared/types/router';
import { AboutPage } from '@/pages/AboutPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MENU]: {
        path: RoutePath.menu,
        element: <MainPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
    },
    [AppRoutes.TABLES]: {
        path: RoutePath.tables,
        element: <AboutPage />,
    },
    [AppRoutes.NOTIFICATIONS]: {
        path: RoutePath.notifications,
        element: <AboutPage />,
    },
    [AppRoutes.ORDERS]: {
        path: RoutePath.orders,
        element: <AboutPage />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: `${RoutePath.forbidden}`,
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
