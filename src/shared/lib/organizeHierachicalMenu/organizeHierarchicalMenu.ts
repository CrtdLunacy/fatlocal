export interface Data {
  id: number;
  menuParentId: number;
  name: string;
  imageUrl: string;
}

export interface menuWithChild extends Data {
  children: menuWithChild[];
  level?: number;
  hasChildren?: boolean;
}

const menuHierarchy: menuWithChild[] = []; // Используйте массив, а не объект

export const organizeHierarchicalMenu = <T extends Data>(data: T[]): menuWithChild[] => {
    menuHierarchy.length = 0;
    data.forEach((item) => {
        if (item.menuParentId === 0) {
            menuHierarchy.push({
                ...item,
                children: [],
                level: 1,
            });
        }
    });

    data.forEach((item) => {
        if (item.menuParentId !== 0) {
            const parentMenu = menuHierarchy.find((menu) => menu.id === item.menuParentId);
            if (parentMenu) {
                parentMenu.children.push({
                    ...item,
                    children: [],
                    level: 2,
                });
            }
        }
    });

    data.forEach((item) => {
        if (item.menuParentId !== 0) {
            menuHierarchy.forEach((parentMenu) => {
                if (parentMenu.children.some((child) => child.id === item.menuParentId)) {
                    const childMenu = parentMenu.children.find((child) => child.id === item.menuParentId);
                    if (childMenu) {
                        childMenu.children.push({
                            ...item,
                            children: [],
                            level: 3,
                        });
                    }
                }
            });
        }
    });

    const flattenMenuHierarchy = (menu: menuWithChild[], level = 1): menuWithChild[] => {
        let result: menuWithChild[] = [];

        menu.forEach((item) => {
            const { children, ...rest } = item;
            const hasChildren = children && children.length > 0;
            const flattenedItem: menuWithChild = {
                ...rest,
                level,
                children: [],
                hasChildren, // Добавляем флаг hasChildren
            };
            result.push(flattenedItem);

            if (hasChildren) {
                result = result.concat(flattenMenuHierarchy(children, level + 1));
            }
        });

        return result;
    };
    const flatMenuArray = flattenMenuHierarchy(menuHierarchy);
    return flatMenuArray;
};

// Вызов функции для преобразования иерархической структуры в плоский массив
