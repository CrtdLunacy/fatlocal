import { useEffect, useState } from 'react';
import { ListBoxItem } from '@/shared/ui/Popups/ui/ListBox/ListBox';
import { menuWithChild } from '../../organizeHierachicalMenu/organizeHierarchicalMenu';

export function useBreadCrumbsMenu(hierarchyMenu: menuWithChild[]) {
    const [selectOptions, setSelectOptions] = useState<ListBoxItem[]>([]);

    useEffect(() => {
        const newOptions = hierarchyMenu?.map((item) => ({
            value: item.name,
            level: item.level,
            id: String(item.id),
            content: item.name,
            hasChildren: item.hasChildren,
        }));
        setSelectOptions(newOptions);
        // eslint-disable-next-line
    }, []);

    return [selectOptions];
}
