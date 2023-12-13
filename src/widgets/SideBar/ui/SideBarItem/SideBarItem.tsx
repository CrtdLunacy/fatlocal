import React, { memo } from 'react';
import { AppLink } from '@/shared/ui/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ISideBarItem } from '../../model/types/sidebar';
import styles from './SideBarItem.module.scss';
import { useCurrentLocation } from '@/shared/lib/hooks/useCurrentLocation/useCurrentLocation';

interface SideBarItemProps {
    item: ISideBarItem;
    location: string;
}

const SideBarItem = memo(({ item, location }: SideBarItemProps) => {
    const isPicked = useCurrentLocation(item.path, location);

    if (item.path !== '/') {
        return (
            <a
                className={classNames(styles.item, { [styles.isPicked]: isPicked }, [])}
                href={`https://cp.nemenu-demo.ru${item.path}`}
            >
                <span className={styles.link}>{item.text}</span>
            </a>
        );
    }

    return (
        <AppLink
            className={classNames(styles.item, { [styles.isPicked]: isPicked }, [])}
            to={item.path}
        >
            <span className={styles.link}>{item.text}</span>
        </AppLink>
    );
});

export default SideBarItem;
