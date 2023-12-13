export enum AppRoutes {
    ORDERS = 'orders',
    MENU = 'menu',
    TABLES = 'tables',
    NOTIFICATIONS = 'notifications',
    PROFILE = 'profile',
    FORBIDDEN = 'forbidden',
    // last one page
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MENU]: '/',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.ORDERS]: '/orders/list/inside/opened',
    [AppRoutes.TABLES]: '/tables',
    [AppRoutes.NOTIFICATIONS]: '/telegram',
    [AppRoutes.FORBIDDEN]: '/forbidden',
    [AppRoutes.NOT_FOUND]: '*',
};
