import { menuWithChild } from '../organizeHierachicalMenu/organizeHierarchicalMenu';

export const buildMenuChainString = (currentMenuName: string, menuParentId: number, menuHierarchy: menuWithChild[]): string => {
    const menuChain: menuWithChild[] = [];

    const findMenuItem = (menuId: number) => {
        const item = menuHierarchy.find((menu) => menu.id === menuId);
        if (item) {
            menuChain.unshift(item); // Добавляем элемент в начало массива
            if (item.menuParentId !== 0) {
                findMenuItem(item.menuParentId); // Рекурсивно ищем родителя
            }
        }
    };

    findMenuItem(menuParentId);

    // Преобразуем массив в строку
    const menuChainString = menuChain.map((item) => item.name).join(' | ');
    const breadcrumbs = menuChainString ? `${menuChainString} | ${currentMenuName}` : `${currentMenuName}`;

    return breadcrumbs;
};
